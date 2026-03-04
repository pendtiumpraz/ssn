#!/usr/bin/env bash
set -euo pipefail

# ===== Config (pakai path user) =====
: "${HOME:?HOME not set}"
DEPLOY_DIR="${DEPLOY_DIR:-$HOME/public_html}"             # bisa override via env
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups/website}"         # writable
LOG_DIR="${LOG_DIR:-$HOME/logs}"                          # writable
LOG_FILE="${LOG_FILE:-$LOG_DIR/deploy.log}"
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"

# ===== Warna output (opsional) =====
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

log()     { echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $*" | tee -a "$LOG_FILE"; }
warning() { echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING:${NC} $*" | tee -a "$LOG_FILE"; }
error()   { echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $*" | tee -a "$LOG_FILE"; }

create_directories() {
  mkdir -p "$BACKUP_DIR" "$LOG_DIR" "$DEPLOY_DIR"
}

backup_current() {
  if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A "$DEPLOY_DIR" 2>/dev/null || true)" ]; then
    log "Creating backup of current deployment..."
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C "$DEPLOY_DIR" . 2>/dev/null || true
    log "Backup created: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
    # keep last 5
    (cd "$BACKUP_DIR" && ls -t backup_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm --)
  else
    log "No existing deployment found, skipping backup"
  fi
}

deploy_files() {
  log "Deploying files to $DEPLOY_DIR..."
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete \
      --exclude='.git' \
      --exclude='.github' \
      --exclude='deploy.sh' \
      --exclude='README.md' \
      --exclude='.gitignore' \
      ./ "$DEPLOY_DIR"/
  else
    # Fallback tanpa rsync: hapus isi lalu salin
    find "$DEPLOY_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} \;
    tar -C . -cf - --exclude .git --exclude .github --exclude deploy.sh --exclude README.md --exclude .gitignore | tar -C "$DEPLOY_DIR" -xf -
  fi
  log "Files deployed successfully"
}

set_permissions() {
  log "Setting file permissions..."
  find "$DEPLOY_DIR" -type d -exec chmod 755 {} \;
  find "$DEPLOY_DIR" -type f -exec chmod 644 {} \;
  log "Permissions set successfully"
}

restart_services() {
  # Shared hosting: biasanya tidak ada systemctl
  warning "Skipping service reload (shared hosting)"
}

cleanup_backups() {
  (cd "$BACKUP_DIR" 2>/dev/null && ls -1 backup_*.tar.gz 2>/dev/null | wc -l | {
    read cnt
    if [ "${cnt:-0}" -gt 5 ]; then
      ls -t backup_*.tar.gz | tail -n +6 | xargs -r rm -f
      log "Old backups cleaned up"
    fi
  })
}

health_check() {
  log "Performing health check..."
  if [ -f "$DEPLOY_DIR/index.html" ]; then
    log "✅ index.html found"
  else
    warning "⚠️ index.html not found (pastikan output statisnya benar)"
  fi
  for d in css js images; do
    if [ -d "$DEPLOY_DIR/$d" ]; then log "✅ $d directory found"; else warning "⚠️ $d directory not found"; fi
  done
  log "Health check completed"
}

rollback() {
  error "Deployment failed! Attempting rollback..."
  latest_backup="$(ls -t "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | head -n1 || true)"
  if [ -n "${latest_backup:-}" ]; then
    log "Rolling back to: $latest_backup"
    find "$DEPLOY_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} \;
    tar -xzf "$latest_backup" -C "$DEPLOY_DIR"
    set_permissions
    restart_services
    log "Rollback completed"
  else
    error "No backup found for rollback!"
  fi
}

main() {
  log "Starting deployment process..."
  log "Timestamp: $TIMESTAMP"
  trap rollback ERR
  create_directories
  backup_current
  deploy_files
  set_permissions
  restart_services
  cleanup_backups
  health_check
  log "🎉 Deployment completed successfully!"
  log "Website is now live at: $DEPLOY_DIR"
}
main "$@"

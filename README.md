# Sainskerta Nusantara - Company Profile Website

> Innovating Technology to Deliver Happiness

This is the official company profile website for Sainskerta Nusantara, a software house and IT consulting company specializing in web development, mobile app development, and startup solutions.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean and professional design
- **Portfolio Showcase**: Display of company projects and achievements
- **Team Section**: Meet our talented team members
- **Service Pages**: Detailed information about our services
- **Contact Form**: Easy way for clients to get in touch
- **Blog Section**: Company news and insights

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 4
- **Icons**: Font Awesome, Custom SVG icons
- **Animations**: AOS (Animate On Scroll), WOW.js
- **Carousel**: Owl Carousel
- **Lightbox**: Fancybox
- **Form Validation**: Custom validator.js

## 📁 Project Structure

```
compro-ssn/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── css/                        # Stylesheets
│   ├── style.css              # Main stylesheet
│   ├── responsive.css         # Responsive styles
│   ├── esteh.css             # Custom styles
│   └── framework.css         # Framework styles
├── js/                        # JavaScript files
│   ├── theme.js              # Main theme JavaScript
│   └── lang.js               # Language support
├── images/                    # Image assets
│   ├── logo/                 # Company logos
│   ├── team/                 # Team member photos
│   ├── portfolio/            # Portfolio images
│   └── ...                   # Other image directories
├── vendor/                    # Third-party libraries
├── inc/                      # PHP includes
│   └── contact.php           # Contact form handler
├── ajax-pages/               # AJAX loaded pages
├── fonts/                    # Font files
├── deploy.sh                 # Deployment script
├── index.html               # Homepage
├── about.html               # About page
├── service.html             # Services page
├── portfolio.html           # Portfolio page
├── team.html                # Team page
├── contact.html             # Contact page
├── blog.html                # Blog listing
└── blog-detail.html         # Blog detail page
```

## 🚀 Deployment

This project uses GitHub Actions for automated deployment. When code is pushed to the `main` branch, it automatically triggers the deployment process.

### Prerequisites

Before setting up deployment, ensure you have:

1. **Server Access**: SSH access to your web server
2. **Web Server**: Apache, Nginx, or similar web server installed
3. **Git**: Installed on your server
4. **Proper Permissions**: Write access to web directory

### GitHub Secrets Configuration

Configure the following secrets in your GitHub repository settings:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `HOST` | Server IP address or domain | `192.168.1.100` or `example.com` |
| `USERNAME` | SSH username | `root` or `ubuntu` |
| `PRIVATE_KEY` | SSH private key | Your SSH private key content |
| `PORT` | SSH port (optional) | `22` (default) |
| `DEPLOY_PATH` | Path to your project on server | `/var/www/compro-ssn` |

### Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Navigate to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the corresponding values

### Server Setup

1. **Clone the repository on your server:**
   ```bash
   cd /var/www/
   git clone https://github.com/your-username/compro-ssn.git
   cd compro-ssn
   ```

2. **Make deploy script executable:**
   ```bash
   chmod +x deploy.sh
   ```

3. **Set up web server configuration:**

   **For Apache:**
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/html
       
       <Directory /var/www/html>
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

   **For Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       location ~ \\.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
       }
   }
   ```

### Manual Deployment

If you need to deploy manually, you can run the deployment script directly:

```bash
# On your server
cd /path/to/your/project
git pull origin main
sudo ./deploy.sh
```

### Deployment Process

The automated deployment process includes:

1. **Code Checkout**: Downloads the latest code from the main branch
2. **Dependency Installation**: Installs any required dependencies
3. **Build Process**: Runs build scripts if available
4. **Server Deployment**: 
   - Connects to server via SSH
   - Pulls latest changes
   - Runs deployment script
5. **Deployment Script Actions**:
   - Creates backup of current deployment
   - Deploys new files
   - Sets proper permissions
   - Restarts web server if needed
   - Performs health checks
   - Cleans up old backups

### Rollback

If deployment fails, the script automatically attempts to rollback to the previous version using the backup created before deployment.

To manually rollback:
```bash
# On your server
cd /var/backups/website
ls -la  # Find the backup you want to restore
sudo tar -xzf backup_YYYYMMDD_HHMMSS.tar.gz -C /var/www/html
```

## 🔧 Local Development

### Prerequisites

- Web server (Apache/Nginx) or simple HTTP server
- PHP (for contact form functionality)
- Modern web browser

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/compro-ssn.git
   cd compro-ssn
   ```

2. **Start a local server:**
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Contact Form Setup

To enable the contact form functionality:

1. Ensure PHP is installed and configured
2. Update `inc/contact.php` with your email settings
3. Configure SMTP settings if needed

## 📝 Customization

### Updating Content

- **Company Information**: Edit HTML files directly
- **Images**: Replace files in the `images/` directory
- **Styles**: Modify CSS files in the `css/` directory
- **Team Members**: Update `team.html` and add photos to `images/team/`
- **Portfolio**: Update `portfolio.html` and add project images

### Adding New Pages

1. Create new HTML file following the existing structure
2. Update navigation menus in all pages
3. Add any required styles or scripts

### Modifying Styles

- Main styles: `css/style.css`
- Responsive styles: `css/responsive.css`
- Custom styles: `css/esteh.css`

## 🔍 Monitoring

### Deployment Logs

Check deployment logs on your server:
```bash
tail -f /var/log/deploy.log
```

### Backup Management

Backups are automatically created and stored in `/var/backups/website/`. The system keeps the 5 most recent backups.

### Health Checks

The deployment script performs automatic health checks:
- Verifies essential files exist
- Checks directory structure
- Validates web server status

## 🐛 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

2. **Contact Form Not Working**
   - Check PHP configuration
   - Verify SMTP settings in `inc/contact.php`
   - Check server error logs

3. **Images Not Loading**
   - Verify file paths are correct
   - Check file permissions
   - Ensure images exist in the correct directory

4. **Deployment Fails**
   - Check GitHub secrets configuration
   - Verify server SSH access
   - Review deployment logs

### Getting Help

If you encounter issues:

1. Check the deployment logs: `/var/log/deploy.log`
2. Review GitHub Actions logs in your repository
3. Verify server configuration
4. Check file permissions

## 📄 License

This project is proprietary software owned by Sainskerta Nusantara.

## 🤝 Contributing

This is a private company project. For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Wait for review and approval

## 📞 Support

For technical support or questions:

- **Email**: info@sainskertanusantara.com
- **Website**: https://sainskertanusantara.com
- **Phone**: +62 XXX XXXX XXXX

---

**Sainskerta Nusantara** - Innovating Technology to Deliver Happiness
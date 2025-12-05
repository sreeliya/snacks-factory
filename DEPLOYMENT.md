# 🚀 Deployment Guide

Complete guide for deploying your Snacks Factory Management System to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables documented
- [ ] Database backup created
- [ ] API keys and credentials secured
- [ ] HTTPS certificate ready (for production)
- [ ] Domain name configured
- [ ] CI/CD pipeline set up (optional)

---

## 🏠 Deployment Options

### Option 1: Heroku (Recommended for Beginners)
### Option 2: AWS EC2
### Option 3: DigitalOcean
### Option 4: Railway
### Option 5: Render

---

## 1️⃣ Deploy to Heroku

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

### Backend Deployment

```bash
# 1. Install Heroku CLI
# Download from https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create snacks-factory-backend

# 4. Set environment variables
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail
```

### Frontend Deployment on Heroku

```bash
# 1. Add buildpack for Node.js + static
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static

# 2. Create static.json in frontend root
# See static.json file below

# 3. Update package.json for production build
# Add postbuild script

# 4. Deploy
git push heroku main
```

**static.json for frontend:**
```json
{
  "root": "build/",
  "routes": {
    "/**": "index.html"
  }
}
```

**package.json update:**
```json
{
  "scripts": {
    "start": "serve -s build",
    "build": "react-scripts build",
    "postbuild": "npm install -g serve"
  }
}
```

---

## 2️⃣ Deploy to DigitalOcean

### Backend Setup

```bash
# 1. Create Droplet
# - Choose Ubuntu 20.04 LTS
# - Select $4/month tier for starter
# - Add SSH key

# 2. Connect to Droplet
ssh root@your_droplet_ip

# 3. Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install Git
sudo apt-get install -y git

# 5. Clone repository
git clone your_github_repo
cd your_repo/backend

# 6. Install dependencies
npm install

# 7. Create .env file
nano .env
# Add: PORT=5000
# Add: MONGO_URI=mongodb+srv://...

# 8. Install PM2 (process manager)
sudo npm install -g pm2

# 9. Start application
pm2 start server.js --name "snacks-factory"
pm2 startup
pm2 save

# 10. Install Nginx (reverse proxy)
sudo apt-get install -y nginx

# 11. Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx configuration:**
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 12. Restart Nginx
sudo systemctl restart nginx

# 13. Install SSL (Let's Encrypt)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

### Frontend on DigitalOcean

```bash
# 1. Build React app
cd frontend
npm run build

# 2. Copy build to web root
sudo cp -r build/* /var/www/html/

# 3. Configure Nginx for React routing
sudo nano /etc/nginx/sites-available/default
```

**React routing configuration:**
```nginx
location / {
    try_files $uri /index.html;
}
```

---

## 3️⃣ Deploy to AWS EC2

### Backend Deployment

```bash
# 1. Launch EC2 Instance
# - Choose Ubuntu 20.04 LTS AMI
# - t2.micro for free tier
# - Create/select key pair
# - Allow HTTP/HTTPS inbound

# 2. Connect via SSH
ssh -i your_key.pem ubuntu@your_instance_ip

# 3. Update system
sudo apt update && sudo apt upgrade -y

# 4. Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# 5. Clone and setup
git clone your_repo
cd your_repo/backend
npm install

# 6. Create .env file
echo "MONGO_URI=mongodb+srv://..." > .env

# 7. Use PM2 for process management
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save

# 8. Install and configure Nginx
sudo apt install -y nginx
# [Same configuration as DigitalOcean above]

# 9. Setup SSL with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx
```

---

## 4️⃣ Environment Variables for Production

Create `.env.production` in backend:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory
# Add authentication
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=https://your-frontend-domain.com
```

---

## 5️⃣ Database Backups

### Automated MongoDB Backups

MongoDB Atlas provides:
- ✅ Automatic daily backups (2 week retention)
- ✅ Point-in-time recovery
- ✅ Manual snapshots

### Manual Backup

```bash
# Export MongoDB data
mongodump --uri "mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory" --out ./backup

# Restore from backup
mongorestore --uri "mongodb+srv://username:password@cluster0.mongodb.net/" ./backup
```

---

## 6️⃣ Monitoring & Logging

### Application Monitoring

```bash
# Install monitoring tools
npm install pm2-plus -g

# Monitor with PM2
pm2 web

# View at http://localhost:9615
```

### Log Management

```bash
# View PM2 logs
pm2 logs

# Save logs to file
pm2 logs > app.log

# Rotate logs
pm2 install pm2-logrotate
```

### Database Monitoring

MongoDB Atlas provides:
- Real-time metrics
- Query performance
- Storage monitoring
- Alerts

---

## 7️⃣ Performance Optimization

### Frontend Optimization

```bash
# Create optimized build
npm run build

# Check bundle size
npm install -g serve
serve -s build -p 3000
```

### Backend Optimization

```javascript
// server.js - Add compression
const compression = require('compression');
app.use(compression());

// Add caching
app.set('view cache', true);

// Connection pooling
// Mongoose handles automatically
```

### Database Optimization

```javascript
// Add indexes to frequently queried fields
const materialSchema = new Schema({
  name: { type: String, index: true },
  createdAt: { type: Date, index: true }
});
```

---

## 8️⃣ Security Checklist

- [ ] Remove debug mode from production
- [ ] Set secure CORS headers
- [ ] Use HTTPS/SSL certificate
- [ ] Implement authentication (JWT)
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Enable HSTS headers
- [ ] Regular security updates
- [ ] Database access restricted to app

---

## 9️⃣ CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Heroku
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      run: |
        git remote add heroku https://git.heroku.com/snacks-factory-backend.git
        git push heroku main
```

---

## 🔟 Troubleshooting Deployment

### Issue: Port Already in Use
```bash
# Find and kill process
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Issue: CORS Errors
```javascript
// Update server.js
const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  credentials: true
};
app.use(cors(corsOptions));
```

### Issue: MongoDB Connection Timeout
```
✓ Check MongoDB Atlas IP whitelist
✓ Verify network connectivity
✓ Test connection string
```

### Issue: High Memory Usage
```bash
# Monitor memory
pm2 monit

# Restart app
pm2 restart server
```

---

## 📊 Deployment Checklist

| Step | Task | Status |
|------|------|--------|
| 1 | Review code | ✓ |
| 2 | Run tests | ✓ |
| 3 | Create backups | ✓ |
| 4 | Set environment | ✓ |
| 5 | Deploy backend | ✓ |
| 6 | Deploy frontend | ✓ |
| 7 | Test endpoints | ✓ |
| 8 | Monitor logs | ✓ |
| 9 | Verify security | ✓ |
| 10 | Document changes | ✓ |

---

## 📚 Useful Deployment Resources

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Let's Encrypt](https://letsencrypt.org/)

---

## 🎯 Recommended Approach for Beginners

1. **Start with Heroku** - Simplest deployment
2. **Use MongoDB Atlas** - Already configured
3. **Add GitHub integration** - Auto-deploy on push
4. **Monitor with PM2** - Track performance
5. **Scale when needed** - Upgrade Heroku dyno

---

## ✅ Production Readiness

Before going live:
- ✓ All tests passing
- ✓ Environment variables secured
- ✓ Database backups enabled
- ✓ Monitoring set up
- ✓ Error logging configured
- ✓ SSL/HTTPS enabled
- ✓ Rate limiting implemented
- ✓ Documentation updated

---

**Ready to deploy? Choose your platform and follow the steps above! 🚀**

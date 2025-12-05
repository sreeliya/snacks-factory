# MongoDB Atlas Setup Instructions

## 🔧 Step-by-Step MongoDB Atlas Configuration

### 1. Create MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Fill in your details:
   - Email address
   - Password (strong password recommended)
   - Accept terms and conditions
4. Click "Create your Atlas account"
5. Verify your email address

### 2. Create a New Project

1. Click "New Project"
2. Enter project name: `Snacks Factory`
3. Click "Next"
4. Click "Create Project"

### 3. Create a Cluster

1. Click "Build a Database"
2. Choose **Free tier** (for development)
3. Select your preferred cloud provider (AWS, Google Cloud, Azure)
4. Choose a region close to you
5. Click "Create Cluster"
6. Wait for cluster to be created (usually 1-3 minutes)

### 4. Set Up Network Access

1. In the left sidebar, go to **Network Access**
2. Click "Add IP Address"
3. For development: Select "Allow access from anywhere"
   - Enter IP: `0.0.0.0/0`
   - Click "Confirm"
4. For production: Add your specific IP address only

### 5. Create Database User

1. In the left sidebar, go to **Database Access**
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `snacks_admin`
5. Password: Create a strong password (save this!)
6. Database User Privileges: `Atlas admin`
7. Click "Add User"

**Save Your Credentials:**
```
Username: snacks_admin
Password: [your_password_here]
```

### 6. Get Your Connection String

1. Click on your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Select **Node.js** and version **4.1 or later**
5. Copy the connection string

**Connection String Format:**
```
mongodb+srv://snacks_admin:<password>@cluster0.mongodb.net/snacks-factory?retryWrites=true&w=majority
```

Replace `<password>` with your actual password.

### 7. Update Backend .env File

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=mongodb+srv://snacks_admin:YOUR_PASSWORD@cluster0.mongodb.net/snacks-factory?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD` with your actual password**

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Project created
- [ ] Cluster created and running
- [ ] Network Access configured (0.0.0.0/0 for development)
- [ ] Database user created with credentials
- [ ] Connection string copied
- [ ] .env file created in backend with correct connection string
- [ ] Backend server started successfully
- [ ] Connected to MongoDB successfully (check backend logs)

---

## 🧪 Test Your Connection

Once you have set up MongoDB Atlas:

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Check for this message in the console:
   ```
   ✓ MongoDB connected: cluster0.mongodb.net
   ```

3. Test the API:
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"success":true,"message":"Server is running!"}
   ```

---

## 🔒 Security Best Practices

### For Development:
- IP: `0.0.0.0/0` (allow from anywhere)
- Keep credentials in `.env` file (never commit to git)

### For Production:
- IP: Restrict to your server's IP address only
- Use strong, unique passwords
- Enable IP whitelist only for trusted IPs
- Rotate credentials regularly
- Use environment variables from your hosting provider
- Enable authentication on application level

---

## 📊 Monitoring Your Cluster

1. **Check Database Size**
   - Go to your cluster
   - Click "Metrics"
   - View storage used

2. **View Logs**
   - Click "Logs" tab
   - Monitor for errors

3. **Set Up Alerts**
   - Go to "Alerts"
   - Configure notifications for disk space, connections, etc.

---

## 🆘 Troubleshooting

### Connection Timeout
- ✓ Verify IP whitelist includes your IP
- ✓ Check internet connection
- ✓ Verify connection string is correct

### Authentication Failed
- ✓ Check username and password match
- ✓ Verify special characters are URL encoded
- ✓ Check credentials in .env file

### Database Not Found
- ✓ Database is created automatically on first write
- ✓ Verify you're using correct database name in connection string

### Cannot Connect from Docker/Server
- ✓ Add server's IP to Network Access whitelist
- ✓ Use `0.0.0.0/0` for testing only (not recommended for production)

---

## 💾 Backup & Restore

### Automatic Backups
- MongoDB Atlas automatically backs up every 24 hours
- Snapshots stored for 2 weeks (free tier)

### Manual Backup
1. Go to your cluster
2. Click "Backup"
3. Click "Take Snapshot"

### Restore from Backup
1. Go to "Backup"
2. Click the snapshot you want to restore
3. Click "Restore"

---

## 📚 Useful MongoDB Atlas Links

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Connection Troubleshooting](https://docs.atlas.mongodb.com/troubleshoot-connection/)
- [Security Checklist](https://docs.atlas.mongodb.com/security-checklist/)
- [Atlas Free Tier](https://docs.atlas.mongodb.com/reference/free-shared-limitations/)

---

**Next Step:** Update your backend `.env` file and run the backend server!

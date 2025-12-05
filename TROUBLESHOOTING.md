# 🐛 Troubleshooting Guide

Common issues and solutions for the Snacks Factory Management System.

---

## 🔴 Common Issues & Solutions

### 1. MongoDB Connection Issues

#### Problem: "ECONNREFUSED - Connection refused"
```
Error: MongoDB connection failed
```

**Solutions:**
```
✓ Check if MongoDB Atlas cluster is running
  - Go to MongoDB Atlas → Clusters
  - Verify cluster status is "RUNNING"

✓ Verify connection string in .env file
  - Format: mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory
  - Replace username and password with actual credentials

✓ Check IP whitelist
  - MongoDB Atlas → Network Access
  - Ensure your IP is whitelisted (use 0.0.0.0/0 for development)

✓ Verify credentials
  - Database Access → Check username and password
  - Credentials must match exactly in .env file

✓ Check internet connection
  - MongoDB Atlas is cloud-based
  - Ensure you have active internet connection
```

#### Problem: "Authentication failed"
```
Error: unauthorized - authentication failed
```

**Solutions:**
```
✓ Verify username and password
✓ Check special characters in password
  - If password has @, encode it as %40
✓ Ensure user exists in MongoDB Atlas
✓ Check password is correct (case-sensitive)
```

#### Problem: "Connection timeout"
```
Error: connection timed out
```

**Solutions:**
```
✓ Check IP address whitelisting
✓ Try adding 0.0.0.0/0 for development
✓ Verify internet connection speed
✓ Check firewall settings
✓ Try using VPN if blocked
```

---

### 2. Backend Server Issues

#### Problem: "Port 5000 already in use"
```
Error: EADDRINUSE: address already in use :::5000
```

**Solutions (Windows PowerShell):**
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process (replace PID)
Stop-Process -Id <PID> -Force

# Or change port in backend/.env
# Change PORT=5000 to PORT=5001
```

**Solutions (Mac/Linux):**
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env file
PORT=5001
```

#### Problem: "Cannot find module 'express'"
```
Error: Cannot find module 'express'
```

**Solutions:**
```
✓ Install dependencies
  cd backend
  npm install

✓ Check package.json exists
✓ Delete node_modules and reinstall
  rm -rf node_modules
  npm install
```

#### Problem: "MONGO_URI is not defined"
```
Error: MONGO_URI is not defined
```

**Solutions:**
```
✓ Create .env file in backend folder
✓ Add MONGO_URI variable
  MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory
  
✓ Verify .env file location (should be in backend/ root)
✓ Restart backend server after creating .env
```

---

### 3. Frontend Issues

#### Problem: "Cannot GET /localhost:3000"
```
Error: Page not found
```

**Solutions:**
```
✓ Ensure frontend is running
  npm start in frontend folder

✓ Check correct URL
  Should be: http://localhost:3000 (not :3001 or other port)

✓ Check port 3000 is not in use
  - Change to different port if needed
  - Or kill process using port 3000
```

#### Problem: "Cannot connect to API"
```
Error: Network Error or 404
```

**Solutions:**
```
✓ Verify backend is running on port 5000
  - See http://localhost:5000/api/health

✓ Check browser console for errors (F12)
  - Look for CORS or network errors

✓ Verify API base URL in frontend/src/api/api.js
  - Should be: http://localhost:5000/api

✓ Check CORS is enabled in backend server.js
  - Should have: app.use(cors());
```

#### Problem: "Blank white page"
```
Error: React app shows blank page
```

**Solutions:**
```
✓ Clear browser cache (Ctrl+Shift+Delete)
✓ Restart development server
  npm start

✓ Check browser console for errors
  - Press F12 to open Developer Tools
  - Check Console tab for red errors

✓ Verify all components import correctly
✓ Check public/index.html exists
```

#### Problem: "Styling not loading (no colors)"
```
Error: CSS not applied
```

**Solutions:**
```
✓ Clear browser cache
✓ Verify index.css imports
  import './styles/index.css' in App.js

✓ Check styles/index.css file exists
✓ Restart React dev server
✓ Check for CSS errors in console
```

#### Problem: "Module not found" error
```
Error: Cannot find module './pages/Dashboard'
```

**Solutions:**
```
✓ Verify file path is correct
✓ Check file name capitalization matches import
✓ Delete node_modules and reinstall
  rm -rf node_modules && npm install

✓ Restart dev server
```

---

### 4. Form & Data Issues

#### Problem: "Form submission fails"
```
Error: Error submitting form (network error)
```

**Solutions:**
```
✓ Verify backend is running
✓ Check API endpoint URL is correct
✓ Verify required fields are filled
✓ Check for typos in field names
✓ Look at browser console Network tab for error details
✓ Check MongoDB Atlas has space for new data
```

#### Problem: "No data displays in tables"
```
Error: Tables appear empty even after adding items
```

**Solutions:**
```
✓ Add test data first
  - Click "Add Material" and fill form
  - Click "Add" button

✓ Check MongoDB connection
  - Verify MongoDB Atlas cluster is running

✓ Verify API is returning data
  - Test endpoint: http://localhost:5000/api/materials
  - Should show JSON array

✓ Check browser console for JavaScript errors
✓ Verify useEffect is fetching data
```

#### Problem: "Dropdown shows 'Select an item'"
```
Error: No items appear in dropdown
```

**Solutions:**
```
✓ Add items to inventory first
  - Go to Inventory page
  - Click "Add Item"

✓ For Orders page, items must exist in Inventory
  - Create inventory items before creating orders

✓ Check API returns items
  - Test: http://localhost:5000/api/inventory

✓ Verify useEffect fetches data on page load
```

---

### 5. CORS & Network Issues

#### Problem: "Access to XMLHttpRequest blocked by CORS policy"
```
Error: CORS error in browser console
```

**Solutions:**
```
✓ Verify CORS is enabled in backend/server.js
  Should have: const cors = require('cors');
              app.use(cors());

✓ Check frontend URL matches
  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000

✓ Add CORS headers
  const cors = require('cors');
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

✓ Restart backend after changes
```

#### Problem: "Network Error - Failed to fetch"
```
Error: Cannot reach backend
```

**Solutions:**
```
✓ Verify backend is running
  - Terminal should show: Server running on http://localhost:5000

✓ Check API URL in api.js
  - const API_BASE_URL = 'http://localhost:5000/api';

✓ Test endpoint manually
  - Visit http://localhost:5000/api/health in browser
  - Should show: {"success":true,"message":"Server is running!"}

✓ Check Windows Firewall (might block port 5000)
  - Add Node.js to firewall exceptions
  - Or disable firewall for testing
```

---

### 6. Database Operation Issues

#### Problem: "Insufficient stock"
```
Error: When creating order, shows "Insufficient stock"
```

**Solutions:**
```
✓ Add items to inventory first
  - Go to Inventory → Add Item

✓ Check inventory quantity is enough
  - Order quantity must be ≤ inventory quantity

✓ View current inventory
  - Check Inventory page to see available quantities

✓ Add more inventory
  - Click Edit and increase quantity
```

#### Problem: "Duplicate key error"
```
Error: E11000 duplicate key error
```

**Solutions:**
```
✓ SKU must be unique in Inventory
  - Don't use same SKU for multiple items
  - Leave SKU empty if not needed

✓ For re-adding item with same SKU
  - Delete existing item first
  - Then add new item with same SKU

✓ Clear MongoDB data if needed
  - Delete cluster and recreate
  - Or manually delete documents in MongoDB Atlas
```

#### Problem: "Field required error"
```
Error: Required field validation error
```

**Solutions:**
```
✓ Fill all required fields (marked with *)
  - Material Name is required
  - Quantity is required
  - Unit is required for materials

✓ Check field values are not empty
✓ Verify data types match schema
  - Quantity should be number
  - Name should be text
```

---

### 7. Performance Issues

#### Problem: "App is slow / lagging"
```
Error: App feels sluggish
```

**Solutions:**
```
✓ Clear browser cache
  - Ctrl+Shift+Delete (Windows)
  - Cmd+Shift+Delete (Mac)

✓ Close other browser tabs
✓ Restart development server
✓ Check internet connection speed
✓ Monitor MongoDB query performance
✓ Check browser console for warnings
```

#### Problem: "Large tables are slow"
```
Error: Pagination doesn't exist
```

**Solutions:**
```
✓ Limit initial data fetch
  - Add .limit(100) to MongoDB queries

✓ Implement pagination (future feature)
✓ Add search/filter functionality
✓ Optimize database indexes
```

---

### 8. Deployment Issues

#### Problem: "Heroku deployment fails"
```
Error: Push rejected
```

**Solutions:**
```
✓ Verify Heroku CLI is installed
✓ Login to Heroku: heroku login
✓ Create app: heroku create snacks-factory
✓ Add environment variables
  heroku config:set MONGO_URI=...

✓ Push to Heroku
  git push heroku main

✓ Check logs: heroku logs --tail
```

#### Problem: "Environment variables not set"
```
Error: App crashes on deployment
```

**Solutions:**
```
✓ Set variables in hosting platform
  - Heroku: heroku config:set VAR=value
  - DigitalOcean: Add to .env file
  - AWS: Use Secrets Manager

✓ Verify variables are accessible
✓ Restart app after setting variables
```

---

## 📊 Debugging Checklist

Before reaching out for help, verify:

- [ ] MongoDB Atlas cluster is running
- [ ] Connection string is correct in .env
- [ ] Both frontend and backend servers are running
- [ ] No errors in browser console (F12)
- [ ] No errors in backend terminal
- [ ] Port 3000 and 5000 are available
- [ ] Internet connection is active
- [ ] Firewall is not blocking ports
- [ ] All dependencies installed (npm install)
- [ ] .env file exists and has correct values

---

## 🔍 How to Debug

### 1. Frontend Debugging
```javascript
// Add console logs to see data flow
console.log('Materials:', materials);
console.log('Error:', error);
console.log('Loading:', loading);
```

### 2. Backend Debugging
```javascript
// Add logging to routes
router.get('/materials', (req, res) => {
  console.log('Fetching materials...');
  // ... rest of code
});
```

### 3. Network Debugging (Browser DevTools)
```
1. Press F12 to open DevTools
2. Go to "Network" tab
3. Perform an action
4. Click the request to see details
5. Check Status code (200 = success, 4xx = client error, 5xx = server error)
6. Check Response for error messages
```

### 4. MongoDB Debugging
```
1. Go to MongoDB Atlas
2. Click Cluster → Collections
3. View documents to verify data saved
4. Check for duplicate/invalid entries
```

---

## 📞 Getting Help

If you can't resolve the issue:

1. **Document the problem**
   - Screenshot of error
   - Exact error message
   - Steps to reproduce

2. **Check logs**
   - Browser console errors (F12)
   - Backend terminal output
   - MongoDB Atlas logs

3. **Search online**
   - Error message + "Node.js"
   - Error message + "MongoDB"
   - Error message + "React"

4. **Review documentation**
   - Check MONGODB_SETUP.md
   - Check README.md
   - Check API_TESTING.md

5. **Ask for help**
   - Include error message
   - Include what you've tried
   - Include system information

---

## 🛠 Useful Commands for Debugging

```bash
# Check if port is in use (Windows PowerShell)
Get-NetTCPConnection -LocalPort 5000

# Kill process on Windows
Stop-Process -Id <PID> -Force

# Check if services running
curl http://localhost:5000/api/health
curl http://localhost:3000

# View backend logs
npm logs

# Restart backend
npm start

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules && npm install
```

---

## ✅ Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Blank page | Clear cache, restart server |
| Can't connect API | Verify backend running, check CORS |
| MongoDB error | Check connection string, whitelist IP |
| Port in use | Change port or kill process |
| No data showing | Add test data, check API |
| Styling broken | Restart server, clear cache |
| Form doesn't submit | Check required fields, verify API |

---

## 📚 Resources for Help

- [Express.js Troubleshooting](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Support](https://docs.mongodb.com/support/)
- [Stack Overflow](https://stackoverflow.com/) - Tag: express, react, mongodb
- [GitHub Issues](https://github.com/) - Search for similar issues

---

**Remember: The error message is your best friend! 🔍 Always read it carefully.**

---

**Still stuck? Check the README.md and other documentation files for more detailed information.**

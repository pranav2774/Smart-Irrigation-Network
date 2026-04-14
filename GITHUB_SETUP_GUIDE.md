# GitHub Repository Setup & Sharing Guide

## Prerequisites

### 1. Install Git
Download and install from: https://git-scm.com/

Verify installation:
```bash
git --version
```

### 2. Create GitHub Account
- Go to https://github.com/join
- Sign up with your email
- Verify email address

### 3. Configure Git (First Time Only)
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

---

## Step-by-Step Guide: Push to GitHub

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name:
   - Example: `smart-irrigation-network` or `ADS-Mini-Project`
3. Add description (optional):
   - "Smart-Irrigation Network using AVL Tree, Max-Heap, and MST"
4. Choose visibility:
   - ✅ **Public** - Anyone can see (better for sharing)
   - ❌ **Private** - Only you and invited users can see
5. Click "Create repository"

**Result:** GitHub gives you a repository URL like:
```
https://github.com/YOUR_USERNAME/smart-irrigation-network.git
```

---

### Step 2: Initialize Local Repository

Navigate to your project folder:
```bash
cd d:\ADS\ADS MINI PROJECT
```

Initialize Git:
```bash
git init
```

This creates a `.git` folder (hidden) in your project.

---

### Step 3: Add Files to Git

Add all files:
```bash
git add .
```

Or add specific files:
```bash
git add *.html *.css *.js *.json *.md
```

Check status:
```bash
git status
```

You should see all files in green (staged for commit).

---

### Step 4: Create First Commit

```bash
git commit -m "Initial commit: Smart-Irrigation Network Dashboard"
```

Better commit message examples:
```bash
git commit -m "feat: Add AVL Tree and MST visualizations"
git commit -m "Initial: Smart-Irrigation system with frontend dashboard"
```

---

### Step 5: Add Remote Repository

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/smart-irrigation-network.git
```

Example:
```bash
git remote add origin https://github.com/john-doe/smart-irrigation-network.git
```

Verify:
```bash
git remote -v
```

Output should show:
```
origin  https://github.com/YOUR_USERNAME/smart-irrigation-network.git (fetch)
origin  https://github.com/YOUR_USERNAME/smart-irrigation-network.git (push)
```

---

### Step 6: Create Main/Master Branch

GitHub uses `main` as the default branch. Rename your branch:

```bash
git branch -M main
```

---

### Step 7: Push to GitHub

```bash
git push -u origin main
```

**First time:** It will ask for authentication:
- Username: Your GitHub username
- Password: Use Personal Access Token (not password)

**To create Personal Access Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Give it a name: "GitPush"
4. Select scopes: `repo` (full control of private repositories)
5. Generate and copy the token
6. Use this token as password when pushing

---

## Complete Terminal Commands Summary

```bash
# Navigate to project
cd d:\ADS\ADS MINI PROJECT

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Smart-Irrigation Network Dashboard"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/smart-irrigation-network.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Share Repository with Teammate

### Option 1: Share Repository Link
Share with your teammate:
```
https://github.com/YOUR_USERNAME/smart-irrigation-network
```

They can:
1. Open link in browser
2. Click "Code" → "Copy"
3. Clone repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-irrigation-network.git
   ```

### Option 2: Add Collaborator (Private Repo)
1. Go to repository settings
2. Click "Collaborators" (or "Access")
3. Click "Add people"
4. Enter teammate's GitHub username
5. Click "Add"

---

## Making Updates & Pushing Changes

### After Making Changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Update: Add visualization features"

# Push to GitHub
git push
```

### Common Commit Messages:
```bash
git commit -m "feat: Add AVL tree visualization"
git commit -m "fix: Handle edge cases in MST calculation"
git commit -m "docs: Update README with setup instructions"
git commit -m "refactor: Improve canvas drawing performance"
git commit -m "style: Improve UI responsiveness"
```

---

## Viewing Repository Online

Once pushed, your repository will be at:
```
https://github.com/YOUR_USERNAME/smart-irrigation-network
```

You'll see:
- All your files and folders
- Commit history
- README (if you have one)
- Number of stars/forks
- Contributors

---

## Create README.md for Better Documentation

Create file `README.md` in project root:

```markdown
# Smart-Irrigation Network Dashboard

Advanced Data Structures Mini Project using AVL Tree, Max-Heap, and Kruskal's MST Algorithm.

## Features
- 🌳 AVL Tree for sensor registry management
- 💧 Max-Heap for irrigation priority scheduling
- 🔗 Minimum Spanning Tree for optimal pipe network
- 🎨 Interactive visualizations
- 📊 Real-time dashboard

## Technologies
- HTML5, CSS3, Vanilla JavaScript (Frontend)
- Node.js, Express.js (Backend)
- Canvas API (Visualizations)

## Getting Started

### Installation
```bash
cd ADS-MINI-PROJECT
npm install
npm start
```

### Access
Open browser: `http://localhost:3000`

## Project Structure
- `index.html` - Main dashboard
- `style.css` - Styling
- `script.js` - Frontend logic with AVL Tree, Heap, MST
- `server.js` - Express server
- `package.json` - Dependencies

## Data Structures
- **AVL Tree**: Self-balancing sensor registry (O(log n))
- **Max-Heap**: Priority queue for irrigation (O(log n))
- **Graph MST**: Kruskal's algorithm for pipe optimization

## Edge Cases Handled
✅ Duplicate IDs ✅ Invalid input ✅ Empty data ✅ Disconnected network ✅ Single sensor ✅ Heap underflow

## Author
Your Name - ADS Mini Project

## License
MIT
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo.git
```

### Error: "Permission denied (publickey)"
- Use HTTPS instead of SSH
- Or setup SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Error: "Please tell me who you are"
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Changes not showing on GitHub
```bash
git add .
git commit -m "Update message"
git push
```

---

## Example: Complete Workflow

```bash
# Day 1: Initial setup
cd d:\ADS\ADS MINI PROJECT
git init
git add .
git commit -m "Initial: Smart-Irrigation Network Dashboard"
git remote add origin https://github.com/john-doe/smart-irrigation-network.git
git branch -M main
git push -u origin main

# Day 2: Make improvements
# ... edit files ...
git add .
git commit -m "feat: Add tree visualizations"
git push

# Day 3: Bug fixes
# ... fix issues ...
git add .
git commit -m "fix: Improve MST calculation accuracy"
git push

# Share with teammate
# Send link: https://github.com/john-doe/smart-irrigation-network
```

---

## GitHub Features to Use

### 1. Issues
- Track bugs and features
- Assign to team members
- Label as "bug", "feature", "help wanted"

### 2. Pull Requests
- For teammate to review code before merging
- Request changes
- Approve and merge

### 3. Wiki
- Document API
- Add setup guide
- Team notes

### 4. Projects/Boards
- Kanban board for tasks
- Track progress
- Organize work

---

## Sharing Best Practices

✅ **Do:**
- Add a good README
- Use meaningful commit messages
- Include `.gitignore` (already created)
- Document setup steps
- Keep repository clean

❌ **Don't:**
- Push `node_modules` (use .gitignore)
- Commit binary files
- Push personal passwords/tokens
- Ignore updates

---

## Quick Reference

### Initialize & Push
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <URL>
git branch -M main
git push -u origin main
```

### Daily Push
```bash
git add .
git commit -m "Your message"
git push
```

### Clone Teammate's Repo
```bash
git clone https://github.com/FRIEND_USERNAME/repository.git
cd repository
npm install
npm start
```

### View Repository Online
```
https://github.com/YOUR_USERNAME/smart-irrigation-network
```

---

## Support

- GitHub Docs: https://docs.github.com
- Git Cheat Sheet: https://git-scm.com/docs
- GitHub Help: https://github.com/contact

---

**Status:** Ready to Share! 🚀

Your project is now ready to push to GitHub and share with your teammate!

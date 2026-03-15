#!/bin/bash

# Web3 Jobs - GitHub Push + Vercel Deploy Script
# Run this from the web3-jobs directory

echo "🚀 Web3 Jobs Platform - Deploy to GitHub & Vercel"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📍 Step 1: Initializing Git..."
    git init
    git config user.name "Web3 Jobs"
    git config user.email "web3jobs@example.com"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo "📍 Step 2: Adding files to git..."
git add .

# Commit
echo "📍 Step 3: Creating commit..."
git commit -m "Web3 Jobs Education Platform - Initial release"

# Add remote
echo "📍 Step 4: Adding remote (you need to replace YOUR_USERNAME and REPO_NAME)"
echo ""
echo "IMPORTANT: Before proceeding, create a repository on GitHub:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named 'web3-jobs' (or your choice)"
echo "3. Do NOT initialize with README, .gitignore, or license"
echo "4. Copy the repository URL"
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/web3-jobs.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No repository URL provided. Exiting."
    exit 1
fi

git remote add origin "$REPO_URL"

# Push to GitHub
echo "📍 Step 5: Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📍 Step 6: Deploying to Vercel..."
    echo ""
    echo "Next steps for Vercel deployment:"
    echo "1. Go to https://vercel.com"
    echo "2. Sign in or create account (use GitHub)"
    echo "3. Click 'Import Project'"
    echo "4. Select the 'web3-jobs' repository"
    echo "5. Click 'Deploy'"
    echo ""
    echo "✨ Your site will be live at a URL like: https://web3-jobs.vercel.app"
    echo ""
else
    echo "❌ Failed to push to GitHub. Check your credentials and try again."
    exit 1
fi

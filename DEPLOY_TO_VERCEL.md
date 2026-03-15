# 🚀 Deploy to Vercel - Step by Step

Your web3-jobs website is ready to deploy! Follow these steps to get it live in seconds.

---

## Option 1: Deploy via GitHub (Recommended - Continuous Updates)

### Step 1: Push to GitHub

```bash
cd /root/.openclaw/workspace/web3-jobs

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: web3 jobs education platform"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/web3-jobs.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up/login
2. Click **"New Project"** or **"Import Project"**
3. Choose **"Import Git Repository"**
4. Select your GitHub repo: `web3-jobs`
5. Click **"Import"**

### Step 3: Configure (Optional)

- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./web3-jobs` (if in subdirectory)
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment:** All defaults are fine

### Step 4: Deploy

Click **"Deploy"** - your site will be live in 30-60 seconds!

**Your Live URL:** `https://web3-jobs.vercel.app` (or custom domain)

---

## Option 2: Deploy via Vercel CLI (Fastest - 2 Minutes)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

You'll be redirected to Vercel in your browser to authenticate.

### Step 3: Deploy

```bash
cd /root/.openclaw/workspace/web3-jobs
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → Your account
- **Link to existing project?** → `N` (unless you already have one)
- **Project name?** → `web3-jobs`
- **Directory?** → `./` (current directory)

### Step 4: Done!

Your site is live! Vercel will give you the URL. Example:
```
✅ Production: https://web3-jobs.vercel.app
```

---

## Option 3: Deploy via Git Push (CI/CD)

If you've connected GitHub to Vercel, just push to main:

```bash
git push origin main
```

Vercel automatically detects the push and deploys! 🎉

---

## Verify Deployment

Once deployed, check that all pages work:

- ✅ Homepage: `https://web3-jobs.vercel.app/`
- ✅ Roles: `https://web3-jobs.vercel.app/roles`
- ✅ Smart Contract Dev: `https://web3-jobs.vercel.app/roles/smart-contract-developer`
- ✅ Bridge: `https://web3-jobs.vercel.app/bridge`
- ✅ Glossary: `https://web3-jobs.vercel.app/glossary`
- ✅ Resources: `https://web3-jobs.vercel.app/resources`
- ✅ FAQ: `https://web3-jobs.vercel.app/faq`

---

## Use Custom Domain

### On Vercel Dashboard:
1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `web3jobs.com`)
3. Follow DNS instructions from your registrar

### Example:
```
web3jobs.com → https://web3-jobs.vercel.app
```

---

## Update Content After Deployment

### Quick Updates (Edit JSON):

Your data files are in the project - just edit and push:

```bash
# Edit role data
nano public/data/roles.json

# Commit and push
git add .
git commit -m "Add new role"
git push origin main
```

Vercel automatically redeploys! ✅

---

## Monitor Deployment

**On Vercel Dashboard:**
- View logs in real-time
- Check build status
- Monitor analytics
- Manage environment variables

---

## Troubleshooting

### Deploy Failed?

**Check build logs:**
1. Go to vercel.com
2. Select your project
3. Click the failed deployment
4. Check the "Build" tab for errors

**Common issues:**
- TypeScript errors → Run `npm run build` locally first
- Missing env vars → Set in Project Settings → Environment Variables
- Port issues → Not applicable for Next.js on Vercel

### Site looks different after deploy?

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache: DevTools → Application → Clear Storage
3. Wait 1-2 minutes for CDN to update

---

## After Deployment

### Share Your Site

```
🚀 I just launched my web3 jobs education platform!

Check it out: https://web3-jobs.vercel.app

Learn about smart contract developers, frontend engineers, researchers, 
designers, community managers, and more. 

All roles include compensation, interview questions, and where to find jobs.
```

**Share on:**
- Twitter/X: Tag @vercel, @nextjs
- Discord: Web3/crypto communities
- LinkedIn: Tech/crypto networks
- Email: Job boards, protocols

---

## Scaling Up (Future)

### Add More Features:
- ✅ Newsletter signup (Mailchimp, Substack)
- ✅ Job board integration (API calls)
- ✅ Analytics (Vercel Analytics or Posthog)
- ✅ Comments (Disqus or custom)
- ✅ Search (Algolia)

### Monetize:
- ✅ Job listings (premium)
- ✅ Sponsored roles
- ✅ Affiliate links (job boards)
- ✅ Ads (if you want)

---

## Keep It Updated

### Every Week:
- Add new roles to `/public/data/roles.json`
- Update resources
- Add FAQ answers

### Changes are instant:
```bash
git add .
git commit -m "Update roles"
git push origin main
# Deployed in 30 seconds!
```

---

## Support

**Vercel Docs:** https://vercel.com/docs  
**Next.js Docs:** https://nextjs.org/docs  
**Project README:** See `README_SETUP.md` in the project

---

## Summary

| Method | Time | Effort |
|--------|------|--------|
| GitHub + Vercel | 5 min | Easy |
| Vercel CLI | 2 min | Medium |
| Git Push | 1 min | Easy |

**Recommendation:** Use Option 1 (GitHub) for automatic updates every time you push.

---

**Pick your method above and get your site live! 🎉**

Questions? Check the Vercel dashboard or run `vercel --help` locally.

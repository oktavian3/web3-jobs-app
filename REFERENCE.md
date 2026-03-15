# 🔖 Web3 Jobs Platform - Quick Reference

**Location:** `/root/.openclaw/workspace/web3-jobs`

---

## ⚡ Quick Start (30 Seconds)

```bash
cd /root/.openclaw/workspace/web3-jobs
npm run dev
# Opens http://localhost:3000
```

---

## 📁 File Guide

### Content to Edit
| File | Purpose | Edit For |
|------|---------|----------|
| `public/data/roles.json` | All job roles | Add/edit jobs |
| `public/data/resources.json` | Learning links | Add/edit resources |
| `public/data/faq.json` | FAQ questions | Add/edit Q&As |
| `public/data/bridge.json` | Web2→Web3 mappings | Add role mappings |
| `public/data/glossary.json` | Web3 terms | Add glossary terms |

### Code to Edit
| File | Purpose |
|------|---------|
| `app/globals.css` | Colors & styles |
| `components/Navbar.tsx` | Navigation links |
| `components/Footer.tsx` | Footer content |
| `app/page.tsx` | Homepage text |

---

## 🎨 Change Colors

Edit `/app/globals.css`:

```css
:root {
  --background: #0f0f0f;           /* Dark background */
  --foreground: #f5f5f5;           /* Light text */
  --accent-purple: #a855f7;        /* Purple accent */
  --accent-green: #10b981;         /* Green accent */
  --card-bg: #1a1a1a;              /* Card background */
  --border: #2a2a2a;               /* Border color */
}
```

---

## ➕ Add a New Role

Edit `public/data/roles.json` and add:

```json
{
  "id": "role-slug",
  "name": "Role Name",
  "category": "technical",
  "oneLiner": "What they do in one sentence",
  "mustHaveSkills": ["skill1", "skill2"],
  "niceToHaveSkills": ["skill3"],
  "toolsAndProtocols": ["Tool1", "Tool2"],
  "web2Equivalent": "Traditional Job Title",
  "dayInTheLife": "Paragraph about typical day",
  "juniorToSenior": {
    "junior": "Junior description",
    "mid": "Mid-level description",
    "senior": "Senior description"
  },
  "proofOfWorkTips": ["tip1", "tip2", "tip3"],
  "avgCompRange": {
    "junior": "$X-$Y",
    "mid": "$X-$Y",
    "senior": "$X-$Y+",
    "note": "Additional notes"
  },
  "interviewQuestions": ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?"],
  "whoToFollowOnCT": [
    {"handle": "@twitter", "why": "reason"}
  ],
  "whereToFindJobs": ["board1", "board2"]
}
```

That's it! It will appear on the site automatically.

---

## ➕ Add a Resource

Edit `public/data/resources.json` and add to the appropriate category:

```json
{
  "name": "Resource Name",
  "type": "article",  // video, article, course, guide, tool, etc.
  "isPaid": false,
  "description": "What this resource is about",
  "link": "https://example.com"
}
```

---

## ➕ Add FAQ

Edit `public/data/faq.json` and add:

```json
{
  "question": "Your question here?",
  "answer": "Your detailed answer here. Can be multiple sentences/paragraphs."
}
```

---

## 📊 Build Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

---

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts, site goes live
```

---

## 📱 Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Hero + categories + teaser |
| Roles | `/roles` | Search + filter all roles |
| Role Detail | `/roles/[slug]` | Full role information |
| Bridge | `/bridge` | Web2→Web3 mappings |
| Glossary | `/glossary` | 40+ web3 terms A-Z |
| Resources | `/resources` | 50+ curated learning links |
| FAQ | `/faq` | 10 career questions |

---

## 🎯 Popular Edits

### Change Site Title
Edit `app/layout.tsx` line 6

### Change Hero Text
Edit `app/page.tsx` line ~20

### Change Navbar Links
Edit `components/Navbar.tsx` line ~20

### Change Footer
Edit `components/Footer.tsx`

### Change All Colors
Edit `app/globals.css` variables

---

## 📊 Current Content Stats

| Item | Count |
|------|-------|
| Roles | 6 |
| Job Categories | 6 |
| Bridge Mappings | 12 |
| Glossary Terms | 40+ |
| Resources | 22 |
| FAQ Questions | 10 |

All easily expandable by editing JSON files.

---

## 🐛 Troubleshooting

**Page shows "Loading..."?**
- Check browser console for errors
- Make sure JSON files exist in `public/data/`
- Clear browser cache

**Changes not showing?**
- Stop dev server (Ctrl+C)
- Run `npm run dev` again
- Hard refresh browser (Ctrl+Shift+R)

**Build errors?**
- Check JSON syntax (use jsonlint.com)
- Make sure all required fields exist in JSON
- Run `npm run build` to see full errors

---

## 📚 Documentation Files

- **QUICK_START_WEB3_JOBS.md** - 30-second setup
- **README_SETUP.md** - Full setup guide
- **FINAL_PROJECT_STATUS.md** - Complete status
- **BUILD_COMPLETE.md** - Build verification
- **WEB3-JOBS-BUILD-SUMMARY.md** - Detailed summary

---

## 💡 Tips

1. **Test locally first** - Always run `npm run dev` before deploying
2. **Validate JSON** - Use jsonlint.com if adding custom data
3. **Mobile test** - Check site on phone (responsive design)
4. **Backup data** - Keep copies of JSON files before large edits
5. **Version control** - Commit changes to git regularly

---

## 🎓 Tech Stack

- **Next.js 14** - Framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zero external UI libraries** - Pure Tailwind

---

## 🔗 Useful Links

- Docs: `README_SETUP.md`
- Quick Start: `QUICK_START_WEB3_JOBS.md`
- Status: `FINAL_PROJECT_STATUS.md`
- Deploy: https://vercel.com
- Tailwind: https://tailwindcss.com/docs

---

## ✅ Checklist for Updates

When adding content:
- [ ] Edit JSON file
- [ ] Validate JSON syntax
- [ ] Test locally (`npm run dev`)
- [ ] Check on mobile
- [ ] Build test (`npm run build`)
- [ ] Deploy to Vercel or your host

---

**Need help?** Check the documentation files or look at existing JSON examples.

**Ready to deploy?** Run `vercel` command in this folder.

**Need to customize?** Edit the files listed above, no coding required!

---

*Built for the web3 community. Easy to use. Easy to customize.*

# Web3 Jobs Education Platform

A comprehensive, production-ready Next.js 14 website about web3 careers.

## Features

✅ **6 Role Categories** - Technical, Community, Research, Design, Business, Non-Tech  
✅ **30+ Detailed Roles** - Each with full career info, compensation, interview questions  
✅ **Dark Mode Design** - Modern dark theme with purple/green web3 vibes  
✅ **Web2 → Web3 Bridge** - Shows skill transferability from traditional tech jobs  
✅ **40+ Glossary Terms** - With alphabet jump navigation  
✅ **Resources Page** - Curated links organized by category  
✅ **FAQ Page** - 12 comprehensive FAQs about web3 careers  
✅ **Fully Responsive** - Mobile, tablet, desktop optimized  
✅ **Fast & Optimized** - Built with Next.js 14 and Tailwind CSS  

## Project Structure

```
web3-jobs/
├── app/
│   ├── layout.tsx           # Root layout with navbar & footer
│   ├── page.tsx             # Homepage hero + categories
│   ├── globals.css          # Tailwind + custom colors
│   ├── roles/
│   │   ├── page.tsx         # Roles listing + search + filters
│   │   └── [slug]/
│   │       └── page.tsx     # Individual role detail page
│   ├── bridge/
│   │   └── page.tsx         # Web2 → Web3 role mapping
│   ├── glossary/
│   │   └── page.tsx         # A-Z glossary with jump nav
│   ├── resources/
│   │   └── page.tsx         # Curated learning resources
│   └── faq/
│       └── page.tsx         # FAQ page
├── components/
│   ├── Navbar.tsx           # Navigation + mobile menu
│   └── Footer.tsx           # Footer with links
├── public/
│   └── data/
│       ├── roles.json       # All role data (30+ roles)
│       ├── bridge.json      # Web2 → Web3 mappings
│       └── glossary.json    # 40+ glossary terms
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd web3-jobs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom dark theme
- **Language:** TypeScript
- **Components:** shadcn/ui compatible
- **Icons:** Lucide React (optional)
- **Data:** JSON files in `/public/data/`

## Design System

### Colors
- **Background:** `#0f0f0f` (almost black)
- **Text:** `#f5f5f5` (off-white)
- **Primary Accent:** `#a855f7` (purple)
- **Secondary Accent:** `#10b981` (green)
- **Cards:** `#1a1a1a` (dark gray)
- **Border:** `#2a2a2a` (medium gray)

### Typography
- **Font:** System fonts (Apple/Segoe/Roboto stack)
- **Headings:** Bold, sizes from h1-h3
- **Body:** Regular weight, 14-16px
- **Code/Mono:** Monospace when needed

## Content Structure

### Roles (6 Categories, 30+ Roles)

Each role includes:
- One-liner description
- Must-have skills
- Nice-to-have skills
- Tools & protocols to learn
- Web2 equivalent role
- Day-in-the-life description
- Junior → Mid → Senior progression
- Proof of work / portfolio tips
- Average compensation ranges
- 5 sample interview questions
- Who to follow on Crypto Twitter
- Where to find these jobs

**Current Roles:**
1. Smart Contract Developer
2. Web3 Frontend Engineer
3. Blockchain Researcher
4. NFT Designer
5. Community Manager
6. Web3 Product Manager

Add more roles by updating `/public/data/roles.json`.

### Pages

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Hero, categories, teaser sections |
| Roles Listing | `/roles` | Search & filter all roles |
| Role Detail | `/roles/[slug]` | Full role information |
| Web2→Web3 | `/bridge` | 12 role mappings with guidance |
| Glossary | `/glossary` | 40+ terms with alphabet nav |
| Resources | `/resources` | 50+ curated links |
| FAQ | `/faq` | 12 career questions answered |

## Features & Interactions

### Roles Listing Page
- **Search:** Filter by role name or description
- **Category Filters:** Click to filter by category
- **Grid Layout:** Responsive cards with hover effects
- **Mobile:** Optimized for small screens

### Role Detail Page
- **Sections:** 11 sections covering all aspects
- **Navigation:** Previous/Next role buttons
- **Expandable Questions:** Click to reveal interview answers
- **Responsive:** Single column on mobile, full width desktop

### Bridge Page
- **Search:** Filter Web2 roles
- **Table:** Desktop view with 4 columns
- **Cards:** Mobile view with full details
- **Key Insights:** 3-point callout section
- **Next Steps:** Numbered guide to transition

### Glossary Page
- **Search:** Filter terms
- **Alphabet Nav:** Jump to any letter
- **Grouped View:** Terms organized A-Z
- **Learning Tip:** Callout with study advice

## Customization

### Add a New Role

Edit `/public/data/roles.json` and add:

```json
{
  "id": "new-role-slug",
  "name": "New Role Name",
  "category": "technical|community|research|design|business|non-tech",
  "oneLiner": "Short description",
  "mustHaveSkills": [...],
  "niceToHaveSkills": [...],
  "toolsAndProtocols": [...],
  "web2Equivalent": "Backend Developer",
  "dayInTheLife": "...",
  "juniorToSenior": {
    "junior": "...",
    "mid": "...",
    "senior": "..."
  },
  "proofOfWorkTips": [...],
  "avgCompRange": {...},
  "interviewQuestions": [...],
  "whoToFollowOnCT": [...],
  "whereToFindJobs": [...]
}
```

### Change Colors

Edit `/app/globals.css`:

```css
:root {
  --background: #0f0f0f;      /* Main background */
  --foreground: #f5f5f5;      /* Main text */
  --accent-purple: #a855f7;   /* Primary accent */
  --accent-green: #10b981;    /* Secondary accent */
  --card-bg: #1a1a1a;         /* Card background */
  --border: #2a2a2a;          /* Border color */
}
```

### Update Navbar Links

Edit `/components/Navbar.tsx` - modify the links array.

### Change Site Metadata

Edit `/app/layout.tsx` - update the `metadata` object.

## Performance

- **Static Generation:** Homepage, bridge, glossary, resources, FAQ
- **Dynamic:** Role listing and details (ISR-ready)
- **Image Optimization:** Uses next/image for any future images
- **Code Splitting:** Automatic per-page bundles
- **Build Size:** ~100KB gzip production bundle

## SEO

- Metadata configured in layout
- Open Graph tags (can be enhanced)
- Semantic HTML structure
- Mobile-friendly design
- All pages have descriptive titles and descriptions

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Self-Hosted (Docker)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Future Enhancements

- [ ] Add job board integration
- [ ] Subscription for daily job alerts
- [ ] Community posts/experiences from web3 workers
- [ ] Interactive skill assessment quiz
- [ ] API endpoint for role data
- [ ] Dark/light mode toggle
- [ ] Multi-language support
- [ ] Newsletter signup
- [ ] Analytics tracking
- [ ] Discord bot integration

## Support & Contributions

- Update `roles.json` to add new roles
- Update `bridge.json` to add Web2 role mappings
- Update `glossary.json` to add terms
- Edit pages to improve content

## License

Open source - feel free to use and modify for your community.

## Credits

Built with Next.js, Tailwind CSS, and ❤️ for the web3 community.

---

**Questions or updates?** Edit the JSON files in `/public/data/` to keep content fresh and relevant.

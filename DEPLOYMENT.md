# Deployment Guide

## Quick Deploy to Vercel (Free & Easy)

### Method 1: Using Git & GitHub (Recommended)

1. **Create GitHub Account**
   - Go to https://github.com/signup
   - Create account and verify email

2. **Upload Code to GitHub**
   - Go to https://github.com/new
   - Create repository named `phone-cover-app`
   - Follow instructions to push code to GitHub

3. **Deploy with Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Get live URL! 🎉

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow prompts and get live URL
```

### Method 3: Netlify (Alternative)

1. **Create Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Deploy**
   - Click "Add new site"
   - Select your GitHub repo
   - Auto-deploys on every update

## Environment

- Node.js 18+
- npm or yarn

## Build Command

```bash
npm run build
```

## Start Command

```bash
npm start
```

## Important Files for Deployment

- ✅ `package.json` - Dependencies
- ✅ `src/App.jsx` - Main component
- ✅ `public/index.html` - HTML template
- ✅ `.gitignore` - Ignore node_modules

## After Deployment

Your app will be live at:
- Vercel: `https://phone-cover-app-xxx.vercel.app`
- Netlify: `https://phone-cover-app-xxx.netlify.app`

Share this URL with anyone to use your app!

## Custom Domain (Optional)

After deployment, you can add your custom domain:
- Vercel: Settings → Domains
- Netlify: Domain management

## Troubleshooting

**Build fails?**
- Check `package.json` has all dependencies
- Ensure `src/App.jsx` exists
- Check for syntax errors

**Dependencies missing?**
- Run `npm install` before deploying
- Check all imports exist

**App runs slow?**
- Optimize images
- Use production build: `npm run build`

# SE Repairs - Production Deployment Guide

This guide walks you through deploying the SE Repairs application to production using free hosting services.

## Prerequisites

- GitHub account
- Vercel account (free)
- Domain name (optional)

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository

```bash
cd se-repairs
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `se-repairs` (or your preferred name)
3. Don't initialize with README (we already have code)
4. Copy the repository URL

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/yourusername/se-repairs.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select the `se-repairs` directory
6. Framework: Next.js (auto-detected)

### 2.2 Configure Environment Variables

In Vercel dashboard, go to Settings > Environment Variables:

1. **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`
2. **NEXTAUTH_URL**: Will be `https://your-app.vercel.app` (set after deployment)

### 2.3 Add Database (Vercel Postgres)

1. In Vercel dashboard, go to Storage
2. Click "Create Database" > "Postgres"
3. Name: `se-repairs-db`
4. Region: Choose closest to your users
5. The `DATABASE_URL` will be automatically added

### 2.4 Add File Storage (Vercel Blob)

1. In Vercel dashboard, go to Storage
2. Click "Create Database" > "Blob"
3. Name: `se-repairs-files`
4. The `BLOB_READ_WRITE_TOKEN` will be automatically added

### 2.5 Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (5-10 minutes)
3. Note your app URL: `https://your-app.vercel.app`

### 2.6 Update Environment Variables

1. Go to Settings > Environment Variables
2. Update `NEXTAUTH_URL` to your actual Vercel URL
3. Redeploy to apply changes

## Step 3: Post-Deployment Setup

### 3.1 Run Database Migrations

The database will be automatically migrated on first deployment. If you need to run seeds manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Run seed script
vercel env pull .env.local
npx prisma db seed
```

### 3.2 Test Your Application

1. Visit your Vercel URL
2. Test report submission
3. Test file uploads
4. Test authentication
5. Test all features

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to Settings > Domains
2. Add your domain (e.g., `se-repairs.com`)
3. Follow DNS configuration instructions

### 4.2 Update Environment Variables

1. Update `NEXTAUTH_URL` to your custom domain
2. Redeploy

## Monitoring & Maintenance

### Usage Limits (Free Tier)

- **Vercel**: 100GB bandwidth/month
- **Postgres**: 256MB storage, 60 hours compute/month
- **Blob**: 500GB bandwidth/month

### Updates

1. Push changes to GitHub main branch
2. Vercel automatically deploys
3. Zero-downtime deployments

### Backups

- Export data regularly using `/api/export/csv`
- Vercel Postgres includes 7-day point-in-time recovery

## Troubleshooting

### Common Issues

1. **Build Fails**: Check environment variables are set
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **File Uploads**: Ensure `BLOB_READ_WRITE_TOKEN` is set
4. **Authentication**: Check `NEXTAUTH_URL` matches your domain

### Getting Help

- Check Vercel logs in dashboard
- Review build logs for errors
- Test locally with production environment variables

## Cost Summary

- **Monthly Cost**: $0 (free tier)
- **Domain**: $10-15/year (optional)
- **Total**: $0-1.25/month

## Security Notes

- All environment variables are encrypted
- Database is isolated and secure
- File uploads are stored securely in Vercel Blob
- HTTPS is enabled by default

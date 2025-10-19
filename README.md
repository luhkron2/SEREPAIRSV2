# SE Repairs - Fleet Management System

A modern, full-stack fleet repair management system built with Next.js, Prisma, and PostgreSQL.

## Features

- **Driver Portal**: Report issues with auto-fill, offline support, and file uploads
- **Workshop Dashboard**: Kanban board for work order management
- **Operations Center**: Comprehensive issue tracking and reporting
- **Scheduling**: Calendar-based work order scheduling
- **Admin Panel**: Fleet and driver data management
- **Real-time Updates**: Live status updates and notifications
- **Export Capabilities**: CSV and PDF report generation

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: NextAuth.js
- **File Storage**: Vercel Blob (production), Local (development)
- **UI Components**: Radix UI, shadcn/ui
- **Deployment**: Vercel

## Quick Start

### Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd se-repairs
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your database URL
   ```

3. **Database Setup**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000
   - Test accounts available (see DEPLOYMENT.md)

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete production deployment guide using Vercel.

## Project Structure

```
se-repairs/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin pages
│   │   ├── issues/         # Issue detail pages
│   │   ├── login/          # Authentication
│   │   ├── operations/     # Operations dashboard
│   │   ├── report/         # Issue reporting
│   │   ├── schedule/       # Calendar scheduling
│   │   ├── thanks/         # Confirmation pages
│   │   └── workshop/       # Workshop dashboard
│   ├── components/         # React components
│   │   └── ui/            # shadcn/ui components
│   └── lib/               # Utility libraries
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── docs/                  # Documentation
```

## Key Features

### For Drivers
- Simple issue reporting form
- Auto-fill from fleet data
- Offline support with sync
- Photo/video uploads
- Real-time status updates

### For Workshop Staff
- Kanban board workflow
- Drag-and-drop scheduling
- Issue prioritization
- Work order management
- Time tracking

### For Operations
- Comprehensive reporting
- Data export (CSV/PDF)
- Analytics dashboard
- Fleet management
- Driver management

## Database Schema

- **Users**: Authentication and role management
- **Issues**: Core issue tracking
- **WorkOrders**: Scheduled repairs
- **Comments**: Issue communication
- **Media**: File attachments
- **Mappings**: Fleet and driver data

## API Endpoints

- `GET/POST /api/issues` - Issue management
- `GET/PATCH /api/issues/[id]` - Issue details
- `POST /api/issues/[id]/comment` - Add comments
- `POST /api/upload` - File uploads
- `GET/POST /api/mappings` - Fleet data
- `GET/POST /api/workorders` - Work orders
- `GET /api/export/csv` - Data export

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-app.vercel.app"

# File Storage (Production)
BLOB_READ_WRITE_TOKEN="your-token"
```

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Private - All rights reserved

## Support

For technical support or questions, contact the development team.# se-repairs

# ProductHub Management System

A professional desktop-only Product Inventory Management System built with **React + Vite** and dark mode design.

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

## Features

- 📦 Product Management (CRUD operations)
- 🚚 Supplier Management
- 💰 Transaction/Selling System
- 📊 Interactive Charts & Statistics
- 🔍 Search & Filter functionality
- 🎨 Dark mode design
- ⚡ Fast Vite development experience
- 🎭 Smooth Framer Motion animations

## Prerequisites

- Node.js 18+ and npm/pnpm
- A PHP backend (see PHP_BACKEND_GUIDE.md)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure API Endpoint

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost/your-php-api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/           # Page components (Dashboard, Products, Suppliers, Selling, Settings)
├── layouts/         # Layout components (DashboardLayout)
├── components/      # Reusable UI components
│   └── ui/         # shadcn/ui components
├── lib/            # Utility functions
├── App.tsx         # Main app with routing
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Environment Variables

- `VITE_API_URL` - Your PHP backend API URL (required for production)

## Backend Integration

This frontend requires a PHP backend. See **[PHP_BACKEND_GUIDE.md](./PHP_BACKEND_GUIDE.md)** for detailed instructions on setting up the API endpoints.

## Features Breakdown

### Dashboard
- Overview statistics cards
- Revenue trend chart
- Recent activity feed

### Products
- Product listing with search
- Add/Edit/Delete products
- Stock management
- Category distribution chart
- Stock trend visualization

### Suppliers
- Supplier management
- Contact information
- Performance tracking charts
- Order distribution analytics

### Selling
- Transaction processing form
- Real-time total calculation
- Transaction history table
- Revenue statistics

### Settings
- Application configuration
- User preferences

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

Requires modern browsers with ES6+ support. Minimum screen width: 1024px (desktop only).

## License

Private - All rights reserved

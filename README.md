# 🏨 Hotel Booking System - Frontend

A modern, full-featured hotel booking platform built with Next.js 16, React 19, and TypeScript. This application provides a comprehensive solution for hotel management, bookings, reviews, and loyalty programs with role-based access control.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Key Features by Role](#-key-features-by-role)
- [API Integration](#-api-integration)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Core Components](#-core-components)
- [State Management](#-state-management)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality

- **Hotel Search & Discovery**: Advanced search with filters (city, price, amenities, dates)
- **Real-time Availability**: Calendar-based room availability checking
- **Booking Management**: Complete booking lifecycle from creation to cancellation
- **Review System**: Customer reviews with seller responses
- **Loyalty Program**: Points accumulation and redemption system
- **Discount Codes**: Promotional codes with validation
- **Image Management**: Multi-image upload with Cloudinary integration
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 👥 Multi-Role Support

- **Customer Portal**: Browse, book, and review hotels
- **Seller Dashboard**: Hotel and room management with analytics
- **Admin Panel**: System-wide statistics and user management

## 🛠 Tech Stack

### Frontend Framework

- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Component variants

### Form & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation integration

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Maps & Location

- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[React Leaflet](https://react-leaflet.js.org/)** - React components for Leaflet

### Date Handling

- **[date-fns](https://date-fns.org/)** - Date utility library
- **[React DatePicker](https://reactdatepicker.com/)** - Date selection component

## 🚀 Getting Started

### Backend Reference

- **Backend repository:** [Ahmed1092002/booking](https://github.com/Ahmed1092002/booking)
- **Swagger UI:** [https://booking-kpm1.onrender.com/swagger-ui/index.html](https://booking-kpm1.onrender.com/swagger-ui/index.html)

### Prerequisites

- Node.js 20+ or higher
- npm, yarn, pnpm, or bun
- Backend API running (default: `http://localhost:8080`)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd booking_front
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
booking_front/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes (no auth required)
│   │   ├── hotels/              # Hotel listing and details
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── (customer)/              # Customer-only routes
│   │   └── bookings/            # Booking management
│   ├── seller/                  # Seller dashboard and management
│   │   ├── dashboard/           # Seller statistics
│   │   ├── hotels/              # Hotel CRUD operations
│   │   └── rooms/               # Room management
│   ├── admin/                   # Admin panel
│   │   ├── dashboard/           # System statistics
│   │   ├── users/               # User management
│   │   ├── discounts/           # Discount code management
│   │   └── audit-logs/          # System audit logs
│   ├── loyalty/                 # Loyalty points management
│   ├── my-reviews/              # User's reviews
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── booking/                 # Booking-related components
│   ├── hotel/                   # Hotel display components
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── review/                  # Review components
│   └── ui/                      # Reusable UI components (shadcn/ui)
├── actions/                     # Server actions
│   └── hotels.ts                # Hotel-related server actions
├── lib/                         # Utility functions
├── stores/                      # Zustand stores
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Centralized type definitions
├── hooks/                       # Custom React hooks
├── middleware.ts                # Next.js middleware (auth, routing)
└── public/                      # Static assets
```

## 👤 User Roles & Permissions

### 🛍️ ROLE_CUSTOMER (Default)

All registered users start with customer role:

- Search and browse hotels
- Create and manage bookings
- Write and edit reviews
- Earn and redeem loyalty points
- View booking history

### 🏪 ROLE_SELLER

Sellers have all customer permissions plus:

- Create and manage hotels
- Add and configure rooms
- Upload hotel and room images
- Block dates for maintenance
- Set seasonal pricing
- Respond to customer reviews
- View seller dashboard with analytics
- Track revenue and bookings

### 👑 ROLE_ADMIN

Administrators have full system access:

- All customer and seller permissions
- Create and manage discount codes
- View system-wide statistics
- Manage all users
- Access audit logs
- Monitor platform activity

## 🎯 Key Features by Role

### Customer Features

- **Hotel Search**: Filter by city, price range, amenities, and availability
- **Advanced Booking**:
  - Date selection with availability checking
  - Apply discount codes
  - Redeem loyalty points
  - View total price breakdown
- **Review System**: Rate hotels and write detailed reviews
- **Loyalty Program**:
  - Earn points on bookings (5% of booking value)
  - Redeem points for discounts (100 points = $1)
  - View points history

### Seller Features

- **Hotel Management**:
  - Create hotels with location and amenities
  - Upload multiple images with primary image selection
  - Edit hotel details
  - View hotel performance metrics
- **Room Management**:
  - Add rooms with pricing and capacity
  - Upload room images
  - Set room availability
  - Configure view types and amenities
- **Calendar Management**:
  - Block dates for maintenance or owner use
  - Set seasonal pricing for peak periods
  - View booking calendar
- **Analytics Dashboard**:
  - Total revenue tracking
  - Booking statistics
  - Average rating display
  - Review count

### Admin Features

- **System Statistics**:
  - Total users, hotels, and bookings
  - Revenue analytics
  - Platform-wide metrics
- **Discount Management**:
  - Create percentage or fixed-amount discounts
  - Set validity periods
  - Configure usage limits
  - Track redemption statistics
- **User Management**:
  - View all users
  - Manage user roles
  - Monitor user activity
- **Audit Logs**:
  - Track all system actions
  - Filter by user, action type, or date
  - Export logs for compliance

## 🔌 API Integration

The frontend integrates with a Spring Boot backend API. Key endpoints include:

### Authentication

```typescript
POST / api / auth / register; // User registration
POST / api / auth / login; // User login
```

### Hotels

```typescript
GET / api / hotels; // List all hotels
GET / api / hotels / { id }; // Get hotel details
POST / api / hotels / search / advanced; // Advanced search
POST / api / hotels; // Create hotel (SELLER)
PUT / api / hotels / { id }; // Update hotel (SELLER)
DELETE / api / hotels / { id }; // Delete hotel (SELLER)
GET / api / hotels / seller / my - hotels; // Get seller's hotels
GET / api / hotels / seller / stats; // Get seller statistics
```

### Bookings

```typescript
POST / api / bookings; // Create booking
GET / api / bookings / my - bookings; // Get user's bookings
PUT / api / bookings / { id } / cancel; // Cancel booking
```

### Reviews

```typescript
POST / api / reviews; // Create review
GET / api / reviews / hotel / { hotelId }; // Get hotel reviews
PUT / api / reviews / { id } / respond; // Seller response
DELETE / api / reviews / { id }; // Delete review
```

### Images

```typescript
POST / api / images / hotels / { hotelId }; // Upload hotel image
POST / api / images / rooms / { roomId }; // Upload room image
PUT / api / images / hotels / { hotelId } / { imageId } / primary; // Set primary image
DELETE / api / images / hotels / { hotelId } / { imageId }; // Delete image
```

### Promotions

```typescript
POST / api / promotions / validate - code; // Validate discount code
GET / api / promotions / loyalty - points; // Get loyalty points
POST / api / promotions / loyalty - points / redeem; // Redeem points
```

### Admin

```typescript
GET / api / admin / statistics; // System statistics
GET / api / admin / users; // All users
GET / api / admin / audit - logs; // Audit logs
POST / api / admin / discounts; // Create discount code
```

For complete API documentation, see [FRONTEND_INTEGRATION_GUIDE copy.md](./FRONTEND_INTEGRATION_GUIDE%20copy.md)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Optional: Cloudinary Configuration (if using direct upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🧩 Core Components

### UI Components (Shadcn/ui)

Located in `components/ui/`:

- `button.tsx` - Button component with variants
- `input.tsx` - Form input component
- `dialog.tsx` - Modal dialog
- `dropdown-menu.tsx` - Dropdown menu
- `toast.tsx` - Toast notifications
- `avatar.tsx` - User avatar
- `label.tsx` - Form label
- `select.tsx` - Select dropdown
- `popover.tsx` - Popover component

### Hotel Components

Located in `components/hotel/`:

- `HotelCard.tsx` - Hotel listing card
- `HotelImageGallery.tsx` - Image gallery with lightbox
- `HotelFilters.tsx` - Search filters
- `RoomCard.tsx` - Room display card
- `AmenityList.tsx` - Amenities display

### Booking Components

Located in `components/booking/`:

- `BookingForm.tsx` - Booking creation form
- `BookingCard.tsx` - Booking display card

### Review Components

Located in `components/review/`:

- `ReviewForm.tsx` - Review submission form
- `ReviewCard.tsx` - Review display card

### Layout Components

Located in `components/layout/`:

- `Header.tsx` - Navigation header
- `Footer.tsx` - Page footer

## 🗄️ State Management

The application uses Zustand for state management:

### Auth Store

```typescript
// stores/authStore.ts
- user: User | null
- token: string | null
- login(credentials)
- logout()
- isAuthenticated()
```

### Hotel Store

```typescript
// stores/hotelStore.ts
- hotels: Hotel[]
- filters: HotelSearchFilters
- setFilters(filters)
- searchHotels()
```

## 🔒 Authentication Flow

1. **Registration**:

   - User submits registration form
   - Backend creates user account
   - User receives JWT token
   - Token stored in localStorage
   - User redirected to dashboard

2. **Login**:

   - User submits credentials
   - Backend validates and returns JWT
   - Token stored in localStorage
   - User redirected based on role

3. **Protected Routes**:

   - Middleware checks for valid token
   - Redirects to login if unauthorized
   - Role-based access control enforced

4. **Logout**:
   - Clear token from localStorage
   - Clear user state
   - Redirect to home page

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**

   - Import project from GitHub
   - Configure environment variables
   - Deploy

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

3. **Set Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel dashboard
   - Point to your production API

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use Next.js build plugin
- **AWS Amplify**: Configure build settings
- **Docker**: Use the included Dockerfile (if available)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is private and proprietary.

## 🐛 Known Issues

- Image upload requires Cloudinary configuration
- Some audit log features may return empty results (backend implementation pending)

## 📞 Support

For issues and questions:

- Create an issue in the repository
- Contact the development team
- Check the [Integration Guide](./FRONTEND_INTEGRATION_GUIDE%20copy.md)

## 🎨 Design System

### Colors

- Primary: Blue (#2563eb)
- Secondary: Green (#10b981)
- Danger: Red (#ef4444)
- Warning: Orange (#f59e0b)

### Typography

- Font Family: System fonts with fallbacks
- Headings: Bold, larger sizes
- Body: Regular weight, readable sizes

### Spacing

- Based on 8px grid system
- Consistent padding and margins
- Responsive breakpoints

---

**Built with ❤️ using Next.js and React**

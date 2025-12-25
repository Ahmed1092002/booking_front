# Complete UI Redesign Plan - From Scratch

## Modern Hotel Booking System

> **Mission**: Build a professional, modern UI that properly integrates ALL backend API endpoints, follows best practices, and delivers exceptional UX.

---

## 📋 What We'll Remove

### Files to Delete

```
❌ app/page.tsx (current landing)
❌ app/hotels/page.tsx
❌ app/hotels/[id]/page.tsx
❌ app/my-bookings/page.tsx
❌ app/login/page.tsx
❌ app/register/page.tsx
❌ All components/* (except keep lib/, stores/, actions/)
❌ app/globals.css (will recreate with design system)
```

### What to Keep

```
✅ app/layout.tsx (update only)
✅ lib/api-client.ts
✅ lib/utils.ts
✅ lib/design-tokens.ts
✅ stores/* (auth, toast)
✅ actions/* (all API actions)
✅ types/index.ts
✅ middleware.ts
```

---

## 1. API Endpoint Coverage (From Swagger)

### Admin Controller (5 endpoints)

- ✅ `GET /api/admin/audit-logs` - Pagination support
- ✅ `GET /api/admin/users` - All users list
- ✅ `GET /api/admin/statistics` - System stats
- ✅ `GET /api/admin/audit-logs/user/{userId}` - User specific logs
- ✅ `POST /api/admin/audit-logs` - Manual log creation

### Authentication Controller (2 endpoints)

- ✅ `POST /api/auth/register` - Supports CUSTOMER/SELLER roles
- ✅ `POST /api/auth/login` - Returns JWT token

### Booking Controller (3 endpoints)

- ✅ `GET /api/bookings/my-bookings` - User's bookings
- ✅ `POST /api/bookings` - Create booking (supports discounts & points)
- ✅ `POST /api/bookings/{bookingId}/cancel` - Cancel booking

### Calendar Controller (3 endpoints)

- ✅ `GET /api/calendar/rooms/{roomId}/availability?month=YYYY-MM` - Monthly calendar
- ✅ `POST /api/calendar/rooms/{roomId}/seasonal-pricing` - Set pricing
- ✅ `DELETE /api/calendar/rooms/{roomId}/seasonal-pricing/{pricingId}` - Remove pricing

### Dashboard Controller (2 endpoints)

- ✅ `GET /api/dashboard/seller/statistics` - Revenue, bookings, ratings
- ✅ `GET /api/dashboard/seller/recent-bookings` - Latest bookings

### Hotel Controller (9 endpoints)

- ✅ `GET /api/hotels` - All hotels with filtering
- ✅ `POST /api/hotels` - Create hotel (SELLER)
- ✅ `GET /api/hotels/{id}` - Hotel details
- ✅ `GET /api/hotels/my-hotels` - Seller's hotels
- ✅ `PUT /api/hotels/{hotelId}` - Update hotel
- ✅ `DELETE /api/hotels/{hotelId}` - Delete hotel
- ✅ `POST /api/hotels/{hotelId}/rooms` - Add room
- ✅ `PUT /api/hotels/{hotelId}/rooms/{roomId}` - Update room
- ✅ `DELETE /api/hotels/{hotelId}/rooms/{roomId}` - Delete room

### Image Controller (3 endpoints)

- ✅ `POST /api/images/hotels/{hotelId}` - Upload hotel image (multipart)
- ✅ `POST /api/images/rooms/{roomId}` - Upload room image (multipart)
- ✅ `DELETE /api/images/{imageId}` - Delete image

### Promotion Controller (5 endpoints)

- ✅ `GET /api/promotions/discount-codes` - All codes (ADMIN)
- ✅ `POST /api/promotions/discount-codes` - Create code (ADMIN)
- ✅ `POST /api/promotions/validate-code?code=X&amount=Y` - Validate discount
- ✅ `GET /api/promotions/loyalty-points` - User's points
- ✅ `POST /api/promotions/loyalty-points/redeem?points=X` - Redeem points

### Review Controller (4 endpoints)

- ✅ `GET /api/reviews/hotel/{hotelId}` - Hotel reviews
- ✅ `POST /api/reviews` - Submit review
- ✅ `DELETE /api/reviews/{reviewId}` - Delete review
- ✅ `PUT /api/reviews/{reviewId}/respond` - Seller response

**Total: 39 API endpoints to integrate**

---

## 🎨 2. Design System Foundation

### Color Palette

```typescript
// Primary Colors
primary: {
  50: '#FFF5F2',
  100: '#FFE8E0',
  500: '#FF5A3C', // Main orange
  600: '#E64A2C',
  700: '#CC3A1C',
}

// Secondary Colors
secondary: {
  50: '#EBF0FF',
  100: '#D6E1FF',
  500: '#4461F2', // Main blue
  600: '#3451D9',
  700: '#2441C0',
}

// Neutral Colors
neutral: {
  50: '#F8F9FA',
  100: '#F1F3F5',
  200: '#E9ECEF',
  300: '#DEE2E6',
  400: '#CED4DA',
  500: '#ADB5BD',
  600: '#6C757D',
  700: '#495057',
  800: '#343A40',
  900: '#212529',
}

// Semantic Colors
success: '#10B981',
warning: '#F59E0B',
error: '#EF4444',
info: '#3B82F6',
```

### Typography System

```typescript
// Font Family
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'sans-serif'], //For headings
}

// Font Sizes (rem)
fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
}

// Font Weights
fontWeight: {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}
```

### Spacing Scale (8px grid)

```typescript
spacing: {
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
}
```

### Shadow System

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Border Radius

```css
--radius-sm: 0.375rem; // 6px
--radius: 0.5rem; // 8px
--radius-md: 0.75rem; // 12px
--radius-lg: 1rem; // 16px
--radius-xl: 1.5rem; // 24px
--radius-full: 9999px; // Full circle
```

---

## 📁 3. New File Structure

```
app/
├── layout.tsx (UPDATE)
├── page.tsx (NEW - Landing)
├── globals.css (NEW - Design tokens)
├── (public)/
│   ├── hotels/
│   │   ├── page.tsx (Hotel search with filters)
│   │   └── [id]/
│   │       └── page.tsx (Hotel detail with booking)
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (customer)/
│   ├── my-bookings/
│   │   └── page.tsx
│   ├── my-reviews/
│   │   └── page.tsx
│   └── loyalty/
│       └── page.tsx
├── (seller)/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── hotels/
│   │   ├── page.tsx (My hotels list)
│   │   ├── new/
│   │   │   └── page.tsx (Create hotel)
│   │   └── [id]/
│   │       ├── edit/
│   │       │   └── page.tsx
│   │       ├── rooms/
│   │       │   ├── new/page.tsx
│   │       │   └── [roomId]/edit/page.tsx
│   │       ├── images/
│   │       │   └── page.tsx
│   │       └── calendar/
│   │           └── page.tsx
│   └── reviews/
│       └── page.tsx (Respond to reviews)
└── (admin)/
    ├── dashboard/
    │   └── page.tsx
    ├── users/
    │   └── page.tsx
    ├── discount-codes/
    │   └── page.tsx
    └── audit-logs/
        └── page.tsx

components/
├── ui/ (Shadcn-style primitives)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Label.tsx
│   ├── Select.tsx
│   ├── Dialog.tsx
│   ├── Popover.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Tabs.tsx
│   ├── Separator.tsx
│   ├── DropdownMenu.tsx
│   └── Toast.tsx
├── layout/
│   ├── Header.tsx (New navbar)
│   ├── Footer.tsx
│   └── Sidebar.tsx (For seller/admin)
├── common/
│   ├── SearchBar.tsx
│   ├── DateRangePicker.tsx
│   ├── ImageUpload.tsx
│   ├── LoadingSpinner.tsx
│   ├── EmptyState.tsx
│   └── ErrorBoundary.tsx
├── hotel/
│   ├── HotelCard.tsx
│   ├── HotelFilters.tsx
│   ├── HotelGallery.tsx
│   ├── RoomCard.tsx
│   └── AmenitiesList.tsx
├── booking/
│   ├── BookingCard.tsx
│   ├── BookingForm.tsx
│   └── BookingSummary.tsx
├── review/
│   ├── ReviewCard.tsx
│   ├── ReviewForm.tsx
│   ├── ReviewStats.tsx
│   └── StarRating.tsx
├── seller/
│   ├── StatCard.tsx
│   ├── RevenueChart.tsx
│   ├── CalendarView.tsx
│   └── RecentBookings.tsx
└── admin/
    ├── UserTable.tsx
    ├── DiscountCodeForm.tsx
    └── AuditLogTable.tsx
```

---

## 📄 4. Page Specifications

### PUBLIC PAGES

#### Landing Page (`app/page.tsx`)

**Sections**:

1. **Hero** (600px min height)

   - Large heading with gradient
   - Search bar (location, dates, guests)
   - CTA buttons
   - Background: Gradient + abstract shapes

2. **Stats** (py-12)

   - 4 columns: Hotels, Customers, Cities, Avg Rating
   - Animated counters

3. **Features** (py-20)

   - 3 cards: Wide Selection, Secure Booking, Best Prices
   - Icons + descriptions

4. **Popular Destinations** (py-20)

   - Grid of 6 city cards with images
   - Hover effects

5. **How It Works** (py-20)

   - 3 steps with numbers
   - Visual flow diagram

6. **CTA Section** (py-16)
   - Become a Host
   - Background: Gradient

**API**: `GET /api/hotels` (for featured)

---

#### Hotel Search (`app/hotels/page.tsx`)

**Layout**:

- **Sidebar** (300px): Filters
  - Price range slider
  - Star rating
  - Amenities checkboxes
  - Room type
  - Sort dropdown
- **Main Area**:
  - Breadcrumbs
  - Results count
  - Hotel cards grid (3 columns)
  - Pagination

**Hotel Card**:

- Image (aspect-ratio 4/3)
- Hotel name + star rating
- Location with icon
- Price per night
- Amenities tags (max 3)
- "View Details" button

**API**:

- `GET /api/hotels?city=&minPrice=&maxPrice=&...`
- Supports all filter params

---

#### Hotel Details (`app/hotels/[id]/page.tsx`)

**Sections**:

1. **Gallery** (full width, 500px height)

   - Main image + 4 thumbnails
   - Lightbox on click
   - API: `GET /api/images/hotels/{id}`

2. **Info Bar** (sticky)

   - Hotel name
   - Rating + review count
   - Location
   - "Book Now" CTA

3. **Details Grid** (2 columns)

   - **Left**: Description, amenities
   - **Right**: Booking form (sticky)

4. **Rooms** (py-12)

   - Room cards with prices
   - "Select Room" button
   - Room images carousel

5. **Reviews** (py-12)

   - Average rating
   - Review cards with avatars
   - Pagination
   - "Write Review" button (if booked)

6. **Map** (400px height)
   - Google Maps embed (if available)

**API**:

- `GET /api/hotels/{id}`
- `GET /api/reviews/hotel/{id}`
- `GET /api/images/hotels/{id}`
- `GET /api/images/rooms/{roomId}`

---

### CUSTOMER PAGES

#### My Bookings (`app/my-bookings/page.tsx`)

**Features**:

- Tabs: All | Upcoming | Past | Cancelled
- Booking cards:
  - Hotel image + name
  - Room type
  - Check-in/Check-out dates
  - Total price
  - Status badge
  - "Cancel" button (if upcoming)
  - "Leave Review" button (if past + not reviewed)
- Empty state for each tab

**API**:

- `GET /api/bookings/my-bookings`
- `POST /api/bookings/{id}/cancel`

---

#### Loyalty Points (`app/loyalty/page.tsx`)

**Sections**:

1. **Points Card**

   - Total points (large number)
   - Points value in currency
   - Progress to next tier

2. **Redeem Section**

   - Points slider
   - Converted amount
   - "Redeem" button

3. **History Table**
   - Date, Transaction, Points, Balance
   - Pagination

**API**:

- `GET /api/promotions/loyalty-points`
- `POST /api/promotions/loyalty-points/redeem`

---

### SELLER PAGES

#### Seller Dashboard (`app/seller/dashboard/page.tsx`)

**Layout**: Grid (12 columns)

**Metrics Row** (4 cards):

- Total Revenue (icon: $)
- Total Bookings (icon: calendar)
- Average Rating (icon: star)
- Active Hotels (icon: building)

**Charts** (8 cols each):

- Revenue chart (line chart)
- Bookings chart (bar chart)

**Recent Bookings** (12 cols):

- Table with columns:
  - Guest Name
  - Hotel
  - Check-in
  - Nights
  - Amount
  - Status

**API**:

- `GET /api/dashboard/seller/statistics`
- `GET /api/dashboard/seller/recent-bookings`

---

#### My Hotels (`app/seller/hotels/page.tsx`)

**Features**:

- "Add Hotel" button (primary action)
- Hotel cards with:
  - Image
  - Name + city
  - Room count
  - Rating
  - "Edit" / "Delete" / "View" buttons
- Empty state: "Create your first hotel"

**API**:

- `GET /api/hotels/my-hotels`

---

#### Create/Edit Hotel (`app/seller/hotels/new/page.tsx`)

**Form Sections**:

1. **Basic Info**

   - Name (required)
   - City (required, autocomplete)
   - Address (required)
   - Description (textarea)

2. **Amenities**

   - Checkboxes: WiFi, Pool, Gym, Restaurant, etc.

3. **Images** (separate page after creation)

   - Upload multiple images
   - Set primary image
   - Drag to reorder

4. **Actions**
   - "Save" button
   - "Cancel" button

**API**:

- `POST /api/hotels` (create)
- `PUT /api/hotels/{id}` (update)
- `POST /api/images/hotels/{id}` (upload images)

---

#### Room Calendar (`app/seller/hotels/[id]/calendar/page.tsx`)

**Features**:

- Month selector
- Calendar grid showing:
  - Available dates (green)
  - Booked dates (blue)
  - Blocked dates (red)
  - Seasonal pricing (yellow)
- Click date to:
  - Block/unblock
  - Set seasonal price

**API**:

- `GET /api/calendar/rooms/{roomId}/availability?month=2025-02`
- `POST /api/calendar/rooms/{roomId}/seasonal-pricing`

---

### 🛡️ ADMIN PAGES

#### Admin Dashboard (`app/admin/dashboard/page.tsx`)

**Sections**:

1. **System Stats**

   - Total Users
   - Total Hotels
   - Total Bookings
   - Total Revenue

2. **Quick Actions**

   - Create Discount Code
   - View Audit Logs
   - Manage Users

3. **Recent Activity**
   - Latest audit logs

**API**:

- `GET /api/admin/statistics`
- `GET /api/admin/audit-logs?page=0&size=10`

---

#### Discount Codes (`app/admin/discount-codes/page.tsx`)

**Features**:

- "Create Code" button
- Table with columns:
  - Code
  - Discount %
  - Min Amount
  - Used Count
  - Valid Until
  - Status (Active/Expired)
- Create/Edit form in dialog:
  - Code (auto-generate option)
  - Discount percentage
  - Min booking amount
  - Max uses
  - Expiry date

**API**:

- `GET /api/promotions/discount-codes`
- `POST /api/promotions/discount-codes`

---

## 🧩 5. Component Library

### UI Primitives (Radix-based)

All using Radix UI with proper accessibility:

#### Button

```typescript
variants: {
  variant: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
  size: ['sm', 'md', 'lg'],
}
```

#### Input

- Label integration
- Error states
- Icon support (left/right)
- Disabled state

#### Select

- Searchable option
- Multi-select support
- Custom render

#### Dialog

- Responsive (full screen on mobile)
- Close on overlay click
- Keyboard accessible

#### DateRangePicker

- Calendar popup
- Quick presets (Today, This Week, etc.)
- Min/max date constraints

---

### Composite Components

#### SearchBar

**Props**: `variant: 'hero' | 'page'`
**Fields**:

- Location (autocomplete)
- Check-in date
- Check-out date
- Guests (dropdown)
- Search button

#### HotelCard

**Layout**: Image top, content bottom
**Shows**:

- Image with badge (if featured)
- Name + rating
- Location
- Price
- Amenities (max 3)
- CTA button

#### ReviewCard

**Layout**: Horizontal
**Shows**:

- Avatar
- Name + date
- Star rating
- Comment
- Seller response (if any)
- Response date

---

## 📡 6. API Integration Strategy

### HTTP Client Setup

```typescript
// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### API Hooks Pattern

```typescript
// hooks/useHotels.ts
export function useHotels(filters) {
  return useQuery({
    queryKey: ["hotels", filters],
    queryFn: () => api.get("/api/hotels", { params: filters }),
  });
}

// hooks/useCreateBooking.ts
export function useCreateBooking() {
  return useMutation({
    mutationFn: (data) => api.post("/api/bookings", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });
}
```

---

## ✅ 7. Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Delete old files
- [ ] Setup design system in globals.css
- [ ] Create all UI primitives (Button, Input, etc.)
- [ ] Setup API client with interceptors
- [ ] Update layout with new Header/Footer

### Phase 2: Public Pages (Week 2)

- [ ] Landing page with all sections
- [ ] Hotel search with filters
- [ ] Hotel details with gallery
- [ ] Login/Register pages
- [ ] Test all public flows

### Phase 3: Customer Pages (Week 3)

- [ ] My Bookings with tabs
- [ ] Booking flow with discount/points
- [ ] My Reviews page
- [ ] Loyalty points page
- [ ] Test customer journey

### Phase 4: Seller Pages (Week 4)

- [ ] Seller dashboard with charts
- [ ] My Hotels CRUD
- [ ] Room management
- [ ] Calendar with pricing
- [ ] Image upload
- [ ] Test seller features

### Phase 5: Admin Pages (Week 5)

- [ ] Admin dashboard
- [ ] User management
- [ ] Discount codes
- [ ] Audit logs
- [ ] System stats

### Phase 6: Polish & Testing (Week 6)

- [ ] Responsive design audit
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Cross-browser testing
- [ ] Error handling polish
- [ ] Loading states everywhere

---

## 🎯 Success Criteria

- ✅ All 39 API endpoints integrated
- ✅ 100% responsive (320px to 4K)
- ✅ < 3s load time
- ✅ WCAG 2.1 AA compliance
- ✅ Zero console errors
- ✅ Works on Chrome, Firefox, Safari, Edge
- ✅ Proper error handling for all API calls
- ✅ Loading states for all async operations
- ✅ Empty states for all list views
- ✅ Optimistic UI updates where applicable

---

## 🚀 Next Steps

**Option A**: Full rebuild (recommended)

1. Get your approval
2. Delete old UI files
3. Start Phase 1 implementation
4. Progressive rollout phase by phase

**Option B**: Incremental refactor

1. Keep old files
2. Build new pages alongside
3. Gradually replace old with new
4. Lower risk but slower

**Which approach do you prefer?**

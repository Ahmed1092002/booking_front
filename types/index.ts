// User types
export interface User {
  id: number;
  fullName: string;
  email: string;
  roles: Role[];
}

export type Role = "ROLE_CUSTOMER" | "ROLE_SELLER" | "ROLE_ADMIN";

// Hotel types
export interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  googleMapUrl: string;
  amenities: string[];
  // DTO fields
  sellerId?: number;
  sellerName?: string;
  // Nested object (optional or computed)
  seller?: User;
  averageRating?: number;
  reviewCount?: number; // totalReviews in Swagger
  totalReviews?: number;
  images?: HotelImage[];
  minRoomPrice?: number;
  availableRooms?: number;
  rooms?: Room[];
}

// Room types
export interface Room {
  id: number;
  name: string;
  pricePerNight: number;
  capacity: number;
  viewType: string;
  hasKitchen: boolean;
  isAvailable?: boolean; // Added from Swagger
  available?: boolean;
  // DTO fields
  hotelId?: number;
  hotelName?: string;
  // Nested object
  hotel?: Hotel;
  images?: RoomImage[];
}

// Booking types
export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string; // PENDING, CONFIRMED, CANCELLED, COMPLETED
  // DTO fields
  roomId?: number;
  roomName?: string;
  hotelId?: number;
  hotelName?: string;
  hotelCity?: string;
  bookerId?: number;
  bookerName?: string;
  // Nested objects (optional)
  room?: Room;
  user?: User;

  discountApplied?: number;
  pointsRedeemed?: number;
  canCancel?: boolean;
  canReview?: boolean;
}

// Review types
export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  sellerResponse?: string;
  responseDate?: string;
  // DTO fields
  hotelId?: number;
  hotelName?: string;
  reviewerId?: number;
  reviewerName?: string;
  bookingId?: number;
  // Nested objects
  booking?: Booking;
  hotel?: Hotel;
  user?: User; // reviewer

  updatedAt?: string;
}

export interface CreateReviewDto {
  bookingId: number;
  rating: number;
  comment: string;
}

export interface RespondToReviewDto {
  response: string;
}

// Image types
export interface HotelImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  uploadedAt: string;
}

export interface RoomImage {
  id: number;
  imageUrl: string;
  uploadedAt: string;
}

export interface UploadImageResponse {
  id: number;
  imageUrl: string;
  message: string;
}

// Calendar/Availability types
export interface CalendarDay {
  date: string;
  status: "AVAILABLE" | "BOOKED" | "BLOCKED" | "SEASONAL_PRICING";
  price?: number;
  reason?: string;
  notes?: string;
  seasonName?: string;
}

export interface BlockedDate {
  id: number;
  startDate: string;
  endDate: string;
  reason: "MAINTENANCE" | "OWNER_USE" | "OTHER";
  notes?: string;
}

export interface SeasonalPricing {
  id: number;
  startDate: string;
  endDate: string;
  pricePerNight: number;
  seasonName: string;
}

export interface BlockDatesDto {
  startDate: string;
  endDate: string;
  reason: "MAINTENANCE" | "OWNER_USE" | "OTHER";
  notes?: string;
}

export interface SeasonalPricingDto {
  startDate: string;
  endDate: string;
  pricePerNight: number;
  seasonName: string;
}

// Promotion types
export interface DiscountCode {
  id: number;
  code: string;
  discountPercent: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface DiscountValidation {
  valid: boolean;
  discountPercent: number;
  finalAmount: number;
  message: string;
}

export interface LoyaltyPoints {
  userId: number;
  totalPoints: number;
  availablePoints: number;
  pointsValue: number;
}

export interface CreateDiscountCodeDto {
  code: string;
  discountPercent: number;
  expiryDate: string;
}

// Admin types
export interface SystemStatistics {
  totalUsers: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  activeDiscountCodes: number;
}

export interface AuditLog {
  id: number;
  userId: number;
  userName: string;
  action: string;
  entityType: string;
  entityId: number;
  details: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Auth DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface JwtAuthResponse {
  accessToken: string;
  tokenType: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    roles: Role[];
  };
}

// Booking DTOs
export interface CreateBookingDto {
  checkInDate: string;
  checkOutDate: string;
  discountCode?: string;
  pointsToRedeem?: number;
}

// Hotel DTOs
export interface CreateHotelDto {
  name: string;
  city: string;
  address: string;
  googleMapUrl: string;
  amenities: string[];
}

export interface CreateRoomDto {
  name: string;
  pricePerNight: number;
  capacity: number;
  viewType: string;
  hasKitchen: boolean;
}

export interface HotelSearchFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  minCapacity?: number;
  checkInDate?: string;
  checkOutDate?: string;
  sortBy?: "price" | "rating" | "name";
  sortOrder?: "asc" | "desc";
}

// Seller Statistics
export interface SellerStats {
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
}

// Server Action Response
export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

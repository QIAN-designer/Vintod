export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isCover?: boolean;
  sortOrder?: number;
}

export interface ProductVariant {
  id: string;
  sku?: string;
  size: string;
  color?: string;
  condition: string;
  price: number;
  stock: number;
  isActive?: boolean;
  images?: ProductImage[];
}

export interface ProductQueryParams {
  search?: string;
  q?: string;
  brand?: string;
  brandId?: string;
  category?: string;
  categoryId?: string;
  sellerId?: string;
  condition?: string;
  size?: string;
  color?: string;
  status?: string;
  active?: string | boolean;
  isActive?: string | boolean;
  minPrice?: number | string;
  maxPrice?: number | string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number | string;
  limit?: number | string;
}

export interface Product {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  brandId?: string;
  size: string;
  color?: string;
  stock?: number;
  condition: string;
  category?: string;
  categoryId?: string;
  image?: string;
  images?: string[];
  variants?: ProductVariant[];
  brandInfo?: any;
  categoryInfo?: any;
  sellerInfo?: any;
  sellerId?: string;
  sellerName?: string;
  slug?: string;
  status?: string;
  viewsCount?: number;
  isActive?: boolean;
  deletedAt?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  avatar?: string;
  isActive: boolean;
  city?: string;
  productsCount: number;
  salesCount: number;
  rating: number;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  logoUrl?: string;
  images?: string[];
  isActive: boolean;
  itemCount: number;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  img?: string;
  count?: string;
  itemCount: number;
  isActive: boolean;
  parent?: string | null;
  createdAt: string;
}

export interface Condition {
  id: string;
  name: string;
  slug: string;
  description: string;
  badgeColor: string;
  isActive: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  brand: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  isActive: boolean;
  createdAt: string;
  paymentMethod: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalUsers: number;
  totalBrands: number;
  totalCategories: number;
  totalOrders: number;
  totalSalesVolume: number;
  pendingOrders: number;
}

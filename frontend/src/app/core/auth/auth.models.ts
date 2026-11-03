export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

export interface UserProfile {
  id?: string;
  username: string;
  avatarUrl?: string | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  ratingAverage?: number;
  ratingCount?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  roleId?: string;
  isActive?: boolean;
  profile?: UserProfile | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  city?: string;
  country?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface AuthResponseData {
  user: AuthUser;
  token: string;
}

export interface AuthApiResponse {
  success: boolean;
  data: AuthResponseData;
  error?: {
    message: string;
    statusCode?: number;
  } | string;
}

export interface MeApiResponse {
  success: boolean;
  data: AuthUser;
  error?: {
    message: string;
    statusCode?: number;
  } | string;
}


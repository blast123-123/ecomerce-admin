const PATH_SERVICES = {
  API: process.env.NEXT_PUBLIC_API || 'http://localhost:4000/api-v1',
  AUTH: '/auth/login',
  PROFILE: 'user/profile',
  ROLES: '/roles',
  USER: '/user',
  PRODUCT: '/product',
  CLIENTS: '/client',
} as const

export const { API, PRODUCT, USER, AUTH, ROLES, PROFILE, CLIENTS } =
  PATH_SERVICES

export interface ApiResponse<T = null> {
  data?: T
  message: string
  statusCode: number
}

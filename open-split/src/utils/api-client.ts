import axios from 'axios'

// Get API base URL from environment variable
// In development, this will use Vite proxy (empty string means relative URLs)
// In production, set VITE_API_BASE_URL to your AWS API Gateway URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Create axios instance with base URL configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Optional: Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default apiClient

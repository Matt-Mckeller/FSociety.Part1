/**
 * Mock for jsonwebtoken - a Node.js library that doesn't work in browsers.
 * This stub provides the same API but with no-op implementations for Storybook.
 */

// Mock decode function - returns null or a mock payload
export function decode(token: string, options?: any): any {
  if (!token) return null

  // Try to decode the payload part of a JWT (second segment)
  try {
    const parts = token.split(".")
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]))
      return options?.complete
        ? { header: {}, payload, signature: "" }
        : payload
    }
  } catch {
    // If decoding fails, return a mock payload
  }

  return { sub: "mock-user", exp: Date.now() / 1000 + 3600 }
}

// Mock verify - just returns decoded payload (no actual verification)
export function verify(token: string, secret: any, options?: any): any {
  return decode(token, options)
}

// Mock sign - returns a fake token
export function sign(payload: any, secret: any, options?: any): string {
  return "mock.jwt.token"
}

// Error classes
export class JsonWebTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "JsonWebTokenError"
  }
}

export class TokenExpiredError extends Error {
  expiredAt: Date
  constructor(message: string, expiredAt: Date) {
    super(message)
    this.name = "TokenExpiredError"
    this.expiredAt = expiredAt
  }
}

export class NotBeforeError extends Error {
  date: Date
  constructor(message: string, date: Date) {
    super(message)
    this.name = "NotBeforeError"
    this.date = date
  }
}

// Default export matching the jsonwebtoken API
export default {
  decode,
  verify,
  sign,
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
}

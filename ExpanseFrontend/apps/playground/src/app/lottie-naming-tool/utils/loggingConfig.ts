/**
 * Logging Configuration for Lottie Naming Tool
 * Centralized configuration for all logging aspects
 */

import { LogLevel } from "./logger"
import { LogRotationConfig } from "./logRotation"

export interface LoggingConfig {
  // Basic logging settings
  level: LogLevel
  enableConsoleLogging: boolean
  enableFileLogging: boolean

  // File system settings
  logDirectory: string
  sessionId: string
  userId?: string

  // AI-specific settings
  enableAILogging: boolean
  enablePerformanceLogging: boolean
  enableErrorTracking: boolean

  // Log rotation settings
  rotation: LogRotationConfig

  // Environment-specific settings
  environment: "development" | "production" | "test"
  debugMode: boolean
}

export const defaultLoggingConfig: LoggingConfig = {
  // Basic settings
  level:
    process.env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsoleLogging: true,
  enableFileLogging: true,

  // File system settings
  logDirectory: process.env.LOG_DIRECTORY || "/tmp/lottie-naming-tool-logs",
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  userId: process.env.USER_ID || "anonymous",

  // AI-specific settings
  enableAILogging: true,
  enablePerformanceLogging: true,
  enableErrorTracking: true,

  // Log rotation settings
  rotation: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
    maxAge: 30, // 30 days
    logDirectory: process.env.LOG_DIRECTORY || "/tmp/lottie-naming-tool-logs",
    compressionEnabled: false,
    cleanupInterval: 24, // 24 hours
  },

  // Environment settings
  environment: (process.env.NODE_ENV as any) || "development",
  debugMode: process.env.NODE_ENV === "development",
}

export const productionLoggingConfig: LoggingConfig = {
  ...defaultLoggingConfig,
  level: LogLevel.WARN,
  enableConsoleLogging: false,
  enableFileLogging: true,
  debugMode: false,
  rotation: {
    ...defaultLoggingConfig.rotation,
    maxFileSize: 50 * 1024 * 1024, // 50MB for production
    maxFiles: 20,
    maxAge: 90, // 90 days for production
  },
}

export const testLoggingConfig: LoggingConfig = {
  ...defaultLoggingConfig,
  level: LogLevel.ERROR,
  enableConsoleLogging: false,
  enableFileLogging: false,
  debugMode: false,
  rotation: {
    ...defaultLoggingConfig.rotation,
    maxFiles: 3,
    maxAge: 1, // 1 day for tests
  },
}

/**
 * Get logging configuration based on environment
 */
export function getLoggingConfig(): LoggingConfig {
  const env = process.env.NODE_ENV || "development"

  switch (env) {
    case "production":
      return productionLoggingConfig
    case "test":
      return testLoggingConfig
    default:
      return defaultLoggingConfig
  }
}

/**
 * Validate logging configuration
 */
export function validateLoggingConfig(config: LoggingConfig): string[] {
  const errors: string[] = []

  if (config.level < 0 || config.level > 3) {
    errors.push("Log level must be between 0 (DEBUG) and 3 (ERROR)")
  }

  if (!config.logDirectory || config.logDirectory.trim() === "") {
    errors.push("Log directory must be specified")
  }

  if (config.rotation.maxFileSize <= 0) {
    errors.push("Max file size must be greater than 0")
  }

  if (config.rotation.maxFiles <= 0) {
    errors.push("Max files must be greater than 0")
  }

  if (config.rotation.maxAge <= 0) {
    errors.push("Max age must be greater than 0")
  }

  if (config.rotation.cleanupInterval <= 0) {
    errors.push("Cleanup interval must be greater than 0")
  }

  return errors
}

/**
 * Create environment-specific logging configuration
 */
export function createEnvironmentConfig(environment: string): LoggingConfig {
  const baseConfig = getLoggingConfig()

  switch (environment) {
    case "production":
      return {
        ...baseConfig,
        level: LogLevel.WARN,
        enableConsoleLogging: false,
        enableFileLogging: true,
        debugMode: false,
      }
    case "staging":
      return {
        ...baseConfig,
        level: LogLevel.INFO,
        enableConsoleLogging: true,
        enableFileLogging: true,
        debugMode: false,
      }
    case "development":
      return {
        ...baseConfig,
        level: LogLevel.DEBUG,
        enableConsoleLogging: true,
        enableFileLogging: true,
        debugMode: true,
      }
    case "test":
      return {
        ...baseConfig,
        level: LogLevel.ERROR,
        enableConsoleLogging: false,
        enableFileLogging: false,
        debugMode: false,
      }
    default:
      return baseConfig
  }
}

/**
 * Logging configuration for AI analysis
 */
export const aiLoggingConfig = {
  // Enable detailed AI interaction logging
  enableDetailedAILogging: true,

  // Log all AI requests and responses
  logAIRequests: true,
  logAIResponses: true,
  logAIStreaming: true,

  // Performance tracking
  trackAIPerformance: true,
  trackTokenUsage: true,

  // Error tracking
  trackAIErrors: true,
  trackRetries: true,

  // Session tracking
  trackSessions: true,
  trackUserInteractions: true,
}

/**
 * Export configuration for different use cases
 */
export const loggingPresets = {
  // For development and debugging
  development: {
    ...defaultLoggingConfig,
    level: LogLevel.DEBUG,
    enableConsoleLogging: true,
    enableFileLogging: true,
    debugMode: true,
  },

  // For production monitoring
  production: {
    ...productionLoggingConfig,
    level: LogLevel.INFO,
    enableConsoleLogging: false,
    enableFileLogging: true,
    debugMode: false,
  },

  // For AI analysis and research
  aiAnalysis: {
    ...defaultLoggingConfig,
    level: LogLevel.DEBUG,
    enableConsoleLogging: true,
    enableFileLogging: true,
    enableAILogging: true,
    enablePerformanceLogging: true,
    debugMode: true,
    rotation: {
      ...defaultLoggingConfig.rotation,
      maxFiles: 50, // Keep more files for analysis
      maxAge: 90, // Keep logs longer for analysis
    },
  },

  // For testing
  testing: {
    ...testLoggingConfig,
    level: LogLevel.ERROR,
    enableConsoleLogging: false,
    enableFileLogging: false,
    debugMode: false,
  },
}

export default getLoggingConfig

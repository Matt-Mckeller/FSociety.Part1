/**
 * Logging System Usage Examples
 * Demonstrates how to use the comprehensive logging system
 */

import { createLogger } from "./logger"
import { aiLogger } from "./ai/aiLogger"
import { logRotationManager } from "./logRotation"

// Example 1: Basic Logging
export function basicLoggingExample() {
  const logger = createLogger("EXAMPLE_COMPONENT")

  // Different log levels
  logger.debug("Debug information", { data: "value" }, "debug_operation")
  logger.info(
    "Operation completed successfully",
    { result: "success" },
    "main_operation",
  )
  logger.warn(
    "Warning message",
    { warning: "potential issue" },
    "warning_operation",
  )
  logger.error(
    "Error occurred",
    new Error("Something went wrong"),
    "error_operation",
  )

  // Performance logging
  const startTime = Date.now()
  // ... perform some operation
  const duration = Date.now() - startTime
  logger.performance("Operation completed", duration, { details: "value" })
}

// Example 2: AI-Specific Logging
export function aiLoggingExample() {
  // Log AI request
  const interaction = aiLogger.logAIRequest(
    "claude",
    "generateComponentNames",
    { animationName: "MyAnimation", layerCount: 25 },
    "request_123",
    true, // streaming
  )

  // Log streaming chunks
  aiLogger.logAIStreaming(interaction, "chunk1", 100)
  aiLogger.logAIStreaming(interaction, "chunk2", 200)

  // Log AI response
  aiLogger.logAIResponse(
    interaction,
    { componentNames: ["Name1", "Name2"] },
    true, // success
    undefined, // no error
    { input: 1000, output: 500, total: 1500 }, // token usage
  )
}

// Example 3: Animation Analysis Logging
export function animationAnalysisExample() {
  // Start analysis session
  const analysis = aiLogger.startAnimationAnalysis(
    "MyAnimation",
    "session_123",
    true, // vision mode
    5, // frames count
  )

  // Log analysis phases
  aiLogger.logAnalysisPhase(analysis, "VISUAL_ANALYSIS", true, { frames: 5 })
  aiLogger.completeAnalysisPhase(analysis, "VISUAL_ANALYSIS", true, {
    duration: 2000,
  })

  aiLogger.logAnalysisPhase(analysis, "COMPONENT_NAMING", true)
  aiLogger.completeAnalysisPhase(analysis, "COMPONENT_NAMING", true, {
    components: 25,
  })

  // Complete analysis
  const mockResponse = {
    componentNames: [
      { path: "layers[0]", suggestedName: "Background", isThemeable: true },
      { path: "layers[1]", suggestedName: "Foreground", isThemeable: true },
    ],
    description: {
      short: "A simple animation",
      detailed: "Detailed description",
    },
    timeline: [],
    recommendations: [],
  }

  aiLogger.completeAnimationAnalysis(analysis, mockResponse, true)
}

// Example 4: Log Rotation and Cleanup
export function logRotationExample() {
  // Get cleanup statistics
  const stats = logRotationManager.getCleanupStats()
  console.log("Log cleanup stats:", stats)

  // Force immediate cleanup
  logRotationManager.forceCleanup()

  // Get AI-readable summary
  const summary = logRotationManager.getAISummary()
  console.log("AI Summary:", summary)
}

// Example 5: Session Management
export function sessionManagementExample() {
  const logger = createLogger("SESSION_MANAGER")

  // Start session
  logger.sessionStart()

  // Log session activities
  logger.info(
    "User uploaded animation",
    {
      fileName: "animation.json",
      fileSize: 1024000,
    },
    "file_upload",
  )

  logger.info(
    "AI analysis started",
    {
      provider: "claude",
      animationName: "MyAnimation",
    },
    "ai_analysis",
  )

  // End session
  logger.sessionEnd()
}

// Example 6: Error Handling and Debugging
export function errorHandlingExample() {
  const logger = createLogger("ERROR_HANDLER")

  try {
    // Some operation that might fail
    throw new Error("Simulated error")
  } catch (error) {
    // Log error with context
    logger.error("Operation failed", error as Error, "risky_operation")

    // Log additional context
    logger.debug(
      "Error context",
      {
        operation: "risky_operation",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
      "error_context",
    )
  }
}

// Example 7: Performance Monitoring
export function performanceMonitoringExample() {
  const logger = createLogger("PERFORMANCE_MONITOR")

  // Monitor different operations
  const operations = [
    { name: "file_parsing", duration: 150 },
    { name: "ai_request", duration: 2500 },
    { name: "response_processing", duration: 300 },
    { name: "export_generation", duration: 800 },
  ]

  operations.forEach((op) => {
    logger.performance(op.name, op.duration, {
      operation: op.name,
      timestamp: new Date().toISOString(),
    })
  })
}

// Example 8: AI Analysis Summary
export function aiAnalysisSummaryExample() {
  // Get AI analysis summary
  const summary = aiLogger.getAIAnalysisSummary()
  console.log("AI Analysis Summary:", summary)

  // Get logs for AI analysis
  const logs = aiLogger.getLogsForAI()
  console.log("AI Logs:", logs)
}

// Example 9: Custom Context Logging
export function customContextExample() {
  // Create logger with custom context
  const logger = createLogger("CUSTOM_CONTEXT", {
    level: 0, // DEBUG level
    enableFileLogging: true,
    enableConsoleLogging: true,
    logDirectory: "/tmp/custom-logs",
    sessionId: "custom_session_123",
    userId: "user_456",
  })

  // Log with custom context
  logger.info(
    "Custom context logging",
    {
      customField: "customValue",
      timestamp: new Date().toISOString(),
    },
    "custom_operation",
  )
}

// Example 10: Integration with Main Application
export function applicationIntegrationExample() {
  // This would be used in the main application
  const logger = createLogger("LOTTIE_NAMING_TOOL")

  // Log application lifecycle
  logger.info(
    "Application started",
    {
      version: "1.0.0",
      environment: "development",
      timestamp: new Date().toISOString(),
    },
    "app_startup",
  )

  // Log user interactions
  logger.info(
    "User uploaded file",
    {
      fileName: "animation.json",
      fileSize: 1024000,
      fileType: "application/json",
    },
    "file_upload",
  )

  // Log AI interactions
  logger.aiRequest(
    "claude",
    "generateNames",
    { animationName: "MyAnimation" },
    new Date(),
  )

  // Log performance metrics
  logger.performance("total_operation", 5000, {
    breakdown: {
      file_parsing: 200,
      ai_request: 3000,
      response_processing: 500,
      ui_update: 300,
    },
  })
}

// Export all examples for easy testing
export const loggingExamples = {
  basicLoggingExample,
  aiLoggingExample,
  animationAnalysisExample,
  logRotationExample,
  sessionManagementExample,
  errorHandlingExample,
  performanceMonitoringExample,
  aiAnalysisSummaryExample,
  customContextExample,
  applicationIntegrationExample,
}

export default loggingExamples

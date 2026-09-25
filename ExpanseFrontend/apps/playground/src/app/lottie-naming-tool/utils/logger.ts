/**
 * Comprehensive Logging System for Lottie Naming Tool
 * Provides structured logging with backend persistence and AI-readable format
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  context: string
  message: string
  data?: any
  sessionId: string
  userId?: string
  operation?: string
  duration?: number
}

export interface LoggerConfig {
  level: LogLevel
  enableConsoleLogging: boolean
  enableBackendLogging: boolean
  backendUrl: string
  sessionId: string
  userId?: string
  batchSize: number
  flushInterval: number // in milliseconds
}

class LottieLogger {
  private config: LoggerConfig
  private sessionStartTime: Date
  private logs: LogEntry[] = []
  private batchTimer?: NodeJS.Timeout

  constructor(config: Partial<LoggerConfig> = {}) {
    this.sessionStartTime = new Date()
    this.config = {
      level: LogLevel.INFO,
      enableConsoleLogging: true,
      enableBackendLogging: true,
      backendUrl: "/api/logs",
      sessionId: this.generateSessionId(),
      batchSize: 10,
      flushInterval: 5000, // 5 seconds
      ...config,
    }

    if (this.config.enableBackendLogging) {
      this.startBatchTimer()
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level
  }

  private formatLogEntry(entry: LogEntry): string {
    const levelStr = LogLevel[entry.level]
    const timestamp = entry.timestamp
    const context = entry.context
    const message = entry.message
    const dataStr = entry.data
      ? ` | Data: ${JSON.stringify(entry.data, null, 2)}`
      : ""
    const operation = entry.operation ? ` | Operation: ${entry.operation}` : ""
    const duration = entry.duration ? ` | Duration: ${entry.duration}ms` : ""

    return `[${timestamp}] ${levelStr} | ${context} | ${message}${dataStr}${operation}${duration}`
  }

  private writeToConsole(entry: LogEntry): void {
    if (!this.config.enableConsoleLogging) return

    const formatted = this.formatLogEntry(entry)
    const level = entry.level

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formatted)
        break
      case LogLevel.INFO:
        console.info(formatted)
        break
      case LogLevel.WARN:
        console.warn(formatted)
        break
      case LogLevel.ERROR:
        console.error(formatted)
        break
    }
  }

  private writeToBackend(entry: LogEntry): void {
    if (!this.config.enableBackendLogging) return

    // Add to batch
    this.logs.push(entry)

    // Send batch if it reaches the batch size
    if (this.logs.length >= this.config.batchSize) {
      this.flushLogs()
    }
  }

  private startBatchTimer(): void {
    if (this.batchTimer) {
      clearInterval(this.batchTimer)
    }

    this.batchTimer = setInterval(() => {
      this.flushLogs()
    }, this.config.flushInterval)
  }

  private async flushLogs(): Promise<void> {
    if (this.logs.length === 0) return

    const logsToSend = [...this.logs]
    this.logs = [] // Clear the batch

    try {
      const response = await fetch(this.config.backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: this.config.sessionId,
          userId: this.config.userId,
          logs: logsToSend,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        console.error(
          "Failed to send logs to backend:",
          response.status,
          response.statusText,
        )
        // Re-add logs to batch if sending failed
        this.logs.unshift(...logsToSend)
      }
    } catch (error) {
      console.error("Error sending logs to backend:", error)
      // Re-add logs to batch if sending failed
      this.logs.unshift(...logsToSend)
    }
  }

  private log(
    level: LogLevel,
    context: string,
    message: string,
    data?: any,
    operation?: string,
    duration?: number,
  ): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      data,
      sessionId: this.config.sessionId,
      userId: this.config.userId,
      operation,
      duration,
    }

    this.writeToConsole(entry)
    this.writeToBackend(entry)
  }

  debug(
    context: string,
    message: string,
    data?: any,
    operation?: string,
  ): void {
    this.log(LogLevel.DEBUG, context, message, data, operation)
  }

  info(context: string, message: string, data?: any, operation?: string): void {
    this.log(LogLevel.INFO, context, message, data, operation)
  }

  warn(context: string, message: string, data?: any, operation?: string): void {
    this.log(LogLevel.WARN, context, message, data, operation)
  }

  error(
    context: string,
    message: string,
    error?: Error,
    operation?: string,
  ): void {
    const errorData = error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : undefined

    this.log(LogLevel.ERROR, context, message, errorData, operation)
  }

  // AI-specific logging methods
  aiRequest(
    provider: string,
    operation: string,
    requestData: any,
    startTime: Date,
  ): void {
    this.info(
      "AI_REQUEST",
      `Starting ${provider} ${operation}`,
      {
        provider,
        operation,
        requestSize: JSON.stringify(requestData).length,
        timestamp: startTime.toISOString(),
      },
      operation,
    )
  }

  aiResponse(
    provider: string,
    operation: string,
    responseData: any,
    duration: number,
    success: boolean,
  ): void {
    const level = success ? LogLevel.INFO : LogLevel.ERROR
    const message = success
      ? `Completed ${provider} ${operation}`
      : `Failed ${provider} ${operation}`

    // Log the full AI response data
    this.log(
      level,
      "AI_RESPONSE",
      message,
      {
        provider,
        operation,
        responseSize: JSON.stringify(responseData).length,
        success,
        // Force include all response data
        fullResponse: responseData,
        componentNames: responseData?.componentNames || [],
        componentNamesCount: responseData?.componentNames?.length || 0,
        description: responseData?.description || null,
        timeline: responseData?.timeline || [],
        recommendations: responseData?.recommendations || [],
        // Include any additional response breakdown data
        responseBreakdown: responseData?.responseBreakdown || null,
        sampleComponentNames: responseData?.sampleComponentNames || [],
      },
      operation,
      duration,
    )
  }

  aiStreaming(
    provider: string,
    operation: string,
    chunk: string,
    totalLength: number,
  ): void {
    this.debug(
      "AI_STREAMING",
      `Streaming ${provider} ${operation}`,
      {
        provider,
        operation,
        chunkLength: chunk.length,
        totalLength,
        progress:
          totalLength > 0
            ? ((chunk.length / totalLength) * 100).toFixed(2) + "%"
            : "unknown",
      },
      operation,
    )
  }

  // Animation-specific logging
  animationLoad(
    animationName: string,
    fileSize: number,
    layerCount: number,
  ): void {
    this.info(
      "ANIMATION_LOAD",
      `Loaded animation: ${animationName}`,
      {
        animationName,
        fileSize,
        layerCount,
      },
      "animation_load",
    )
  }

  animationAnalysis(
    animationName: string,
    phase: string,
    progress: number,
    details?: any,
  ): void {
    this.info(
      "ANIMATION_ANALYSIS",
      `Analysis phase: ${phase}`,
      {
        animationName,
        phase,
        progress,
        details,
      },
      "animation_analysis",
    )
  }

  componentNaming(
    animationName: string,
    componentCount: number,
    themeableCount: number,
  ): void {
    this.info(
      "COMPONENT_NAMING",
      `Generated names for ${componentCount} components`,
      {
        animationName,
        componentCount,
        themeableCount,
        themeablePercentage:
          componentCount > 0
            ? ((themeableCount / componentCount) * 100).toFixed(2) + "%"
            : "0%",
      },
      "component_naming",
    )
  }

  // Export and validation logging
  exportStart(
    animationName: string,
    format: string,
    componentCount: number,
  ): void {
    this.info(
      "EXPORT_START",
      `Starting export in ${format} format`,
      {
        animationName,
        format,
        componentCount,
      },
      "export",
    )
  }

  exportComplete(
    animationName: string,
    format: string,
    fileSize: number,
    duration: number,
  ): void {
    this.log(
      LogLevel.INFO,
      "EXPORT_COMPLETE",
      `Export completed successfully`,
      {
        animationName,
        format,
        fileSize,
      },
      "export",
      duration,
    )
  }

  validationResult(
    animationName: string,
    totalComponents: number,
    namedComponents: number,
    issues: string[],
  ): void {
    const completionRate =
      totalComponents > 0
        ? ((namedComponents / totalComponents) * 100).toFixed(2) + "%"
        : "0%"

    this.info(
      "VALIDATION_RESULT",
      `Validation completed: ${completionRate} named`,
      {
        animationName,
        totalComponents,
        namedComponents,
        completionRate,
        issues,
      },
      "validation",
    )
  }

  // Performance logging
  performance(operation: string, duration: number, details?: any): void {
    const level = duration > 5000 ? LogLevel.WARN : LogLevel.INFO
    const message = `Performance: ${operation} took ${duration}ms`

    this.log(
      level,
      "PERFORMANCE",
      message,
      {
        operation,
        duration,
        details,
      },
      operation,
      duration,
    )
  }

  // Session management
  sessionStart(): void {
    this.info(
      "SESSION_START",
      "New session started",
      {
        sessionId: this.config.sessionId,
        startTime: this.sessionStartTime.toISOString(),
      },
      "session_start",
    )
  }

  sessionEnd(): void {
    const duration = Date.now() - this.sessionStartTime.getTime()
    this.log(
      LogLevel.INFO,
      "SESSION_END",
      "Session ended",
      {
        sessionId: this.config.sessionId,
        duration: duration + "ms",
        endTime: new Date().toISOString(),
      },
      "session_end",
      duration,
    )

    // Flush any remaining logs
    this.flushLogs()
  }

  // Force flush logs immediately
  async forceFlush(): Promise<void> {
    await this.flushLogs()
  }

  // Get current batch size
  getBatchSize(): number {
    return this.logs.length
  }

  // Update configuration
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig }

    if (this.config.enableBackendLogging) {
      this.startBatchTimer()
    } else {
      if (this.batchTimer) {
        clearInterval(this.batchTimer)
        this.batchTimer = undefined
      }
    }
  }

  // Cleanup
  destroy(): void {
    if (this.batchTimer) {
      clearInterval(this.batchTimer)
      this.batchTimer = undefined
    }

    // Flush any remaining logs
    this.flushLogs()
  }
}

// Create default logger instance
export const logger = new LottieLogger({
  level:
    process.env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsoleLogging: true,
  enableBackendLogging: true,
  backendUrl: "/api/logs",
  batchSize: 10,
  flushInterval: 5000,
})

// Create context-specific loggers
export const createLogger = (
  context: string,
  config?: Partial<LoggerConfig>,
) => {
  const loggerInstance = new LottieLogger(config)

  return {
    debug: (message: string, data?: any, operation?: string) =>
      loggerInstance.debug(context, message, data, operation),
    info: (message: string, data?: any, operation?: string) =>
      loggerInstance.info(context, message, data, operation),
    warn: (message: string, data?: any, operation?: string) =>
      loggerInstance.warn(context, message, data, operation),
    error: (message: string, error?: Error, operation?: string) =>
      loggerInstance.error(
        context,
        error?.message || message,
        error,
        operation,
      ),

    // AI-specific methods
    aiRequest: (
      provider: string,
      operation: string,
      requestData: any,
      startTime: Date,
    ) => loggerInstance.aiRequest(provider, operation, requestData, startTime),
    aiResponse: (
      provider: string,
      operation: string,
      responseData: any,
      duration: number,
      success: boolean,
    ) =>
      loggerInstance.aiResponse(
        provider,
        operation,
        responseData,
        duration,
        success,
      ),
    aiStreaming: (
      provider: string,
      operation: string,
      chunk: string,
      totalLength: number,
    ) => loggerInstance.aiStreaming(provider, operation, chunk, totalLength),

    // Animation-specific methods
    animationLoad: (
      animationName: string,
      fileSize: number,
      layerCount: number,
    ) => loggerInstance.animationLoad(animationName, fileSize, layerCount),
    animationAnalysis: (
      animationName: string,
      phase: string,
      progress: number,
      details?: any,
    ) =>
      loggerInstance.animationAnalysis(animationName, phase, progress, details),
    componentNaming: (
      animationName: string,
      componentCount: number,
      themeableCount: number,
    ) =>
      loggerInstance.componentNaming(
        animationName,
        componentCount,
        themeableCount,
      ),

    // Export and validation
    exportStart: (
      animationName: string,
      format: string,
      componentCount: number,
    ) => loggerInstance.exportStart(animationName, format, componentCount),
    exportComplete: (
      animationName: string,
      format: string,
      fileSize: number,
      duration: number,
    ) =>
      loggerInstance.exportComplete(animationName, format, fileSize, duration),
    validationResult: (
      animationName: string,
      totalComponents: number,
      namedComponents: number,
      issues: string[],
    ) =>
      loggerInstance.validationResult(
        animationName,
        totalComponents,
        namedComponents,
        issues,
      ),

    // Performance
    performance: (operation: string, duration: number, details?: any) =>
      loggerInstance.performance(operation, duration, details),

    // Session management
    sessionStart: () => loggerInstance.sessionStart(),
    sessionEnd: () => loggerInstance.sessionEnd(),

    // Utility methods
    forceFlush: () => loggerInstance.forceFlush(),
    getBatchSize: () => loggerInstance.getBatchSize(),
    updateConfig: (config: Partial<LoggerConfig>) =>
      loggerInstance.updateConfig(config),
    destroy: () => loggerInstance.destroy(),
  }
}

// Export default logger instance
export default logger

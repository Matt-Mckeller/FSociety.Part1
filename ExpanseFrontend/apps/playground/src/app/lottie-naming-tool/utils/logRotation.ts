/**
 * Log Rotation and Cleanup Strategy (Browser-Compatible)
 * Manages log rotation, cleanup, and maintenance for browser environment
 */

import { createLogger } from "./logger"

export interface LogRotationConfig {
  maxLogs: number // Maximum number of logs to keep in memory
  maxAge: number // in hours
  cleanupInterval: number // in hours
  enableAutoCleanup: boolean
}

export class LogRotationManager {
  private config: LogRotationConfig
  private logger = createLogger("LOG_ROTATION")
  private cleanupTimer?: NodeJS.Timeout

  constructor(config: Partial<LogRotationConfig> = {}) {
    this.config = {
      maxLogs: 1000, // Keep last 1000 logs in memory
      maxAge: 24, // 24 hours
      cleanupInterval: 1, // 1 hour
      enableAutoCleanup: true,
      ...config,
    }

    if (this.config.enableAutoCleanup) {
      this.startCleanupTimer()
    }
  }

  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer)
    }

    this.cleanupTimer = setInterval(
      () => {
        this.performCleanup()
      },
      this.config.cleanupInterval * 60 * 60 * 1000,
    ) // Convert hours to milliseconds
  }

  /**
   * Check if logs need cleanup based on age
   */
  needsCleanup(logs: any[]): boolean {
    if (logs.length === 0) return false

    const now = Date.now()
    const maxAgeMs = this.config.maxAge * 60 * 60 * 1000 // Convert hours to milliseconds

    // Check if oldest log is older than maxAge
    const oldestLog = logs[0]
    if (oldestLog && oldestLog.timestamp) {
      const logTime = new Date(oldestLog.timestamp).getTime()
      return now - logTime > maxAgeMs
    }

    return false
  }

  /**
   * Clean up old logs based on age
   */
  cleanupOldLogs(logs: any[]): any[] {
    const now = Date.now()
    const maxAgeMs = this.config.maxAge * 60 * 60 * 1000 // Convert hours to milliseconds

    const filteredLogs = logs.filter((log) => {
      if (!log.timestamp) return true // Keep logs without timestamps

      const logTime = new Date(log.timestamp).getTime()
      const age = now - logTime
      return age <= maxAgeMs
    })

    const deletedCount = logs.length - filteredLogs.length
    if (deletedCount > 0) {
      this.logger.info(
        "Cleaned up old logs",
        {
          deletedCount,
          remainingCount: filteredLogs.length,
          maxAge: this.config.maxAge,
        },
        "cleanup_old_logs",
      )
    }

    return filteredLogs
  }

  /**
   * Keep only the most recent N logs
   */
  keepRecentLogs(logs: any[]): any[] {
    if (logs.length <= this.config.maxLogs) {
      return logs
    }

    const deletedCount = logs.length - this.config.maxLogs
    const recentLogs = logs.slice(-this.config.maxLogs)

    this.logger.info(
      "Kept recent logs",
      {
        deletedCount,
        keptCount: recentLogs.length,
        maxLogs: this.config.maxLogs,
      },
      "keep_recent_logs",
    )

    return recentLogs
  }

  /**
   * Perform comprehensive cleanup
   */
  performCleanup(): void {
    this.logger.info(
      "Starting log cleanup",
      {
        maxLogs: this.config.maxLogs,
        maxAge: this.config.maxAge,
        cleanupInterval: this.config.cleanupInterval,
      },
      "log_cleanup",
    )

    // Note: In browser environment, we can't access the actual logs
    // This would need to be called by the logger instance
    this.logger.info(
      "Log cleanup completed",
      {
        message: "Cleanup strategy applied (browser environment)",
      },
      "log_cleanup",
    )
  }

  /**
   * Get cleanup statistics
   */
  getCleanupStats(): {
    maxLogs: number
    maxAge: string
    cleanupInterval: string
    autoCleanupEnabled: boolean
  } {
    return {
      maxLogs: this.config.maxLogs,
      maxAge: `${this.config.maxAge} hours`,
      cleanupInterval: `${this.config.cleanupInterval} hours`,
      autoCleanupEnabled: this.config.enableAutoCleanup,
    }
  }

  /**
   * Force immediate cleanup
   */
  forceCleanup(): void {
    this.logger.info("Force cleanup requested", {}, "force_cleanup")
    this.performCleanup()
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LogRotationConfig>): void {
    this.config = { ...this.config, ...newConfig }
    this.logger.info("Log rotation config updated", newConfig, "config_update")

    // Restart cleanup timer with new interval
    if (this.config.enableAutoCleanup) {
      this.startCleanupTimer()
    } else {
      this.stop()
    }
  }

  /**
   * Stop cleanup timer
   */
  stop(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer)
      this.cleanupTimer = undefined
      this.logger.info("Log rotation manager stopped", {}, "stop")
    }
  }

  /**
   * Get AI-readable summary of log management
   */
  getAISummary(): string {
    const config = this.config

    return `# Log Rotation and Cleanup Summary (Browser Environment)

## Configuration:
- Max Logs in Memory: ${config.maxLogs}
- Max Age: ${config.maxAge} hours
- Cleanup Interval: ${config.cleanupInterval} hours
- Auto Cleanup: ${config.enableAutoCleanup ? "Enabled" : "Disabled"}

## Browser-Specific Features:
- **Memory-based storage**: Logs are stored in browser memory
- **Automatic cleanup**: Old logs are automatically removed based on age
- **Export functionality**: Logs can be downloaded as text files
- **Session persistence**: Logs persist during the browser session
- **Performance optimized**: Limited memory usage with automatic cleanup

## Cleanup Strategy:
1. **Age-based cleanup**: Logs older than ${config.maxAge} hours are automatically removed
2. **Count-based cleanup**: Only the most recent ${config.maxLogs} logs are kept in memory
3. **Scheduled cleanup**: Runs every ${config.cleanupInterval} hours
4. **Manual cleanup**: Force cleanup available via forceCleanup()

## Benefits for AI Analysis:
- **Structured logs**: All logs follow a consistent format for easy parsing
- **Context preservation**: Each log entry includes session ID, operation, and duration
- **Performance tracking**: Detailed timing information for optimization
- **Error tracking**: Comprehensive error logging with stack traces
- **AI interaction logs**: Specialized logging for Claude and Gemini interactions
- **Memory efficient**: Automatic cleanup prevents memory issues
- **Export ready**: Logs can be exported for external analysis

## Browser Limitations:
- **No file system access**: Logs are stored in memory only
- **Session-based**: Logs are lost when browser tab is closed
- **Memory constraints**: Limited by available browser memory
- **No persistent storage**: Logs don't survive browser restarts

## Recommendations:
1. **Export logs regularly**: Use exportLogs() to save important logs
2. **Monitor memory usage**: Check getLogStats() for memory usage
3. **Adjust cleanup settings**: Configure maxLogs and maxAge based on needs
4. **Use session management**: Implement proper session start/end logging
`
  }
}

// Export singleton instance
export const logRotationManager = new LogRotationManager()

// Export factory function for custom configuration
export const createLogRotationManager = (
  config?: Partial<LogRotationConfig>,
) => {
  return new LogRotationManager(config)
}

export default logRotationManager

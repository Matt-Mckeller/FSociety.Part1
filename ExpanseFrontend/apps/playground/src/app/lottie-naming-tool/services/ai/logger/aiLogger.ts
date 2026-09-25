/**
 * AI Operation Logger
 * Centralized logging for all AI operations
 */

export interface AIInteraction {
  requestId: string
  provider: "gemini" | "claude"
  operation: string
  startTime: number
  endTime?: number
  success?: boolean
  error?: string
}

/**
 * Logger for AI interactions
 */
class AILogger {
  private interactions: Map<string, AIInteraction> = new Map()

  /**
   * Log the start of an AI request
   */
  logRequest(
    provider: "gemini" | "claude",
    operation: string,
    request: any,
    requestId: string,
    isStreaming: boolean,
  ): AIInteraction {
    const interaction: AIInteraction = {
      requestId,
      provider,
      operation,
      startTime: Date.now(),
    }

    this.interactions.set(requestId, interaction)

    console.log(`[AI:${provider}] Starting ${operation}`, {
      requestId,
      isStreaming,
      inputSize: JSON.stringify(request).length,
    })

    return interaction
  }

  /**
   * Log the completion of an AI request
   */
  logResponse(
    interaction: AIInteraction,
    response: any,
    success: boolean,
    error?: string,
  ): void {
    interaction.endTime = Date.now()
    interaction.success = success
    interaction.error = error

    const duration = interaction.endTime - interaction.startTime

    if (success) {
      console.log(
        `[AI:${interaction.provider}] Completed ${interaction.operation}`,
        {
          requestId: interaction.requestId,
          durationMs: duration,
          outputSize: JSON.stringify(response).length,
        },
      )
    } else {
      console.error(
        `[AI:${interaction.provider}] Failed ${interaction.operation}`,
        {
          requestId: interaction.requestId,
          durationMs: duration,
          error,
        },
      )
    }
  }

  /**
   * Generate a unique request ID
   */
  generateRequestId(prefix: string = "ai"): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get all interactions (for debugging)
   */
  getInteractions(): AIInteraction[] {
    return Array.from(this.interactions.values())
  }

  /**
   * Clear old interactions
   */
  clearOldInteractions(maxAgeMs: number = 3600000): void {
    const now = Date.now()
    const idsToDelete: string[] = []

    this.interactions.forEach((interaction, id) => {
      if (now - interaction.startTime > maxAgeMs) {
        idsToDelete.push(id)
      }
    })

    idsToDelete.forEach((id) => this.interactions.delete(id))
  }
}

/**
 * Singleton logger instance
 */
export const aiLogger = new AILogger()

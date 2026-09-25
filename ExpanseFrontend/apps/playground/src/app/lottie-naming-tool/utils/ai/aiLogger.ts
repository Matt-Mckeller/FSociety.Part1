/**
 * AI-Specific Logging Utilities
 * Provides specialized logging for AI interactions and analysis
 */

import { createLogger } from "../logger"
import {
  NamingRequest,
  AINamingResponse,
  ComponentAnalysis,
  CapturedFrame,
} from "../../types/types"

export interface AIInteractionLog {
  provider: "claude" | "gemini"
  operation: string
  requestId: string
  startTime: Date
  endTime?: Date
  duration?: number
  success: boolean
  error?: string
  requestSize: number
  responseSize: number
  tokenUsage?: {
    input: number
    output: number
    total: number
  }
  streaming: boolean
  chunks?: number
}

export interface AnimationAnalysisLog {
  animationName: string
  sessionId: string
  analysisId: string
  startTime: Date
  endTime?: Date
  duration?: number
  phases: {
    name: string
    startTime: Date
    endTime?: Date
    duration?: number
    success: boolean
    details?: any
  }[]
  totalComponents: number
  namedComponents: number
  themeableComponents: number
  visionMode: boolean
  framesAnalyzed?: number
  recommendations?: number
  success: boolean
}

class AILogger {
  private logger = createLogger("AI_LOGGER")
  private interactions: AIInteractionLog[] = []
  private analyses: AnimationAnalysisLog[] = []

  // AI Interaction Logging
  logAIRequest(
    provider: "claude" | "gemini",
    operation: string,
    requestData: any,
    requestId: string,
    streaming: boolean = false,
  ): AIInteractionLog {
    const startTime = new Date()
    const requestSize = JSON.stringify(requestData).length

    this.logger.aiRequest(provider, operation, requestData, startTime)

    const interaction: AIInteractionLog = {
      provider,
      operation,
      requestId,
      startTime,
      success: false,
      requestSize,
      responseSize: 0,
      streaming,
      chunks: 0,
    }

    this.interactions.push(interaction)
    return interaction
  }

  logAIResponse(
    interaction: AIInteractionLog,
    responseData: any,
    success: boolean,
    error?: string,
    tokenUsage?: { input: number; output: number; total: number },
  ): void {
    const endTime = new Date()
    const duration = endTime.getTime() - interaction.startTime.getTime()
    const responseSize = JSON.stringify(responseData).length

    interaction.endTime = endTime
    interaction.duration = duration
    interaction.success = success
    interaction.error = error
    interaction.responseSize = responseSize
    interaction.tokenUsage = tokenUsage

    // Enhanced logging with full response details
    this.logger.aiResponse(
      interaction.provider,
      interaction.operation,
      {
        ...responseData,
        // Add detailed response breakdown
        responseBreakdown: {
          elementsCount: responseData?.elements
            ? Object.keys(responseData.elements).length
            : 0,
          descriptionLength: responseData?.description
            ? JSON.stringify(responseData.description).length
            : 0,
          timelineFramesCount: responseData?.timeline?.length || 0,
          recommendationsCount: responseData?.recommendations?.length || 0,
          fullResponseSize: responseSize,
        },
        // Include sample component names for debugging
        sampleElementNames: responseData?.elements
          ? Object.keys(responseData.elements).slice(0, 5)
          : [],
        // Include full response for complete debugging
        fullResponse: responseData,
      },
      duration,
      success,
    )

    // ADDITIONAL: Log AI response as a separate detailed entry
    this.logger.info(
      `Full AI response for ${interaction.provider} ${interaction.operation}`,
      {
        provider: interaction.provider,
        operation: interaction.operation,
        requestId: interaction.requestId,
        duration,
        success,
        responseSize,
        // Complete AI response data
        completeResponse: responseData,
        elements: responseData?.elements || {},
        description: responseData?.description || null,
        timeline: responseData?.timeline || [],
        recommendations: responseData?.recommendations || [],
        // Token usage if available
        tokenUsage: interaction.tokenUsage,
      },
      "ai_response_detailed",
    )

    if (error) {
      this.logger.error(
        `AI ${interaction.provider} ${interaction.operation} failed`,
        new Error(error),
        interaction.operation,
      )
    }
  }

  logAIStreaming(
    interaction: AIInteractionLog,
    chunk: string,
    totalLength: number,
  ): void {
    interaction.chunks = (interaction.chunks || 0) + 1

    this.logger.aiStreaming(
      interaction.provider,
      interaction.operation,
      chunk,
      totalLength,
    )
  }

  // Animation Analysis Logging
  startAnimationAnalysis(
    animationName: string,
    sessionId: string,
    visionMode: boolean = false,
    framesCount?: number,
  ): AnimationAnalysisLog {
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const startTime = new Date()

    const analysis: AnimationAnalysisLog = {
      animationName,
      sessionId,
      analysisId,
      startTime,
      duration: 0,
      phases: [],
      totalComponents: 0,
      namedComponents: 0,
      themeableComponents: 0,
      visionMode,
      framesAnalyzed: framesCount,
      success: false,
    }

    this.analyses.push(analysis)
    this.logger.animationAnalysis(animationName, "START", 0, {
      analysisId,
      visionMode,
      framesCount,
    })
    return analysis
  }

  logAnalysisPhase(
    analysis: AnimationAnalysisLog,
    phaseName: string,
    success: boolean,
    details?: any,
  ): void {
    const phaseStartTime = new Date()
    const phase = {
      name: phaseName,
      startTime: phaseStartTime,
      endTime: phaseStartTime,
      duration: 0,
      success,
      details,
    }

    analysis.phases.push(phase)
    this.logger.animationAnalysis(
      analysis.animationName,
      phaseName,
      (analysis.phases.length / 5) * 100, // Estimate progress
      { analysisId: analysis.analysisId, success, details },
    )
  }

  completeAnalysisPhase(
    analysis: AnimationAnalysisLog,
    phaseName: string,
    success: boolean,
    details?: any,
  ): void {
    const phase = analysis.phases.find(
      (p) => p.name === phaseName && !p.endTime,
    )
    if (phase) {
      phase.endTime = new Date()
      phase.duration = phase.endTime.getTime() - phase.startTime.getTime()
      phase.success = success
      phase.details = details

      this.logger.performance(`Analysis Phase: ${phaseName}`, phase.duration, {
        analysisId: analysis.analysisId,
        success,
        details,
      })
    }
  }

  completeAnimationAnalysis(
    analysis: AnimationAnalysisLog,
    response: AINamingResponse,
    success: boolean,
    error?: string,
  ): void {
    const endTime = new Date()
    const duration = endTime.getTime() - analysis.startTime.getTime()

    analysis.endTime = endTime
    analysis.duration = duration
    analysis.success = success

    // Update component counts
    const elements = Object.values(response.elements || {})
    analysis.totalComponents = elements.length
    analysis.namedComponents = elements.length
    analysis.themeableComponents = elements.filter((n) => n.isThemeable).length
    // Count recommendations from element groups instead of array length
    const elementGroups = response.recommendations?.elementGroups
    analysis.recommendations = elementGroups
      ? Object.keys(elementGroups.logicalGrouped || {}).length +
        Object.keys(elementGroups.sharedColor || {}).length +
        Object.keys(elementGroups.themingPriority || {}).length +
        Object.keys(elementGroups.visualHierarchy || {}).length
      : 0

    this.logger.componentNaming(
      analysis.animationName,
      analysis.namedComponents,
      analysis.themeableComponents,
    )

    this.logger.animationAnalysis(analysis.animationName, "COMPLETE", 100, {
      analysisId: analysis.analysisId,
      success,
      duration,
      totalComponents: analysis.totalComponents,
      themeableComponents: analysis.themeableComponents,
      recommendations: analysis.recommendations,
      error,
    })

    if (error) {
      this.logger.error(
        `Analysis failed for ${analysis.animationName}`,
        new Error(error),
        "animation_analysis",
      )
    }
  }

  // Performance and Error Logging
  logPerformance(operation: string, duration: number, details?: any): void {
    this.logger.performance(operation, duration, details)
  }

  logError(context: string, error: Error, operation?: string): void {
    this.logger.error(error.message, error, operation)
  }

  // AI Analysis Summary
  getAIAnalysisSummary(): string {
    const recentInteractions = this.interactions.slice(-10)
    const recentAnalyses = this.analyses.slice(-5)

    const summary = {
      session: {
        totalInteractions: this.interactions.length,
        successfulInteractions: this.interactions.filter((i) => i.success)
          .length,
        totalAnalyses: this.analyses.length,
        successfulAnalyses: this.analyses.filter((a) => a.success).length,
      },
      recentInteractions: recentInteractions.map((i) => ({
        provider: i.provider,
        operation: i.operation,
        duration: i.duration,
        success: i.success,
        requestSize: i.requestSize,
        responseSize: i.responseSize,
        streaming: i.streaming,
        chunks: i.chunks,
      })),
      recentAnalyses: recentAnalyses.map((a) => ({
        animationName: a.animationName,
        duration: a.duration,
        success: a.success,
        totalComponents: a.totalComponents,
        themeableComponents: a.themeableComponents,
        phases: a.phases.length,
        visionMode: a.visionMode,
      })),
    }

    return `# AI Analysis Summary

## Session Statistics:
- Total AI Interactions: ${summary.session.totalInteractions}
- Successful Interactions: ${summary.session.successfulInteractions}
- Success Rate: ${summary.session.totalInteractions > 0 ? ((summary.session.successfulInteractions / summary.session.totalInteractions) * 100).toFixed(2) + "%" : "0%"}

- Total Animations Analyzed: ${summary.session.totalAnalyses}
- Successful Analyses: ${summary.session.successfulAnalyses}
- Analysis Success Rate: ${summary.session.totalAnalyses > 0 ? ((summary.session.successfulAnalyses / summary.session.totalAnalyses) * 100).toFixed(2) + "%" : "0%"}

## Recent AI Interactions:
${recentInteractions
  .map(
    (i) =>
      `- ${i.provider.toUpperCase()} ${i.operation}: ${i.success ? "SUCCESS" : "FAILED"} (${i.duration}ms, ${i.requestSize}→${i.responseSize} bytes${i.streaming ? ", streaming" : ""})`,
  )
  .join("\n")}

## Recent Animation Analyses:
${recentAnalyses
  .map(
    (a) =>
      `- ${a.animationName}: ${a.success ? "SUCCESS" : "FAILED"} (${a.duration}ms, ${a.totalComponents} components, ${a.themeableComponents} themeable, ${a.phases} phases${a.visionMode ? ", vision mode" : ""})`,
  )
  .join("\n")}

## Performance Insights:
- Average interaction duration: ${recentInteractions.length > 0 ? (recentInteractions.reduce((sum, i) => sum + (i.duration || 0), 0) / recentInteractions.length).toFixed(2) + "ms" : "N/A"}
- Average analysis duration: ${recentAnalyses.length > 0 ? (recentAnalyses.reduce((sum, a) => sum + (a.duration || 0), 0) / recentAnalyses.length).toFixed(2) + "ms" : "N/A"}
- Streaming interactions: ${recentInteractions.filter((i) => i.streaming).length}/${recentInteractions.length}
- Vision mode analyses: ${recentAnalyses.filter((a) => a.visionMode).length}/${recentAnalyses.length}
`
  }

  // Get logs for AI analysis
  getLogsForAI(): string {
    const aiSummary = this.getAIAnalysisSummary()

    return `${aiSummary}

## Note: Detailed session logs are available in the file system logs directory`
  }

  // Clear old data to prevent memory leaks
  cleanup(maxInteractions: number = 100, maxAnalyses: number = 50): void {
    if (this.interactions.length > maxInteractions) {
      this.interactions = this.interactions.slice(-maxInteractions)
    }
    if (this.analyses.length > maxAnalyses) {
      this.analyses = this.analyses.slice(-maxAnalyses)
    }
  }
}

// Export singleton instance
export const aiLogger = new AILogger()

// Export factory function for context-specific loggers
export const createAILogger = (context: string) => {
  const logger = createLogger(context)

  return {
    ...logger,
    aiLogger,
    getAIAnalysisSummary: () => aiLogger.getAIAnalysisSummary(),
    getLogsForAI: () => aiLogger.getLogsForAI(),
  }
}

export default aiLogger

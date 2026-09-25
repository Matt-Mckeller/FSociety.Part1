/**
 * Translation Provider Interface
 * 
 * Provider-agnostic abstraction for translation services.
 */

export interface TranslationOptions {
  /** Source language (ISO 639-1), auto-detect if not specified */
  sourceLanguage?: string;
  /** Target language (ISO 639-1) */
  targetLanguage: string;
  /** Format hint (plain text vs HTML) */
  format?: 'text' | 'html';
}

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
  provider: string;
}

export interface BatchTranslationResult {
  translations: TranslationResult[];
  provider: string;
}

/**
 * Abstract base interface for translation providers
 */
export interface TranslationProvider {
  /** Provider identifier (e.g., 'google-translate', 'deepl') */
  readonly name: string;
  
  /** Check if provider is available */
  isAvailable(): Promise<boolean>;
  
  /** List supported language codes */
  getSupportedLanguages(): string[];
  
  /**
   * Translate a single text string
   * @param text - Text to translate
   * @param options - Translation options
   */
  translate(
    text: string,
    options: TranslationOptions,
  ): Promise<TranslationResult>;
  
  /**
   * Translate multiple texts in batch
   * @param texts - Array of texts to translate
   * @param options - Translation options
   */
  translateBatch(
    texts: string[],
    options: TranslationOptions,
  ): Promise<BatchTranslationResult>;
}

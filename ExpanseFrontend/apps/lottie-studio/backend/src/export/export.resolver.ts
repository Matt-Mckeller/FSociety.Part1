/**
 * Export GraphQL Resolver
 */

import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { ExportService } from './export.service';
import { LottieService } from '../lottie/lottie.service';

@Resolver()
export class ExportResolver {
  constructor(
    private exportService: ExportService,
    private lottieService: LottieService,
  ) {}

  @Mutation('exportAnimation')
  async exportAnimation(
    @Args('animationId', { type: () => ID }) animationId: string,
    @Args('options') options?: ExportOptionsInput,
  ): Promise<ExportResultDto> {
    const animation = this.lottieService.getAnimation(animationId);
    if (!animation) {
      throw new Error(`Animation not found: ${animationId}`);
    }

    const result = await this.exportService.generateExportFiles(animation, {
      includeSchema: options?.includeSchema ?? true,
      includeComponent: options?.includeComponent ?? true,
      includeThemeConfigs: options?.includeThemeConfigs ?? true,
      includeThemesRegistry: options?.includeThemesRegistry ?? true,
      includeLottieJson: options?.includeLottieJson ?? true,
    });

    return {
      success: result.success,
      files: result.files.map((f) => ({
        filename: f.filename,
        path: f.path,
        content: f.content || '',
        type: f.type,
      })),
      errors: result.errors,
    };
  }
}

// Input and DTO types
interface ExportOptionsInput {
  includeSchema?: boolean;
  includeComponent?: boolean;
  includeThemeConfigs?: boolean;
  includeThemesRegistry?: boolean;
  includeLottieJson?: boolean;
}

interface ExportedFileDto {
  filename: string;
  path: string;
  content: string;
  type: string;
}

interface ExportResultDto {
  success: boolean;
  files: ExportedFileDto[];
  errors?: string[];
}

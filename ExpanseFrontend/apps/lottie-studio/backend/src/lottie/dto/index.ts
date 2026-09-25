/**
 * GraphQL DTOs for Lottie Module
 */

import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

// ============================================================================
// Output Types
// ============================================================================

@ObjectType()
export class MetadataDto {
  @Field()
  animationName: string;

  @Field(() => [String], { nullable: true })
  alternativeNames?: string[];

  @Field()
  description: string;

  @Field(() => [String])
  tags: string[];
}

@ObjectType()
export class ElementDto {
  @Field()
  name: string;

  @Field()
  path: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  alternativeNames?: string[];

  @Field({ nullable: true })
  originalColor?: string;

  @Field({ nullable: true })
  elementType?: string;

  @Field({ nullable: true })
  roleFunction?: string;

  @Field({ nullable: true })
  visualLevel?: string;

  @Field({ nullable: true })
  semanticRole?: string;

  @Field()
  isThemeable: boolean;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@ObjectType()
export class ThemeDto {
  @Field()
  themeId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  baseColor: string;

  @Field()
  mode: string;

  @Field({ nullable: true })
  reasoning?: string;

  @Field(() => [String])
  skippedElements: string[];

  // Colors is a JSON string for flexibility
  @Field()
  colorsJson: string;
}

@ObjectType()
export class AnimationDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  metadata?: MetadataDto;

  @Field(() => [ElementDto], { nullable: true })
  elements?: ElementDto[];

  @Field(() => [ThemeDto], { nullable: true })
  themes?: ThemeDto[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class ProcessingProgressDto {
  @Field()
  animationId: string;

  @Field()
  phase: string;

  @Field()
  progress: number;

  @Field()
  message: string;
}

// ============================================================================
// Input Types
// ============================================================================

@InputType()
export class HintsInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  purpose?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@InputType()
export class UploadAnimationInput {
  @Field()
  json: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  hints?: HintsInput;
}

@InputType()
export class PaletteColorsInput {
  @Field()
  primaryMain: string;

  @Field()
  primaryDark: string;

  @Field()
  primaryLight: string;

  @Field()
  primaryHighSat: string;

  @Field({ nullable: true })
  primaryExtra1?: string;

  @Field({ nullable: true })
  primaryExtra2?: string;

  @Field()
  secondaryMain: string;

  @Field()
  secondaryLight: string;

  @Field()
  secondaryDark: string;

  @Field()
  backgroundDefault: string;

  @Field()
  backgroundPaper: string;

  @Field()
  textPrimary: string;

  @Field()
  textSecondary: string;

  @Field()
  black: string;

  @Field()
  white: string;

  @Field()
  gray: string;

  @Field()
  gradientStart: string;

  @Field()
  gradientEnd: string;
}

@InputType()
export class ColorPaletteInput {
  @Field()
  id: string;

  @Field()
  baseColor: string;

  @Field()
  mode: string;

  @Field()
  name: string;

  @Field()
  colors: PaletteColorsInput;
}

@InputType()
export class GenerateThemesInput {
  @Field(() => [ColorPaletteInput])
  palettes: ColorPaletteInput[];

  @Field({ nullable: true, defaultValue: true })
  allowCreativeColors?: boolean;
}

# Lottie Naming Conventions

**Version:** 1.0  
**Last Updated:** October 10, 2025

---

## 🎯 Naming Philosophy

Names should be:

1. **Semantic**: Describe purpose, not implementation
2. **Hierarchical**: Include parent context
3. **Consistent**: Follow established patterns
4. **Discoverable**: Easy to find and understand
5. **Themeable**: Critical for fills/strokes/gradients

---

## 📐 Naming Pattern

### Base Pattern

```
[ComponentType][Location][Purpose][Detail]
```

### Component Breakdown

- **ComponentType**: Layer, Group, Fill, Stroke, etc.
- **Location**: Left/Right, Inner/Outer, Top/Bottom
- **Purpose**: What it does (Glow, Shadow, Outline)
- **Detail**: Additional specificity (Light, Dark, Soft)

---

## 🎨 Examples by Component Level

### Level 1: Composition

```typescript
// Usually already well-named
✅ Main
✅ AngelWingsAnimation
✅ LogoIntro

// Rename if generic
❌ Comp 1 → ✅ AngelWingsMain
```

### Level 2: Layer (CRITICAL)

```typescript
// Clear hierarchy and purpose
✅ HaloContainer
✅ LeftWingOuterFeather
✅ LeftWingMidOuterFeather
✅ LeftWingMidFeather
✅ LeftWingMidInnerFeather
✅ LeftWingInnerFeather
✅ RightWingInnerFeather
✅ RightWingMidInnerFeather
✅ RightWingMidFeather
✅ RightWingMidOuterFeather
✅ RightWingOuterFeather

// Generic - avoid
❌ Layer 1
❌ Shape Layer 2
❌ Circle_Layer
```

### Level 3: Shape Group

```typescript
// Describe contents
✅ HaloGradientGroup
✅ FeatherOutlineGroup
✅ InnerGlowGroup
✅ WingBaseGroup
✅ ShadowEffectGroup

// Too generic
❌ Group 1
❌ Shape Group
❌ gr
```

### Level 4: Shape Element

```typescript
// Shape type + purpose
✅ HaloEllipse
✅ WingFeatherPath
✅ OuterRingCircle
✅ GlowRectangle
✅ FeatherBezierCurve

// Just type name
❌ Ellipse 1
❌ Path
❌ Rectangle 2
```

### Level 5: Fill / Stroke / Gradient (CRITICAL FOR THEMING)

#### Fills

```typescript
// Semantic naming for theming
✅ HaloInnerGlow       // Darkest gradient stop
✅ HaloMidTone         // Middle gradient stop
✅ HaloOuterGlow       // Lightest gradient stop
✅ WingFeatherFill     // Wing solid fill
✅ BackgroundFill      // Background color
✅ AccentFill          // Accent color

// Generic - unusable for theming
❌ Fill 1
❌ Fill 2
❌ Gradient Fill
```

#### Strokes

```typescript
// Purpose-driven
✅ OutlineStroke
✅ InnerBorderStroke
✅ FeatherEdgeStroke
✅ ShadowStroke
✅ HighlightStroke

// Generic
❌ Stroke 1
❌ Stroke Outer
```

#### Gradients

```typescript
// Name the gradient container
✅ HaloGradient
✅ BackgroundGradient
✅ FeatherShadeGradient

// Name each color stop (in analysis/mapping)
✅ HaloGradientStop1_Inner
✅ HaloGradientStop2_Mid
✅ HaloGradientStop3_Outer

// Generic
❌ Gradient 1
❌ Radial Gradient
```

### Level 6: Transform Groups

```typescript
// Usually keep standard
✅ Transform

// Only rename if special purpose
✅ HaloRotationTransform
✅ WingAnimationTransform
✅ ScaleTransform

// Don't over-specify
❌ Layer_1_Transform
❌ Transform_1
```

### Level 7: Masks / Mattes

```typescript
// Describe masking purpose
✅ CircularRevealMask
✅ EdgeFadeMask
✅ FeatherClipMask
✅ GlowBoundsMask

// Generic
❌ Mask 1
❌ Matte Layer
```

### Level 8: Assets

```typescript
// Descriptive file purpose
✅ BackgroundTexture.png
✅ LogoImage.png
✅ FeatherPattern.svg

// Generic exports
❌ image_0.png
❌ asset_1.jpg
```

### Level 9: Effects

```typescript
// Usually well-named already
✅ GaussianBlur
✅ DropShadow
✅ OuterGlow

// Rename if generic
❌ Effect 1 → ✅ EdgeBlur
```

---

## 🎯 Special Cases

### AngelWingsHalo Specific

#### Halo Elements

```typescript
✅ HaloContainer          // Layer containing halo
✅ HaloGradientGroup      // Shape group for gradient
✅ HaloEllipse            // Ellipse shape element
✅ HaloGradient           // Gradient fill
✅ HaloInnerGlow          // Inner color stop (dark)
✅ HaloMidTone            // Middle color stop (main)
✅ HaloOuterGlow          // Outer color stop (light)
```

#### Wing Elements

```typescript
// Left wing (outer to inner)
✅ LeftWingOuterFeather
✅ LeftWingMidOuterFeather
✅ LeftWingMidFeather
✅ LeftWingMidInnerFeather
✅ LeftWingInnerFeather

// Right wing (mirror)
✅ RightWingInnerFeather
✅ RightWingMidInnerFeather
✅ RightWingMidFeather
✅ RightWingMidOuterFeather
✅ RightWingOuterFeather

// Wing fills (preserve white)
✅ LeftWingOuterFeatherFill
✅ LeftWingOuterFeatherStroke
```

### Gradient Naming Strategy

For multi-stop gradients that need theming:

1. **Container Name**: `[Element]Gradient`

   - Example: `HaloGradient`

2. **Stop Names**: `[Element][Position][Intensity]`

   - Example: `HaloInnerGlow` (position 0, darkest)
   - Example: `HaloMidTone` (position 0.5, main color)
   - Example: `HaloOuterGlow` (position 1, lightest)

3. **Mapping**: These names become theme mapping keys
   ```typescript
   elementMappings: {
     "HaloInnerGlow": "primary.dark",
     "HaloMidTone": "primary.main",
     "HaloOuterGlow": "primary.light",
   }
   ```

---

## 🚫 Anti-Patterns

### Don't Use Default Names

```typescript
❌ Layer 1, Layer 2, Layer 3
❌ Shape Layer, Shape Layer 2
❌ Fill 1, Fill 2
❌ Group, Group 2
❌ Path, Path 2
```

### Don't Use Abbreviations

```typescript
❌ HaloGrd
❌ LWingOut
❌ Fll1
❌ Strk
```

### Don't Use Technical IDs

```typescript
❌ layers[0]
❌ shape_ind_1
❌ fill_id_5
```

### Don't Duplicate Parent Names

```typescript
❌ HaloContainer > HaloContainerGroup > HaloContainerEllipse
✅ HaloContainer > HaloGradientGroup > HaloEllipse
```

---

## ✅ Naming Checklist

Before considering naming complete:

- [ ] All layers have semantic names
- [ ] All shape groups describe contents
- [ ] All fills/strokes have purpose-driven names
- [ ] Gradient stops identified for theming
- [ ] No default names remain ("Fill 1", "Layer 2")
- [ ] Location specified where relevant (Left/Right, Inner/Outer)
- [ ] Themeable elements clearly named
- [ ] Names match theme mapping configuration
- [ ] Consistent pattern throughout animation
- [ ] Human-readable and self-documenting

---

## 📊 Naming Priority Matrix

| Component Level         | Rename Priority | Rationale                              |
| ----------------------- | --------------- | -------------------------------------- |
| Fills/Strokes/Gradients | **CRITICAL**    | Required for theming                   |
| Layers                  | **HIGH**        | Needed for skip lists and organization |
| Shape Groups            | **HIGH**        | Organizational clarity                 |
| Shape Elements          | **MEDIUM**      | Helpful for precision targeting        |
| Masks/Mattes            | **MEDIUM**      | Important if used                      |
| Compositions            | **LOW**         | Usually already named                  |
| Transforms              | **LOW**         | Standard names work                    |
| Effects                 | **LOW**         | Rarely present                         |

---

## 🔄 Evolution Guidelines

As you name more animations, update this document with:

1. **New Patterns**: Document successful naming patterns
2. **Edge Cases**: Document special situations and solutions
3. **Examples**: Add examples from new animations
4. **Refinements**: Update conventions based on learnings

---

## 📚 References

- [Lottie Documentation](https://lottiefiles.github.io/lottie-docs/)
- [Project Plan](./PROJECT_PLAN.md)
- [Workflow Guide](./WORKFLOW.md)
- [Component Reference](../lottie-theming-system/COMPONENT_REFERENCE.md)

---

**Last Updated:** October 10, 2025  
**Version:** 1.0

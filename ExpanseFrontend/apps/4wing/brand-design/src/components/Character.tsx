'use client';

import { Box } from '@mui/material';

export interface CharacterConfig {
  // Body
  bodyColor: string;
  bodyColorLight: string;
  bodyColorDark: string;
  bodyWidth: number;
  bodyHeight: number;
  bodyRoundness: number;
  
  // Eyes
  eyeColor: string;
  eyeSize: number;
  eyeSpacing: number;
  eyeGlow: boolean;
  pupilSize: number;
  
  // Expression
  smileWidth: number;
  smileHeight: number;
  expression: 'happy' | 'calm' | 'curious' | 'excited';
  
  // Wings
  showWings: boolean;
  wingColor: string;
  wingSize: number;
  
  // Antenna/Ears
  showAntenna: boolean;
  antennaColor: string;
  
  // Status indicator
  showStatusLight: boolean;
  statusColor: string;
  
  // Animation
  animate: boolean;
}

export const defaultCharacterConfig: CharacterConfig = {
  bodyColor: '#7C3AED',
  bodyColorLight: '#A78BFA',
  bodyColorDark: '#5B21B6',
  bodyWidth: 200,
  bodyHeight: 240,
  bodyRoundness: 45,
  
  eyeColor: '#FFFFFF',
  eyeSize: 36,
  eyeSpacing: 50,
  eyeGlow: true,
  pupilSize: 14,
  
  smileWidth: 50,
  smileHeight: 18,
  expression: 'happy',
  
  showWings: true,
  wingColor: '#A78BFA',
  wingSize: 60,
  
  showAntenna: true,
  antennaColor: '#A78BFA',
  
  showStatusLight: true,
  statusColor: '#3B82F6',
  
  animate: true,
};

interface CharacterProps {
  config: CharacterConfig;
  scale?: number;
}

export default function Character({ config, scale = 1 }: CharacterProps) {
  const {
    bodyColor,
    bodyColorLight,
    bodyColorDark,
    bodyWidth,
    bodyHeight,
    bodyRoundness,
    eyeColor,
    eyeSize,
    eyeSpacing,
    eyeGlow,
    pupilSize,
    smileWidth,
    smileHeight,
    expression,
    showWings,
    wingColor,
    wingSize,
    showAntenna,
    antennaColor,
    showStatusLight,
    statusColor,
    animate,
  } = config;

  const scaledWidth = bodyWidth * scale;
  const scaledHeight = bodyHeight * scale;

  // Expression variations for eyes
  const getEyeExpression = () => {
    switch (expression) {
      case 'excited':
        return { scaleY: 1.1, pupilOffset: 0 };
      case 'curious':
        return { scaleY: 1, pupilOffset: 3 };
      case 'calm':
        return { scaleY: 0.85, pupilOffset: 0 };
      default: // happy
        return { scaleY: 1, pupilOffset: 0 };
    }
  };

  const eyeExpr = getEyeExpression();

  return (
    <Box
      className={animate ? 'animate-float' : ''}
      sx={{
        position: 'relative',
        width: scaledWidth + (showWings ? wingSize * 2 * scale : 0),
        height: scaledHeight + (showAntenna ? 40 * scale : 0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* SVG Character */}
      <svg
        width={scaledWidth + (showWings ? wingSize * 2 * scale : 0)}
        height={scaledHeight + (showAntenna ? 40 * scale : 0)}
        viewBox={`0 0 ${bodyWidth + (showWings ? wingSize * 2 : 0)} ${bodyHeight + (showAntenna ? 40 : 0)}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Body gradient */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={bodyColorLight} />
            <stop offset="50%" stopColor={bodyColor} />
            <stop offset="100%" stopColor={bodyColorDark} />
          </linearGradient>
          
          {/* Wing gradient */}
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={wingColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={bodyColor} stopOpacity="0.4" />
          </linearGradient>
          
          {/* Eye glow */}
          {eyeGlow && (
            <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
          
          {/* Status light glow */}
          <filter id="statusGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor={bodyColor} floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Center offset for wings */}
        <g transform={`translate(${showWings ? wingSize : 0}, ${showAntenna ? 40 : 0})`}>
          
          {/* Left Wing */}
          {showWings && (
            <ellipse
              cx={-wingSize * 0.3}
              cy={bodyHeight * 0.5}
              rx={wingSize}
              ry={wingSize * 0.6}
              fill="url(#wingGradient)"
              transform={`rotate(-20, ${-wingSize * 0.3}, ${bodyHeight * 0.5})`}
              style={{
                animation: animate ? 'wingFlap 2s ease-in-out infinite' : 'none',
              }}
            />
          )}
          
          {/* Right Wing */}
          {showWings && (
            <ellipse
              cx={bodyWidth + wingSize * 0.3}
              cy={bodyHeight * 0.5}
              rx={wingSize}
              ry={wingSize * 0.6}
              fill="url(#wingGradient)"
              transform={`rotate(20, ${bodyWidth + wingSize * 0.3}, ${bodyHeight * 0.5})`}
              style={{
                animation: animate ? 'wingFlap 2s ease-in-out infinite reverse' : 'none',
              }}
            />
          )}

          {/* Antenna / Ears */}
          {showAntenna && (
            <>
              {/* Left ear */}
              <ellipse
                cx={bodyWidth * 0.25}
                cy={-10}
                rx={18}
                ry={25}
                fill={antennaColor}
                transform={`rotate(-15, ${bodyWidth * 0.25}, -10)`}
              />
              <ellipse
                cx={bodyWidth * 0.25}
                cy={-8}
                rx={10}
                ry={16}
                fill={bodyColorLight}
                opacity="0.5"
                transform={`rotate(-15, ${bodyWidth * 0.25}, -8)`}
              />
              {/* Right ear */}
              <ellipse
                cx={bodyWidth * 0.75}
                cy={-10}
                rx={18}
                ry={25}
                fill={antennaColor}
                transform={`rotate(15, ${bodyWidth * 0.75}, -10)`}
              />
              <ellipse
                cx={bodyWidth * 0.75}
                cy={-8}
                rx={10}
                ry={16}
                fill={bodyColorLight}
                opacity="0.5"
                transform={`rotate(15, ${bodyWidth * 0.75}, -8)`}
              />
            </>
          )}

          {/* Main Body */}
          <rect
            x="0"
            y="0"
            width={bodyWidth}
            height={bodyHeight}
            rx={bodyRoundness}
            ry={bodyRoundness}
            fill="url(#bodyGradient)"
            filter="url(#shadow)"
            stroke={bodyColorLight}
            strokeWidth="2"
            strokeOpacity="0.3"
          />

          {/* Belly highlight */}
          <ellipse
            cx={bodyWidth / 2}
            cy={bodyHeight * 0.65}
            rx={bodyWidth * 0.35}
            ry={bodyHeight * 0.25}
            fill={bodyColorLight}
            opacity="0.15"
          />

          {/* Eyes */}
          <g transform={`translate(${bodyWidth / 2}, ${bodyHeight * 0.35})`}>
            {/* Left Eye */}
            <g transform={`translate(${-eyeSpacing / 2}, 0) scale(1, ${eyeExpr.scaleY})`}>
              <circle
                cx="0"
                cy="0"
                r={eyeSize / 2}
                fill={eyeColor}
                filter={eyeGlow ? 'url(#eyeGlow)' : undefined}
              />
              {/* Pupil */}
              <circle
                cx={eyeExpr.pupilOffset}
                cy={eyeExpr.pupilOffset}
                r={pupilSize / 2}
                fill={bodyColorDark}
              />
              {/* Eye shine */}
              <circle
                cx={-pupilSize * 0.3}
                cy={-pupilSize * 0.3}
                r={pupilSize * 0.25}
                fill="#FFFFFF"
              />
            </g>
            
            {/* Right Eye */}
            <g transform={`translate(${eyeSpacing / 2}, 0) scale(1, ${eyeExpr.scaleY})`}>
              <circle
                cx="0"
                cy="0"
                r={eyeSize / 2}
                fill={eyeColor}
                filter={eyeGlow ? 'url(#eyeGlow)' : undefined}
              />
              {/* Pupil */}
              <circle
                cx={eyeExpr.pupilOffset}
                cy={eyeExpr.pupilOffset}
                r={pupilSize / 2}
                fill={bodyColorDark}
              />
              {/* Eye shine */}
              <circle
                cx={-pupilSize * 0.3}
                cy={-pupilSize * 0.3}
                r={pupilSize * 0.25}
                fill="#FFFFFF"
              />
            </g>
          </g>

          {/* Smile */}
          <path
            d={
              expression === 'calm'
                ? `M ${bodyWidth / 2 - smileWidth / 2} ${bodyHeight * 0.58} 
                   Q ${bodyWidth / 2} ${bodyHeight * 0.58}, 
                     ${bodyWidth / 2 + smileWidth / 2} ${bodyHeight * 0.58}`
                : expression === 'excited'
                ? `M ${bodyWidth / 2 - smileWidth / 2} ${bodyHeight * 0.55} 
                   Q ${bodyWidth / 2} ${bodyHeight * 0.55 + smileHeight * 1.5}, 
                     ${bodyWidth / 2 + smileWidth / 2} ${bodyHeight * 0.55}`
                : `M ${bodyWidth / 2 - smileWidth / 2} ${bodyHeight * 0.55} 
                   Q ${bodyWidth / 2} ${bodyHeight * 0.55 + smileHeight}, 
                     ${bodyWidth / 2 + smileWidth / 2} ${bodyHeight * 0.55}`
            }
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheek blush */}
          <ellipse
            cx={bodyWidth * 0.2}
            cy={bodyHeight * 0.5}
            rx={15}
            ry={8}
            fill="#EC4899"
            opacity="0.2"
          />
          <ellipse
            cx={bodyWidth * 0.8}
            cy={bodyHeight * 0.5}
            rx={15}
            ry={8}
            fill="#EC4899"
            opacity="0.2"
          />

          {/* Status Light */}
          {showStatusLight && (
            <circle
              className={animate ? 'animate-pulse' : ''}
              cx={bodyWidth * 0.85}
              cy={bodyHeight * 0.12}
              r={8}
              fill={statusColor}
              filter="url(#statusGlow)"
            />
          )}
        </g>

        {/* Wing animation keyframes */}
        <style>
          {`
            @keyframes wingFlap {
              0%, 100% { transform: rotate(-20deg) translateY(0); }
              50% { transform: rotate(-15deg) translateY(-5px); }
            }
          `}
        </style>
      </svg>
    </Box>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import type { Position } from '@expanse/shell';
import { useNextNavigation } from '../hooks/useNextNavigation';

interface AppRouterLinkProps {
  position: Position;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  prefetch?: boolean;
}

/**
 * Link component for App Router with grid navigation
 * 
 * Wraps Next.js Link with grid position awareness
 * 
 * @example
 * ```tsx
 * <AppRouterLink position={{ x: 1, y: 0 }}>
 *   About
 * </AppRouterLink>
 * ```
 */
export function AppRouterLink({
  position,
  children,
  className,
  activeClassName,
  prefetch = true,
}: AppRouterLinkProps) {
  const { position: currentPosition, navigateTo } = useNextNavigation();
  
  // Check if this link points to current position
  const isActive = 
    currentPosition.x === position.x && 
    currentPosition.y === position.y;

  const finalClassName = [
    className,
    isActive && activeClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(position);
  };

  const LinkComponent = Link as any;
  
  return (
    <LinkComponent
      href="#"
      onClick={handleClick}
      className={finalClassName}
      prefetch={prefetch}
      aria-current={isActive ? 'page' : undefined}
    >
      {children as any}
    </LinkComponent>
  );
}

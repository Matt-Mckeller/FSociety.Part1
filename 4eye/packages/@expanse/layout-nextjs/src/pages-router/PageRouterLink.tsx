'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { Position } from '@expanse/shell';
import { useNextNavigation } from '../hooks/useNextNavigation';

interface PageRouterLinkProps {
  position: Position;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  prefetch?: boolean;
}

/**
 * Link component for Pages Router with grid navigation
 * 
 * @example
 * ```tsx
 * <PageRouterLink position={{ x: 1, y: 0 }}>
 *   About
 * </PageRouterLink>
 * ```
 */
export function PageRouterLink({
  position,
  children,
  className,
  activeClassName,
  prefetch = true,
}: PageRouterLinkProps) {
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
    >
      {children as any}
    </LinkComponent>
  );
}

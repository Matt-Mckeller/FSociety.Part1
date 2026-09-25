/**
 * DocAlert - Alert/callout component for documentation
 * Used for highlighting important information, tips, warnings, etc.
 */
import { Alert, AlertTitle, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export interface DocAlertProps {
  /** Alert title */
  title?: string
  /** Alert content */
  children: ReactNode
  /** Alert severity/type */
  severity?: 'info' | 'success' | 'warning' | 'error'
  /** Optional icon override */
  icon?: ReactNode
  /** Variant style */
  variant?: 'standard' | 'filled' | 'outlined'
  /** Optional action buttons */
  action?: ReactNode
}

/**
 * Alert component for highlighting important documentation content
 * 
 * @example
 * ```tsx
 * <DocAlert title="Important" severity="warning">
 *   This feature requires additional setup.
 * </DocAlert>
 * ```
 */
export function DocAlert({
  title,
  children,
  severity = 'info',
  icon,
  variant = 'standard',
  action,
}: DocAlertProps) {
  return (
    <Alert 
      severity={severity} 
      icon={icon}
      variant={variant}
      action={action}
      sx={{ mb: 2 }}
    >
      {title && (
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
      )}
      {typeof children === 'string' ? (
        <Typography variant="body2">{children}</Typography>
      ) : children}
    </Alert>
  )
}

/**
 * Preset alert types for common use cases
 */
export function DocTip({ title = '💡 Tip', children, ...props }: Omit<DocAlertProps, 'severity'>) {
  return <DocAlert title={title} severity="info" {...props}>{children}</DocAlert>
}

export function DocWarning({ title = '⚠️ Warning', children, ...props }: Omit<DocAlertProps, 'severity'>) {
  return <DocAlert title={title} severity="warning" {...props}>{children}</DocAlert>
}

export function DocSuccess({ title = '✅ Success', children, ...props }: Omit<DocAlertProps, 'severity'>) {
  return <DocAlert title={title} severity="success" {...props}>{children}</DocAlert>
}

export function DocError({ title = '❌ Error', children, ...props }: Omit<DocAlertProps, 'severity'>) {
  return <DocAlert title={title} severity="error" {...props}>{children}</DocAlert>
}

export default DocAlert

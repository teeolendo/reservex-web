import type { HTMLAttributes } from 'react';
import { cn } from '../cn';

/** 1200px content column with 32px side padding. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto box-border max-w-container px-8', className)} {...props} />;
}

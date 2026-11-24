import type { HTMLAttributes } from 'react';
import { cn } from '../cn';

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Wrap children in the 1200px container. Default true. */
  contained?: boolean;
};

/** A page section. Vertical padding is set per section via className. */
export function Section({ contained = true, className, ...props }: SectionProps) {
  if (!contained) return <section className={className} {...props} />;
  return <section className={cn('mx-auto box-border max-w-container px-8', className)} {...props} />;
}

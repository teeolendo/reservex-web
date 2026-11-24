import type { HTMLAttributes } from 'react';
import { cn } from '../cn';

type CardProps = HTMLAttributes<HTMLElement> & {
  /** Darken the border on hover. Default true. */
  hover?: boolean;
};

/** Bordered 24px-radius card, 36px padding, no shadow. Set flex-basis via className. */
export function Card({ hover = true, className, ...props }: CardProps) {
  return (
    <article
      className={cn(
        'box-border rounded-card border border-border p-9',
        hover && 'card transition-[border-color] duration-200',
        className,
      )}
      {...props}
    />
  );
}

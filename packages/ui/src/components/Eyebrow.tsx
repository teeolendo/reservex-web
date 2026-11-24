import type { HTMLAttributes } from 'react';
import { cn } from '../cn';

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & { onBrand?: boolean };

export function Eyebrow({ onBrand, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'm-0 text-[14px] font-semibold uppercase tracking-[0.08em]',
        onBrand ? 'text-on-brand-subtle' : 'text-brand',
        className,
      )}
      {...props}
    />
  );
}

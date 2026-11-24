import type { AnchorHTMLAttributes } from 'react';
import { cn } from '../cn';

type Variant = 'primary' | 'ghost' | 'light' | 'outline-light';
type Size = 'md' | 'lg';

const base = 'box-border inline-flex items-center rounded-pill font-medium';

const sizes: Record<Size, string> = {
  md: 'min-h-[44px] text-[15px] py-3 px-5',
  lg: 'min-h-[52px] text-[16px] py-4',
};

const variants: Record<Variant, string> = {
  primary: 'btn-primary bg-brand text-on-brand hover:text-on-brand',
  ghost: 'btn-ghost text-brand border border-border-strong',
  light: 'btn-light bg-white text-brand',
  'outline-light': 'btn-outline-light text-white border border-white/35',
};

// Large buttons: filled variants pad 28px, outlined variants 24px (per design).
const lgPadding: Record<Variant, string> = {
  primary: 'px-7',
  light: 'px-7',
  ghost: 'px-6',
  'outline-light': 'px-6',
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant = 'primary', size = 'lg', className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(base, sizes[size], variants[variant], size === 'lg' && lgPadding[variant], className)}
      {...props}
    />
  );
}

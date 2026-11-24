import { cn } from '../cn';

/** The "X" mark: green rounded square, white Newsreader X. */
export function Mark({ size = 32 }: { size?: 32 | 28 }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center bg-brand font-display leading-none text-white',
        size === 32 ? 'h-8 w-8 rounded-[9px] text-[20px]' : 'h-7 w-7 rounded-[8px] text-[17px]',
      )}
    >
      X
    </span>
  );
}

import { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && <label className="text-sm font-semibold text-text-muted ml-1 uppercase tracking-wider">{label}</label>}
                <input
                    type={type}
                    className={clsx(
                        "flex h-14 w-full rounded-2xl border border-border bg-surface px-5 py-4 text-lg text-text-main ring-offset-background transition-all placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <span className="text-xs font-bold text-red-500 ml-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };

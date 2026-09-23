import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: "btn-gradient",
            secondary: "glass border-border text-text-main hover:bg-surface",
            ghost: "text-text-muted hover:text-text-main hover:bg-surface"
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
                    variants[variant],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };

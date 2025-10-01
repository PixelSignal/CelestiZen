import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-white mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200',
            'bg-white/10 backdrop-blur-sm text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400',
            'hover:bg-white/15',
            'disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50',
            'text-base',
            {
              'border-red-400 focus:ring-red-400 focus:border-red-400': error,
              'border-white/30': !error,
            },
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-300 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

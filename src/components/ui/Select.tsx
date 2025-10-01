import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-white mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200',
            'bg-white/10 backdrop-blur-sm text-white',
            'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400',
            'hover:bg-white/15 cursor-pointer',
            'disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50',
            'text-base font-medium',
            {
              'border-red-400 focus:ring-red-400 focus:border-red-400': error,
              'border-white/30': !error,
            },
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-300 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

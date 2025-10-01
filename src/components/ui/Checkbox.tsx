import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={clsx(
              'w-6 h-6 border-2 rounded-lg transition-all duration-200 cursor-pointer',
              'flex items-center justify-center',
              'peer-checked:bg-amber-500 peer-checked:border-amber-500',
              'peer-focus:ring-2 peer-focus:ring-amber-400 peer-focus:ring-offset-2 peer-focus:ring-offset-transparent',
              'hover:border-amber-400',
              'border-white/30 bg-white/10 backdrop-blur-sm',
              className
            )}
          >
            <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </label>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-3 text-sm font-medium text-white cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

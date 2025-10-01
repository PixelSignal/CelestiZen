import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
}

export const Progress = ({ value, max = 100, showLabel, className, ...props }: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={clsx('w-full', className)} {...props}>
      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/10 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm text-white font-semibold text-center">{Math.round(percentage)}%</p>
      )}
    </div>
  );
};

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
}: CircularProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={clsx('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-lg font-bold text-gray-700">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

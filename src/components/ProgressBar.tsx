interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  color = 'bg-blue-500',
  height = 'h-2',
  showLabel = false,
  animate = true,
}) => {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${color} rounded-full ${height} ${
            animate ? 'transition-all duration-1000 ease-out' : ''
          }`}
          style={{ width: `${validPercentage}%` }}
          role="progressbar"
          aria-valuenow={validPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600 font-medium">
          {validPercentage}% Complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
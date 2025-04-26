import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  border?: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'bg-blue-50',
  border = 'border-blue-200',
  textColor = 'text-blue-800',
}) => {
  return (
    <div className={`rounded-lg ${color} ${border} border p-4 flex items-center space-x-4 transition-all duration-300 hover:shadow-md`}>
      <div className={`p-3 rounded-full ${color} ${textColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
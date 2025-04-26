import ProgressBar from './ProgressBar';

interface DomainCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  modules: number;
  completedModules: number;
  onClick: (id: string) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({
  id,
  title,
  description,
  image,
  progress,
  modules,
  completedModules,
  onClick,
}) => {
  const progressColors = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage < 40) return progressColors.low;
    if (percentage < 75) return progressColors.medium;
    return progressColors.high;
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-2">
          <ProgressBar 
            percentage={progress} 
            color={getProgressColor(progress)}
            height="h-1.5" 
          />
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Progress: {progress}%</span>
          <span>{completedModules}/{modules} modules</span>
        </div>
      </div>
    </div>
  );
};

export default DomainCard;
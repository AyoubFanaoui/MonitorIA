import { useState } from 'react';
import { CheckCircle, Clock, Award } from 'lucide-react';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  timeEstimate: number;
  points: number;
  domain: string;
  completed: boolean;
  onComplete?: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  description,
  difficulty,
  timeEstimate,
  points,
  domain,
  completed,
  onComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleComplete = () => {
    if (!isCompleted && onComplete) {
      setIsCompleted(true);
      onComplete(id);
    }
  };
  
  return (
    <div className={`rounded-lg border p-5 transition-all duration-300 ${
      isCompleted 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{timeEstimate} min</span>
        </div>
        
        <div className="flex items-center text-amber-600 text-sm">
          <Award size={16} className="mr-1" />
          <span>{points} points</span>
        </div>
        
        <div className="flex items-center text-blue-600 text-sm">
          <span>Domain: {domain}</span>
        </div>
      </div>
      
      {!isCompleted ? (
        <button
          onClick={handleComplete}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
        >
          Mark as Completed
        </button>
      ) : (
        <div className="flex items-center justify-center py-2 px-4 bg-green-100 text-green-800 rounded-md font-medium">
          <CheckCircle size={18} className="mr-2" />
          Completed
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
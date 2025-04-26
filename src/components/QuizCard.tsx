import { useState } from 'react';
import { CheckCircle, Clock, Award, BookOpen } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string; // Properly use title
  description: string;
  domain: string;
  subject: string;
  difficulty: string;
  numberOfQuestions: number;
  timeEstimate: number;
  points: number;
  completed: boolean;
  onComplete?: (id: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title, // Add title
  subject,
  difficulty,
  numberOfQuestions,
  timeEstimate,
  points,
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
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3> {/* use title properly */}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-gray-600 mb-4">
        <div className="flex items-center">
          <BookOpen size={16} className="mr-2" />
          <span>{numberOfQuestions} Questions</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          <span>{timeEstimate} min</span>
        </div>
        <div className="flex items-center">
          <Award size={16} className="mr-2" />
          <span>{points} Points</span>
        </div>
      </div>

      {!isCompleted ? (
        <button
          onClick={handleComplete}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
        >
          Start Quiz
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

export default QuizCard;

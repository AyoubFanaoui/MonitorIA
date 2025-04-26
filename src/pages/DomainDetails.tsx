import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, CheckCircle, Clock, Award, Trophy, Star, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import { learningDomains } from '../data/mockData';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: number;
  points: number;
  completed: boolean;
  locked: boolean;
}

const DomainDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(learningDomains.find(d => d.id === id));
  const [modules, setModules] = useState<Module[]>([]);
  
  useEffect(() => {
    // If domain doesn't exist, redirect to choose domain page
    if (!domain) {
      navigate('/choose-domain');
      return;
    }
    
    // Generate mock modules for the domain
    const mockModules: Module[] = [];
    for (let i = 1; i <= domain.modules; i++) {
      mockModules.push({
        id: `${domain.id}-module-${i}`,
        title: `${domain.title} Module ${i}`,
        description: `Learn essential concepts about ${domain.title.toLowerCase()} in this comprehensive module.`,
        duration: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
        points: Math.floor(Math.random() * 50) + 50, // 50-100 points
        completed: i <= domain.completedModules,
        locked: i > domain.completedModules + 1,
      });
    }
    
    setModules(mockModules);
  }, [domain, navigate]);
  
  if (!domain) {
    return null; // Will redirect in useEffect
  }
  
  const handleBack = () => {
    navigate('/choose-domain');
  };
  
  const completedModulesCount = modules.filter(m => m.completed).length;
  const totalPoints = modules.reduce((sum, module) => sum + (module.completed ? module.points : 0), 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="relative h-56 bg-blue-600 overflow-hidden">
        <img
          src={domain.image}
          alt={domain.title}
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-75"></div>
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-white">
            <button
              onClick={handleBack}
              className="flex items-center text-white hover:text-blue-200 transition-colors duration-200 mb-4"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Domains
            </button>
            <h1 className="text-3xl font-bold mb-2">{domain.title}</h1>
            <p className="max-w-2xl text-blue-100">{domain.description}</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">Your Progress</h2>
              <p className="text-gray-600">Keep going to unlock more modules!</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-amber-600">
                <Trophy size={18} className="mr-2" />
                <span className="font-semibold">{totalPoints} points earned</span>
              </div>
              
              <div className="flex items-center text-green-600">
                <CheckCircle size={18} className="mr-2" />
                <span className="font-semibold">{completedModulesCount}/{modules.length} modules completed</span>
              </div>
            </div>
          </div>
          
          <ProgressBar 
            percentage={domain.progress} 
            color={
              domain.progress < 40 ? 'bg-red-500' : 
              domain.progress < 75 ? 'bg-yellow-500' : 
              'bg-green-500'
            }
            height="h-2"
            showLabel={true}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Modules</h2>
          
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className={`bg-white rounded-lg border p-5 transition-all duration-300 ${
                module.completed 
                  ? 'border-green-200 bg-green-50' 
                  : module.locked 
                    ? 'border-gray-200 bg-gray-50 opacity-75' 
                    : 'border-blue-200 hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    module.completed 
                      ? 'bg-green-100 text-green-600' 
                      : module.locked 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    {module.completed ? (
                      <CheckCircle size={20} />
                    ) : module.locked ? (
                      <Lock size={20} />
                    ) : (
                      <BookOpen size={20} />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-lg font-semibold ${
                      module.locked ? 'text-gray-500' : 'text-gray-800'
                    }`}>
                      {module.title}
                    </h3>
                    <p className={`text-sm ${
                      module.locked ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {module.description}
                    </p>
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  module.completed 
                    ? 'bg-green-100 text-green-800' 
                    : module.locked 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  Module {index + 1}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>{module.duration} min</span>
                </div>
                
                <div className="flex items-center text-amber-600">
                  <Award size={16} className="mr-1" />
                  <span>{module.points} points</span>
                </div>
                
                {!module.locked && !module.completed && (
                  <div className="flex items-center text-blue-600">
                    <Star size={16} className="mr-1" />
                    <span>Start next</span>
                  </div>
                )}
              </div>
              
              {!module.locked && (
                <div className="mt-4">
                  <button
                    disabled={module.completed}
                    className={`py-2 px-4 rounded-md font-medium text-sm transition-colors duration-200 ${
                      module.completed 
                        ? 'bg-green-100 text-green-800 cursor-default' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } w-full sm:w-auto flex items-center justify-center`}
                  >
                    {module.completed ? (
                      <>
                        <CheckCircle size={16} className="mr-2" />
                        Completed
                      </>
                    ) : (
                      'Start Module'
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
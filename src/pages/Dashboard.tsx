import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Siren as Fire, Calendar, Trophy, Clock, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { learningStats, activityHistory, userProfile, learningDomains } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Animate stats on page load
  useEffect(() => {
    const animatableElements = document.querySelectorAll('.animate-on-load');
    
    animatableElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100', 'translate-y-0');
        element.classList.remove('opacity-0', 'translate-y-4');
      }, 100 * index);
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || userProfile.name}
          </h1>
          <p className="mt-1 text-gray-600">
            Track your learning journey and see your progress.
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
            <StatCard
              title="Current Streak"
              value={learningStats.currentStreak}
              icon={<Fire size={24} />}
              color="bg-orange-50"
              border="border-orange-200"
              textColor="text-orange-700"
            />
          </div>
          
          <div className="opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
            <StatCard
              title="Days Active"
              value={learningStats.daysActive}
              icon={<Calendar size={24} />}
              color="bg-blue-50"
              border="border-blue-200"
              textColor="text-blue-700"
            />
          </div>
          
          <div className="opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
            <StatCard
              title="Challenges Completed"
              value={learningStats.completedChallenges}
              icon={<Trophy size={24} />}
              color="bg-purple-50"
              border="border-purple-200"
              textColor="text-purple-700"
            />
          </div>
          
          <div className="opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
            <StatCard
              title="Time Spent"
              value={`${learningStats.timeSpent}h`}
              icon={<Clock size={24} />}
              color="bg-green-50"
              border="border-green-200"
              textColor="text-green-700"
            />
          </div>
        </div>
        
        {/* Domain Mastery */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Domain Mastery</h2>
          
          <div className="space-y-4">
            {Object.entries(learningStats.mastery).map(([domain, progress], index) => (
              <div key={domain} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {domain}
                  </span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <ProgressBar 
                  percentage={progress as number} 
                  color={
                    progress < 40 ? 'bg-red-500' : 
                    progress < 75 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenges
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activityHistory.map((activity, index) => (
                  <tr key={activity.date} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {activity.challengesCompleted} completed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-amber-600">
                        <Award size={16} className="mr-1" />
                        {activity.pointsEarned}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {activity.timeSpent}h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6 opacity-0 translate-y-4 transition-all duration-500 animate-on-load">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Continue Learning</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningDomains.slice(0, 3).map(domain => (
              <div key={domain.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-24 overflow-hidden">
                  <img 
                    src={domain.image} 
                    alt={domain.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{domain.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{domain.completedModules}/{domain.modules} modules completed</p>
                  <div className="mt-2">
                    <ProgressBar 
                      percentage={domain.progress} 
                      height="h-1" 
                      color={
                        domain.progress < 40 ? 'bg-red-500' : 
                        domain.progress < 75 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Compass } from 'lucide-react';
import Navbar from '../components/Navbar';
import DomainCard from '../components/DomainCard';
import { learningDomains } from '../data/mockData';

const ChooseDomain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'progress' | 'title'>('progress');
  const navigate = useNavigate();
  
  const handleDomainClick = (id: string) => {
    // Navigate to domain details page
    navigate(`/domain/${id}`);
  };
  
  // Filter domains based on search term
  const filteredDomains = learningDomains.filter(domain => 
    domain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort domains based on sort criteria
  const sortedDomains = [...filteredDomains].sort((a, b) => {
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Domains</h1>
          <p className="mt-1 text-gray-600">
            Choose a domain to start or continue your learning journey.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search domains..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center">
            <Filter size={20} className="text-gray-500 mr-2" />
            <label htmlFor="sort" className="mr-2 text-sm text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'progress' | 'title')}
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="progress">Progress</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
        
        {sortedDomains.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDomains.map(domain => (
              <DomainCard
                key={domain.id}
                id={domain.id}
                title={domain.title}
                description={domain.description}
                image={domain.image}
                progress={domain.progress}
                modules={domain.modules}
                completedModules={domain.completedModules}
                onClick={handleDomainClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Compass size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No domains found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or explore different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseDomain;
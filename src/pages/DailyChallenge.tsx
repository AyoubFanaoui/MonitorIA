import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, Award, Trophy, Calendar, Clock, Brain } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChallengeCard from '../components/ChallengeCard';
import { getTodaysChallenge, dailyChallenges } from '../data/mockData';

const DailyChallenge = () => {
  const todaysChallenge = getTodaysChallenge();
  const [completed, setCompleted] = useState(todaysChallenge.completed);
  const [showPreviousChallenges, setShowPreviousChallenges] = useState(false);
  const navigate = useNavigate();

  const handleCompleteChallenge = (id: string) => {
    setCompleted(true);

    const confettiContainer = document.getElementById('confetti-container');
    if (confettiContainer) {
      confettiContainer.classList.remove('opacity-0');
      confettiContainer.classList.add('opacity-100');

      setTimeout(() => {
        confettiContainer.classList.remove('opacity-100');
        confettiContainer.classList.add('opacity-0');
      }, 3000);
    }
  };

  const previousChallenges = dailyChallenges
    .filter((challenge) => challenge.date !== todaysChallenge.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      {/* Confetti animation container */}
      <div
        id="confetti-container"
        className="fixed inset-0 pointer-events-none opacity-0 transition-opacity duration-500 z-50 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 backdrop-blur-sm"></div>
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto transform transition-transform scale-100 animate-bounce-once">
          <div className="text-center">
            <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Challenge Completed!</h2>
            <p className="text-gray-600 mb-4">
              You've earned {todaysChallenge.points} points
            </p>
            <div className="flex justify-center space-x-2">
              <ThumbsUp size={24} className="text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Daily Challenge</h1>
          <p className="mt-1 text-gray-600">
            Complete daily challenges to earn points and improve your skills.
          </p>
        </div>

        {/* Today's Challenge */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-blue-800">
              <Calendar size={20} className="mr-2" />
              <span className="font-medium">Today's Challenge</span>
            </div>
            <div className="flex items-center text-amber-600">
              <Award size={20} className="mr-1" />
              <span>Earn {todaysChallenge.points} points</span>
            </div>
          </div>

          <ChallengeCard
            id={todaysChallenge.id}
            title={todaysChallenge.title}
            description={todaysChallenge.description}
            difficulty={todaysChallenge.difficulty}
            timeEstimate={todaysChallenge.timeEstimate}
            points={todaysChallenge.points}
            domain={todaysChallenge.domain}
            completed={completed}
            onComplete={handleCompleteChallenge}
            subject={todaysChallenge.subject || 'General'}
            numberOfQuestions={todaysChallenge.numberOfQuestions || 0}
          />
        </div>

        {/* Toggle Previous Challenges */}
        <div className="mb-8">
          <button
            onClick={() => setShowPreviousChallenges(!showPreviousChallenges)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <Clock size={18} className="mr-2" />
            <span>{showPreviousChallenges ? 'Hide' : 'Show'} Previous Challenges</span>
          </button>
        </div>

        {/* Previous Challenges List */}
        {showPreviousChallenges && (
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-800">Previous Challenges</h2>
            {previousChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                difficulty={challenge.difficulty}
                timeEstimate={challenge.timeEstimate}
                points={challenge.points}
                domain={challenge.domain}
                completed={challenge.completed}
                subject={challenge.subject || 'General'}
                numberOfQuestions={challenge.numberOfQuestions || 0}
              />
            ))}
          </div>
        )}

        {/* Learning Tips */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Brain size={20} className="mr-2 text-purple-600" />
            Learning Tips
          </h2>

          <ul className="space-y-3 text-gray-700">
            {[
              'Complete daily challenges consistently to build a streak.',
              'Focus on one domain at a time for faster progress.',
              'Review completed challenges to reinforce your learning.',
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-2">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;

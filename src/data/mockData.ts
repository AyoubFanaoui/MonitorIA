// Mock user profile data
export const userProfile = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  joinedDate: '2023-10-15',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
};

// Mock learning stats
export const learningStats = {
  daysActive: 28,
  completedChallenges: 24,
  totalPoints: 1450,
  currentStreak: 7,
  longestStreak: 14,
  completionRate: 86,
  timeSpent: 42.5, // hours
  mastery: {
    programming: 75,
    dates: 60,
    silence: 42,
    languages: 88,
  },
};

// Mock learning domains
export const learningDomains = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Master coding concepts from basic to advanced levels',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    progress: 75,
    modules: 12,
    completedModules: 9,
  },
  {
    id: 'date',
    title: 'Date & Time',
    description: 'Learn to handle date and time calculations efficiently',
    image: 'https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    progress: 60,
    modules: 8,
    completedModules: 5,
  },
  {
    id: 'silence',
    title: 'Silence',
    description: 'Explore techniques for focus and mindfulness',
    image: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    progress: 42,
    modules: 10,
    completedModules: 4,
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Become fluent in multiple programming languages',
    image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    progress: 88,
    modules: 15,
    completedModules: 13,
  },
];

// Mock daily challenges
export const dailyChallenges = [
  {
    id: '1',
    date: '2023-10-01',
    title: 'Challenge 1',
    description: 'Solve a coding problem.',
    difficulty: 'Easy',
    timeEstimate: 30,
    points: 10,
    domain: 'Programming',
    completed: false,
    subject: 'General', 
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    title: 'Parse a Complex Date Format',
    description: 'Write a function that parses various date formats and converts them to a standardized ISO string.',
    difficulty: 'Hard',
    timeEstimate: 35,
    points: 100,
    domain: 'date',
    completed: true,
  },
  {
    id: '3',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    title: 'Mindful Coding Practice',
    description: 'Complete a programming task while practicing principles of silent, mindful coding.',
    difficulty: 'Easy',
    timeEstimate: 15,
    points: 50,
    domain: 'silence',
    completed: true,
  },
];

// Function to get today's challenge
export const getTodaysChallenge = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Find a challenge with today's date, or create a fallback
  const todaysChallenge = dailyChallenges.find(
    (challenge) => challenge.date.split('T')[0] === today
  ) || {
    id: 'today',
    date: new Date().toISOString(),
    title: 'Recursive Function Challenge',
    description: 'Create a recursive function that calculates the factorial of a number without using loops.',
    difficulty: 'Medium',
    timeEstimate: 25,
    points: 80,
    domain: 'programming',
    completed: false,
  };
  
  return todaysChallenge;
};

// Mock activity history
export const activityHistory = [
  {
    date: '2023-11-01',
    challengesCompleted: 1,
    pointsEarned: 75,
    timeSpent: 1.2, // hours
  },
  {
    date: '2023-11-02',
    challengesCompleted: 1,
    pointsEarned: 100,
    timeSpent: 1.8,
  },
  {
    date: '2023-11-03',
    challengesCompleted: 2,
    pointsEarned: 150,
    timeSpent: 2.5,
  },
  {
    date: '2023-11-04',
    challengesCompleted: 0,
    pointsEarned: 0,
    timeSpent: 0,
  },
  {
    date: '2023-11-05',
    challengesCompleted: 1,
    pointsEarned: 50,
    timeSpent: 0.9,
  },
  {
    date: '2023-11-06',
    challengesCompleted: 2,
    pointsEarned: 125,
    timeSpent: 2.1,
  },
  {
    date: '2023-11-07',
    challengesCompleted: 1,
    pointsEarned: 80,
    timeSpent: 1.5,
  },
];
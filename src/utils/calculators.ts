export interface Calculator {
    title: string;
    description: string;
    href: string;
    icon: string;
    keywords: string[];
    category: 'Health' | 'Finance' | 'Fun' | 'Utility' | 'Chronology';
    isNew?: boolean;
    isPopular?: boolean;
}

export const calculators: Calculator[] = [
    // --- CHRONOLOGY (15 Tools) ---
    {
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days with our free age tool.',
        href: '/age-at-date',
        icon: '📅',
        keywords: ['age', 'birthday', 'years', 'months', 'days'],
        category: 'Chronology',
        isPopular: true
    },
    {
        title: 'Exact Age Calculator',
        description: 'Calculate your precise age in years, months, and days with our free exact age tool.',
        href: '/exact-age',
        icon: '🎂',
        keywords: ['age', 'birthday', 'exact', 'years', 'months', 'days'],
        category: 'Chronology',
        isPopular: true
    },
    {
        title: 'Age on Specific Date', // Needs new page or mapping to age-at-date
        description: 'Find out exactly how old you were or will be on any chosen calendar day.',
        href: '/age-on-specific-date',
        icon: '🗓️',
        keywords: ['age', 'date', 'future', 'past', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Age Verification',
        description: 'Instantly verify if a birth date meets a specific minimum age threshold.',
        href: '/age-verification',
        icon: '🔞',
        keywords: ['age', 'verification', '18', 'adult', 'check', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Historical Event Age',
        description: 'Calculate exactly how old a person was during any specific year in history.',
        href: '/historical-age',
        icon: '📜',
        keywords: ['age', 'history', 'event', 'past', 'years', 'birthday'],
        category: 'Chronology'
    },
    {
        title: 'Date Difference Calculator',
        description: 'Measure the exact duration between two dates in years, months, weeks, and days.',
        href: '/date-diff',
        icon: '⏳',
        keywords: ['date', 'difference', 'duration', 'time', 'between'],
        category: 'Chronology'
    },
    {
        title: 'Countdown Timer',
        description: 'Create a high-precision countdown to any important future event.',
        href: '/countdown-timer',
        icon: '⏱️',
        keywords: ['countdown', 'timer', 'event', 'date', 'reminder'],
        category: 'Chronology',
        isPopular: true
    },
    {
        title: 'Day of the Week Calculator',
        description: 'Discover the exact day of the week for any date in history or the future.',
        href: '/day-of-week',
        icon: '📆',
        keywords: ['day', 'week', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        category: 'Chronology'
    },
    {
        title: 'Time Zone Difference',
        description: 'Compare city times instantly and find overlapping hours for international meetings.',
        href: '/timezone-diff',
        icon: '🌍',
        keywords: ['timezone', 'time', 'cities', 'difference', 'world', 'clock'],
        category: 'Chronology',
        isPopular: true
    },
    {
        title: 'Life Timeline Visualizer',
        description: 'Gain a powerful new perspective on your journey by visualizing your life in a grid of weeks.',
        href: '/life-timeline',
        icon: '📊',
        keywords: ['life', 'timeline', 'weeks', 'visualization', 'fun'],
        category: 'Chronology'
    },
    {
        title: 'Age Gap Calculator',
        description: 'Calculate the exact age difference between partners for relationship insights.',
        href: '/age-gap-calculator',
        icon: '💘',
        keywords: ['age gap', 'relationship', 'dating', 'compatibility'],
        category: 'Chronology'
    },
    {
        title: 'Age in Weeks / Days',
        description: 'View your lifetime translated into total weeks and days lived.',
        href: '/age-weeks-days',
        icon: '🗓️',
        keywords: ['age', 'weeks', 'days', 'time', 'life', 'duration'],
        category: 'Chronology'
    },
    {
        title: 'Retirement Age Calculator',
        description: 'Determine exactly when you can retire based on your current age and goals.',
        href: '/retirement-age',
        icon: '🏦',
        keywords: ['retirement', 'age', 'work', 'pension', 'finance'],
        category: 'Chronology'
    },
    {
        title: 'Birthday Information Tool',
        description: 'Unlock fascinating facts and statistics about your birthday and zodiac signs.',
        href: '/birthday-info',
        icon: '🎈',
        keywords: ['birthday', 'zodiac', 'facts', 'star sign', 'fun'],
        category: 'Chronology'
    },
    {
        title: 'Life Expectancy Estimator',
        description: 'Estimate your potential lifespan based on common health habits and lifestyle.',
        href: '/life-expectancy',
        icon: '🧬',
        keywords: ['life', 'expectancy', 'habits', 'health', 'lifespan', 'age'],
        category: 'Chronology'
    },

    // --- FINANCE (15 Tools) ---
    {
        title: 'Compound Interest Calculator',
        description: 'Visualize the power of exponential growth on your investments and savings.',
        href: '/compound-interest',
        icon: '📈',
        keywords: ['finance', 'investment', 'interest', 'compound', 'savings', 'money'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Loan EMI Calculator',
        description: 'Calculate your exact monthly installments for any type of loan instantly.',
        href: '/loan-emi',
        icon: '💳',
        keywords: ['loan', 'emi', 'finance', 'payment', 'bank', 'interest'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Budget Planner Sheet',
        description: 'Take control of your monthly finances and plan for future wealth by tracking income and expenses.',
        href: '/budget-planner',
        icon: '💸',
        keywords: ['budget', 'planner', 'finance', 'expenses', 'saving'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Net Worth Calculator',
        description: 'Get a clear picture of your financial health by calculating assets and liabilities.',
        href: '/net-worth-calculator',
        icon: '💎',
        keywords: ['net worth', 'assets', 'liabilities', 'finance', 'wealth'],
        category: 'Finance',
        isPopular: true
    },
    {
        title: 'Profit Margin Calculator',
        description: 'Determine the exact profitability of your products or services effortlessly.',
        href: '/profit-margin-calculator',
        icon: '📊',
        keywords: ['profit', 'margin', 'business', 'revenue', 'cost', 'finance'],
        category: 'Finance'
    },
    {
        title: 'Break-Even Calculator',
        description: 'Find the precise point where your business revenue equals your expenses.',
        href: '/break-even-calculator',
        icon: '🔄',
        keywords: ['break-even', 'units', 'cost', 'business', 'finance', 'sales'],
        category: 'Finance'
    },
    {
        title: 'Fuel Cost Calculator',
        description: 'Calculate your estimated fuel expenses based on distance, gas prices, and efficiency.',
        href: '/fuel-calculator',
        icon: '⛽',
        keywords: ['fuel', 'trip', 'travel', 'cost', 'car', 'distance', 'gas'],
        category: 'Finance'
    },
    {
        title: 'Electricity Bill Estimator',
        description: 'Estimate your monthly electricity costs based on appliance usage and local rates.',
        href: '/electricity-calculator',
        icon: '⚡',
        keywords: ['electricity', 'bill', 'utility', 'cost', 'energy', 'power'],
        category: 'Finance'
    },
    {
        title: 'Discount Calculator',
        description: 'Find out exactly how much you will save and the final price of any item.',
        href: '/discount-calculator',
        icon: '🏷️',
        keywords: ['discount', 'sale', 'save', 'price', 'shopping', 'math'],
        category: 'Finance'
    },
    {
        title: 'Savings Goal Calculator',
        description: 'Plan your path to a target savings amount with recurring monthly contributions.',
        href: '/savings-goal',
        icon: '🎯',
        keywords: ['savings', 'goal', 'finance', 'money', 'investment'],
        category: 'Finance'
    },
    {
        title: 'Savings Goal Time Calculator',
        description: 'Discover exactly how long it will take to reach your financial savings goals.',
        href: '/savings-goal-time',
        icon: '⏳',
        keywords: ['savings', 'goal', 'time', 'finance', 'saving', 'plan'],
        category: 'Finance'
    },
    {
        title: 'Retirement Savings Goal',
        description: 'Determine the exact amount you need to save for a comfortable retirement.',
        href: '/retirement-savings',
        icon: '💰',
        keywords: ['retirement', 'savings', 'goal', 'finance', 'money', 'investment'],
        category: 'Finance'
    },
    {
        title: 'Hourly to Salary Converter',
        description: 'Translate your hourly wage into a comprehensive yearly or monthly salary figure.',
        href: '/salary-converter',
        icon: '💼',
        keywords: ['salary', 'hourly', 'wage', 'income', 'finance', 'pay'],
        category: 'Finance'
    },
    {
        title: 'Work Hour Calculator',
        description: 'Track your professional time and calculate exact hours worked between clock-ins.',
        href: '/work-hour-calculator',
        icon: '🕙',
        keywords: ['work', 'hours', 'timesheet', 'pay', 'schedule'],
        category: 'Finance'
    },
    {
        title: 'Debt Payoff Calculator',
        description: 'Visualize your path to financial freedom and calculate how long to clear debts.',
        href: '/debt-payoff-calculator',
        icon: '📉',
        keywords: ['debt', 'payoff', 'finance', 'loans', 'credit card', 'money'],
        category: 'Finance'
    },

    // --- HEALTH (15 Tools) ---
    {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index (BMI) to determine if you are at a healthy weight.',
        href: '/bmi-calculator',
        icon: '⚖️',
        keywords: ['bmi', 'health', 'weight', 'height', 'fitness', 'body'],
        category: 'Health',
        isPopular: true
    },
    {
        title: 'Ideal Weight Calculator',
        description: 'Find your target healthy body weight based on clinically recognized standards.',
        href: '/ideal-weight',
        icon: '📏',
        keywords: ['weight', 'ideal', 'health', 'fitness', 'body', 'height'],
        category: 'Health'
    },
    {
        title: 'Water Intake Calculator',
        description: 'Determine your ideal daily hydration target based on weight and activity.',
        href: '/water-intake',
        icon: '💧',
        keywords: ['water', 'hydration', 'health', 'fitness', 'drink', 'daily'],
        category: 'Health'
    },
    {
        title: 'Calorie Needs Calculator',
        description: 'Estimate your daily calorie requirements for maintenance or weight goals.',
        href: '/calorie-needs',
        icon: '🍎',
        keywords: ['calorie', 'health', 'fitness', 'diet', 'maintenance', 'energy'],
        category: 'Health'
    },
    {
        title: 'Macro Nutrient Calculator',
        description: 'Calculate your personalized daily targets for protein, carbohydrates, and fats.',
        href: '/macro-calculator',
        icon: '🥩',
        keywords: ['macro', 'nutrition', 'protein', 'carbs', 'fat', 'diet', 'fitness'],
        category: 'Health'
    },
    {
        title: 'Pregnancy Due Date Calculator',
        description: 'Estimate your expected delivery date and track your pregnancy journey.',
        href: '/pregnancy-due-date',
        icon: '👶',
        keywords: ['pregnancy', 'baby', 'due date', 'maternity', 'birth', 'parenting'],
        category: 'Health'
    },
    {
        title: 'Ovulation Calculator',
        description: 'Identify your most fertile days and estimate your next ovulation date.',
        href: '/ovulation-calculator',
        icon: '🥚',
        keywords: ['ovulation', 'fertility', 'pregnancy', 'cycle', 'conception'],
        category: 'Health'
    },
    {
        title: 'Target Heart Rate Calculator',
        description: 'Optimize your cardio workouts by discovering your ideal heart rate zones.',
        href: '/heart-rate-calculator',
        icon: '❤️',
        keywords: ['heart rate', 'fitness', 'exercise', 'cardio', 'health', 'zones'],
        category: 'Health'
    },
    {
        title: 'Workout Progress Tracker',
        description: 'Monitor your strength journey and celebrate transformation by tracking weights and repetitions.',
        href: '/workout-tracker',
        icon: '🏋️',
        keywords: ['workout', 'tracker', 'fitness', 'progress', 'health'],
        category: 'Health',
        isPopular: true
    },
    {
        title: 'Random Workout Generator',
        description: 'Generate fresh, random home workout routines tailored to your fitness objectives.',
        href: '/random-workout',
        icon: '💪',
        keywords: ['workout', 'fitness', 'exercise', 'random', 'health'],
        category: 'Health'
    },
    {
        title: 'Meal Planner Generator',
        description: 'Simplify your nutrition with balanced weekly meal plans that fit your lifestyle.',
        href: '/meal-planner',
        icon: '🍲',
        keywords: ['meal', 'planner', 'diet', 'food', 'health'],
        category: 'Health'
    },
    {
        title: 'Habit Tracker',
        description: 'Build positive routines and stay committed to your goals with visual streak tracking.',
        href: '/habit-tracker',
        icon: '✅',
        keywords: ['habit', 'tracker', 'streak', 'productivity', 'health'],
        category: 'Health',
        isPopular: true
    },
    {
        title: 'Habit Streak Counter',
        description: 'Build long-term discipline by tracking your daily winning streaks with our visual habit tool.',
        href: '/habit-streak',
        icon: '🔥',
        keywords: ['habit', 'streak', 'tracker', 'productivity', 'utility'],
        category: 'Health',
        isPopular: true
    },
    {
        title: 'Ideal Sleep Calculator',
        description: 'Improve your sleep quality by identifying the best bedtime based on sleep cycles.',
        href: '/sleep-calculator',
        icon: '😴',
        keywords: ['sleep', 'cycles', 'bedtime', 'wake up', 'rest', 'health'],
        category: 'Health'
    },
    {
        title: 'Half Birthday Calculator',
        description: 'Find the exact date of your next half-birthday and celebrate the midpoint.',
        href: '/half-birthday',
        icon: '🍰',
        keywords: ['birthday', 'half', 'date', 'celebrate', '6 months'],
        category: 'Health'
    },

    // --- UTILITY (15 Tools) ---
    {
        title: 'Unit Converter',
        description: 'Quickly convert between a wide variety of measurements including length, weight, and volume.',
        href: '/unit-converter',
        icon: '📏',
        keywords: ['unit', 'converter', 'length', 'weight', 'temperature', 'utility'],
        category: 'Utility',
        isPopular: true
    },
    {
        title: 'Percentage Calculator',
        description: 'Solve any percentage problem quickly, from simple increases to complex financial ratios.',
        href: '/percentage-calculator',
        icon: '🔢',
        keywords: ['percentage', 'math', 'percent', 'increase', 'decrease', 'fraction'],
        category: 'Utility',
        isPopular: true
    },
    {
        title: 'Text Case Converter',
        description: 'Transform your text into UPPERCASE, lowercase, Title Case, or Sentence Case instantly.',
        href: '/text-converter',
        icon: '🔠',
        keywords: ['text', 'case', 'converter', 'upper', 'lower', 'title'],
        category: 'Utility'
    },
    {
        title: 'Character Counter',
        description: 'Achieve the perfect length for your text by counting characters and words.',
        href: '/character-counter',
        icon: '🔡',
        keywords: ['character', 'word', 'counter', 'text', 'analysis'],
        category: 'Utility'
    },
    {
        title: 'Screen Time Cost Calculator',
        description: 'Discover the real value of your time by calculating the cost of daily app usage.',
        href: '/screen-time-cost',
        icon: '📱',
        keywords: ['screen time', 'apps', 'productivity', 'time', 'cost', 'waste'],
        category: 'Utility'
    },
    {
        title: 'Pomodoro Timer',
        description: 'Maximize focus and productivity using the proven technique of timed work intervals.',
        href: '/pomodoro-timer',
        icon: '🍅',
        keywords: ['pomodoro', 'timer', 'focus', 'productivity', 'utility'],
        category: 'Utility',
        isPopular: true
    },
    {
        title: 'Study Time Planner',
        description: 'Optimize your academic schedule and divide study hours across subjects efficiently.',
        href: '/study-planner',
        icon: '📚',
        keywords: ['study', 'planner', 'time', 'learning', 'education', 'schedule'],
        category: 'Utility',
        isPopular: true
    },
    {
        title: 'Study Timetable Generator',
        description: 'Organize your academic life by automatically distributing subjects across your week.',
        href: '/study-timetable',
        icon: '📅',
        keywords: ['study', 'timetable', 'schedule', 'education', 'planner'],
        category: 'Utility'
    },
    {
        title: 'Goal Breakdown Planner',
        description: 'Transform ambitious dreams into reality by breaking big objectives into actionable steps.',
        href: '/goal-planner',
        icon: '🎯',
        keywords: ['goal', 'planner', 'milestones', 'productivity', 'success'],
        category: 'Utility'
    },
    {
        title: 'Grocery List Builder',
        description: 'Organize your shopping trips by category and store aisle for maximum efficiency.',
        href: '/grocery-list',
        icon: '🛒',
        keywords: ['grocery', 'shopping', 'list', 'organizer', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Invoice Generator',
        description: 'Create professional invoices for your small business or freelance projects effortlessly.',
        href: '/invoice-generator',
        icon: '📄',
        keywords: ['invoice', 'business', 'billing', 'finance', 'calculator'],
        category: 'Utility'
    },
    {
        title: 'Username Generator',
        description: 'Find the perfect, unique handle for your new social media or gaming profile.',
        href: '/username-generator',
        icon: '👤',
        keywords: ['username', 'social media', 'generator', 'random', 'fun'],
        category: 'Utility'
    },
    {
        title: 'File Size Converter',
        description: 'Quickly convert between bits, bytes, KB, MB, GB, and TB for accurate data measurement.',
        href: '/file-size-converter',
        icon: '💾',
        keywords: ['file size', 'converter', 'bytes', 'kb', 'mb', 'gb', 'data'],
        category: 'Utility'
    },
    {
        title: 'Binary to Text Converter',
        description: 'Easily translate binary code into readable text and ASCII characters with our fast conversion tool.',
        href: '/binary-converter',
        icon: '0️⃣1️⃣',
        keywords: ['binary', 'text', 'converter', 'ascii', 'utility'],
        category: 'Utility'
    },
    {
        title: 'Text Encryption Tool',
        description: 'Protect your sensitive messages by encrypting your text using classic cryptographic techniques.',
        href: '/text-encryption',
        icon: '🔐',
        keywords: ['encryption', 'security', 'cipher', 'text', 'utility'],
        category: 'Utility'
    },

    // --- FUN (15 Tools) ---
    {
        title: 'Spin the Wheel',
        description: 'Customizable decision wheel with physics-based spinning.',
        href: '/spin-wheel',
        icon: '🎡',
        keywords: ['spin', 'wheel', 'random', 'picker', 'decision'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Dice Roller',
        description: 'Multi-dice (D4-D100) support with visual faces.',
        href: '/dice-roller',
        icon: '🎲',
        keywords: ['dice', 'roller', 'random', 'fun', 'game'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Coin Flip Simulator',
        description: '3D CSS coin flip simulation with stats.',
        href: '/coin-flip',
        icon: '🪙',
        keywords: ['coin', 'flip', 'random', 'heads', 'tails'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Random Name Picker',
        description: 'Select a winner or make a fair choice by picking a random name from a list.',
        href: '/name-picker',
        icon: '🎲',
        keywords: ['random', 'picker', 'names', 'draw', 'lucky'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Random Decision Maker',
        description: 'Take the hesitation out of your daily choices by using our fun and interactive decision wheel.',
        href: '/random-decision',
        icon: '🎡',
        keywords: ['decision', 'random', 'spin wheel', 'choice', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Lucky Number Generator',
        description: 'Generate random numbers within your custom range for games, lotteries, or fun.',
        href: '/lucky-number',
        icon: '🍀',
        keywords: ['lucky', 'number', 'random', 'generator', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Random Color Generator',
        description: 'HEX/RGB/HSL generation and 5-color palette creation.',
        href: '/random-color',
        icon: '🎨',
        keywords: ['color', 'random', 'hex', 'palette', 'design'],
        category: 'Fun',
        isPopular: true
    },
    {
        title: 'Random Gradient Generator',
        description: 'Create modern, beautiful CSS linear gradients instantly for your next website.',
        href: '/random-gradient',
        icon: '🎨',
        keywords: ['gradient', 'css', 'color', 'background', 'design'],
        category: 'Fun'
    },
    {
        title: 'Yes / No Oracle',
        description: 'Ask any question and let the mystical oracle give you a definitive Yes or No.',
        href: '/yes-no-oracle',
        icon: '🔮',
        keywords: ['oracle', 'yes', 'no', 'decision', 'mystic'],
        category: 'Fun'
    },
    {
        title: 'Rock Paper Scissors',
        description: 'Battle against the computer in this classic hand game and track your win streak.',
        href: '/rock-paper-scissors',
        icon: '✊',
        keywords: ['game', 'rock', 'paper', 'scissors', 'random', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Tic Tac Toe',
        description: 'Play the classic game of strategy against an unbeatable AI or a friend.',
        href: '/tic-tac-toe',
        icon: '❌',
        keywords: ['game', 'tic tac toe', 'strategy', 'ai', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Hangman',
        description: 'Challenge your vocabulary and guess the hidden word before it is too late.',
        href: '/hangman',
        icon: '🪑',
        keywords: ['game', 'hangman', 'word', 'vocabulary', 'guess', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Snake Game',
        description: 'Experience the retro classic with smooth controls and increasing difficulty levels.',
        href: '/snake-game',
        icon: '🐍',
        keywords: ['game', 'snake', 'classic', 'retro', 'arcade', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Memory Card Match',
        description: 'Test and improve your cognitive focus with our classic animated card matching game.',
        href: '/memory-match',
        icon: '🃏',
        keywords: ['game', 'memory', 'focus', 'cards', 'brain', 'fun'],
        category: 'Fun'
    },
    {
        title: 'Typing Speed Test',
        description: 'Measure your typing speed and accuracy with multiple levels.',
        href: '/typing-test',
        icon: '⌨️',
        keywords: ['typing', 'speed', 'test', 'wpm', 'accuracy'],
        category: 'Fun',
        isPopular: true
    }
];

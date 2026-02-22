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
    },
    {
        title: 'Grade Calculator',
        description: 'Calculate your final grade percentage and letter grade from your assignment marks.',
        href: '/grade-calculator',
        icon: '🎓',
        keywords: ['grade', 'calculator', 'school', 'gpa', 'marks'],
        category: 'Utility'
    },
    {
        title: 'Reaction Time Tester',
        description: 'Test your reflexes and see how fast you can react to visual changes.',
        href: '/reaction-time',
        icon: '⚡',
        keywords: ['reaction', 'time', 'tester', 'reflex', 'game'],
        category: 'Fun'
    },
    { title: 'Base64 Converter — Secure Encoding & Decoding', description: 'Encode and decode Base64 strings. Perfect for handling data transmission and safe text representation.', href: '/base64-converter', icon: '🔐', keywords: ['base64 converter', 'base64 encode', 'base64 decode', 'developer tool', 'data encoding'], category: 'Utility' },
    { title: 'Bill Splitter — Split Expenses with Friends', description: 'Easily divide restaurant bills, rent, and other shared expenses among multiple people with our free splitting tool.', href: '/bill-splitter', icon: '💵', keywords: ['bill splitter', 'expense divider', 'shared costs', 'splitting tool', 'friend expenses'], category: 'Finance' },
    { title: 'Birthday Card Generator — Create Personalized Cards', description: 'Design and export high-quality birthday cards instantly. Celebrate your loved ones with specialized messages and designs.', href: '/birthday-card', icon: '🎂', keywords: ['birthday card generator', 'custom greeting cards', 'card maker', 'birthday tool', 'printable cards'], category: 'Utility' },
    { title: 'BMR Calculator — Calculate Your Basal Metabolic Rate', description: 'Discover your Basal Metabolic Rate (BMR) instantly. Understand your daily resting calorie burn for better weight management.', href: '/bmr-calculator', icon: '🔥', keywords: ['bmr calculator', 'basal metabolic rate', 'calorie burn', 'metabolism tool', 'health calculator'], category: 'Health' },
    { title: 'Body Measurement Tracker — Monitor Your Transformation', description: 'Log and track your weight, waist, and body dimensions over time. Visualize your fitness journey with our free measurement tool.', href: '/body-measurements', icon: '📏', keywords: ['body measurement tracker', 'weight tracker', 'fitness progress', 'body dimension log', 'health tool'], category: 'Health' },
    { title: 'Business Loan Calculator — Plan Your Company Growth', description: 'Estimate payments for business financing. Understand the cost of capital and plan your expansion with our professional tool.', href: '/business-loan-calculator', icon: '🏢', keywords: ['business loan calculator', 'company financing', 'growth planning', 'commercial loan estimator', 'finance tool'], category: 'Finance' },
    { title: 'Car Payment Calculator — Auto Loan Estimator', description: 'Estimate your monthly car payments and total interest based on loan amount, term, and interest rate. Plan your next vehicle purchase.', href: '/car-payment-calculator', icon: '🚗', keywords: ['car payment calculator', 'auto loan estimator', 'vehicle finance', 'monthly payments', 'car loan tool'], category: 'Finance' },
    { title: 'Color Picker & Converter — Design & Hex Tool', description: 'Find the perfect colors and convert between HEX, RGB, and HSL. Essential tool for designers and front-end developers.', href: '/color-picker-converter', icon: '🖌️', keywords: ['color picker', 'hex converter', 'design tool', 'rgb to hex', 'frontend utility'], category: 'Utility' },
    { title: 'Commute Cost Calculator — Track Travel Expenses', description: 'Calculate your daily, weekly, or monthly commute costs. Optimize your travel budget and understand your transportation spending.', href: '/commute-cost-calculator', icon: '🚌', keywords: ['commute cost calculator', 'travel expenses', 'transportation budget', 'work commute', 'fuel cost'], category: 'Finance' },
    { title: 'Comparison Shopping Tool — Find the Best Value', description: 'Compare prices from multiple stores and find the best deals. Save money on every purchase with our free shopping tool.', href: '/comparison-shopping', icon: '🛒', keywords: ['comparison shopping', 'price comparison', 'best deals', 'save money', 'shopping tool'], category: 'Finance' },
    { title: 'CSV to JSON Converter — Simple Data Transformation', description: 'Instantly convert your spreadsheet data into clean JSON format. Perfect for developers and data analysts.', href: '/csv-to-json-converter', icon: '📄', keywords: ['csv to json', 'data converter', 'spreadsheet tool', 'developer utility', 'json formatting'], category: 'Utility' },
    { title: 'Daily Spending Limit — Budget Optimization Tool', description: 'Find out exactly how much you can spend each day to reach your financial goals. Take control of your daily budget.', href: '/daily-spending-limit', icon: '💳', keywords: ['daily spending limit', 'budgeting tool', 'money management', 'financial goals', 'saving money'], category: 'Finance' },
    { title: 'Day Counter — Track the Passage of Time', description: 'Calculate the total number of days between any two dates. Perfect for tracking milestones, project deadlines, and events.', href: '/day-counter', icon: '🗓️', keywords: ['day counter', 'date difference', 'milestone tracker', 'deadline checker', 'time counter'], category: 'Chronology' },
    { title: 'Dog Age Calculator — Understand Your Pet', description: 'Convert your dog\'s age into human years based on size and breed. Gain better insights into your pet\'s life stages.', href: '/dog-age-calculator', icon: '🐕', keywords: ['dog age calculator', 'human years', 'pet health', 'canine age', 'puppy years'], category: 'Fun' },
    { title: 'Epoch Converter — Developer Time Tool', description: 'Convert between Unix timestamps and human-readable dates. Essential utility for developers and system administrators.', href: '/epoch-converter', icon: '⌚', keywords: ['epoch converter', 'unix timestamp', 'time tool', 'date formatter', 'developer utility'], category: 'Utility' },
    { title: 'Gas Mileage Calculator — Optimize Fuel Efficiency', description: 'Calculate your vehicle\'s actual MPG (miles per gallon). Track fuel efficiency and optimize your driving habits.', href: '/gas-mileage-calculator', icon: '⛽', keywords: ['gas mileage calculator', 'mpg checker', 'fuel efficiency', 'vehicle performance', 'driving tool'], category: 'Finance' },
    { title: 'Gift Budget Planner — Organize Your Giving', description: 'Plan and track your spending on gifts for holidays, birthdays, and special events. Stay on budget while celebrating.', href: '/gift-budget-planner', icon: '🎁', keywords: ['gift budget planner', 'spending tracker', 'holiday budget', 'birthday gifts', 'financial organization'], category: 'Finance' },
    { title: 'GPA Calculator — Calculate Your Semester & Cumulative GPA', description: 'Free online GPA Calculator. Fast and easy way to track your academic performance and calculate your college or high school GPA.', href: '/gpa-calculator', icon: '🎓', keywords: ['gpa calculator', 'grade point average', 'college gpa', 'school grades', 'academic tool'], category: 'Utility' },
    { title: 'Holiday Budget Planner — Stress-Free Spending', description: 'Plan your total holiday expenses including gifts, travel, and food. Ensure you celebrate within your financial means.', href: '/holiday-budget-planner', icon: '🏖️', keywords: ['holiday budget planner', 'vacation spending', 'expense tracker', 'seasonal budget', 'financial planner'], category: 'Finance' },
    { title: 'Icebreaker Generator — Fun Conversation Prompts', description: 'Get professional, fun, and engaging icebreaker questions for meetings, parties, or networking events.', href: '/icebreaker-generator', icon: '🧊', keywords: ['icebreaker generator', 'conversation prompts', 'meeting tools', 'networking helper', 'social utility'], category: 'Fun' },
    { title: 'Image Color Picker — Professional Design Tool', description: 'Extract exact HEX, RGB, and HSL colors from any uploaded image. Perfect for artists, web developers, and designers.', href: '/image-color-picker', icon: '🖼️', keywords: ['image color picker', 'palette generator', 'design utility', 'color extractor', 'hex from image'], category: 'Utility' },
    { title: 'Inflation Calculator — Measure Purchasing Power', description: 'See how inflation impacts the value of money over time. Track real purchasing power and historical price changes.', href: '/inflation-calculator', icon: '🎈', keywords: ['inflation calculator', 'purchasing power', 'economic tool', 'money value', 'finance utility'], category: 'Finance' },
    { title: 'Investment Returns — Portfolio Performance Tool', description: 'Calculate the total return on your investments. Understand your gains and losses for better financial decision making.', href: '/investment-returns', icon: '💹', keywords: ['investment returns', 'roi checker', 'portfolio tracking', 'stock gains', 'finance tool'], category: 'Finance' },
    { title: 'JSON Formatter & Validator — Clean Developer Tool', description: 'Beautify and validate your JSON data. Secure, locally-running tool for developers and data professionals.', href: '/json-formatter', icon: '⚙️', keywords: ['json formatter', 'data validator', 'json beautifier', 'developer utility', 'clean code'], category: 'Utility' },
    { title: 'Leap Year Calculator — Find Accurate Dates', description: 'Find all past and future leap years. Understand the science behind our calendar and stay organized.', href: '/leap-year-calculator', icon: '📅', keywords: ['leap year calculator', 'calendar tool', 'date checker', 'chronology utility', 'year finder'], category: 'Chronology' },
    { title: 'Loan Payoff Calculator — Plan Your Freedom', description: 'Find the fastest way to pay off your loans and save on interest. Secure tool for optimizing your debt repayment strategy.', href: '/loan-payoff-calculator', icon: '📉', keywords: ['loan payoff calculator', 'debt free journey', 'interest savings', 'loan repayment strategy', 'finance tool'], category: 'Finance' },
    { title: 'Lorem Ipsum Generator — Professional Filler Text', description: 'Create high-quality placeholder text for your design and development projects. Clean, customizable, and fast.', href: '/lorem-ipsum-generator', icon: '📝', keywords: ['lorem ipsum generator', 'filler text', 'placeholder content', 'design tool', 'developer utility'], category: 'Utility' },
    { title: 'Online Markdown Previewer — Real-Time Editor', description: 'Write and preview Markdown instantly in your browser. Secure, locally-running tool for documentation and content creators.', href: '/markdown-previewer', icon: 'Ⓜ️', keywords: ['markdown previewer', 'md editor', 'content tool', 'documentation utility', 'real-time preview'], category: 'Utility' },
    { title: 'Monthly Expenses Tracker — Manage Your Cashflow', description: 'Identify and track your monthly spending habits. Gain deeper insights into your financial life and save more money.', href: '/monthly-expenses-tracker', icon: '📊', keywords: ['monthly expenses tracker', 'budgeting tool', 'expense log', 'financial health', 'saving money'], category: 'Finance' },
    { title: 'Moon Phase Calculator — Global Lunar Tracker', description: 'Discover the current phase of the moon and upcoming lunar events. Accurate tracking for astronomy fans and photographers.', href: '/moon-phase-calculator', icon: '🌙', keywords: ['moon phase calculator', 'lunar tracker', 'astronomy tool', 'moon calendar', 'night sky utility'], category: 'Chronology' },
    { title: 'Mortgage Payoff Calculator — Professional Finance Tool', description: 'Plan the exact path to owning your home faster. Calculate interest savings and reduced loan duration through extra payments.', href: '/mortgage-payoff-calculator', icon: '🏠', keywords: ['mortgage payoff calculator', 'home equity', 'loan repayment', 'interest savings', 'property finance'], category: 'Finance' },
    { title: 'Overtime Pay Calculator — Track Your Earnings', description: 'Calculate your exact overtime earnings based on hourly rates and extra hours. Plan your monthly income with precision.', href: '/overtime-calculator', icon: '⏰', keywords: ['overtime calculator', 'pay checker', 'earnings tracker', 'work finance', 'income tool'], category: 'Finance' },
    { title: 'Pace Calculator — Running & Fitness Tool', description: 'Calculate the speed and duration needed for your fitness goals. Perfect for runners, walkers, and professional athletes.', href: '/pace-calculator', icon: '🏃', keywords: ['pace calculator', 'running speed', 'marathon prep', 'fitness utility', 'training tool'], category: 'Health' },
    { title: 'Party Budget Planner — Event Expense Tracker', description: 'Organize your next celebration without overspending. Track food, venue, and decoration costs with our free tool.', href: '/party-budget-planner', icon: '🎉', keywords: ['party budget planner', 'event spending', 'celebration helper', 'budget tracker', 'social organizer'], category: 'Finance' },
    { title: 'Secure Password Generator — Protect Your Accounts', description: 'Create strong, random, and secure passwords instantly. Protect your digital life with our free, local-running security tool.', href: '/password-generator', icon: '🔑', keywords: ['password generator', 'secure password', 'random password', 'security tool', 'password builder'], category: 'Utility' },
    { title: 'Personal Loan Calculator — Fast Finance Tool', description: 'Estimate monthly payments and interest costs for personal loans. Fast, secure, and easy to use.', href: '/personal-loan-calculator', icon: '👤', keywords: ['personal loan calculator', 'loan repayment', 'finance utility', 'interest checker', 'borrowing tool'], category: 'Finance' },
    { title: 'Planetary Age Calculator — Cosmic Time Finder', description: 'Discover exactly how old you would be on Mars, Jupiter, and other planets in our solar system.', href: '/planetary-age', icon: '🪐', keywords: ['planetary age calculator', 'cosmic time', 'space age', 'astronomy fun', 'science tool'], category: 'Chronology' },
    { title: 'Price Per Unit Calculator — Compare Deals Effortlessly', description: 'Find the best value by comparing prices per unit, ounce, or liter. Save money on every shopping trip.', href: '/price-per-unit', icon: '🏷️', keywords: ['price per unit', 'unit price calculator', 'shopping deals', 'comparison tool', 'save money'], category: 'Finance' },
    { title: 'Productivity Score Calculator — Measure Your Efficiency', description: 'Calculate your daily productivity percentage. Evaluate your task completion and optimize your workflow with our free tool.', href: '/productivity-score', icon: '📈', keywords: ['productivity score', 'efficiency calculator', 'work performance', 'task completion', 'productivity tool'], category: 'Utility' },
    { title: 'Simple QR Generator — Create Custom QR Codes Instantly', description: 'Create unique QR codes for your links or text with our secure, locally-running tool. Perfect for flyers, business cards, and more.', href: '/qr-generator', icon: '📱', keywords: ['qr generator', 'custom qr code', 'link to qr', 'qr code tool', 'offline qr generator'], category: 'Utility' },
    { title: 'Reading List Tracker — Organize Your Books', description: 'Keep track of your reading progress and organize your literary adventures. Stay committed to your learning goals with our free book tracker.', href: '/reading-list', icon: '📚', keywords: ['reading list tracker', 'book tracker', 'reading log', 'literary planner', 'reading goals'], category: 'Utility' },
    { title: 'Recipe Cost Calculator — Professional Kitchen Tool', description: 'Calculate the total cost and per-serving price of your recipes. Essential for home cooks, caterers, and restaurant owners.', href: '/recipe-cost-calculator', icon: '🍳', keywords: ['recipe cost calculator', 'food pricing tool', 'kitchen math', 'serving cost', 'cooking budget'], category: 'Finance' },
    { title: 'Sales Tax Calculator — Local & Regional Tax Tool', description: 'Calculate sales tax for your purchases or business transactions. Simple and accurate tool for any tax rate.', href: '/sales-tax-calculator', icon: '🧾', keywords: ['sales tax calculator', 'tax estimator', 'shopping tool', 'business tax', 'tax rate calculator'], category: 'Finance' },
    { title: 'Savings Rate Calculator — Measure Your Financial Progress', description: 'Calculate what percentage of your income you are saving. Optimize your budget and reach your goals faster.', href: '/savings-rate-calculator', icon: '💰', keywords: ['savings rate calculator', 'saving percentage', 'financial health', 'budget optimization', 'wealth builder'], category: 'Finance' },
    { title: 'Signature Generator — Create Professional Digital Signatures', description: 'Design a stylish and professional digital signature for your documents and emails with our easy-to-use generator.', href: '/signature-generator', icon: '✍️', keywords: ['signature generator', 'digital signature', 'e-signature tool', 'email signature', 'professional signing'], category: 'Utility' },
    { title: 'Speed Calculator — Calculate Velocity Instantly', description: 'Find the speed of any object based on distance and time. Supports kilometers per hour, miles per hour, and more.', href: '/speed-calculator', icon: '🚀', keywords: ['speed calculator', 'velocity calculator', 'distance time speed', 'physics tool', 'speed checker'], category: 'Utility' },
    { title: 'SQL Formatter — Beautify & Validate Queries', description: 'Format your SQL queries for better readability. Support for multiple dialects and instant validation.', href: '/sql-formatter', icon: '💾', keywords: ['sql formatter', 'query beautifier', 'database tool', 'sql validator', 'developer tool'], category: 'Utility' },
    { title: 'Sunrise & Sunset Times — Global Sunlight Tool', description: 'Find exact sunrise and sunset times for any location on Earth. Plan your outdoor activities with precision.', href: '/sunrise-sunset-times', icon: '🌅', keywords: ['sunrise times', 'sunset tracker', 'golden hour', 'astronomy tool', 'sunlight calculator'], category: 'Chronology' },
    { title: 'Tax Bracket Calculator — Find Your Marginal Rate', description: 'Estimate your tax bracket and marginal tax rate. Understand how much of your next dollar goes to taxes.', href: '/tax-bracket-calculator', icon: '🏢', keywords: ['tax bracket calculator', 'marginal tax rate', 'income tax tool', 'finance planner', 'tax estimator'], category: 'Finance' },
    { title: 'Text Analyzer — Deep Insights into Your Content', description: 'Analyze word frequency, character counts, and readability scores. Optimize your writing with our free text analysis tool.', href: '/text-analyzer', icon: '🔍', keywords: ['text analyzer', 'readability checker', 'word frequency', 'writing tool', 'content analysis'], category: 'Utility' },
    { title: 'URL Encoder & Decoder — Prepare Links for the Web', description: 'Safely encode or decode URLs to ensure they work across browsers and servers. Fast and secure developer utility.', href: '/url-encoder-decoder', icon: '🔗', keywords: ['url encoder', 'url decoder', 'link tool', 'developer utility', 'web encoding'], category: 'Utility' },
    { title: 'VAT Calculator — Fast Value Added Tax Finder', description: 'Quickly add or remove VAT from your prices. Supports multiple rates and international requirements.', href: '/vat-calculator', icon: '💱', keywords: ['vat calculator', 'tax tool', 'value added tax', 'price inclusive of vat', 'business tool'], category: 'Finance' },
    { title: 'Week Number Calculator — Current Week Finder', description: 'Find out the current week number or calculate the week number for any specific date on the calendar.', href: '/week-number-calculator', icon: '📅', keywords: ['week number calculator', 'current week', 'iso week number', 'calendar week', 'chronology tool'], category: 'Chronology' },
    { title: 'Word Counter — Accurate Word & Character Count', description: 'Count words and characters in real-time. Perfect for essays, social media posts, and professional writing.', href: '/word-counter', icon: '🔤', keywords: ['word counter', 'character count', 'writing tool', 'essay checker', 'text counter'], category: 'Utility' }
];

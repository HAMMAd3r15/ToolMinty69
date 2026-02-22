export interface AgeResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    daysToNextBirthday: number;
}

export interface BirthdayInfo {
    dayBorn: string;
    daysToNextBirthday: number;
    zodiac: string;
    funFact: string;
}

export interface RetirementInfo {
    retirementDate: string;
    yearsToRetire: number;
    monthsToRetire: number;
    daysToRetire: number;
    totalWorkingYears: number;
}

export const calculateExactAge = (birthDate: Date, targetDate: Date = new Date()): AgeResult => {
    // Ensure birthDate is not in the future relative to targetDate
    if (birthDate > targetDate) {
        return { years: 0, months: 0, days: 0, totalDays: 0, daysToNextBirthday: 0 };
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diffTime = Math.abs(targetDate.getTime() - birthDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const nextBirthday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < targetDate) {
        nextBirthday.setFullYear(targetDate.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, daysToNextBirthday };
};

export const calculateDateDifference = (startDate: Date, endDate: Date): AgeResult => {
    const start = startDate < endDate ? startDate : endDate;
    const end = startDate < endDate ? endDate : startDate;

    return calculateExactAge(start, end);
};

export const getDayOfWeek = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getBirthdayInfo = (birthDate: Date): BirthdayInfo => {
    const dayBorn = getDayOfWeek(birthDate);
    const ageStats = calculateExactAge(birthDate);
    const daysToNextBirthday = ageStats.daysToNextBirthday;

    // Zodiac Logic (Simple approximation)
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    let zodiac = '';

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = 'Aries';
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = 'Taurus';
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = 'Gemini';
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = 'Cancer';
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = 'Leo';
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = 'Virgo';
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = 'Libra';
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = 'Scorpio';
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = 'Sagittarius';
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiac = 'Capricorn';
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = 'Aquarius';
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiac = 'Pisces';

    // Fun facts generation
    const staticFacts = [
        "Your heart has likely beaten over " + (ageStats.years * 365 * 24 * 60 * 70 / 1000000).toFixed(1) + " million times!",
        "You shared your birth year with roughly 130 million other people.",
        "The day you were born was the beginning of an incredible journey.",
        "By the time you reach 80, you will have spent roughly 26 years sleeping.",
        "Your fingerprints were already formed before you were even born.",
        "You have breathed approximately " + (ageStats.totalDays * 1440 * 15 / 1000000).toFixed(1) + " million times since birth.",
        "You've survived " + Math.floor(ageStats.years / 4) + " leap days so far!"
    ];

    const funFact = staticFacts[Math.floor(Math.random() * staticFacts.length)];

    return { dayBorn, daysToNextBirthday, zodiac, funFact };
};

export const calculateRetirementInfo = (birthDate: Date, retirementAge: number): RetirementInfo => {
    const retirementDate = new Date(birthDate.getFullYear() + retirementAge, birthDate.getMonth(), birthDate.getDate());
    const today = new Date();

    let yearsToRetire = 0;
    let monthsToRetire = 0;
    let daysToRetire = 0;

    if (retirementDate > today) {
        const diff = calculateExactAge(today, retirementDate);
        yearsToRetire = diff.years;
        monthsToRetire = diff.months;
        daysToRetire = diff.days;
    }

    // Assuming a standard starting work age of 22
    const totalWorkingYears = retirementAge - 22 > 0 ? retirementAge - 22 : retirementAge;

    return {
        retirementDate: retirementDate.toLocaleDateString('en-US', { dateStyle: 'long' }),
        yearsToRetire,
        monthsToRetire,
        daysToRetire,
        totalWorkingYears
    };
};

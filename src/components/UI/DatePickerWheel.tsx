'use client';

import React, { useEffect, useState } from 'react';
import ScrollPicker from './ScrollPicker';

interface DatePickerWheelProps {
    value: string; // "YYYY-MM-DD"
    onChange: (value: string) => void;
}

// Generate arrays
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
// Range: 1900 to Current + 2500 (requested range: "at least 2500 years")
// Actually usually 2500 years total range? "make the year counter atleast 2500 years" probably means up to year 2500 or 4500.
// Standard context: Past ~120, Future... user said "make the year counter atleast 2500 years".
// I'll make it range from 1900 to 4500 (approx 2600 years total).
// Range: 1800 to 4500 (2700 years)
const YEARS = Array.from({ length: 2700 }, (_, i) => 1800 + i).reverse(); // Newest first


export default function DatePickerWheel({ value, onChange }: DatePickerWheelProps) {
    // Parse initial value or default to today
    const parseDate = (dateStr: string) => {
        if (!dateStr) return { year: currentYear, month: 0, day: 1 };
        const [y, m, d] = dateStr.split('-').map(Number);
        // Validate parsed values
        if (isNaN(y) || isNaN(m) || isNaN(d)) {
            return { year: currentYear, month: 0, day: 1 };
        }
        return { year: y, month: m - 1, day: d };
    };

    const [selectedYear, setSelectedYear] = useState(parseDate(value).year);
    const [selectedMonth, setSelectedMonth] = useState(parseDate(value).month);
    const [selectedDay, setSelectedDay] = useState(parseDate(value).day);

    useEffect(() => {
        const { year, month, day } = parseDate(value);
        setSelectedYear(year);
        setSelectedMonth(month);
        setSelectedDay(day);
    }, [value]);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleDateChange = (type: 'year' | 'month' | 'day', val: number) => {
        let newYear = selectedYear;
        let newMonth = selectedMonth;
        let newDay = selectedDay;

        if (type === 'year') newYear = val;
        if (type === 'month') newMonth = val;
        if (type === 'day') newDay = val;

        // Validation: Clamp day if month changes to one with fewer days
        const daysInTargetMonth = getDaysInMonth(newYear, newMonth);
        if (newDay > daysInTargetMonth) {
            newDay = daysInTargetMonth;
        }

        // Update local state immediately for responsiveness
        setSelectedYear(newYear);
        setSelectedMonth(newMonth);
        setSelectedDay(newDay);

        // Notify parent
        const mStr = String(newMonth + 1).padStart(2, '0');
        const dStr = String(newDay).padStart(2, '0');
        onChange(`${newYear}-${mStr}-${dStr}`);
    };

    // Prepare Items
    const monthItems = MONTHS.map((m, i) => ({ label: m.substring(0, 3), value: i }));
    const yearItems = YEARS.map(y => ({ label: String(y), value: y }));

    const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
    const dayItems = Array.from({ length: daysInCurrentMonth }, (_, i) => ({
        label: String(i + 1),
        value: i + 1
    }));

    return (
        <div style={{
            display: 'flex',
            backgroundColor: 'var(--color-bg)', // Match theme
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--color-secondary)', // Highlight border to show it's active
            boxShadow: 'var(--shadow-lg)'
        }}>
            {/* Day */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <ScrollPicker
                    items={dayItems}
                    value={selectedDay}
                    onChange={(v) => handleDateChange('day', Number(v))}
                />
            </div>

            {/* Month */}
            <div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>
                <ScrollPicker
                    items={monthItems}
                    value={selectedMonth}
                    onChange={(v) => handleDateChange('month', Number(v))}
                />
            </div>

            {/* Year */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <ScrollPicker
                    items={yearItems}
                    value={selectedYear}
                    onChange={(v) => handleDateChange('year', Number(v))}
                />
            </div>
        </div>
    );
}

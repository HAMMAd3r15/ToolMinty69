import React, { useState } from 'react';
import DatePickerWheel from './DatePickerWheel';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function DateInput({ label, id, style, ...props }: DateInputProps) {
    const inputId = id || `date-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    // We'll use this valid date string for the wheel
    // If props.value is empty, wheel defaults to today, but we might want to keep it empty until touched?
    // For wheel UI, it's hard to represent "empty". We'll default to today in logic if empty.

    const [showWheel, setShowWheel] = useState(true); // Always show wheel as requested "make the place... like this"

    return (
        <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label
                htmlFor={inputId}
                style={{
                    display: 'block',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginBottom: '0.75rem',
                    textAlign: 'center' // Centered label looks better with wheel
                }}
            >
                {label}
            </label>

            <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                <DatePickerWheel
                    value={props.value as string}
                    onChange={(val) => {
                        // Simulate event for compatibility with parent's onChange
                        const event = {
                            target: { value: val }
                        } as React.ChangeEvent<HTMLInputElement>;
                        if (props.onChange) props.onChange(event);
                    }}
                />
            </div>

            {/* Hidden native input for form submission or accessibility if needed, 
                but our wheel handles the state. 
                We keep the logic passed via props. 
            */}
        </div>
    );
}

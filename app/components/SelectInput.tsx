// components/SelectInput.tsx
import React from 'react';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    className?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    className = '',
}) => {
    return (
        <div className={`mb-4 flex-1 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
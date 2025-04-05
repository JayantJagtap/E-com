// components/TextInput.tsx
import React from 'react';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'number';
    className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChange,
    placeholder = '',
    type = 'text',
    className = '',
}) => {
    return (
        <div className={`mb-4 flex-1 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
};
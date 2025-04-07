import React, { useState } from 'react';
import { MultiSelectDropdownProps } from '../types/types';



const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options,
    selectedValues,
    onChange,
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter(v => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative z-1">
            <button
                type="button"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-left flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {selectedValues.length > 0
                        ? `${selectedValues.length} selected`
                        : placeholder || 'Select options'}
                </span>
                <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-300">
                    <div className="max-h-20 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => toggleOption(option.value)}
                                />
                                <span className="ml-3">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
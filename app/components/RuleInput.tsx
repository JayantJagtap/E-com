import React from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import { RuleConfig } from '../types/types';


interface RuleInputProps {
    ruleConfig: RuleConfig;
    operator: string;
    value: string | string[];
    onValueChange: (value: string | string[]) => void;
}

const RuleInput: React.FC<RuleInputProps> = ({
    ruleConfig,
    operator,
    value,
    onValueChange
}) => {
    const isMultiSelect = ruleConfig.inputType === 'select' && operator !== 'equals_anything';

    if (ruleConfig.inputType === 'text') {
        return (
            <input
                type="text"
                value={value as string}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={ruleConfig.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
        );
    }

    if (ruleConfig.inputType === 'number') {
        return (
            <input
                type="number"
                value={value as string}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={ruleConfig.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
        );
    }

    if (ruleConfig.inputType === 'select' && operator === 'equals_anything') {
        return (
            <select
                value={value as string}
                onChange={(e) => onValueChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
                <option value="">{ruleConfig.placeholder || 'Select an option'}</option>
                {ruleConfig.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    if (isMultiSelect) {
        return (
            <MultiSelectDropdown
                options={ruleConfig.options || []}
                selectedValues={Array.isArray(value) ? value : []}
                onChange={(values) => onValueChange(values)}
                placeholder={ruleConfig.placeholder}
            />
        );
    }

    return null;
};

export default RuleInput;
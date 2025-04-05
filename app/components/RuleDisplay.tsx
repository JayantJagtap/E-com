// components/RuleDisplay.tsx
import React from 'react';
import { Rule } from '../types/rules';


interface RuleDisplayProps {
    rule: Rule;
    onRemove: () => void;
}

export const RuleDisplay: React.FC<RuleDisplayProps> = ({ rule, onRemove }) => {
    return (
        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span>
                <strong>{rule.label}</strong>: {rule.operator} {rule.value}
            </span>
            <button
                onClick={onRemove}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove rule"
            >
                ×
            </button>
        </li>
    );
};
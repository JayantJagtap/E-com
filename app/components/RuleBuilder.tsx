// RuleBuilder.tsx
// import React, { useState, useMemo } from 'react';
// import { SelectInput } from './components/SelectInput';
// import { TextInput } from './components/TextInput';
// import { RuleDisplay } from './components/RuleDisplay';
// import { Rule, RulesData, RuleConfig } from './types';


import React, { useState, useMemo } from "react";
import { Rule, RuleConfig } from "../types/rules";
import { RuleDisplay } from "./RuleDisplay";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";
import { rulesConfig } from "../types/rulesConfig";

export const RuleBuilder: React.FC = () => {
    // State management
    const [rules, setRules] = useState<Rule[]>([]);
    const [selectedRuleType, setSelectedRuleType] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Memoized derived values
    const selectedRule = useMemo(
        () => rulesConfig.rules.find((rule) => rule.type === selectedRuleType),
        [selectedRuleType]
    );

    const ruleTypeOptions = useMemo(
        () =>
            rulesConfig.rules.map((rule) => ({
                value: rule.type,
                label: rule.label,
            })),
        []
    );

    const operatorOptions = useMemo(
        () =>
            selectedRule?.operators.map((op) => ({
                value: op.value,
                label: op.label,
            })) || [],
        [selectedRule]
    );

    // Handlers
    const handleAddRule = (logicalOperator: string) => {
        if (!selectedRuleType || !selectedOperator || !selectedRule) return;

        const newRule: Rule = {
            type: selectedRuleType,
            operator: selectedOperator,
            value: inputValue,
            label: selectedRule.label,
            logicalOperator: rules.length > 0 ? logicalOperator : null,
        };

        setRules([...rules, newRule]);
        resetSelections();
    };

    const resetSelections = () => {
        setSelectedRuleType('');
        setSelectedOperator('');
        setInputValue('');
    };

    const handleRemoveRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Build Your Rules</h2>

                <div className="flex gap-2">
                    {/* Rule Type Selection */}
                    <SelectInput
                        label="Rule Type"
                        value={selectedRuleType}
                        onChange={(value) => {
                            setSelectedRuleType(value);
                            setSelectedOperator('');
                        }}
                        options={ruleTypeOptions}
                        placeholder="Select a rule type"
                    />

                    {/* Operator Selection */}
                    {selectedRule && (
                        <SelectInput
                            label="Operator"
                            value={selectedOperator}
                            onChange={setSelectedOperator}
                            options={operatorOptions}
                            placeholder="Select an operator"
                        />
                    )}

                    {/* Dynamic Value Input */}
                    {selectedRule && selectedOperator && (
                        <RuleValueInput
                            rule={selectedRule}
                            value={inputValue}
                            onChange={setInputValue}
                        />
                    )}
                </div>

                {/* AND/OR Buttons */}
                {selectedRuleType && selectedOperator && (
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => handleAddRule('AND')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            AND
                        </button>
                        <button
                            onClick={() => handleAddRule('OR')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            OR
                        </button>
                    </div>
                )}

                {/* Display Added Rules */}
                {rules.length > 0 && (
                    <RulesList rules={rules} onRemoveRule={handleRemoveRule} />
                )}
            </div>
        </div>
    );
};

// Helper component for dynamic value input
interface RuleValueInputProps {
    rule: RuleConfig;
    value: string;
    onChange: (value: string) => void;
}

const RuleValueInput: React.FC<RuleValueInputProps> = ({
    rule,
    value,
    onChange,
}) => {
    const label = `${rule.label} Value`;

    switch (rule.inputType) {
        case 'text':
            return (
                <TextInput
                    label={label}
                    value={value}
                    onChange={onChange}
                    placeholder={rule.placeholder}
                />
            );
        case 'number':
            return (
                <TextInput
                    label={label}
                    value={value}
                    onChange={onChange}
                    placeholder={rule.placeholder}
                    type="number"
                />
            );
        case 'select':
        case 'multi-select':
            return (
                <SelectInput
                    label={label}
                    value={value}
                    onChange={onChange}
                    options={rule.options || []}
                    placeholder={rule.placeholder}
                />
            );
        default:
            return null;
    }
};

// Helper component for displaying rules list
interface RulesListProps {
    rules: Rule[];
    onRemoveRule: (index: number) => void;
}

const RulesList: React.FC<RulesListProps> = ({ rules, onRemoveRule }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Current Rules</h3>
            <ul className="space-y-2">
                {rules.map((rule, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <li className="text-center">
                                <span className="inline-block px-2 py-1 bg-gray-200 rounded-md text-sm font-medium">
                                    {rule.logicalOperator}
                                </span>
                            </li>
                        )}
                        <RuleDisplay
                            rule={rule}
                            onRemove={() => onRemoveRule(index)}
                        />
                    </React.Fragment>
                ))}
            </ul>


        </div>

    );
};
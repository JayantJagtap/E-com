import React, { useState } from 'react';
import RuleItem from './RuleItem';
import { Rule } from '../types/types';
import { RULES_CONFIG } from '../constants/constants';
import MultiSelectDropdown from './MultiSelectDropdown';

const RuleTest: React.FC = () => {
    const [rules, setRules] = useState<Rule[]>([]);
    const [selectedRuleType, setSelectedRuleType] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);

    const selectedRule = RULES_CONFIG.rules.find(rule => rule.type === selectedRuleType);

    const handleAddRule = (logicalOperator: string) => {
        if (selectedRuleType && selectedOperator) {
            const valueToUse = selectedRule?.inputType === 'select' && selectedOperator !== 'equals_anything'
                ? multiSelectValues
                : inputValue;

            const newRule: Rule = {
                type: selectedRuleType,
                operator: selectedOperator,
                value: valueToUse,
                label: selectedRule?.label || '',
                logicalOperator: logicalOperator
            };

            setRules([...rules, newRule]);
            setSelectedRuleType('');
            setSelectedOperator('');
            setInputValue('');
            setMultiSelectValues([]);
        }
    };

    const handleUpdateRule = (index: number, updatedRule: Rule) => {
        const updatedRules = [...rules];
        updatedRules[index] = updatedRule;
        setRules(updatedRules);
    };

    const handleRemoveRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            {/* Display existing rules */}
            {rules.length > 0 && (
                <div className="mb-6">
                    {rules.map((rule, index) => (
                        <RuleItem
                            key={index}
                            rule={rule}
                            ruleConfigs={RULES_CONFIG.rules}
                            onUpdate={(updatedRule) => handleUpdateRule(index, updatedRule)}
                            onRemove={() => handleRemoveRule(index)}
                        />
                    ))}
                </div>
            )}

            {/* Add new rule section */}
            <div className='flex gap-2'>
                {/* Rule Type Selection */}
                <div className="mb-4 flex-1">
                    <select
                        value={selectedRuleType}
                        onChange={(e) => {
                            setSelectedRuleType(e.target.value);
                            setSelectedOperator('');
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select a rule type</option>
                        {RULES_CONFIG.rules.map((rule) => (
                            <option key={rule.type} value={rule.type}>
                                {rule.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Operator Selection */}
                {selectedRule && (
                    <div className="mb-4 flex-1">
                        <select
                            value={selectedOperator}
                            onChange={(e) => setSelectedOperator(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select an operator</option>
                            {selectedRule.operators.map((op) => (
                                <option key={op.value} value={op.value}>
                                    {op.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Value Input */}
                {selectedRule && selectedOperator && (
                    <div className="mb-4 flex-1">

                        {selectedRule.inputType === 'text' && (
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={selectedRule.placeholder}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        )}
                        {selectedRule.inputType === 'number' && (
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={selectedRule.placeholder}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        )}
                        {selectedRule.inputType === 'select' && selectedOperator === 'equals_anything' && (
                            <select
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">{selectedRule.placeholder || 'Select an option'}</option>
                                {selectedRule.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        {selectedRule.inputType === 'select' && selectedOperator !== 'equals_anything' && (
                            <MultiSelectDropdown
                                options={selectedRule.options || []}
                                selectedValues={multiSelectValues}
                                onChange={setMultiSelectValues}
                                placeholder={selectedRule.placeholder}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* AND/OR Buttons */}
            <div className='flex justify-center align center'>
                {selectedRuleType && selectedOperator && (
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => handleAddRule('AND')}
                            className="px-4 py-2 rounded-md border-1 hover:bg-gray-100"
                        >
                            +  AND
                        </button>
                        <button
                            onClick={() => handleAddRule('OR')}
                            className="px-4 py-2 rounded-md border-1 hover:bg-gray-100"
                        >
                            +  OR
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RuleTest;
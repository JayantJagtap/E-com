import React from 'react';
import RuleInput from './RuleInput';
import { Rule, RuleConfig } from '../types/types';


interface RuleItemProps {
    rule: Rule;
    ruleConfigs: RuleConfig[];
    onUpdate: (updatedRule: Rule) => void;
    onRemove: () => void;
}

const RuleItem: React.FC<RuleItemProps> = ({ rule, ruleConfigs, onUpdate, onRemove }) => {
    const ruleConfig = ruleConfigs.find(r => r.type === rule.type);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        const newConfig = ruleConfigs.find(r => r.type === newType);
        const defaultOperator = newConfig?.operators.find(op => op.isDefault)?.value || '';

        onUpdate({
            ...rule,
            type: newType,
            operator: defaultOperator,
            value: '',
            label: newConfig?.label || ''
        });
    };

    const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate({
            ...rule,
            operator: e.target.value,
            value: ''
        });
    };

    const handleValueChange = (value: string | string[]) => {
        onUpdate({
            ...rule,
            value
        });
    };

    return (
        <div>
            <div className="flex gap-2 items-end p-3 rounded-md">
                <div className="flex-1">

                    <select
                        value={rule.type}
                        onChange={handleTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select a rule type</option>
                        {ruleConfigs.map((r) => (
                            <option key={r.type} value={r.type}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>

                {ruleConfig && (
                    <>
                        <div className="flex-1">

                            <select
                                value={rule.operator}
                                onChange={handleOperatorChange}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select an operator</option>
                                {ruleConfig.operators.map((op) => (
                                    <option key={op.value} value={op.value}>
                                        {op.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">

                            <RuleInput
                                ruleConfig={ruleConfig}
                                operator={rule.operator}
                                value={rule.value}
                                onValueChange={handleValueChange}
                            />
                        </div>
                    </>
                )}

                <button
                    onClick={onRemove}
                    className="px-3 py-2 rounded-md cursor-pointer"
                >
                    <p className='text-lg'>x</p>
                </button>
            </div>
            <div className='flex gap-3 justify-start align-center'>
                <div>
                    {rule.logicalOperator && (
                        <div className="flex justify-start mt-2">
                            <span className="px-4 py-1 rounded-md text-xl font-medium">
                                {rule.logicalOperator}
                            </span>
                        </div>
                    )}
                </div>


                <div className='flex justify-start align-center'>
                    {Array.isArray(rule.value) ? rule.value.map((val) =>
                        <span
                            key={val}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100  mx-1"
                        >
                            {val}
                        </span>) : <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100  mx-1"
                        >{rule.value}</span>}
                </div>

            </div>

        </div>
    );
};

export default RuleItem;
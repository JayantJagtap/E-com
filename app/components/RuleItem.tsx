import React, { useState } from 'react'


const rulesConfig = {
    "rules": [
        {
            "type": "specific_collections",
            "label": "Specific Collection",
            "priority": 1,
            "mutuallyExclusiveWith": ["specific_products"],
            "operators": [
                {
                    "value": "contains_any",
                    "label": "contains any"
                },
                {
                    "value": "is_not",
                    "label": "is not"
                }
            ],
            "inputType": "select",
            "placeholder": "Select collections",
            "options": [
                {
                    "value": "ITEM1",
                    "label": "i 1"
                },
                {
                    "value": "ITEM2",
                    "label": "i 3"
                },
            ]
        },
        {
            "type": "product_tags",
            "label": "Product Tags",
            "priority": 2,
            "operators": [
                {
                    "value": "contains_any",
                    "label": "contains any"
                },
                {
                    "value": "is_not",
                    "label": "is not"
                }
            ],
            "inputType": "select",
            "placeholder": "Search product tags",
            "options": [
                {
                    "value": "ITEM1",
                    "label": "i 1"
                },
                {
                    "value": "ITEM2",
                    "label": "i 3"
                },
            ]
        },
        {
            "type": "specific_products",
            "label": "Specific Product",
            "priority": 3,
            "mutuallyExclusiveWith": ["specific_collections"],
            "operators": [
                {
                    "value": "equals_anything",
                    "label": "equals anything",
                    "isDefault": true
                },
                {
                    "value": "contains_any",
                    "label": "contains any"
                },
                {
                    "value": "is_not",
                    "label": "is not"
                }
            ],
            "inputType": "select",
            "placeholder": "Search products",
            "options": [
                {
                    "value": "ITEM1",
                    "label": "i 1"
                },
                {
                    "value": "ITEM2",
                    "label": "i 3"
                },
            ]
        },
        {
            "type": "product_subscribed",
            "label": "Product Subscribed",
            "priority": 4,
            "operators": [
                {
                    "value": "yes",
                    "label": "Yes"
                },
                {
                    "value": "no",
                    "label": "No"
                }
            ],
            "inputType": "select"
        },
        {
            "type": "specific_discount_codes",
            "label": "Specific Discount Codes",
            "priority": 5,
            "operators": [],
            "inputType": "text",
            "placeholder": "code, free"
        },
        {
            "type": "cart_value_range",
            "label": "Cart Value Range",
            "priority": 6,
            "operators": [
                {
                    "value": "is_equal_or_greater_than",
                    "label": "is equal or greater than"
                },
                {
                    "value": "is_between",
                    "label": "is between"
                },
                {
                    "value": "is_less_than",
                    "label": "is less than"
                }
            ],
            "inputType": "number",
            "placeholder": "Enter amount"
        }
    ],
    "otherCategories": [
        {
            "name": "Customer based",
            "items": [
                "Customer specific",
                "Customer tag",
                "Past order count"
            ]
        },
        {
            "name": "Location based",
            "items": [
                "Specific countries"
            ]
        },
        {
            "name": "Language based",
            "items": [
                "Specific locales"
            ]
        },
        {
            "name": "Cart based",
            "items": [
                "Cart value range",
                "Count of items in cart",
                "Individual product count in cart"
            ]
        }
    ]
}


const RuleItem = () => {
    const [rules, setRules] = useState<{
        type: string;
        operator: string;
        value: string;
        label: string;
        logicalOperator: string | null;
    }[]>([]);
    const [selectedRuleType, setSelectedRuleType] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Get the currently selected rule config
    const selectedRule = rulesConfig.rules.find(rule => rule.type === selectedRuleType);

    const handleAddRule = (logicalOperator: string) => {
        if (selectedRuleType && selectedOperator) {
            const newRule = {
                type: selectedRuleType,
                operator: selectedOperator,
                value: inputValue,
                label: selectedRule?.label || '',
                logicalOperator: rules.length > 0 ? logicalOperator : null // Don't add operator for first rule
            };
            setRules([...rules, newRule]);
            // Reset selections
            setSelectedRuleType('');
            setSelectedOperator('');
            setInputValue('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Build Your Rules</h2>

                <div className='flex gap-2'>
                    {/* Rule Type Selection */}
                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rule Type</label>
                        <select
                            value={selectedRuleType}
                            onChange={(e) => {
                                setSelectedRuleType(e.target.value);
                                setSelectedOperator(''); // Reset operator when rule type changes
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select a rule type</option>
                            {rulesConfig.rules.map((rule) => (
                                <option key={rule.type} value={rule.type}>
                                    {rule.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Operator Selection (only shown when rule type is selected) */}
                    {selectedRule && (
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
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

                    {/* Value Input (dynamic based on inputType) */}
                    {selectedRule && selectedOperator && (
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {selectedRule.label} Value
                            </label>
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
                            {selectedRule.inputType === 'select' && (
                                <select
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >

                                    {selectedRule.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {selectedRule.inputType === 'multi-select' && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={selectedRule.placeholder}
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-gray-500">↓</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* AND/OR Buttons (only shown when a rule is ready to be added) */}
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
                                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <span>
                                            <strong>{rule.label}</strong>: {rule.operator} {rule.value}
                                        </span>
                                        <button
                                            onClick={() => setRules(rules.filter((_, i) => i !== index))}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RuleItem
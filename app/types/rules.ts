// types.ts
export type RuleOperator = {
  value: string;
  label: string;
  isDefault?: boolean;
};

export type RuleOption = {
  value: string;
  label: string;
};

export type RuleConfig = {
  type: string;
  label: string;
  priority: number;
  mutuallyExclusiveWith?: string[];
  operators: RuleOperator[];
  inputType: "text" | "number" | "select" | "multi-select";
  placeholder?: string;
  options?: RuleOption[];
};

export type RuleCategory = {
  name: string;
  items: string[];
};

export type RulesData = {
  rules: RuleConfig[];
  otherCategories: RuleCategory[];
};

export type Rule = {
  type: string;
  operator: string;
  value: string;
  label: string;
  logicalOperator: string | null;
};

export type Operator = {
  value: string;
  label: string;
  isDefault?: boolean;
};

export type RuleConfig = {
  type: string;
  label: string;
  priority: number;
  operators: Operator[];
  inputType: "text" | "number" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type Rule = {
  type: string;
  operator: string;
  value: string | string[];
  label: string;
  logicalOperator: string | null;
};

export interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export interface RuleInputProps {
  ruleConfig: RuleConfig;
  operator: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export interface RuleItemProps {
  rule: Rule;
  index: number;
  onUpdate: (index: number, field: string, value: string | string[]) => void;
  onRemove: (index: number) => void;
}

import { RuleConfig } from "../types/types";

export const RULES_CONFIG: { rules: RuleConfig[] } = {
  rules: [
    {
      type: "specific_collections",
      label: "Specific Collection",
      priority: 1,
      operators: [
        {
          value: "contains_any",
          label: "contains any",
        },
        {
          value: "is_not",
          label: "is not",
        },
      ],
      inputType: "select",
      placeholder: "Select collections",
      options: [
        {
          value: "Car_Collection",
          label: "Car Collection",
        },
        {
          value: "Books_Collection",
          label: "Books Collection",
        },
        {
          value: "Cards_Collection",
          label: "Cards Collection",
        },
        {
          value: "Shoes_Collection",
          label: "Shoes Collection",
        },
        {
          value: "Coin_Collection",
          label: "Coin Collection",
        },
        {
          value: "Stamp_Collection",
          label: "Stamp Collection",
        },
      ],
    },
    {
      type: "product_tags",
      label: "Product Tags",
      priority: 2,
      operators: [
        {
          value: "contains_any",
          label: "contains any",
        },
        {
          value: "is_not",
          label: "is not",
        },
      ],
      inputType: "select",
      placeholder: "Search product tags",
      options: [
        {
          value: "Frequently_Bought",
          label: "Frequently Bought",
        },
        {
          value: "Limited_Edition",
          label: "Limited_Edition",
        },
      ],
    },
    {
      type: "specific_products",
      label: "Specific Product",
      priority: 3,
      operators: [
        {
          value: "equals_anything",
          label: "equals anything",
          isDefault: true,
        },
        {
          value: "contains_any",
          label: "contains any",
        },
        {
          value: "is_not",
          label: "is not",
        },
      ],
      inputType: "select",
      placeholder: "Search products",
      options: [
        {
          value: "Asian_Shoes",
          label: "Asian Shoes",
        },
        {
          value: "Front_Bumper",
          label: "Front Bumper",
        },
      ],
    },
    {
      type: "specific_discount_codes",
      label: "Specific Discount Codes",
      priority: 4,
      operators: [
        {
          value: "50",
          label: "upto 50%",
        },
        {
          value: "20",
          label: "upto 20%",
        },
      ],
      inputType: "text",
      placeholder: "actual value",
    },
    {
      type: "cart_value_range",
      label: "Cart Value Range",
      priority: 5,
      operators: [
        {
          value: "is_equal_or_greater_than",
          label: "is equal or greater than",
        },
        {
          value: "is_between",
          label: "is between",
        },
        {
          value: "is_less_than",
          label: "is less than",
        },
      ],
      inputType: "number",
      placeholder: "Enter amount",
    },
  ],
};

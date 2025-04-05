import { RulesData } from "./rules";

export const rulesConfig: RulesData = {
  rules: [
    {
      type: "specific_collections",
      label: "Specific Collection",
      priority: 1,
      mutuallyExclusiveWith: ["specific_products"],
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
          value: "ITEM1",
          label: "i 1",
        },
        {
          value: "ITEM2",
          label: "i 3",
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
          value: "ITEM1",
          label: "i 1",
        },
        {
          value: "ITEM2",
          label: "i 3",
        },
      ],
    },
    {
      type: "specific_products",
      label: "Specific Product",
      priority: 3,
      mutuallyExclusiveWith: ["specific_collections"],
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
          value: "ITEM1",
          label: "i 1",
        },
        {
          value: "ITEM2",
          label: "i 3",
        },
      ],
    },
    {
      type: "product_subscribed",
      label: "Product Subscribed",
      priority: 4,
      operators: [
        {
          value: "yes",
          label: "Yes",
        },
        {
          value: "no",
          label: "No",
        },
      ],
      inputType: "select",
    },
    {
      type: "specific_discount_codes",
      label: "Specific Discount Codes",
      priority: 5,
      operators: [],
      inputType: "text",
      placeholder: "code, free",
    },
    {
      type: "cart_value_range",
      label: "Cart Value Range",
      priority: 6,
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
  otherCategories: [
    {
      name: "Customer based",
      items: ["Customer specific", "Customer tag", "Past order count"],
    },
    {
      name: "Location based",
      items: ["Specific countries"],
    },
    {
      name: "Language based",
      items: ["Specific locales"],
    },
    {
      name: "Cart based",
      items: [
        "Cart value range",
        "Count of items in cart",
        "Individual product count in cart",
      ],
    },
  ],
};

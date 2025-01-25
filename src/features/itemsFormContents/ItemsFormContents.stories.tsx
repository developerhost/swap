import { type Meta, type StoryObj } from "@storybook/react";

import { ItemsFormContents } from "@/features/itemsFormContents";

export default {
  component: ItemsFormContents,
} satisfies Meta<typeof ItemsFormContents>;

type Story = StoryObj<typeof ItemsFormContents>;

export const Empty: Story = {
  args: {
    name: "",
    conditionCode: "",
    description: "",
    tags: "",
    isShippingIncluded: "",
    shippingMethodCode: "",
    shippingMethodCustom: "",
    shippingDaysCode: "",
    price: "",
  },
};

export const Filled: Story = {
  args: {
    name: "商品名",
    conditionCode: "1",
    description: "商品説明",
    tags: "タグ1,タグ2",
    isShippingIncluded: "1",
    shippingMethodCode: "1",
    shippingDaysCode: "1",
    shippingMethodCustom: "",
    price: "300",
  },
};

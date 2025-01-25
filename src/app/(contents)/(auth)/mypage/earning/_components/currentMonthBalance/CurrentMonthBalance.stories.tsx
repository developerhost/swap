import { CurrentMonthBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/currentMonthBalance";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: CurrentMonthBalance,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CurrentMonthBalance>;

type Story = StoryObj<typeof CurrentMonthBalance>;

export const Default: Story = {
  args: {
    monthBalance: (50000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
  },
};

export const NoBalance: Story = {
  args: {
    monthBalance: (0).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
  },
};

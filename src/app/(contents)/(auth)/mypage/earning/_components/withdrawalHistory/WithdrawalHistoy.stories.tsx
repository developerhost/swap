import { WithdrawalHistory } from "@/app/(contents)/(auth)/mypage/earning/_components/withdrawalHistory";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: WithdrawalHistory,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WithdrawalHistory>;

type Story = StoryObj<typeof WithdrawalHistory>;
const history = [
  {
    id: "1",
    amount: (50000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
    date: new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    isTransferred: false,
  },
];

export const Default: Story = {
  args: {
    history,
  },
};

export const NoHistory: Story = {
  args: {
    history: [],
  },
};

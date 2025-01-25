import { SalesBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { Button } from "@/ui";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: SalesBalance,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SalesBalance>;

type Story = StoryObj<typeof SalesBalance>;

export const Default: Story = {
  args: {
    balance: (50000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
  },
};

export const NoBalance: Story = {
  args: {
    balance: (0).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
  },
};

export const WithEnableRequest: Story = {
  args: {
    balance: (50000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
    children: <Button>出金申請する</Button>,
  },
};

export const WithDesableRequest: Story = {
  args: {
    balance: (50000).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    }),
    children: <Button disabled>出金申請する</Button>,
  },
};

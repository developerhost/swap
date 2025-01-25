import { MypageItemsSkeleton } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemsSkeleton";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: MypageItemsSkeleton,
} satisfies Meta<typeof MypageItemsSkeleton>;

type Story = StoryObj<typeof MypageItemsSkeleton>;

export const Default: Story = {
  args: {},
};

import { ItemInformation } from "@/app/(contents)/item/[itemId]/_components/itemInformation";
import { mockItem } from "@/mocks/item";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: ItemInformation,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center bg-gray-300 py-16 [&>*]:max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ItemInformation>;

type Story = StoryObj<typeof ItemInformation>;

export const Default: Story = {
  args: {
    item: mockItem,
  },
};

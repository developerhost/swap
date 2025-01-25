// storybook button component
import { MeatballsButton } from "@/ui/buttons";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: MeatballsButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MeatballsButton>;

type Story = StoryObj<typeof MeatballsButton>;

export const Default: Story = {
  args: {
    children: "ボタン",
    className: "bg-white",
  },
};

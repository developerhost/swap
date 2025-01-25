import { MypageItemListRenderer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList/MypageItemListRenderer";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  component: MypageItemListRenderer,
  decorators: [
    (Story) => (
      <div className="grid w-72 items-center bg-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MypageItemListRenderer>;

type Story = StoryObj<typeof MypageItemListRenderer>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "商品名",
        createdAt: new Date(),
        images: [
          {
            imageURL: "https://picsum.photos/200",
          },
        ],
      },
      {
        id: "2",
        name: "商品名",
        createdAt: new Date(),
        images: [
          {
            imageURL: "https://picsum.photos/300",
          },
        ],
      },
      {
        id: "3",
        name: "商品名",
        createdAt: new Date(),
        images: [
          {
            imageURL: "https://picsum.photos/400",
          },
        ],
      },
    ],
  },
};

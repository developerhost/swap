import { type findItemById } from "@/repositories/item";

export const mockItem = {
  id: "1",
  name: "商品名",
  conditionCode: "1",
  description: "商品説明",
  tags: [
    {
      id: "1",
      itemId: "1",
      tagId: "1",
      tag: {
        id: "1",
        text: "タグ名",
        createdAt: new Date(),
      },
    },
  ],
  isShippingIncluded: true,
  shippingMethodCode: "1",
  shippingDaysCode: "1",
  shippingMethodCustom: "",
  price: 300,
  isPublic: true,
  createdAt: new Date(),
  isDeleted: false,
  pageView: 0,
  previousPrice: null,
  sellerId: "1",
  updatedAt: new Date(),
  transaction: null,
  images: [],
} as const satisfies Awaited<ReturnType<typeof findItemById>>;

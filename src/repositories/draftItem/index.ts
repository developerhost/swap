import prisma from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import "server-only";

/** 登録用DraftItem型 */
export type DraftItemCreateInput = Prisma.DraftItemCreateWithoutSellerInput;

/**画像とタグを含んだDraftItemの配列 */
export type DraftItemReadResultBySellerId = Awaited<
  ReturnType<typeof findDraftItemsBySellerId>
>;

/** findDraft用の並び順型 */
export type DraftItemOrderBy = Prisma.DraftItemOrderByWithRelationInput;

/**
 * 下書き商品を作成する
 * @param sellerId 出品者ID
 * @param draftItem 下書き商品情報
 * @param imageURLs 画像URL
 * @param tagTexts タグ
 */
export const createDraftItem = (
  sellerId: string,
  draftItem: DraftItemCreateInput,
  imageURLs?: string[],
  tagTexts?: string[],
) =>
  prisma.draftItem.create({
    data: {
      ...draftItem,
      seller: { connect: { id: sellerId } },
      ...(imageURLs && imageURLs.length > 0
        ? {
            images: {
              createMany: {
                data: imageURLs?.map((imageURL, i) => ({ imageURL, order: i })),
              },
            },
          }
        : {}),
      ...(tagTexts && tagTexts.length > 0
        ? {
            tags: {
              create: tagTexts.map((text) => ({
                tag: { connectOrCreate: { where: { text }, create: { text } } },
              })),
            },
          }
        : {}),
    },
  });

/**
 * 下書き商品を取得する
 * @param id 下書き商品ID
 */
export const findDraftItemById = (id: string) =>
  prisma.draftItem.findUniqueOrThrow({
    where: { id },
    include: {
      images: { select: { imageURL: true }, orderBy: { order: "asc" } },
      tags: { select: { tag: true } },
    },
  });

/**
 * 指定したユーザーの下書き商品を取得する
 * @param sellerId 出品者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findDraftItemsBySellerId = (
  sellerId: string,
  page: number,
  size: number,
  orderBy: DraftItemOrderBy,
) =>
  prisma.draftItem.findMany({
    where: { sellerId },
    skip: (page - 1) * size,
    take: size,
    orderBy,
    include: {
      images: { select: { imageURL: true }, orderBy: { order: "asc" } },
      tags: { select: { tag: true } },
    },
  });

/**
 * 指定したユーザーの下書き商品総数を取得する
 * @param sellerId 出品者ID
 */
export const countDraftItemsBySellerId = (sellerId: string) =>
  prisma.draftItem.count({ where: { sellerId } });

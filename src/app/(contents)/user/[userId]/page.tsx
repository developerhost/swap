import { UserInfoContainer } from "@/app/(contents)/user/[userId]/_components/userInfoContainer";
import { findUserById } from "@/repositories/user";
import { TitleUnderbar } from "@/ui/structure";
import { type Item } from "@prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  }>;
};

/**
 * ユーザーページ
 * /user/[userId]
 * @todo ユーザー情報を表示する
 */
const Page = async ({ params, searchParams }: Props) => {
  const { userId } = await params;
  const {
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
  } = await searchParams;
  const user = await findUserById(userId);
  if (!user) {
    notFound();
  }
  return (
    <>
      <TitleUnderbar title="ユーザーページ" />
      <UserInfoContainer {...{ page, size, sort, order, user }} isPublic />
    </>
  );
};

export default Page;

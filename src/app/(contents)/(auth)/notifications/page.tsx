import { NotificationContainer } from "@/app/(contents)/(auth)/notifications/_component";

type Props = {
  searchParams: Promise<{
    filter: "all" | "unread";
    page: number;
    size: number;
  }>;
};

/**
 * お知らせページ
 */
const Page = async ({ searchParams }: Props) => {
  const { filter = "all", page = 1, size = 27 } = await searchParams;
  return <NotificationContainer filter={filter} page={page} size={size} />;
};

export default Page;

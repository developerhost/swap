import { SalesBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { SalesHistoryContainer } from "@/app/(contents)/(auth)/mypage/earning/history/_components/salesHistory";
import { processSalesBalance } from "@/app/(contents)/(auth)/mypage/earning/services";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { PageTitle } from "@/ui/structure";

/**
 * 売上履歴ページ
 * /mypage/earning/history
 */
const Page = async () => {
  const { balance } = await processSalesBalance();
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.HISTORY]} />
      <SalesBalance balance={balance} />
      <SalesHistoryContainer />
    </>
  );
};

export default Page;

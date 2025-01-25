import { SalesBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { processSalesBalance } from "@/app/(contents)/(auth)/mypage/earning/services";
import { RequestForm } from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";

/**
 * 出金申請ページ
 * /mypage/earning/withdrawal/request
 */
const Page = async () => {
  const { request, balance } = await processSalesBalance();

  return (
    <>
      <PageTitle title="出金申請フォーム" />
      <Section>
        <VerifyProvider>
          <RequestForm request={request}>
            <SalesBalance balance={balance} />
          </RequestForm>
        </VerifyProvider>
      </Section>
    </>
  );
};
export default Page;

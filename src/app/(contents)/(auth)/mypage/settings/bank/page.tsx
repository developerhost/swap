import { BankPageContainer } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/BankPageContainer";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 銀行口座情報を表示するページ
 * /mypage/bank
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect("api/auth/login");
  }

  return (
    <Section>
      <VerifyProvider>
        <BankPageContainer userId={user.id} />
      </VerifyProvider>
    </Section>
  );
};

export default Page;

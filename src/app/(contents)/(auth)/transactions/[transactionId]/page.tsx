import {
  LoadingSpinner,
  MessageContainer,
  MessageForm,
  OptionMenu,
  TransactionProgressButton,
  TransactionStatus,
  UserInfo,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { ShippingSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/ShippingSection";
import { findTransactionWithHandling } from "@/app/(contents)/(auth)/transactions/[transactionId]/services";
import { isDevelopment } from "@/constants/environment";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { type Metadata } from "next";
import { Suspense, lazy } from "react";

const TestTransactionContainer = lazy(
  () =>
    import(
      "@/app/(contents)/(auth)/transactions/[transactionId]/_components/TestTransactionContainer.develop"
    ),
);

export const metadata: Metadata = {
  title: "取引ページ",
  description: "取引ページ",
};

/**
 * 取引詳細ページ
 * /transactions/[transactionId]
 */
const Page = async ({
  params: { transactionId },
}: {
  params: { transactionId: string };
}) => {
  const { transaction, sessionUser, seller, userType, statusCode } =
    await findTransactionWithHandling(transactionId);

  return (
    <>
      <VerifyProvider>
        <div className="grid w-full gap-8">
          <TransactionStatus {...{ statusCode, userType }} />
          <ShippingSection {...{ transaction, userType }} />
          <TransactionProgressButton
            {...{ statusCode, transactionId, userType }}
          />
          <UserInfo {...{ userType, seller, buyer: transaction.buyer }} />
          <OptionMenu {...{ sessionUser, userType }} />
          <TitleUnderbar title="取引メッセージ" />
          <Section className="flex flex-1 flex-col gap-4">
            <Suspense fallback={<LoadingSpinner />}>
              <MessageContainer {...{ transactionId, sessionUser }} />
            </Suspense>
            <MessageForm {...{ transactionId }} />
          </Section>
        </div>
      </VerifyProvider>
      {isDevelopment && <TestTransactionContainer {...{ transactionId }} />}
    </>
  );
};

export default Page;

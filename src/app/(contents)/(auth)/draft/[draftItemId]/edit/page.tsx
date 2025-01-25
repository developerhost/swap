import { EditDraftItemForm } from "@/app/(contents)/(auth)/draft/[draftItemId]/edit/_components/editDraftItemForm";
import { findDraftItemWithHandling } from "@/app/(contents)/(auth)/draft/[draftItemId]/edit/services";
import { convertItemToFormValues } from "@/app/(contents)/(auth)/item/[itemId]/edit/utils";
import { findTags } from "@/repositories/item/tag";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type Props = { params: { draftItemId: string } };

export const metadata: Metadata = {
  title: "下書き商品の編集",
  description: `商品の編集ページです`,
};

/**
 * 下書き商品編集ページ
 * /draft/[draftItemId]/edit
 */
const Page = async ({ params: { draftItemId } }: Props) => {
  const [draftItem, tags, user] = await Promise.all([
    findDraftItemWithHandling(draftItemId),
    findTags(),
    getSessionUser(),
  ]);

  if (!user) {
    redirect("/signin");
  }

  if (draftItem.sellerId !== user.id) {
    notFound();
  }
  // TODO 要実装 コードの雰囲気のために仮置き
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const initialProductFormValues = convertItemToFormValues(draftItem);

  return (
    <>
      <PageTitle title="下書き商品編集" />
      <Section>
        <VerifyProvider>
          <EditDraftItemForm
            {...{ draftItemId, tags, initialProductFormValues }}
          />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

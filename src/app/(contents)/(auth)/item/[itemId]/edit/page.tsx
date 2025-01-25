import { EditItemForm } from "@/app/(contents)/(auth)/item/[itemId]/edit/_components/editItemForm";
import { convertItemToFormValues } from "@/app/(contents)/(auth)/item/[itemId]/edit/utils";
import { findItemWithHandling } from "@/app/(contents)/item/[itemId]/services";
import { findTags } from "@/repositories/item/tag";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { PageTitle, Section } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: { itemId: string } };

/** メタデータを生成する */
export const generateMetadata = async ({
  params: { itemId },
}: Props): Promise<Metadata> => {
  const item = await findItemWithHandling(itemId);
  return {
    title: `商品の編集: ${item.name}`,
    description: `商品の編集ページです`,
  };
};

/**
 * アイテム編集ページ
 * /item/[itemId]/edit
 */
const Page = async ({ params: { itemId } }: Props) => {
  const [item, tags, user] = await Promise.all([
    findItemWithHandling(itemId),
    findTags(),
    getSessionUser(),
  ]);

  if (!user) {
    redirect("/signin");
  }

  if (item.sellerId !== user.id) {
    redirect(`/item/${itemId}`);
  }

  const initialProductFormValues = convertItemToFormValues(item);

  return (
    <>
      <PageTitle title="商品編集" />
      <Section>
        <VerifyProvider>
          <EditItemForm {...{ itemId, tags, initialProductFormValues }} />
        </VerifyProvider>
      </Section>
    </>
  );
};

export default Page;

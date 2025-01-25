import { H } from "@/ui/structure/H";

/**
 * メンテナンス中です
 * @see /src/app/middleware.ts
 */
const Page = () => (
  <div className="my-12 flex flex-col items-center">
    <H className="my-10 text-4xl font-bold">メンテナンス中です</H>
    <p className="font-bold">このサイトは現在メンテナンス中です。</p>
    <p className="font-bold">しばらくしてから再度お試しください。</p>
  </div>
);

export default Page;

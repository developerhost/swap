import defaultIcon from "@/images/profile-pic-placeholder.png";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

type DisplayUser = {
  /** ユーザーID */
  id: string;
  /** ユーザー名 */
  name: string | null;
  /** ユーザー画像 */
  image: string | null;
};

type Props = {
  /** 出品者かどうか */
  userType: "seller" | "buyer";
  /** 出品者情報 */
  seller: DisplayUser;
  /** 購入者情報 */
  buyer: DisplayUser;
};

/**
 * 現在ログインしているユーザーに応じて、相手の情報を表示するコンポーネント
 * @returns div
 */
export const UserInfo = ({ userType, seller, buyer }: Props) => {
  const displayUser = userType === "seller" ? buyer : seller;

  return (
    <Link href={`/user/${displayUser.id}`} className="flex flex-col">
      <p>{userType === "seller" ? "購入者" : "出品者"}情報</p>
      <div className="btn btn-ghost flex h-20 items-center justify-between px-0 normal-case">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <Image
                src={displayUser.image ?? defaultIcon}
                width={64}
                height={64}
                alt="ユーザー画像"
              />
            </div>
          </div>
          <span className="text-xl">{displayUser.name}</span>
        </div>
        <FaChevronRight />
      </div>
    </Link>
  );
};

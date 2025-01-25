import { CancelModalButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/optionMenu/CancelModalButton";
import { MeatballsButton } from "@/ui/buttons/iconButton";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";

type OptionMenuProps = {
  /** ユーザー種別 */
  userType: "buyer" | "seller";
};

/**
 * オプションメニュー
 * @param props - オプションメニューのプロパティ
 * @returns
 */
export const OptionMenu = ({ userType }: OptionMenuProps) => {
  const menuItems = [<CancelModalButton key={0} {...{ userType }} />];
  return (
    <DropdownContainer>
      <DropdownItem menuItems={menuItems}>
        <MeatballsButton aria-label="取引メニュー" />
      </DropdownItem>
    </DropdownContainer>
  );
};

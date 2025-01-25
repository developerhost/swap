import { CONDITION, SHIPPING_DAYS, SHIPPING_METHOD } from "@/constants/item";
import { mockItem } from "@/mocks/item";
import { render, screen } from "@testing-library/react";
import { type ComponentProps } from "react";
import { ItemInformation } from ".";

const renderComponent = (
  item: Partial<ComponentProps<typeof ItemInformation>["item"]>,
) => render(<ItemInformation item={{ ...mockItem, ...item }} />);

describe("ItemInformation", () => {
  test("商品の状態に不正な値が入っている場合、不明と表示される", () => {
    renderComponent({ conditionCode: "test" });
    expect(screen.getByLabelText("商品の状態")).toHaveTextContent("不明");
  });

  test("発送までの日数に不正な値が入っている場合、不明と表示される", () => {
    renderComponent({ shippingDaysCode: "test" });
    expect(screen.getByLabelText("発送までの日数")).toHaveTextContent("不明");
  });

  test("配送方法に不正な値が入っている場合、不明と表示される", () => {
    renderComponent({ shippingMethodCode: "test" });
    expect(screen.getByLabelText("配送方法")).toHaveTextContent("不明");
  });
  test("正しい値が入っている場合、すべての情報が正しく表示される", () => {
    renderComponent({
      conditionCode: "0",
      shippingDaysCode: "0",
      shippingMethodCode: "0",
    });
    expect(screen.getByLabelText("商品の状態")).toHaveTextContent(
      CONDITION["0"],
    );
    expect(screen.getByLabelText("発送までの日数")).toHaveTextContent(
      SHIPPING_DAYS["0"],
    );
    expect(screen.getByLabelText("配送方法")).toHaveTextContent(
      SHIPPING_METHOD["0"],
    );
  });
});

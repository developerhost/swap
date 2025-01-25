"use client";

import { HANDING_CHARGE_RATE, PRICE_LIMIT } from "@/constants/item";
import { Input } from "@/ui/form/inputs/elements";
import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";
import { z } from "zod";

const valueSchema = z
  .number()
  .refine((val) => PRICE_LIMIT.MIN <= val && val <= PRICE_LIMIT.MAX);

type PriceInputProps = Omit<
  ComponentProps<typeof Input>,
  "onChange" | "min" | "max" | "inputMode" | "placeholder" | "type"
>;

/**
 * 手数料計算付きのinputタグ
 * @returns input,label,div
 */
export const PriceInput = memo(({ ...props }: PriceInputProps) => {
  const defaultPrice = Number(props.defaultValue) ?? "";
  const [amount, setAmount] = useState<number | "">(defaultPrice);

  const isOutOfRange =
    amount !== "" && (amount > PRICE_LIMIT.MAX || amount < PRICE_LIMIT.MIN);
  const handlingCharge =
    amount === "" ? "" : Math.round(amount * HANDING_CHARGE_RATE);
  const amountAfterCharge =
    handlingCharge === "" || amount === "" ? "" : amount - handlingCharge;

  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (value === "") {
        setAmount("");
        return;
      }
      const validated = valueSchema.safeParse(Number(value));
      if (!validated.success) {
        setAmount("");
        return;
      }
      setAmount(validated.data);
    },
    [],
  );

  return (
    <>
      <Input
        type="number"
        placeholder="0"
        min={PRICE_LIMIT.MIN}
        max={PRICE_LIMIT.MAX}
        inputMode="numeric"
        className="w-full text-right font-bold"
        onChange={handleChange}
        {...props}
      />
      <label className="label-text-alt flex justify-between text-error">
        {isOutOfRange
          ? `¥${new Intl.NumberFormat().format(
              PRICE_LIMIT.MIN,
            )}以上¥${new Intl.NumberFormat().format(
              PRICE_LIMIT.MAX,
            )}以下で入力してください`
          : "　"}
      </label>
      <div className="flex justify-between">
        <span>販売手数料</span>
        <div className="before:mr-2 before:content-['¥']">{handlingCharge}</div>
      </div>
      <div className="flex justify-between">
        <span>販売利益</span>
        <div className="before:mr-2 before:content-['¥']">
          {amountAfterCharge}
        </div>
      </div>
    </>
  );
});

PriceInput.displayName = "PriceInput";

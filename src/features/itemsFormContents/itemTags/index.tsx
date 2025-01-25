"use client";

import { TagCard } from "@/features/itemsFormContents/itemTags/TagCard";
import { convertTags } from "@/features/itemsFormContents/utils";
import { Button } from "@/ui";
import { Input } from "@/ui/form";
import { type Tag } from "@prisma/client";
import { useCallback, useId, useState } from "react";

type Props = {
  /** formのname属性 */
  name: string;
  /** データベースから取得したタグ文字列 */
  suggestedTags: Tag[];
  /** 選択済みのタグの配列 */
  selectedTags?: string;
  /** タグの最大数 */
  maxTags?: number;
};

const ENTER_KEY_CODE = 13;

/**
 * タグを入力するコンポーネント
 * 入力されたタグは確定された時点でカンマ区切りで結合されてhidden inputに設定される
 */
export const ItemTagsInput = ({
  name,
  suggestedTags: tags,
  selectedTags,
  maxTags = 16,
}: Props) => {
  const initialTagNames = selectedTags
    ? convertTags(selectedTags)
    : new Set<string>();
  // 入力されたタグの配列
  const [inputTags, setInputTags] = useState<Set<string>>(initialTagNames);
  // 入力されたタグの文字列
  const [inputValue, setInputValue] = useState("");

  const id = useId();

  const suggestedTags = tags.map((tag) => tag.text);
  const hasReachedMaxTags = inputTags.size >= maxTags;

  /** タグを追加する関数 */
  const handleAdd = useCallback(() => {
    if (!inputValue) {
      setInputValue("");
      return;
    }

    setInputTags((prevTags) => {
      if (prevTags.has(inputValue)) {
        return prevTags;
      }
      setInputValue("");
      return new Set([...prevTags, inputValue]);
    });
  }, [inputValue]);

  /**
   * Enterキーが押された時の処理
   * タグの追加ができる場合は追加する
   */
  const handleKeyDownEnter: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        // ブラウザでIME確定時のEnterキー入力をハンドリングしないようにするためにkeyCodeを確認する
        if (e.keyCode !== ENTER_KEY_CODE || hasReachedMaxTags) {
          return;
        }
        e.preventDefault();

        handleAdd();
      },
      [handleAdd, hasReachedMaxTags],
    );

  /** タグを削除する関数 */
  const handleDelete = useCallback((tagName: string) => {
    setInputTags((prevTags) => {
      prevTags.delete(tagName);
      return new Set(prevTags);
    });
  }, []);

  /** Inputの値を状態管理するための関数 カンマ入力時だけ値を更新しない */
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (e.target.value.includes(",")) return;
      setInputValue(e.target.value);
    }, []);

  return (
    <div className="flex flex-col gap-3">
      <span id={id}>商品関連キーワード</span>
      <div className="grid grid-cols-2 gap-2">
        {inputTags.size > 0 &&
          Array.from(inputTags).map((tag) => (
            <TagCard key={tag} tagText={tag} onDelete={handleDelete} />
          ))}
      </div>
      <Input
        list={`list-${id}`}
        type="text"
        value={inputValue}
        placeholder="タグ名を入力してください"
        onKeyDown={handleKeyDownEnter}
        onChange={handleInputChange}
        disabled={hasReachedMaxTags}
        aria-labelledby={id}
      />
      <datalist id={`list-${id}`}>
        {suggestedTags.map((tag) => (
          <option key={tag} value={tag} data-testid={`test-${tag}`} />
        ))}
      </datalist>
      <Button onClick={handleAdd} disabled={hasReachedMaxTags}>
        タグを追加
      </Button>
      {/* Server Action用のinput */}
      <input
        type="hidden"
        name={name}
        value={Array.from(inputTags).join(",")}
      />
    </div>
  );
};

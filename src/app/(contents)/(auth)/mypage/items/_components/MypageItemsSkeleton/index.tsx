const numberOfSkeleton = 5;
/**
 * マイページの商品一覧スケルトンコンポーネント
 */
export const MypageItemsSkeleton = () => (
  <div className="w-full">
    {Array.from({ length: numberOfSkeleton }).map((_, index) => (
      <div
        key={index}
        className="grid animate-pulse grid-cols-[auto_1fr_auto] items-center gap-4 py-2"
      >
        <div className="size-[calc((100vw-1.5rem)/4)] rounded bg-slate-700 sm:size-36" />
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <p className="col-span-2 h-4 w-40 bg-slate-700" />
          <p className="h-4 w-24 bg-slate-700" />
        </div>
        <div className="ml-auto size-9 bg-slate-700" />
      </div>
    ))}
  </div>
);

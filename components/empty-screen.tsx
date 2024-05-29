export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-[20px] backdrop-blur-xl p-8 shadow  bg-black/30">
        <p className="leading-normal text-muted-foreground text-center text-white">
          あなたの旅の思い出の一曲を生成します。
        </p>
        <p className="leading-normal text-muted-foreground text-center text-white">
          以下の入力欄に、どんな旅だったかを入力してください。
        </p>
      </div>
    </div>
  )
}

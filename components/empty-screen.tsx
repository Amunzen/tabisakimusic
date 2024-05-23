export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold text-center">旅先みゅーじっく</h1>
        <p className="leading-normal text-muted-foreground text-center">
          あなたの旅の思い出から、思い出の一曲を生成します。<br></br>
          旅先や、旅の思い出を、下の入力欄に入力してみてください。
        </p>
      </div>
    </div>
  )
}

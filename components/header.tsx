
function Logo() {
  return <span className="font-bold">旅先みゅーじっく</span>
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-10">
        <Logo />
      </div>
    </header>
  )
}

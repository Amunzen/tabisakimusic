function Logo() {
  return (
    <span className="font-extrabold text-white text-xl ">旅先みゅーじっく</span>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full h-16 px-4 shrink-0 items-center justify-center">
      <Logo />
    </header>
  )
}

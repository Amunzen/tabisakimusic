import Image from 'next/image'

function Logo() {
  return (
    <span className="font-extrabold text-white text-xl ">
      旅先コンシェルジュ 楽曲生成モードβ版
    </span>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full px-4 shrink-0 items-center justify-center">
      <Image src="/pc_noren.png" alt="logo" width={1000} height={300} />
    </header>
  )
}

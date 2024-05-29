import { redirect } from 'next/navigation'

export const metadata = {
  title: '旅先コンシェルジュ 楽曲生成モードβ版'
}

export default async function IndexPage() {
  redirect('/c/tsugihime')
}

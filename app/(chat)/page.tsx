import { redirect } from 'next/navigation'

export const metadata = {
  title: '旅先みゅーじっく'
}

export default async function IndexPage() {
  redirect('/c/tsugihime')
}

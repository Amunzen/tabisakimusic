import { SongsSchema } from '@/app/definition'
import SongComponent from '@/components/music/song2'
export default async function Page() {
  const url =
    'http://localhost:3000/api/get?ids=357c8cb0-28ac-4a75-b52a-c886489bd823'

  const res = await fetch(url)
  const data = await res.json()
  const songs = SongsSchema.parse(data)
  console.log({ songs })
  const song = songs[0]
  return (
    <div className="pt-10">
      <SongComponent song={song} />
    </div>
  )
}

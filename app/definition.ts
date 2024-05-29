import { z } from 'zod'

export const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  image_url: z.string().url(),
  lyric: z.string(),
  audio_url: z.string().url(),
  video_url: z.string().url(),
  created_at: z.string().datetime(),
  model_name: z.string(),
  status: z.string(),
  gpt_description_prompt: z.string(),
  prompt: z.string(),
  type: z.string(),
  tags: z.string()
})

export type Song = z.infer<typeof SongSchema>

export const SongsSchema = z.array(SongSchema)

export type Songs = z.infer<typeof SongsSchema>

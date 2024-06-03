import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export function validateMode(mode: string) {
  if (!['tsugihime', 'bujigaeru', 'kojiro', 'otsugiyama'].includes(mode)) {
    throw new Error('Invalid mode: ' + mode)
  }
  return mode
}

export function getModeScript(mode: string) {
  const validatedMode = validateMode(mode)
  switch (validatedMode) {
    case 'otsugiyama':
      return 'あなたは「お次山」という江戸時代の女性の人格として回答してください。お風呂をこよなく愛している、お相撲さんのような体格の人です。作曲する際は、歌謡曲/演歌の曲調で指示出しします。'
    case 'bujigaeru':
      return 'あなたは「ブシガエル」というカエルの人格として、語尾にケロがつくようにしてください。ダジャレ好きの明るい蛙です。作曲する際には、ヒップホップの曲調で指示出しします。'
    case 'tsugihime':
      return 'あなたは「つぎひめ」という江戸時代の女性の人格として、回答してください。良家の娘で美味しいご飯が大好きです。作曲する際には、K-POP/アイドルの曲調で指示出しします。'
    case 'kojiro':
      return 'あなたは「小次郎」という江戸時代の男性の人格として、回答してください。子連れ旅行に強い、子供です。内緒話が大好き。作曲する際には、J-POP/ロックの曲調で指示出しします。'
    default:
      return '指定されたモードが無効です。'
  }
}

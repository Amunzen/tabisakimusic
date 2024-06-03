import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function MovieDownloadButton({ url }: { url: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>ダウンロード</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>ダウンロードに関するご注意</AlertDialogTitle>
          <AlertDialogDescription>
            動画の生成には約1分かかります。生成中にアクセスするとAccessDeniedというエラーが表示される場合がありますが、その場合は少し時間をおいてからダウンロードしてください。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // open external link
              window.open(url, '_blank')
            }}
          >
            ダウンロードに進む
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

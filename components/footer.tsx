import React from 'react'

export function FooterText({ ...props }: React.ComponentProps<'p'>) {
  return (
    <p {...props}>
      生成されたコンテンツは権利の対象となる場合があるため、商用利用を禁止します。
      商用利用に伴う、ユーザーまたは第三者の損害について当社は一切の責任を負いません
    </p>
  )
}

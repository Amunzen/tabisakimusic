import React from 'react'

export function FooterText({ ...props }: React.ComponentProps<'p'>) {
  return <p {...props}>AIの出力は、正確性に欠ける場合があります。</p>
}

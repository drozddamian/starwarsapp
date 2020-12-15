import React from 'react'
import { ReactElement } from 'react'

type Props = {
  linkUrl?: string
}

const LinkButton: React.FC<Props> = ({ linkUrl }): ReactElement => (
  <div>{linkUrl ? '>' : '<'}</div>
)

export default LinkButton

import styled from '@emotion/styled'
import Link from 'next/link'

interface Active {
  actived: string
}

export const Links = styled(Link)<Active>`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5px 0;
  background-color: ${(props) => props.theme.colors.leaf};
  border: 1px solid
    ${(props) =>
      props.actived === 'true' ? props.theme.colors.white : 'transparent'};
  border-radius: 5px;
  padding: 10px;
  height: 30px;
  color: ${(props) => props.theme.colors.white};
`

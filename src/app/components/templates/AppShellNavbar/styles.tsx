import styled from '@emotion/styled'
import Link from 'next/link'

export const Links = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5px 0;
  background-color: ${(props) => props.theme.colors.leaf};
  border-radius: 5px;
  padding: 10px;
  height: 30px;
  color: ${(props) => props.theme.colors.white};

  &[data-active='true'] {
    background-color: ${(props) => props.theme.colors.leaf};
  }

  &[data-active='false'] {
    background-color: transparent;
  }
`

import styled from '@emotion/styled'

export const ContainerLogin = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  position: relative;
  width: 100%;
  height: 100vh; /* ou o valor que quiser */

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/conceito-de-tecnologia-futurista.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

export const FormContainer = styled.form`
  margin: 30px auto;
  width: 300px;
`

export const Logo = styled.div`
  text-align: center;
  padding: 60px 30px 60px 30px;
  margin-bottom: 30px;
`

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fonts.large};
`

import styled from '@emotion/styled'

export const FormProdutoresContainer = styled.div`
  padding: 30px 0px;
  background-color: ${(props) => props.theme.colors.leaf};

  .mantine-InputWrapper-label {
    color: ${(props) => props.theme.colors.white};
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .button {
    width: 100%;
    margin-bottom: 15px;

    @media (min-width: 480px) {
      width: 180px;
    }
  }
`

export const Title = styled.div`
  @media (min-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fonts.large};
  }

  p {
    color: ${(props) => props.theme.colors.grey['300']};
    font-size: ${(props) => props.theme.fonts.small};
    font-weight: 400;
  }
`
export const FormInputs = styled.form`
  background-color: ${(props) => props.theme.colors.dark};
  text-align: left;
  border-radius: 5px;
  padding: 15px;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  gap: 15px;

  .mantine-Input-wrapper {
    width: 325px;

    @media (min-width: 480px) {
      width: 200px;
    }
  }
  .dialog {
    width: 100%;
  }
`

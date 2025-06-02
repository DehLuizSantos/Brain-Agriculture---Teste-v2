'use client'

/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 0;
        padding: 0;
      }

      button {
        font-family: inherit;
        cursor: pointer;
      }
    `}
  />
)

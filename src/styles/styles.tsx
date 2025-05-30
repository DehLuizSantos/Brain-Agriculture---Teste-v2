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
        font-family: 'Inter', sans-serif;
        background-color: #f9f9f9;
        color: #333;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      h1 {
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

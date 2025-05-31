'use client'
import { Suspense } from 'react'

export default function Produtores() {
  return (
    <div>
      <Suspense fallback={<p>Loading feed...</p>}></Suspense>
    </div>
  )
}

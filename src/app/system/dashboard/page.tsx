'use client'
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<p>Loading feed...</p>}></Suspense>
    </div>
  )
}

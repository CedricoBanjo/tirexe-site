'use client'
import { useState } from 'react'

export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={`copy-btn ${copied ? 'copy-btn-done' : ''}`} onClick={handleCopy}>
      {copied ? '✓ Copié' : 'Copier'}
    </button>
  )
}

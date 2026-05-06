'use client'
export default function CopyButton({ code }) {
  return (
    <button
      className="copy-btn"
      onClick={() => navigator.clipboard.writeText(code)}
    >
      Copier
    </button>
  )
}

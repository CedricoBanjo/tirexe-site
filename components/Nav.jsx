'use client'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const base = pathname === '/' ? '' : '/'

  return (
    <nav>
      <div className="nav-c">
        <a href="/" className="logo-img">
          <img src="/logo.png" alt="Tirexe" style={{height:'34px',width:'auto'}} />
        </a>
        <ul className="nav-links">
          <li><a href={`${base}#expertise`}>Expertise</a></li>
          <li><a href={`${base}#secteurs`}>Secteurs</a></li>
          <li><a href={`${base}#outils`}>Outils & technologies</a></li>
          <li><a href={`${base}#process`}>Fonctionnement</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href={`${base}#contact`}>Contact</a></li>
        </ul>
        <a href={`${base}#contact`} className="nav-cta">Me contacter</a>
      </div>
    </nav>
  )
}

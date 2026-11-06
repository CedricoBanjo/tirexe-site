// Image de partage (LinkedIn, e-mail, réseaux sociaux) des articles et des pages services,
// créée à la construction du site à partir du titre. Taille standard : 1200 × 630.
import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

const TAILLE = { width: 1200, height: 630 }

// Police Manrope (celle du site), en TTF, téléchargée une fois par construction.
// Si le téléchargement échoue, l'image utilise la police par défaut au lieu de bloquer le site.
let polices
function chargerPolices() {
  if (!polices) {
    polices = Promise.all([600, 800].map(async weight => {
      const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}`, { headers: { 'User-Agent': 'Mozilla/4.0' } })).text()
      const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
      if (!url) throw new Error('police introuvable')
      return { name: 'Manrope', data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' }
    })).catch(() => [])
  }
  return polices
}

let logo
function chargerLogo() {
  if (!logo) logo = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), 'public', 'logo.png')).toString('base64')}`
  return logo
}

export async function imagePartage({ titre, etiquette }) {
  const taille = titre.length <= 40 ? 72 : titre.length <= 70 ? 60 : 52

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF', borderLeft: '20px solid #92D14F', padding: '60px 72px 56px', fontFamily: 'Manrope' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={chargerLogo()} width={261} height={68} alt="" />
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#3F7A14', background: '#F0F9E4', border: '2px solid #C8E99A', borderRadius: 100, padding: '10px 26px' }}>
            {etiquette}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: taille, fontWeight: 800, color: '#0F0F0F', lineHeight: 1.12, letterSpacing: -1.5 }}>
          {titre}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, fontWeight: 600, color: '#4A4A4A' }}>
          <div style={{ display: 'flex' }}>Cédric Femminino · Consultant & Développeur VBA Excel Senior</div>
          <div style={{ display: 'flex', color: '#3F7A14', fontWeight: 800 }}>tirexe.com</div>
        </div>
      </div>
    ),
    { ...TAILLE, fonts: await chargerPolices() }
  )
}

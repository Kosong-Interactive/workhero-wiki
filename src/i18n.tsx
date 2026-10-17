import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'id'

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  /** Pick the string for the current language. */
  tr: (en: string, id: string) => string
}

const META: Record<Lang, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: 'WorkHero Wiki — Idle RPG, Gear, Packages & Promote',
    description:
      'Explore WorkHero: Idle RPG — stages, bosses, Core Stats, Fame upgrades, gear, Packages, missions, offices, and calculators in English and Indonesian.',
    ogDescription:
      'WorkHero: Idle RPG guide — stages, bosses, upgrades, gear, Packages, missions, offices, and Promote. English & Indonesian.',
  },
  id: {
    title: 'WorkHero Wiki — Idle RPG, Gear, Package & Promote',
    description:
      'Panduan WorkHero: Idle RPG — stage, boss, Core Stat, upgrade Fame, gear, Package, misi, office, dan kalkulator dalam bahasa Indonesia dan Inggris.',
    ogDescription:
      'Panduan WorkHero: Idle RPG — stage, boss, upgrade, gear, Package, misi, office, dan Promote. Bahasa Indonesia & Inggris.',
  },
}

const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, tr: (en) => en })

const read = (): Lang => {
  try {
    const v = localStorage.getItem('wiki-lang')
    if (v === 'en' || v === 'id') return v
  } catch {
    /* storage unavailable */
  }
  return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(read)
  useEffect(() => {
    document.documentElement.lang = lang
    const m = META[lang]
    document.title = m.title
    for (const [selector, value] of [
      ['meta[name="description"]', m.description],
      ['meta[property="og:title"]', m.title],
      ['meta[property="og:description"]', m.ogDescription],
      ['meta[name="twitter:title"]', m.title],
      ['meta[name="twitter:description"]', m.ogDescription],
    ]) {
      document.querySelector(selector)?.setAttribute('content', value)
    }
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'id' ? 'id_ID' : 'en_US')
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', lang === 'id' ? 'en_US' : 'id_ID')
    try {
      localStorage.setItem('wiki-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])
  return (
    <LangContext.Provider value={{ lang, setLang, tr: (en, id) => (lang === 'id' ? id : en) }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

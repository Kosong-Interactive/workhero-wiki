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
    title: 'WorkHero Wiki — Upgrades, Servers, Shop & Milestones',
    description:
      'Complete reference for WorkHero: Career Idle — workplaces, upgrade items, server tiers, shop items and milestones, with a cost calculator and glossary in English and Indonesian.',
    ogDescription:
      'Everything in WorkHero: Career Idle — workplaces, upgrade items, server tiers, shop items and milestones. English & Indonesian.',
  },
  id: {
    title: 'WorkHero Wiki — Upgrade, Server, Toko & Milestone',
    description:
      'Referensi lengkap WorkHero: Career Idle — tempat kerja, item upgrade, tier server, item toko, dan milestone, lengkap dengan kalkulator biaya dan glosarium dalam bahasa Indonesia dan Inggris.',
    ogDescription:
      'Semua isi WorkHero: Career Idle — tempat kerja, item upgrade, tier server, item toko, dan milestone. Bahasa Indonesia & Inggris.',
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

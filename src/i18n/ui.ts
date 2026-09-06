export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ja';

export const ui = {
  ja: {
    'nav.profile': 'プロフィール',
    'nav.publications': '論文',
    'nav.talks': '講演',
    'site.title': '田中 一成',
    'site.subtitle': 'TANAKA, Kazuaki',
  },
  en: {
    'nav.profile': 'About Me',
    'nav.publications': 'Publications',
    'nav.talks': 'Talks',
    'site.title': 'Kazuaki Tanaka',
    'site.subtitle': '',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

type NavItem = { label: string; href: string };

export function getNavItems(lang: Lang): NavItem[] {
  const t = useTranslations(lang);
  return [
    { label: t('nav.profile'), href: `/${lang}/` },
    { label: t('nav.publications'), href: `/${lang}/publications/` },
    { label: t('nav.talks'), href: `/${lang}/talks/` },
  ];
}

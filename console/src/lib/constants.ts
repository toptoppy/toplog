export interface LanguageOption {
  code: string
  label: string
  nativeName: string
  flag: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'th', label: 'Thai', nativeName: 'ภาษาไทย', flag: '🇹🇭' },
]

export function getLanguageOption(code: string): LanguageOption {
  const clean = (code || '').trim().toLowerCase()
  return (
    SUPPORTED_LANGUAGES.find((l) => l.code === clean) || {
      code: clean,
      label: clean.toUpperCase(),
      nativeName: clean.toUpperCase(),
      flag: '🌐',
    }
  )
}

export function isLanguageSupported(code: string): boolean {
  const clean = (code || '').trim().toLowerCase()
  return SUPPORTED_LANGUAGES.some((l) => l.code === clean)
}

const services = {
  github: /github\.com/,
  email: /mailto:/,
  instagram: /instagram\.com/,
  lastfm: /last\.fm/,
  nexusmods: /nexusmods\.com/,
  steam: /steamcommunity\.com/,
  telegram: /t\.me/,
  twitter: /twitter\.com/,
  vk: /vk\.com/,
  wantr: /wantr\.ru/,
  youtube: /youtube\.com/,
} as const;

export type Services = typeof services;
export type ServicesKey = keyof Services;

export function serviceByUrl(uri: string) {
  return Object.entries(services).find(([, regex]) => regex.test(uri))?.[0] as ServicesKey | undefined;
}

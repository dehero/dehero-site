const services = {
  github: /github\.com\/([^\/]+)/,
  email: /mailto:([^&]+)/,
  instagram: /instagram\.com\/([^\/]+)/,
  lastfm: /last\.fm\/user\/([^\/]+)/,
  nexusmods: /nexusmods\.com/,
  steam: /steamcommunity\.com/,
  telegram: /t\.me\/([^\/]+)/,
  vk: /vk\.com\/([^\/]+)/,
  youtube: /youtube\.com/,
} as const;

const siteRegex = /https?:\/\/([^\/]+)/;

export type Services = typeof services;
export type ServicesKey = keyof Services;

export type LinkInfo =
  | {
      service: ServicesKey;
      label: string | undefined;
    }
  | {
      service: undefined;
      label: string;
    };

export function getLinkInfo(uri: string): LinkInfo {
  for (const [service, regex] of Object.entries(services)) {
    const [match, label] = regex.exec(uri) || [];
    if (match) {
      return { service: service as ServicesKey, label };
    }
  }

  const [match, label] = siteRegex.exec(uri) || [];
  if (match && label) {
    return { service: undefined, label };
  }

  return { service: undefined, label: uri };
}

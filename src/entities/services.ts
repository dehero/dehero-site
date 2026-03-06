export const SERVICE_TYPES = ['download', 'follow', 'write'] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export interface ServiceDescriptor {
  type: ServiceType | undefined;
  regex: RegExp;
}

const services = {
  github: {
    type: 'follow',
    regex: /github\.com\/((?:[^\/]+\/)?[^\/]+)/,
  },
  email: {
    type: 'write',
    regex: /mailto:([^&]+)/,
  },
  instagram: {
    type: 'follow',
    regex: /instagram\.com\/([^\/]+)/,
  },
  lastfm: {
    type: 'follow',
    regex: /last\.fm\/user\/([^\/]+)/,
  },
  max: {
    type: 'follow',
    regex: /max\.ru/,
  },
  nexusmods: {
    type: 'download',
    regex: /nexusmods\.com/,
  },
  steam: {
    type: 'follow',
    regex: /steamcommunity\.com/,
  },
  telegram: {
    type: 'follow',
    regex: /t\.me\/([^\/]+)/,
  },
  vk: {
    type: 'follow',
    regex: /vk\.com\/([^\/]+)/,
  },
  youtube: {
    type: 'follow',
    regex: /youtube\.com/,
  },
} as const satisfies Record<string, ServiceDescriptor>;

const siteRegex = /https?:\/\/([^\/]+)/;

export type Services = typeof services;
export type ServicesKey = keyof Services;

export type LinkInfo =
  | {
      service: ServicesKey;
      label: string | undefined;
      type: ServiceType | undefined;
      uri: string;
    }
  | {
      service: undefined;
      label: string;
      type: ServiceType | undefined;
      uri: string;
    };

export function getLinkInfo(uri: string): LinkInfo {
  for (const [service, descriptor] of Object.entries(services)) {
    const { type, regex } = descriptor;
    const [match, label] = regex.exec(uri) || [];
    if (match) {
      return { service: service as ServicesKey, label, type, uri };
    }
  }

  const [match, label] = siteRegex.exec(uri) || [];
  if (match && label) {
    return { service: undefined, label, type: undefined, uri };
  }

  return { service: undefined, label: uri, type: undefined, uri };
}

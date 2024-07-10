import type { JSX } from 'solid-js';
import { useData } from 'vike-solid/useData';

export interface PageData {
  docs: unknown;
}

export const Page = (): JSX.Element => {
  const data = useData<PageData>();
  return <div>{JSON.stringify(data.docs)}</div>;
};

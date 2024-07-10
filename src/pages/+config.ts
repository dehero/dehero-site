import type { Config } from 'vike/types';
import vikeSolidConfig from 'vike-solid/config';
import { Layout } from '../components/Layout/Layout.js';
import { Page } from '../components/Page/Page.js';

const config: Config = {
  Page,
  Layout,
  passToClient: ['is404', 'pageProps', 'errorWhileRendering'],
  extends: [vikeSolidConfig],
};

export default config;

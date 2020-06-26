import OntLogo from './communities-configs/ont/images/ont.svg?inline';
import TelosLogo from './communities-configs/telos/images/telos-logo-dark.svg?inline';

import { TelosStyles } from './communities-configs/telos';
import { OntStyles } from './communities-configs/ont';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://faq.telos.net',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  test: {
    1: {
      origin: 'https://blockchain-test.peeranha.io',
    },
    2: {
      origin: 'https://community1-test.peeranha.io',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://community2-test.peeranha.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  dev: {
    3: {
      origin: 'http://localhost:31000',
    },
  },
};

export default communitiesConfig[process.env.ENV];

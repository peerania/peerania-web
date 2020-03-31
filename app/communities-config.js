import OntLogo from 'images/communities-logos/ont.svg?inline';
import TelosLogo from 'images/communities-logos/telos.png';
import AgeronaLogo from 'images/communities-logos/agerona.png';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://telos.peeranha.io',
      src: TelosLogo,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
    },
    18: {
      origin: 'https://agerona.peeranha.io',
      src: AgeronaLogo,
    },
  },
  test: {
    2: {
      origin: 'https://blockchain-test.peeranha.io',
      src: OntLogo,
    },
  },
  dev: {
    2: {
      origin: 'http://localhost:13000',
      src: OntLogo,
    },
  },
};

export default communitiesConfig[process.env.ENV];

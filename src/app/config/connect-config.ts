import * as nearAPI from 'near-api-js';

const ConnectConfig = {
  deps: {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://app.mynearwallet.com/',
    helperUrl: 'https://helper.mainnet.near.org',
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  },
};

export default ConnectConfig;

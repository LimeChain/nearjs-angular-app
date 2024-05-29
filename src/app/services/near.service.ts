import { Injectable } from '@angular/core';
import * as nearAPI from 'near-api-js';
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;

@Injectable({
  providedIn: 'root',
})
export class NearService {
  walletConnection: any;
  currentUser: any = null;

  async init() {
    const near = await nearAPI.connect({
      deps: {
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
      },
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://app.mynearwallet.com/',
      helperUrl: 'https://helper.mainnet.near.org',
    });

    this.walletConnection = new nearAPI.WalletConnection(
      near,
      'Nearjs Angular App'
    );

    if (this.walletConnection.getAccountId()) {
      this.currentUser = {
        accountId: this.walletConnection.getAccountId(),
        balance: (await this.walletConnection.account().state()).amount,
      };
    }
  }

  async connect() {
    if (this.currentUser) {
      await this.walletConnection.signOut();
      this.currentUser = null;
    } else {
      await this.walletConnection.requestSignIn({
        contractId: 'usdt.tether-token.near',
        methodNames: ['ft_metadata', 'ft_transfer'],
      });
    }
  }

  async getTokenMetadata() {
    return await this.walletConnection.account().viewFunction({
      contractId: 'usdt.tether-token.near',
      methodName: 'ft_metadata',
    });
  }

  async stateChangeFunctionCall(amount: string, receiver: string) {
    try {
      const functionCallRes = await this.walletConnection
        .account()
        .functionCall({
          contractId: 'usdt.tether-token.near',
          methodName: 'ft_transfer',
          args: {
            amount,
            receiver_id: receiver,
          },
          attachedDeposit: '1',
        });
      console.log('Function Call Response: ', functionCallRes);
    } catch (error) {
      console.error('Error during function call:', error);
    }
  }
}

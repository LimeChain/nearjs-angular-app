import { Account } from 'near-api-js';

export interface User {
  accountId: string;
  balance: string;
}

export interface WalletConnection {
  getAccountId(): string;
  requestSignIn(options: { contractId: string; methodNames: string[] }): void;
  signOut(): void;
  account(): Account;
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NearConnectionService } from '../services/near-connection.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}

@Component({
  standalone: true,
  selector: 'nearjs-demo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './nearjs-demo-form.component.html',
  styleUrls: ['./nearjs-demo-form.component.css'],
})
export class NearjsDemoFormComponent implements OnInit, AfterViewInit {
  connected = false;
  accountId: string | null = null;
  tokenMetadata: TokenMetadata | null = null;
  amount = '';
  receiver = '';
  isInitialized = false;

  constructor(private nearConnection: NearConnectionService) {}

  async ngOnInit() {
    await this.nearConnection.init();
    if (this.nearConnection.currentUser) {
      this.accountId = this.nearConnection.currentUser.accountId;
      this.connected = true;
    }
    this.isInitialized = true;
  }

  async ngAfterViewInit() {
    await this.nearConnection.init();
    if (this.nearConnection.currentUser) {
      this.accountId = this.nearConnection.currentUser.accountId;
      this.connected = true;
    }
    this.isInitialized = true;
  }

  async handleConnect() {
    try {
      await this.nearConnection.connect();
      if (this.nearConnection.currentUser) {
        this.accountId = this.nearConnection.currentUser.accountId;
        this.connected = true;
      } else {
        this.connected = false;
        this.accountId = null;
      }
    } catch (error) {
      console.error('Error connecting to NEAR:', error);
    }
  }

  async readMetadata() {
    try {
      this.tokenMetadata = await this.nearConnection.getTokenMetadata();
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  }

  async stateChangeFunctionCall() {
    try {
      await this.nearConnection.stateChangeFunctionCall(
        this.amount,
        this.receiver
      );
    } catch (error) {
      console.error('Error signing and sending transaction:', error);
    }
  }
}

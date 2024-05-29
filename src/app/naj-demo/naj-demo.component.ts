import { Component, OnInit } from '@angular/core';
import { NearService } from '../services/near.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-naj-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './naj-demo.component.html',
  styleUrls: ['./naj-demo.component.css'],
})
export class NajDemoComponent implements OnInit {
  connected = false;
  accountId = null;
  tokenMetadata: any;
  amount = '';
  receiver = '';
  isInitialized = false;

  constructor(private nearService: NearService) {}

  async ngOnInit() {
    await this.nearService.init();
    if (this.nearService.currentUser) {
      this.accountId = this.nearService.currentUser.accountId;
      this.connected = true;
    }
    this.isInitialized = true;
  }

  async handleConnect() {
    try {
      await this.nearService.connect();
      if (this.nearService.currentUser) {
        this.accountId = this.nearService.currentUser.accountId;
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
      this.tokenMetadata = await this.nearService.getTokenMetadata();
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  }

  async stateChangeFunctionCall() {
    try {
      await this.nearService.stateChangeFunctionCall(
        this.amount,
        this.receiver
      );
    } catch (error) {
      console.error('Error signing and sending transaction:', error);
    }
  }
}

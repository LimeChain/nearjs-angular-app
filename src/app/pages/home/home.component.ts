import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NearjsDemoFormComponent } from '../../nearjs-demo-form/nearjs-demo-form.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, NearjsDemoFormComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

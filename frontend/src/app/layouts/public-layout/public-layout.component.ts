import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col bg-surface">
      <main class="flex-1 w-full">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class PublicLayoutComponent {}

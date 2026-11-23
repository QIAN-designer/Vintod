import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-[#f5ebe0] dark:bg-[#0d1416] text-slate-900 dark:text-stone-100 antialiased relative selection:bg-[#007782] selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      <!-- Fondo orgánico editorial con curvas fluidas persistente en toda la aplicación -->
      <div class="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#007782]/20 dark:bg-[#005f69]/35 blur-3xl pointer-events-none z-0"></div>
      <div class="fixed top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-[#d97757]/20 dark:bg-[#b84a28]/25 blur-3xl pointer-events-none z-0"></div>
      <div class="fixed -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-[#e89980]/20 dark:bg-[#94381e]/20 blur-3xl pointer-events-none z-0"></div>

      <!-- Patrón SVG sutil line-art de moda global -->
      <div class="fixed inset-0 pointer-events-none opacity-[0.045] dark:opacity-[0.08] select-none z-0 overflow-hidden" aria-hidden="true">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="fashion-pattern-global" width="240" height="240" patternUnits="userSpaceOnUse">
              <path d="M40 35 L60 50 L20 50 Z M40 35 C40 28 46 25 50 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-900 dark:text-stone-400"/>
              <line x1="15" y1="50" x2="65" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-slate-900 dark:text-stone-400"/>
              <path d="M140 30 L165 38 L180 55 L168 62 L160 50 L160 85 L120 85 L120 50 L112 62 L100 55 L115 38 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="text-slate-900 dark:text-stone-400"/>
              <line x1="140" y1="38" x2="140" y2="85" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 3" class="text-slate-900 dark:text-stone-400"/>
              <path d="M35 140 L65 140 L62 205 L52 205 L50 160 L48 160 L46 205 L36 205 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="text-slate-900 dark:text-stone-400"/>
              <path d="M140 175 C140 175 155 168 170 175 C182 180 195 180 200 188 C202 192 198 198 190 198 L140 198 C136 198 134 192 136 186 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="text-slate-900 dark:text-stone-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fashion-pattern-global)"/>
        </svg>
      </div>

      <!-- Navbar flotante -->
      <app-navbar class="relative z-50"></app-navbar>

      <!-- Contenido de las páginas sin cortes de fondo -->
      <main class="flex-1 w-full pt-20 relative z-10 flex flex-col">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer Global fijo al final de cada página -->
      <app-footer></app-footer>
    </div>
  `
})
export class PublicLayoutComponent {}

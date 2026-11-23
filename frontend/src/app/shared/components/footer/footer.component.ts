import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="w-full bg-white/70 dark:bg-[#141e22]/80 backdrop-blur-md border-t border-slate-200/60 dark:border-white/10 mt-auto py-8 transition-colors duration-300 relative z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-stone-400 font-medium">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-[#007782] flex items-center justify-center text-white font-bold text-xs">
            V
          </div>
          <span class="font-bold text-slate-700 dark:text-stone-200">Vintod Marketplace</span>
          <span>— Moda con historia, estilo circular sostenible.</span>
        </div>

        <div class="flex items-center gap-6">
          <a routerLink="/" class="hover:text-[#007782] dark:hover:text-[#2dd4bf] transition-colors">Inicio</a>
          <a routerLink="/products" class="hover:text-[#007782] dark:hover:text-[#2dd4bf] transition-colors">Catálogo</a>
          <a routerLink="/products" [queryParams]="{ category: 'vintage' }" class="hover:text-[#007782] dark:hover:text-[#2dd4bf] transition-colors">Vintage</a>
          <span class="text-slate-400 dark:text-stone-600">© 2026 Vintod</span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="themeService.toggleTheme()"
      [attr.aria-label]="themeService.darkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      [title]="themeService.darkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      class="relative w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 dark:bg-stone-800/90 dark:hover:bg-stone-700/90 border border-slate-200/60 dark:border-stone-700 text-slate-700 dark:text-amber-400 flex items-center justify-center transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
    >
      @if (themeService.darkMode()) {
        <span class="material-symbols-outlined text-[20px] transition-transform duration-300 rotate-0">
          light_mode
        </span>
      } @else {
        <span class="material-symbols-outlined text-[20px] transition-transform duration-300 -rotate-12 text-slate-700">
          dark_mode
        </span>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}

import { Component, Input, OnChanges, SimpleChanges, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LikeService } from '../../../../core/services/like.service';
import { AuthStore } from '../../../../core/auth/auth.store';

@Component({
  selector: 'app-product-like-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="onLikeClick()"
      [disabled]="submitting()"
      [attr.aria-label]="likedByMe() ? 'Quitar like de esta prenda' : 'Dar like a esta prenda'"
      [attr.aria-pressed]="likedByMe()"
      class="h-12 px-4 rounded-full border bg-white/70 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
      [ngClass]="
        likedByMe()
          ? 'text-rose-500 border-rose-200 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/40'
          : 'text-slate-700 dark:text-stone-200 border-slate-300/80 dark:border-stone-700'
      "
    >
      <span
        class="material-symbols-outlined text-[22px] transition-transform"
        [style.font-variation-settings]="heartVariationSettings()"
      >
        favorite
      </span>
      <span class="text-sm font-bold tabular-nums">{{ likesCount() }}</span>
    </button>
  `,
})
export class ProductLikeButtonComponent implements OnChanges {
  @Input({ required: true }) productId!: string;
  @Input() initialLikesCount = 0;

  private likeService = inject(LikeService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  likesCount = signal<number>(0);
  likedByMe = signal<boolean>(false);
  submitting = signal<boolean>(false);

  heartVariationSettings = computed(() => (this.likedByMe() ? "'FILL' 1" : "'FILL' 0"));

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialLikesCount']) {
      this.likesCount.set(this.initialLikesCount ?? 0);
    }
    if (changes['productId'] && this.productId) {
      this.loadLikesStatus();
    }
  }

  private loadLikesStatus(): void {
    this.likeService.getProductLikes(this.productId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.likesCount.set(res.data.likesCount);
          this.likedByMe.set(res.data.likedByMe);
        }
      },
      error: () => {
        // Mantener initialLikesCount como fallback
      },
    });
  }

  onLikeClick(): void {
    if (!this.productId || this.submitting()) {
      return;
    }

    if (!this.authStore.isAuthenticated()) {
      const currentUrl = this.router.url;
      Swal.fire({
        title: 'Inicia sesión para dar like',
        text: 'Debes iniciar sesión con tu cuenta de Vintod para guardar likes en las prendas.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#007782',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
        }
      });
      return;
    }

    this.submitting.set(true);

    if (this.likedByMe()) {
      this.likeService.unlikeProduct(this.productId).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            this.likesCount.set(res.data.likesCount);
            this.likedByMe.set(false);
          }
          this.submitting.set(false);
          this.showToast('Like eliminado');
        },
        error: () => {
          this.submitting.set(false);
          this.loadLikesStatus();
        },
      });
      return;
    }

    this.likeService.likeProduct(this.productId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.likesCount.set(res.data.likesCount);
          this.likedByMe.set(true);
        }
        this.submitting.set(false);
        this.showToast('¡Te gusta esta prenda!');
      },
      error: (err: HttpErrorResponse) => {
        if (err?.status === 409) {
          this.likedByMe.set(true);
          this.loadLikesStatus();
        }
        this.submitting.set(false);
      },
    });
  }

  private showToast(title: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: false,
    }).fire({
      icon: 'success',
      title,
    });
  }
}

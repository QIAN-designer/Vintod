import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthStore } from '../../../core/auth/auth.store';
import { ReviewService, UserReview } from '../../../core/services/review.service';

export interface ReviewStatsEvent {
  ratingAverage: number;
  ratingCount: number;
}

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, DecimalPipe],
  template: `
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-stone-100">
            {{ heading }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-stone-400">
            {{ subtitle }}
          </p>
        </div>
      </div>

      @if (loading()) {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
          <div class="lg:col-span-4 h-56 bg-white/80 dark:bg-stone-900/80 rounded-3xl border border-white/60 dark:border-stone-800"></div>
          <div class="lg:col-span-8 space-y-4">
            <div class="h-28 bg-white/80 dark:bg-stone-900/80 rounded-2xl border border-white/60 dark:border-stone-800"></div>
            <div class="h-28 bg-white/80 dark:bg-stone-900/80 rounded-2xl border border-white/60 dark:border-stone-800"></div>
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <!-- Columna Izquierda: Resumen de Media y Distribución -->
          <div class="lg:col-span-4 bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div class="text-center">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-stone-400">
                Media global
              </p>
              <div class="mt-2 flex items-baseline justify-center gap-1">
                <span class="text-5xl font-black text-slate-900 dark:text-stone-100 tabular-nums">
                  {{ ratingCount() > 0 ? (ratingAverage() | number:'1.1-1') : '0.0' }}
                </span>
                <span class="text-base font-bold text-slate-400 dark:text-stone-500">/ 5</span>
              </div>

              <!-- Estrellas visuales de la media -->
              <div class="flex items-center justify-center gap-1 mt-2">
                @for (star of starScale; track star) {
                  <span
                    class="material-symbols-outlined text-[22px]"
                    [ngClass]="star <= roundedAverage() ? 'text-amber-400' : 'text-slate-300 dark:text-stone-700'"
                    [style.font-variation-settings]="star <= roundedAverage() ? &quot;'FILL' 1&quot; : &quot;'FILL' 0&quot;"
                  >
                    star
                  </span>
                }
              </div>

              <p class="text-xs text-slate-500 dark:text-stone-400 mt-2">
                Basada en <strong>{{ ratingCount() }}</strong> {{ ratingCount() === 1 ? 'valoración' : 'valoraciones' }}
              </p>
            </div>

            <!-- Distribución por estrellas (5 -> 1) -->
            <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-stone-800">
              @for (star of starBreakdownOrder; track star) {
                <div class="flex items-center gap-2.5 text-xs">
                  <span class="w-8 font-bold text-slate-600 dark:text-stone-300 inline-flex items-center gap-0.5 shrink-0">
                    {{ star }}
                    <span class="material-symbols-outlined text-[13px] text-amber-400" style="font-variation-settings: 'FILL' 1">star</span>
                  </span>
                  <div class="flex-1 h-2 bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-amber-400 rounded-full transition-all duration-300"
                      [style.width.%]="getStarPercentage(star)"
                    ></div>
                  </div>
                  <span class="w-6 text-right font-semibold text-slate-500 dark:text-stone-400 tabular-nums">
                    {{ ratingDistribution()[star] || 0 }}
                  </span>
                </div>
              }
            </div>
          </div>

          <!-- Columna Derecha: Formulario de publicación + Listado de comentarios -->
          <div class="lg:col-span-8 space-y-4">

            <!-- Formulario para publicar valoración/comentario (solo si allowCreate y el usuario está autenticado) -->
            @if (allowCreate && targetUserId) {
              @if (!authStore.isAuthenticated()) {
                <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[#007782]/10 dark:bg-[#007782]/25 text-[#007782] dark:text-[#4db8c4] flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-[20px]">rate_review</span>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-900 dark:text-stone-100">
                        ¿Quieres valorar a {{ targetUsername ? '@' + targetUsername : 'este vendedor' }}?
                      </p>
                      <p class="text-xs text-slate-500 dark:text-stone-400">
                        Debes iniciar sesión para poder publicar una valoración o comentario.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    (click)="goToLogin()"
                    class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#007782] hover:bg-[#005f69] text-white shadow-2xs transition-all cursor-pointer shrink-0"
                  >
                    <span class="material-symbols-outlined text-[16px]">login</span>
                    <span>Iniciar sesión</span>
                  </button>
                </div>
              } @else if (!isOwnTarget() && !alreadyReviewedByMe()) {
                <form
                  [formGroup]="reviewForm"
                  (ngSubmit)="onSubmitReview()"
                  class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-[#007782]/25 dark:border-[#007782]/40 rounded-2xl p-5 shadow-2xs space-y-4"
                >
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 class="text-sm font-bold text-slate-900 dark:text-stone-100">
                        Publicar valoración {{ targetUsername ? 'para @' + targetUsername : '' }}
                      </h3>
                      <p class="text-xs text-slate-500 dark:text-stone-400">
                        Los comentarios publicados son permanentes y no se pueden eliminar.
                      </p>
                    </div>

                    <!-- Selector interactivo de estrellas -->
                    <div class="flex items-center gap-1" role="radiogroup" aria-label="Puntuación de 1 a 5 estrellas">
                      @for (star of starScale; track star) {
                        <button
                          type="button"
                          (click)="selectRating(star)"
                          (mouseenter)="hoveredStar.set(star)"
                          (mouseleave)="hoveredStar.set(0)"
                          [attr.aria-label]="star + ' estrellas'"
                          class="p-0.5 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                        >
                          <span
                            class="material-symbols-outlined text-[26px]"
                            [ngClass]="
                              star <= (hoveredStar() || selectedRating())
                                ? 'text-amber-400'
                                : 'text-slate-300 dark:text-stone-700'
                            "
                            [style.font-variation-settings]="
                              star <= (hoveredStar() || selectedRating()) ? &quot;'FILL' 1&quot; : &quot;'FILL' 0&quot;
                            "
                          >
                            star
                          </span>
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows="3"
                      formControlName="comment"
                      maxlength="500"
                      placeholder="Escribe tu experiencia con el vendedor (trato, rapidez de envío, estado de la prenda)..."
                      class="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-stone-800 text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 border border-slate-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-[#007782] focus:border-[#007782] focus:outline-none transition-colors resize-none"
                    ></textarea>
                    <div class="flex items-center justify-between mt-1">
                      @if (isCommentInvalid()) {
                        <p class="text-xs text-rose-600 dark:text-rose-400">
                          Escribe un comentario de al menos 3 caracteres.
                        </p>
                      } @else {
                        <span class="text-[11px] text-slate-400 dark:text-stone-500">
                          Tu valoración actualizará la media global automáticamente.
                        </span>
                      }
                      <span class="text-[11px] text-slate-400 dark:text-stone-500 tabular-nums">
                        {{ (reviewForm.get('comment')?.value || '').length }}/500
                      </span>
                    </div>
                  </div>

                  <div class="flex justify-end">
                    <button
                      type="submit"
                      [disabled]="submitting() || reviewForm.invalid"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#007782] hover:bg-[#005f69] text-white shadow-xs disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-[18px]">send</span>
                      <span>{{ submitting() ? 'Publicando...' : 'Publicar comentario' }}</span>
                    </button>
                  </div>
                </form>
              } @else if (alreadyReviewedByMe()) {
                <div class="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 rounded-2xl px-4 py-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Ya has publicado tu valoración para este perfil.</span>
                </div>
              }
            }

            <!-- Listado de comentarios (sin botón de borrado) -->
            @if (reviews().length === 0) {
              <div class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-3xl p-10 text-center shadow-sm">
                <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500 mx-auto flex items-center justify-center mb-3">
                  <span class="material-symbols-outlined text-3xl">reviews</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-stone-100">
                  Todavía no hay valoraciones
                </h3>
                <p class="text-sm text-slate-500 dark:text-stone-400 mt-1.5 max-w-md mx-auto">
                  Cuando otros usuarios publiquen una valoración y comentario, aparecerán aquí junto con la media global.
                </p>
              </div>
            } @else {
              @for (review of reviews(); track review.id) {
                <article class="bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-white/70 dark:border-stone-800 rounded-2xl p-5 shadow-2xs space-y-3">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                      <img
                        [src]="review.author.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'"
                        [alt]="review.author.username"
                        class="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-stone-800 shrink-0"
                      />
                      <div class="min-w-0">
                        <p class="text-sm font-bold text-slate-900 dark:text-stone-100 truncate">
                          &#64;{{ review.author.username }}
                        </p>
                        <p class="text-xs text-slate-400 dark:text-stone-400">
                          {{ review.createdAt | date:'dd MMM yyyy' }}
                          @if (review.author.city) {
                            <span> • {{ review.author.city }}</span>
                          }
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center gap-0.5 shrink-0" [attr.aria-label]="review.rating + ' de 5 estrellas'">
                      @for (star of starScale; track star) {
                        <span
                          class="material-symbols-outlined text-[18px]"
                          [ngClass]="star <= review.rating ? 'text-amber-400' : 'text-slate-300 dark:text-stone-700'"
                          [style.font-variation-settings]="star <= review.rating ? &quot;'FILL' 1&quot; : &quot;'FILL' 0&quot;"
                        >
                          star
                        </span>
                      }
                    </div>
                  </div>

                  @if (review.comment) {
                    <p class="text-sm text-slate-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                      {{ review.comment }}
                    </p>
                  }
                </article>
              }
            }
          </div>

        </div>
      }
    </section>
  `,
})
export class UserReviewsComponent implements OnInit, OnChanges {
  @Input() targetUserId?: string;
  @Input() targetUsername?: string;
  @Input() useMyEndpoint = false;
  @Input() allowCreate = false;
  @Input() heading = 'Valoraciones y comentarios';
  @Input() subtitle = 'Opiniones publicadas por otros usuarios y media calculada automáticamente.';

  @Output() statsLoaded = new EventEmitter<ReviewStatsEvent>();

  authStore = inject(AuthStore);
  private reviewService = inject(ReviewService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly starScale = [1, 2, 3, 4, 5];
  readonly starBreakdownOrder = [5, 4, 3, 2, 1];

  reviews = signal<UserReview[]>([]);
  loading = signal<boolean>(true);
  submitting = signal<boolean>(false);
  ratingAverage = signal<number>(0);
  ratingCount = signal<number>(0);
  ratingDistribution = signal<Record<number, number>>({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  roundedAverage = computed(() => Math.round(this.ratingAverage()));

  hoveredStar = signal<number>(0);
  selectedRating = signal<number>(5);

  isOwnTarget = computed(() => {
    const me = this.authStore.user()?.id;
    return Boolean(me && this.targetUserId && me === this.targetUserId);
  });

  alreadyReviewedByMe = computed(() => {
    const me = this.authStore.user()?.id;
    if (!me) return false;
    return this.reviews().some((r) => r.author.id === me);
  });

  reviewForm: FormGroup = this.fb.group({
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    if (this.useMyEndpoint) {
      this.loadReviews();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetUserId'] && !this.useMyEndpoint && this.targetUserId) {
      this.loadReviews();
    }
  }

  selectRating(star: number): void {
    this.selectedRating.set(star);
    this.reviewForm.get('rating')?.setValue(star);
  }

  isCommentInvalid(): boolean {
    const control = this.reviewForm.get('comment');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getStarPercentage(star: number): number {
    const total = this.ratingCount();
    if (!total) return 0;
    const count = this.ratingDistribution()[star] || 0;
    return Math.round((count / total) * 100);
  }

  goToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  loadReviews(): void {
    if (!this.useMyEndpoint && !this.targetUserId) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    const req$ = this.useMyEndpoint
      ? this.reviewService.getMyReviews()
      : this.reviewService.getUserReviews(this.targetUserId!);

    req$.subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.reviews.set(res.data.reviews || []);
          this.ratingAverage.set(res.data.ratingAverage ?? 0);
          this.ratingCount.set(res.data.ratingCount ?? 0);
          this.ratingDistribution.set(
            res.data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          );
          this.statsLoaded.emit({
            ratingAverage: this.ratingAverage(),
            ratingCount: this.ratingCount(),
          });
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onSubmitReview(): void {
    if (!this.authStore.isAuthenticated()) {
      this.goToLogin();
      return;
    }

    if (!this.targetUserId || this.submitting()) {
      return;
    }

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const rating = Number(this.reviewForm.value.rating);
    const comment = String(this.reviewForm.value.comment || '').trim();
    if (comment.length < 3) {
      this.reviewForm.get('comment')?.setErrors({ minlength: true });
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.reviewService.createReview(this.targetUserId, { rating, comment }).subscribe({
      next: (res) => {
        this.submitting.set(false);
        if (res.success && res.data) {
          this.reviewForm.reset({ rating: 5, comment: '' });
          this.selectedRating.set(5);
          this.loadReviews();

          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          }).fire({
            icon: 'success',
            title: 'Valoración publicada correctamente',
          });
        }
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}

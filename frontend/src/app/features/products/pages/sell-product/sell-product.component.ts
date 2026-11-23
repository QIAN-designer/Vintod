import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { AuthStore } from '../../../../core/auth/auth.store';
import { Brand, Category } from '../../../../core/models/marketplace.model';
import Swal from 'sweetalert2';

interface UploadedImage {
  id: string;
  url: string;
  isCover: boolean;
  name: string;
}

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="relative w-full pb-24 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-stone-100 transition-colors duration-300">
      <div class="max-w-6xl mx-auto pt-4">

        <!-- Título Principal de la Página -->
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-stone-100">
            Vender una prenda
          </h1>
          <p class="text-sm text-slate-600 dark:text-stone-400 mt-1.5">
            Sube fotos, completa los detalles y dale una segunda vida a tu ropa.
          </p>
        </div>

        <!-- Formulario en Grid de 2 Columnas Glassmorphic -->
        <form [formGroup]="sellForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <!-- Columna Izquierda: Upload de Fotos (lg:col-span-5) -->
          <div class="lg:col-span-5 bg-white/80 dark:bg-[#111e21]/80 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col gap-5 transition-colors duration-300">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold text-slate-900 dark:text-stone-100">
                Fotos
              </h2>
              <span class="text-xs font-semibold text-slate-500 dark:text-stone-400">
                {{ images().length }}/10
              </span>
            </div>

            <!-- Zona Drag and Drop -->
            <div
              (dragover)="onDragOver($event)"
              (dragleave)="onDragLeave($event)"
              (drop)="onDrop($event)"
              class="border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 flex flex-col items-center justify-center gap-3"
              [ngClass]="isDragging() 
                ? 'border-[#007782] dark:border-teal-400 bg-[#007782]/10 dark:bg-teal-500/10' 
                : 'border-stone-300 dark:border-teal-500/30 bg-[#fdfaf6]/50 dark:bg-[#0d171a]/50 hover:border-[#007782]/60'"
            >
              <!-- Icono ilustrativo de cámara y percha -->
              <div class="w-14 h-14 rounded-full bg-white/90 dark:bg-[#162428] text-[#007782] dark:text-[#2dd4bf] shadow-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-[30px]">add_a_photo</span>
              </div>

              <div>
                <button
                  type="button"
                  (click)="fileInput.click()"
                  class="bg-[#007782] dark:bg-[#00838f] hover:bg-[#005f69] dark:hover:bg-[#00929f] text-white font-semibold text-sm rounded-xl py-2 px-5 transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[18px]">upload</span>
                  <span>Añadir fotos</span>
                </button>
                <input
                  #fileInput
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  (change)="onFileSelected($event)"
                />
              </div>

              <p class="text-xs text-slate-500 dark:text-stone-400">
                Sube hasta 10 fotos de tu prenda
              </p>
            </div>

            <!-- Galería de Miniaturas Subidas (Grid 4 columnas) -->
            @if (images().length > 0) {
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-stone-400 mb-2 block">
                  Imágenes seleccionadas
                </span>
                <div class="grid grid-cols-4 gap-2.5">
                  @for (img of images(); track img.id; let i = $index) {
                    <div class="relative aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-white/10 group shadow-2xs">
                      <img [src]="img.url" [alt]="img.name" class="w-full h-full object-cover" />

                      <!-- Badge Portada en la primera foto -->
                      @if (i === 0) {
                        <span class="absolute bottom-1 left-1 bg-black/75 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Portada
                        </span>
                      }

                      <!-- Botón eliminar foto (x) -->
                      <button
                        type="button"
                        (click)="removeImage(i)"
                        title="Eliminar foto"
                        class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
                      >
                        ×
                      </button>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Tips de fotos -->
            <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <span class="material-symbols-outlined text-[18px] text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">lightbulb</span>
              <p class="leading-relaxed">
                <strong>Consejo:</strong> Haz fotos con luz natural mostrando prenda completa, etiquetas y posibles detalles o imperfecciones.
              </p>
            </div>

          </div>

          <!-- Columna Derecha: Ficha de Detalles (lg:col-span-7) -->
          <div class="lg:col-span-7 bg-white/80 dark:bg-[#111e21]/80 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col gap-5 transition-colors duration-300">
            <h2 class="text-lg font-bold text-slate-900 dark:text-stone-100">
              Detalles del artículo
            </h2>

            <!-- Título -->
            <div>
              <label for="title" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                Título *
              </label>
              <input
                id="title"
                type="text"
                formControlName="title"
                placeholder="ej. Chaqueta vaquera vintage años 90"
                class="w-full rounded-xl px-4 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm transition-all"
                [class.border-rose-500]="sellForm.get('title')?.touched && sellForm.get('title')?.invalid"
              />
              @if (sellForm.get('title')?.touched && sellForm.get('title')?.errors?.['required']) {
                <span class="text-xs text-rose-500 font-semibold mt-1 block">El título es obligatorio.</span>
              }
              @if (sellForm.get('title')?.touched && sellForm.get('title')?.errors?.['minlength']) {
                <span class="text-xs text-rose-500 font-semibold mt-1 block">El título debe tener al menos 6 caracteres.</span>
              }
            </div>

            <!-- Descripción -->
            <div>
              <label for="description" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                Descripción *
              </label>
              <textarea
                id="description"
                rows="4"
                formControlName="description"
                placeholder="Describe el estado de la prenda, medidas exactas, tejido y corte..."
                class="w-full rounded-xl px-4 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm transition-all resize-y"
                [class.border-rose-500]="sellForm.get('description')?.touched && sellForm.get('description')?.invalid"
              ></textarea>
              @if (sellForm.get('description')?.touched && sellForm.get('description')?.errors?.['required']) {
                <span class="text-xs text-rose-500 font-semibold mt-1 block">La descripción es obligatoria.</span>
              }
            </div>

            <!-- Fila 2 Columnas: Categoría y Marca -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Categoría -->
              <div>
                <label for="categoryId" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                  Categoría *
                </label>
                <select
                  id="categoryId"
                  formControlName="categoryId"
                  class="w-full rounded-xl px-4 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm transition-all cursor-pointer"
                >
                  <option value="" disabled selected>Selecciona categoría...</option>
                  @for (cat of categories(); track cat.id) {
                    <option [value]="cat.id">{{ cat.name }}</option>
                  }
                </select>
                @if (sellForm.get('categoryId')?.touched && sellForm.get('categoryId')?.errors?.['required']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">Selecciona una categoría.</span>
                }
              </div>

              <!-- Marca -->
              <div>
                <label for="brandId" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                  Marca *
                </label>
                <select
                  id="brandId"
                  formControlName="brandId"
                  class="w-full rounded-xl px-4 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm transition-all cursor-pointer"
                >
                  <option value="" disabled selected>Selecciona marca...</option>
                  @for (brand of brands(); track brand.id) {
                    <option [value]="brand.id">{{ brand.name }}</option>
                  }
                </select>
                @if (sellForm.get('brandId')?.touched && sellForm.get('brandId')?.errors?.['required']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">Selecciona una marca.</span>
                }
              </div>
            </div>

            <!-- Fila Talla y Estado -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <!-- Selector de Tallas (Pills redondeados interactivos) -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                  Talla *
                </label>
                <div class="flex flex-wrap gap-2">
                  @for (sz of availableSizes; track sz) {
                    <button
                      type="button"
                      (click)="selectSize(sz)"
                      class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                      [ngClass]="sellForm.get('size')?.value === sz
                        ? 'bg-[#007782] text-white border-[#007782] shadow-sm dark:bg-teal-500 dark:border-teal-500'
                        : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-white/5 hover:bg-stone-200/70'"
                    >
                      {{ sz }}
                    </button>
                  }
                </div>
                @if (sellForm.get('size')?.touched && sellForm.get('size')?.errors?.['required']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">Selecciona una talla.</span>
                }
              </div>

              <!-- Estado / Condición -->
              <div>
                <label for="condition" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                  Estado *
                </label>
                <select
                  id="condition"
                  formControlName="condition"
                  class="w-full rounded-xl px-4 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm transition-all cursor-pointer"
                >
                  <option value="" disabled selected>Estado de la prenda...</option>
                  @for (cond of availableConditions; track cond) {
                    <option [value]="cond">{{ cond }}</option>
                  }
                </select>
                @if (sellForm.get('condition')?.touched && sellForm.get('condition')?.errors?.['required']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">Selecciona el estado.</span>
                }
              </div>
            </div>

            <!-- Fila Precio y Opciones de Envío -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-slate-100 dark:border-white/10">
              <!-- Precio -->
              <div>
                <label for="price" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-1.5">
                  Precio (€) *
                </label>
                <div class="relative">
                  <input
                    id="price"
                    type="number"
                    step="0.50"
                    min="1"
                    formControlName="price"
                    placeholder="0.00"
                    class="w-full rounded-xl pl-4 pr-9 py-2.5 bg-[#fdfaf6]/90 dark:bg-[#0d171a] border border-stone-200 dark:border-white/10 text-slate-900 dark:text-stone-100 placeholder:text-slate-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#007782]/40 dark:focus:ring-teal-500/40 text-sm font-bold transition-all"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-stone-500">€</span>
                </div>
                @if (sellForm.get('price')?.touched && sellForm.get('price')?.errors?.['required']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">Indica un precio de venta.</span>
                }
                @if (sellForm.get('price')?.touched && sellForm.get('price')?.errors?.['min']) {
                  <span class="text-xs text-rose-500 font-semibold mt-1 block">El precio mínimo es de 1€.</span>
                }
              </div>

              <!-- Checkbox de Envíos -->
              <div class="pt-5">
                <label class="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    formControlName="acceptShipping"
                    class="w-4 h-4 rounded text-[#007782] focus:ring-[#007782] border-stone-300 cursor-pointer"
                  />
                  <span class="text-xs font-semibold text-slate-700 dark:text-stone-300">
                    Acepto envíos nacionales e internacionales
                  </span>
                </label>
              </div>
            </div>

            <!-- Botón de Publicación -->
            <div class="pt-4 flex justify-end">
              <button
                type="submit"
                [disabled]="isSubmitting()"
                class="rounded-full bg-[#007782] dark:bg-[#00838f] hover:bg-[#005f69] dark:hover:bg-[#00929f] active:scale-95 disabled:opacity-50 text-white font-semibold py-3 px-8 transition-all shadow-md flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                @if (isSubmitting()) {
                  <span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Publicando prenda...</span>
                } @else {
                  <span class="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Publicar artículo</span>
                }
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  `
})
export class SellProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  authStore = inject(AuthStore);

  sellForm!: FormGroup;
  images = signal<UploadedImage[]>([]);
  isDragging = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);

  readonly availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42'];
  readonly availableConditions = [
    'Nuevo con etiquetas',
    'Muy bueno',
    'Bueno',
    'Con señales de uso'
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadMetadata();
  }

  private initForm(): void {
    this.sellForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(75)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      size: ['M', Validators.required],
      condition: ['Muy bueno', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      acceptShipping: [true]
    });
  }

  private loadMetadata(): void {
    this.productService.getCategories().subscribe({
      next: res => {
        if (res && res.data) this.categories.set(res.data);
      },
      error: () => {
        // Fallback en caso de desconexión
        this.categories.set([
          { id: '6adfaed7c6d2ab76fecb67a6', name: 'Hombre', slug: 'hombre', itemCount: 10, isActive: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67a7', name: 'Mujer', slug: 'mujer', itemCount: 15, isActive: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67a8', name: 'Calzado', slug: 'calzado', itemCount: 8, isActive: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67a9', name: 'Accesorios', slug: 'accesorios', itemCount: 6, isActive: true, createdAt: '' }
        ]);
      }
    });

    this.productService.getBrands().subscribe({
      next: res => {
        if (res && res.data) this.brands.set(res.data);
      },
      error: () => {
        this.brands.set([
          { id: '6adfaed7c6d2ab76fecb67aa', name: 'Nike', slug: 'nike', description: '', itemCount: 12, isActive: true, featured: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67ab', name: "Levi's", slug: 'levis', description: '', itemCount: 14, isActive: true, featured: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67ac', name: 'Adidas', slug: 'adidas', description: '', itemCount: 10, isActive: true, featured: true, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67ad', name: 'Zara', slug: 'zara', description: '', itemCount: 9, isActive: true, featured: false, createdAt: '' },
          { id: '6adfaed7c6d2ab76fecb67ae', name: 'Vans', slug: 'vans', description: '', itemCount: 5, isActive: true, featured: false, createdAt: '' }
        ]);
      }
    });
  }

  selectSize(size: string): void {
    this.sellForm.patchValue({ size });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
  }

  private processFiles(fileList: FileList): void {
    const currentImages = this.images();
    const remainingSlots = 10 - currentImages.length;
    if (remainingSlots <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Límite alcanzado',
        text: 'Puedes subir un máximo de 10 fotos por prenda.',
        confirmButtonColor: '#007782'
      });
      return;
    }

    const filesToRead = Array.from(fileList).slice(0, remainingSlots);

    filesToRead.forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const rawDataUrl = e.target.result as string;

        // Optimizar/comprimir imagen en el navegador antes de enviarla
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedUrl = canvas.toDataURL('image/jpeg', 0.82);

            const newImg: UploadedImage = {
              id: Math.random().toString(36).substring(2, 9),
              url: optimizedUrl,
              name: file.name,
              isCover: this.images().length === 0
            };
            this.images.update(list => [...list, newImg]);
          }
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.images.update(list => {
      const updated = list.filter((_, idx) => idx !== index);
      if (updated.length > 0) {
        updated[0].isCover = true;
      }
      return updated;
    });
  }

  onSubmit(): void {
    if (this.sellForm.invalid) {
      this.sellForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, revisa los campos requeridos marcados en rojo.',
        confirmButtonColor: '#007782'
      });
      return;
    }

    const imgs = this.images();
    if (imgs.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Fotos requeridas',
        text: 'Por favor, sube al menos una foto de la prenda antes de publicarla.',
        confirmButtonColor: '#007782'
      });
      return;
    }

    this.isSubmitting.set(true);

    const formValues = this.sellForm.value;
    const selectedCategory = this.categories().find(c => c.id === formValues.categoryId);
    const selectedBrand = this.brands().find(b => b.id === formValues.brandId);

    const payload: any = {
      title: formValues.title,
      description: formValues.description,
      price: Number(formValues.price),
      size: formValues.size,
      condition: formValues.condition,
      categoryId: formValues.categoryId,
      category: selectedCategory?.name || 'Vintage',
      brandId: formValues.brandId,
      brand: selectedBrand?.name || 'Vintage Archive',
      image: imgs[0]?.url,
      images: imgs.map(i => i.url)
    };

    const user = this.authStore.user();
    if (user?.id) {
      payload.sellerId = user.id;
    }

    this.productService.createProduct(payload).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        Swal.fire({
          icon: 'success',
          title: '¡Prenda publicada con éxito!',
          text: 'Tu artículo ya está disponible en el catálogo de Vintod.',
          confirmButtonColor: '#007782'
        }).then(() => {
          const newId = res.data?.id || res.data?._id;
          if (newId) {
            this.router.navigate(['/products', newId]);
          } else {
            this.router.navigate(['/products']);
          }
        });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error al publicar producto:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al publicar',
          text: err.error?.message || 'No se pudo crear la prenda. Por favor, inténtalo de nuevo.',
          confirmButtonColor: '#007782'
        });
      }
    });
  }
}

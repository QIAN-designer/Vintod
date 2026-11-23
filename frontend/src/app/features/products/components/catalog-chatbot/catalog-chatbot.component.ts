import { Component, Input, Output, EventEmitter, signal, ElementRef, ViewChild, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, ChatMessage } from '../../../../core/services/ai.service';
import { Product } from '../../../../core/models/marketplace.model';

@Component({
  selector: 'app-catalog-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Botón Flotante Disparador (Floating Action Button) -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <!-- Ventana de Chatbot Flotante Glassmorphic -->
      @if (isOpen()) {
        <div
          class="w-[360px] sm:w-[420px] h-[540px] max-h-[80vh] mb-4 bg-white/95 dark:bg-[#111e21]/95 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          <!-- Cabecera del Chatbot -->
          <div class="px-5 py-4 bg-gradient-to-r from-[#007782] via-[#005f69] to-[#00474e] text-white flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <span class="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-sm font-extrabold tracking-wide">Vintod Stylist AI</h3>
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p class="text-[11px] text-teal-100/90 font-medium">Asistente del Catálogo</p>
              </div>
            </div>

            <!-- Botones de Acción de Cabecera -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                (click)="clearMessages()"
                title="Reiniciar conversación"
                class="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
              <button
                type="button"
                (click)="toggleChat()"
                title="Cerrar chat"
                class="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <!-- Mensajes de Sugerencia Rápida / Chips -->
          <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-[#162327]/80 border-b border-stone-200/60 dark:border-white/5 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-none">
            <button
              type="button"
              (click)="sendQuickPrompt('¿Cuáles son las prendas más baratas del catálogo?')"
              class="px-3 py-1 rounded-full bg-white dark:bg-[#1e2f34] text-slate-700 dark:text-stone-200 border border-stone-200 dark:border-white/10 hover:border-[#007782] dark:hover:border-teal-400 transition-colors shadow-2xs"
            >
              🏷️ Más baratas
            </button>
            <button
              type="button"
              (click)="sendQuickPrompt('Recomiéndame una buena combinación o look vintage.')"
              class="px-3 py-1 rounded-full bg-white dark:bg-[#1e2f34] text-slate-700 dark:text-stone-200 border border-stone-200 dark:border-white/10 hover:border-[#007782] dark:hover:border-teal-400 transition-colors shadow-2xs"
            >
              ✨ Outfit vintage
            </button>
            <button
              type="button"
              (click)="sendQuickPrompt('¿Qué zapatillas o calzado me recomiendas?')"
              class="px-3 py-1 rounded-full bg-white dark:bg-[#1e2f34] text-slate-700 dark:text-stone-200 border border-stone-200 dark:border-white/10 hover:border-[#007782] dark:hover:border-teal-400 transition-colors shadow-2xs"
            >
              👟 Calzado
            </button>
          </div>

          <!-- Cuerpo de Conversación -->
          <div #chatContainer class="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            @for (msg of messages(); track msg.id) {
              <div
                class="flex gap-2.5"
                [ngClass]="msg.role === 'user' ? 'justify-end' : 'justify-start'"
              >
                @if (msg.role === 'assistant') {
                  <div class="w-7 h-7 rounded-full bg-[#007782]/15 dark:bg-teal-500/20 text-[#007782] dark:text-[#2dd4bf] flex items-center justify-center shrink-0 mt-0.5">
                    <span class="material-symbols-outlined text-[16px]">smart_toy</span>
                  </div>
                }

                <div
                  class="max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-xs whitespace-pre-wrap leading-relaxed"
                  [ngClass]="msg.role === 'user' 
                    ? 'bg-[#007782] text-white rounded-tr-xs' 
                    : 'bg-stone-100 dark:bg-[#1a282d] text-slate-800 dark:text-stone-200 border border-stone-200/80 dark:border-white/5 rounded-tl-xs'"
                >
                  {{ msg.content }}
                </div>

                @if (msg.role === 'user') {
                  <div class="w-7 h-7 rounded-full bg-[#007782] text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    Tú
                  </div>
                }
              </div>
            }

            @if (loading()) {
              <div class="flex gap-2.5 justify-start">
                <div class="w-7 h-7 rounded-full bg-[#007782]/15 dark:bg-teal-500/20 text-[#007782] dark:text-[#2dd4bf] flex items-center justify-center shrink-0 mt-0.5">
                  <span class="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
                <div class="bg-stone-100 dark:bg-[#1a282d] border border-stone-200/80 dark:border-white/5 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 shadow-xs">
                  <span class="w-2 h-2 rounded-full bg-[#007782] dark:bg-teal-400 animate-bounce"></span>
                  <span class="w-2 h-2 rounded-full bg-[#007782] dark:bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span class="w-2 h-2 rounded-full bg-[#007782] dark:bg-teal-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            }
          </div>

          <!-- Pie del Chat / Entrada de Texto -->
          <div class="p-3 bg-white/90 dark:bg-[#111e21]/90 border-t border-stone-200/60 dark:border-white/10">
            <form (ngSubmit)="sendMessage()" class="flex items-center gap-2">
              <input
                type="text"
                [(ngModel)]="userInput"
                name="userInput"
                placeholder="Pregúntame sobre prendas, tallas o estilo..."
                [disabled]="loading()"
                class="flex-1 bg-stone-100 dark:bg-[#1a282d] text-slate-800 dark:text-stone-100 text-xs sm:text-sm rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-[#007782] dark:focus:border-teal-400 transition"
              />
              <button
                type="submit"
                [disabled]="!userInput.trim() || loading()"
                class="w-10 h-10 rounded-full bg-[#007782] hover:bg-[#005f69] disabled:opacity-50 text-white flex items-center justify-center transition shadow-sm cursor-pointer shrink-0"
              >
                <span class="material-symbols-outlined text-[19px]">send</span>
              </button>
            </form>
          </div>
        </div>
      }

      <!-- Botón Flotante Redondo -->
      <button
        type="button"
        (click)="toggleChat()"
        class="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#007782] to-[#005f69] hover:from-[#005f69] hover:to-[#00474e] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Abrir asistente de IA del catálogo"
      >
        <span
          class="material-symbols-outlined text-[28px] transition-transform duration-300"
          [ngClass]="isOpen() ? 'rotate-90 scale-90' : 'rotate-0 scale-100'"
        >
          {{ isOpen() ? 'close' : 'smart_toy' }}
        </span>

        <!-- Badge indicativo flotante -->
        @if (!isOpen()) {
          <span class="absolute -top-1 -right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-[#111e21]"></span>
          </span>
        }
      </button>

    </div>
  `
})
export class CatalogChatbotComponent implements AfterViewChecked {
  @Input() currentProducts: Product[] = [];
  @Input() activeFilters: Record<string, any> = {};

  @ViewChild('chatContainer') private chatContainer?: ElementRef;

  private aiService = inject(AiService);

  isOpen = signal<boolean>(false);
  loading = signal<boolean>(false);
  userInput = '';

  messages = signal<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente de estilo en Vintod. Puedo ayudarte a encontrar la prenda ideal en este catálogo, recomendarte combinaciones o responder cualquier duda. ¿Qué estás buscando hoy?',
      createdAt: new Date()
    }
  ]);

  private shouldScroll = false;

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleChat(): void {
    const nextState = !this.isOpen();
    this.isOpen.set(nextState);
    if (nextState) {
      this.shouldScroll = true;
    }
  }

  clearMessages(): void {
    this.messages.set([
      {
        id: 'welcome',
        role: 'assistant',
        content: '¡Conversación reiniciada! ¿En qué prenda o estilo te gustaría que nos enfoquemos ahora?',
        createdAt: new Date()
      }
    ]);
  }

  sendQuickPrompt(promptText: string): void {
    this.userInput = promptText;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.loading()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: text,
      createdAt: new Date()
    };

    this.messages.update(msgs => [...msgs, userMsg]);
    this.userInput = '';
    this.loading.set(true);
    this.shouldScroll = true;

    this.aiService.askCatalog(text, this.currentProducts, this.activeFilters, this.messages()).subscribe({
      next: (res) => {
        this.loading.set(false);
        const aiMsg: ChatMessage = {
          id: Math.random().toString(36).substring(2, 9),
          role: 'assistant',
          content: res.data?.answer || 'Aquí tienes las mejores opciones del catálogo.',
          createdAt: new Date()
        };
        this.messages.update(msgs => [...msgs, aiMsg]);
        this.shouldScroll = true;
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Error al contactar con el Asistente IA:', err);
        const errorMsg: ChatMessage = {
          id: Math.random().toString(36).substring(2, 9),
          role: 'assistant',
          content: 'Disculpa, no pude procesar la consulta en este momento. Por favor verifica que el backend IA esté corriendo.',
          createdAt: new Date()
        };
        this.messages.update(msgs => [...msgs, errorMsg]);
        this.shouldScroll = true;
      }
    });
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }
}

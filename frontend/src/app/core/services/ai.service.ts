import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface AskAiRequest {
  question: string;
  product?: any;
  products?: any[];
  filters?: Record<string, any>;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface AskAiResponse {
  success: boolean;
  data: {
    answer: string;
    model?: string;
    usage?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private http = inject(HttpClient);
  private aiUrl = environment.aiUrl || 'http://localhost:3001/api/ai';

  askCatalog(question: string, products: any[] = [], filters: Record<string, any> = {}, history: ChatMessage[] = []): Observable<AskAiResponse> {
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Enviar únicamente los metadatos relevantes de cada prenda sin imágenes base64 para aligerar la petición
    const sanitizedProducts = products.map(p => ({
      id: p.id || p._id,
      title: p.title,
      description: p.description,
      price: p.price,
      brand: p.brand,
      category: p.category,
      size: p.size,
      condition: p.condition,
      color: p.color
    }));

    const payload: AskAiRequest = {
      question,
      products: sanitizedProducts,
      filters,
      history: formattedHistory
    };

    return this.http.post<AskAiResponse>(`${this.aiUrl}/ask`, payload);
  }

  askProduct(question: string, product: any, history: ChatMessage[] = []): Observable<AskAiResponse> {
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const payload: AskAiRequest = {
      question,
      product,
      history: formattedHistory
    };

    return this.http.post<AskAiResponse>(`${this.aiUrl}/ask`, payload);
  }
}

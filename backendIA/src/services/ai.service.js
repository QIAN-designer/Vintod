const Groq = require('groq-sdk');
const AppError = require('./utils/appError');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const DEFAULT_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

/**
 * Realiza una consulta a Groq sobre un producto o sobre el catálogo (Shop List)
 */
const askAboutProduct = async ({ question, product = {}, products = [], filters = {}, history = [] }) => {
  if (!process.env.GROQ_API_KEY) {
    throw new AppError('GROQ_API_KEY no está configurada en el servidor de IA', 500);
  }

  let systemPrompt = '';

  if (products && products.length > 0) {
    const catalogSnippet = products.slice(0, 15).map((p, idx) => {
      const priceStr = p.price !== undefined ? `${p.price} €` : 'N/A';
      return `${idx + 1}. [${p.title}] - Marca: ${p.brand || 'N/A'}, Talla: ${p.size || 'N/A'}, Estado: ${p.condition || 'N/A'}, Precio: ${priceStr}, Categoría: ${p.category || 'N/A'}`;
    }).join('\n');

    const activeFilters = Object.entries(filters || {})
      .filter(([_, v]) => v !== undefined && v !== '' && v !== null)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ') || 'Ninguno';

    systemPrompt = `Eres Vintod AI, el estilista y asistente inteligente de compras en el Catálogo de moda circular (Shop List) de Vintod.
Tu tarea es ayudar a los compradores recomendando prendas del catálogo actual, sugiriendo estilos, aconsejando sobre tallas, marcas, precios y combinaciones.

Filtros aplicados por el usuario actualmente: ${activeFilters}

Prendas actualmente visibles en el catálogo:
${catalogSnippet}

Instrucciones:
1. Responde siempre en español, con un tono fresco, experto en moda y muy amable.
2. Si el usuario te pide recomendaciones, guíate preferentemente por las prendas listadas arriba indicando su nombre, precio y por qué es una buena compra.
3. Si busca algo que no está en la lista actual, dale ideas de qué filtros aplicar o qué buscar.
4. Mantén las respuestas ágiles y concisas (2 a 4 párrafos cortos). Usa emojis sutiles para darle vida a la conversación.`;
  } else {
    const productContext = [
      `Título: ${product.title || 'No especificado'}`,
      `Marca: ${product.brand || 'No especificada'}`,
      `Categoría: ${product.category || 'No especificada'}`,
      `Precio: ${product.price !== undefined ? `${product.price} €` : 'No especificado'}`,
      `Talla: ${product.size || 'No especificada'}`,
      `Estado / Condición: ${product.condition || 'No especificado'}`,
      `Color: ${product.color || 'No especificado'}`,
      `Vendedor: ${product.sellerName || 'No especificado'}`,
      `Visitas: ${product.visits ?? 0}`,
      `Descripción: ${product.description || 'Sin descripción adicional'}`
    ].join('\n');

    systemPrompt = `Eres el asistente de moda circular de Vintod Marketplace.
Tu objetivo es ayudar a los compradores que están viendo el detalle de una prenda respondiendo dudas sobre la prenda, su talla, estado, combinaciones de estilo, cuidados o relación calidad-precio.
Responde siempre en español, de forma amable, clara, concisa y honesta basándote en la información proporcionada del producto.

Información del producto:
${productContext}`;
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6),
    { role: 'user', content: question }
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages,
      temperature: 0.5,
      max_tokens: 512
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      throw new AppError('No se pudo obtener una respuesta válida del modelo de IA', 502);
    }

    return {
      answer,
      model: completion.model || DEFAULT_MODEL,
      usage: completion.usage || null
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error?.message || 'Error al comunicarse con la API de Groq', 502);
  }
};

module.exports = {
  askAboutProduct
};

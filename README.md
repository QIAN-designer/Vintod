# 🛍️ Vintod — Marketplace & Admin Platform

Plataforma full-stack de compraventa de moda y artículos de segunda mano entre particulares inspirada en Vinted.  
El sistema está construido siguiendo una **arquitectura desacoplada en capas (Layered Architecture)** en el backend y una **arquitectura modular basada en características (Feature-Based Architecture con Signals)** en el frontend.

---

## 🏗️ Arquitectura del Sistema

El proyecto implementa una arquitectura moderna cliente-servidor distribuida en dos subsistemas principales:

```mermaid
flowchart TD
    subgraph Frontend["Frontend SPA (Angular 18+)"]
        UI["Páginas y Vistas (Standalone Components)"]
        Store["Store Reactivo (Angular Signals)"]
        Service["Capa de Servicios HTTP (ProductService / ApiService)"]
        UI -->|Lee estado / Lanza acciones| Store
        Store -->|Ejecuta peticiones| Service
    end

    subgraph Backend["Backend API REST (Node.js & Express)"]
        Routes["Rutas y Middlewares (Zod / ErrorHandler)"]
        Controllers["Controladores (Req / Res)"]
        Services["Servicios (Lógica de Negocio)"]
        Repos["Repositorios (Acceso a Datos y Mapeos)"]
        PrismaORM["Prisma Client (Transacciones y Relaciones)"]
        
        Routes --> Controllers
        Controllers --> Services
        Services --> Repos
        Repos --> PrismaORM
    end

    subgraph Database["Persistencia (MongoDB Replica Set rs0)"]
        DB[(Colecciones MongoDB)]
        PrismaORM -->|Transacciones Atómicas| DB
    end

    Service -->|HTTP REST / JSON| Routes
```

---

### 📂 Estructura del Código

```text
Vintod/
├── backend/                             # API REST en Node.js + Express + Prisma ORM + MongoDB
│   ├── prisma/
│   │   └── schema.prisma                # Esquema de datos, relaciones e integridad referencial
│   ├── src/
│   │   ├── config/                      # Configuración de entorno y conexión PrismaClient
│   │   ├── ctrls/                       # Controladores HTTP (manejo de request/response)
│   │   ├── services/                    # Capa de servicios (reglas de negocio)
│   │   ├── repos/                       # Repositorios (consultas Prisma, transacciones atómicas y mapeos)
│   │   ├── routes/                      # Definición de endpoints y asociación de validadores
│   │   ├── schemas/                     # Validaciones de esquemas de entrada con Zod
│   │   └── middlewares/                 # Validadores, registro morgan y captura centralizada de errores
│   ├── seed.js                          # Script de población inicial con datos de prueba realistas
│   └── package.json
│
├── frontend/                            # SPA Angular (Standalone Components, Signals & Tailwind CSS)
│   ├── src/app/
│   │   ├── core/                        # Núcleo del sistema (singleton)
│   │   │   ├── models/                  # Interfaces y tipos de TypeScript (Product, User, Brand...)
│   │   │   ├── services/                # Servicios HTTP de comunicación API (ProductService, ApiService...)
│   │   │   ├── store/                   # Estado reactivo global (ProductsStore con Signals)
│   │   │   └── interceptors/            # Interceptores HTTP
│   │   ├── shared/                      # Componentes reutilizables, modales, tablas y pipes
│   │   │   ├── components/              # TableComponent, ModalComponent, SearchBar, Badge, Skeletons...
│   │   │   └── pipes/                   # AppCurrencyPipe, AppDatePipe
│   │   ├── layouts/                     # PublicLayout (Marketplace) y AdminLayout (Panel de control)
│   │   └── features/                    # Módulos por dominio de negocio
│   │       ├── products/                # Catálogo público, detalle, creación y edición
│   │       │   ├── pages/               # ProductListComponent, ProductDetailComponent, ProductCreatePageComponent, ProductEditPageComponent
│   │       │   └── components/          # ProductCardComponent, ProductSkeletonComponent, ProductFormComponent
│   │       └── admin/                   # Módulos de administración
│   │           ├── dashboard/           # Métricas, KPIs y últimas transacciones
│   │           ├── products/            # Gestión del catálogo (edición modal, visibilidad, borrado)
│   │           ├── recycle-bin/         # Papelera de reciclaje y reactivación de prendas (soft delete)
│   │           ├── brands/              # Gestión de marcas y galerías
│   │           ├── categories/          # Árbol de categorías
│   │           ├── conditions/          # Estados de conservación
│   │           ├── users/               # Gestión de usuarios y moderación
│   │           └── orders/              # Supervisión de transacciones
│   └── package.json
│
├── docker-compose.yml                   # Contenedor MongoDB con Replica Set habilitado (rs0)
├── .gitignore                           # Reglas de exclusión para Git
└── README.md                            # Documentación integral del proyecto
```

---

## 🛠️ Stack Tecnológico

### Backend
* **Entorno de ejecución:** [Node.js](https://nodejs.org/) (v18+)
* **Framework Web:** [Express.js](https://expressjs.com/)
* **Base de Datos:** [MongoDB](https://www.mongodb.com/) (con soporte de transacciones multinivel y Replica Set `rs0`)
* **ORM:** [Prisma ORM](https://www.prisma.io/) (v5.22+)
* **Validación de Datos:** [Zod](https://zod.dev/)
* **Seguridad y Utilidades:** [Helmet](https://helmetjs.github.io/), [CORS](https://www.npmjs.com/package/cors), [Morgan](https://github.com/expressjs/morgan), [dotenv](https://www.npmjs.com/package/dotenv)

### Frontend
* **Framework:** [Angular 18+](https://angular.dev/) (100% Standalone Components)
* **Gestión de Estado:** [Angular Signals](https://angular.dev/guide/signals) (estado reactivo optimista en tiempo real con `signal`, `computed` y `update`)
* **Estilos y Maquetación:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes de Carga:** [ngx-skeleton-loader](https://www.npmjs.com/package/ngx-skeleton-loader) para feedback visual esqueleto durante la carga
* **Alertas y Notificaciones:** [SweetAlert2](https://sweetalert2.github.io/)
* **Control de Tipos:** TypeScript estricto con soporte de `withComponentInputBinding` en enrutamiento

---

## 💾 Modelo de Datos e Integridad Referencial

La base de datos sigue un modelo relacional normalizado sobre MongoDB con reglas explícitas de **integridad referencial**:

```mermaid
erDiagram
    ROLE ||--o{ USER : "tiene"
    USER ||--o{ PRODUCT : "publica (vendedor)"
    CATEGORY ||--o{ CATEGORY : "jerarquía (padre/hijo)"
    CATEGORY ||--o{ PRODUCT : "clasifica"
    BRAND ||--o{ PRODUCT : "marca"
    PRODUCT ||--o{ PRODUCT_VARIANT : "contiene (Cascade)"
    PRODUCT_VARIANT ||--o{ PRODUCT_IMAGE : "fotos (Cascade)"

    ROLE {
        ObjectId id PK
        string name UK
        string description
        boolean isActive
    }

    USER {
        ObjectId id PK
        string username UK
        string email UK
        string password
        string avatarUrl
        ObjectId roleId FK
    }

    CATEGORY {
        ObjectId id PK
        string name
        string slug UK
        ObjectId parentId FK
        boolean isActive
    }

    BRAND {
        ObjectId id PK
        string name UK
        string slug UK
        string logoUrl
        string[] images
        boolean isActive
    }

    PRODUCT {
        ObjectId id PK
        string title
        string slug UK
        string description
        string status
        boolean isActive
        datetime deletedAt
        ObjectId sellerId FK
        ObjectId categoryId FK
        ObjectId brandId FK
    }

    PRODUCT_VARIANT {
        ObjectId id PK
        string sku UK
        string size
        string color
        string condition
        float price
        int stock
        ObjectId productId FK
    }

    PRODUCT_IMAGE {
        ObjectId id PK
        string url
        string altText
        boolean isCover
        int sortOrder
        string entityType
        ObjectId entityId
        ObjectId variantId FK
    }
```

### Reglas de Integridad Referencial Aplicadas:
1. **Borrado en Cascada (`onDelete: Cascade`):**
   * Al eliminar un `Product`, sus `ProductVariant` asociadas se eliminan en cascada.
   * Al eliminar una variante, todas sus `ProductImage` se purgan automáticamente para evitar imágenes huérfanas.
2. **Restricción de Borrado (`onDelete: Restrict`):**
   * No se permite borrar una `Brand` o `Category` si existen prendas activas vinculadas.
   * No se permite borrar un `User` si tiene publicaciones en el catálogo.
3. **Persistencia Transaccional Atómica:**
   * La creación de productos, variantes e imágenes se ejecuta dentro de un bloque **`prisma.$transaction(async tx => { ... })`**, asegurando que si algún paso falla se produzca un *rollback* completo.
4. **Estructura del SKU:**
   * Código de seguimiento único generado automáticamente con el formato: `SKU-[SLUG_DEL_PRODUCTO]-[INDICE_VARIANTE]`.
5. **Borrado Lógico (*Soft Delete*):**
   * Las bajas de prendas establecen la marca temporal `deletedAt`, manteniendo la integridad histórica y permitiendo su reactivación instantánea desde la papelera.

---

## 🚀 Puesta en Marcha Rápida

### 1. Prerrequisitos
* [Node.js](https://nodejs.org/) (v18+)
* [Docker](https://www.docker.com/) y Docker Compose (o una instancia local/remota de MongoDB con Replica Set habilitado).

### 2. Iniciar MongoDB con Replica Set
Desde la raíz del proyecto:
```bash
docker compose up -d
```
> Esto iniciará un contenedor MongoDB en el puerto `27017` con el replica set `rs0` requerido por las transacciones de Prisma.

---

### 3. Configuración y Arranque del Backend

1. Entra al directorio `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env`:
   ```ini
   PORT=3000
   MONGODB_URI=mongodb://admin:erestonto@127.0.0.1:27017/vintod_db?authSource=admin&replicaSet=rs0&directConnection=true
   DATABASE_URL=mongodb://admin:erestonto@127.0.0.1:27017/vintod_db?authSource=admin&replicaSet=rs0&directConnection=true
   ```
4. Sincroniza el esquema e inicializa el cliente Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Poblar la base de datos con datos de prueba:
   ```bash
   npm run seed
   ```
6. Inicia el servidor backend en modo desarrollo:
   ```bash
   npm run dev
   ```
   * Servidor escuchando en: `http://localhost:3000`
   * API base: `http://localhost:3000/api/products`

---

### 4. Configuración y Arranque del Frontend

1. En una nueva terminal, entra al directorio `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación Angular:
   ```bash
   npm start
   ```
4. Accede desde tu navegador:
   * **Marketplace Público:** [http://localhost:4200](http://localhost:4200)
   * **Panel de Administración:** [http://localhost:4200/admin](http://localhost:4200/admin)

---

## 🎯 Funcionalidades Principales

### 🛒 Marketplace Público
* **Catálogo Reactivo:** Exploración de prendas en tiempo real con carga diferida y *Skeleton Cards* animadas (`app-product-skeleton`).
* **Detalle de Artículo:** Visualización completa con imágenes reales de la base de datos, tallas, estado de conservación y vendedor.
* **Publicación y Edición (`ProductCreatePageComponent` & `ProductEditPageComponent`):** Formulario modularizado reutilizable (`ProductFormComponent`) con soporte para visibilidad y validación reactiva de campos.

### 🛡️ Panel de Administración (`/admin`)
* **Dashboard (`/admin`):** KPIs globales, valor total del catálogo y tabla rápida de moderación.
* **Gestión de Prendas (`/admin/products`):** Auditoría del catálogo, activación/desactivación instantánea (`isActive`), edición modal con switch de visibilidad y borrado lógico.
* **Papelera y Reactivación (`/admin/recycle-bin`):** Visualización de artículos eliminados (`deletedAt ≠ null`) con restauración instantánea al catálogo activo.
* **Marcas y Categorías:** Moderación con soporte para banners, URLs de logos y jerarquías.

---

## 📡 Endpoints de la API REST

| Método | Endpoint | Descripción | Validación Zod |
|---|---|---|---|
| `GET` | `/api/products` | Obtener todos los productos activos (no eliminados) | — |
| `GET` | `/api/products/deleted` | Obtener productos en papelera (`deletedAt ≠ null`) | — |
| `GET` | `/api/products/:id` | Obtener detalle de prenda por ObjectId | `idParamSchema` |
| `GET` | `/api/products/slug/:slug` | Obtener detalle de prenda por slug único | `slugParamSchema` |
| `POST` | `/api/products` | Crear prenda con variante e imágenes (Transaccional) | `createProductSchema` |
| `PUT` | `/api/products/:id` | Actualización completa de producto y variante | `updateProductSchema` |
| `PATCH` | `/api/products/:id` | Actualización parcial de producto | `updateProductSchema` |
| `PATCH` | `/api/products/:id/activate` | Activar visibilidad (`isActive: true`) | `idParamSchema` |
| `PATCH` | `/api/products/:id/deactivate` | Pausar/ocultar visibilidad (`isActive: false`) | `idParamSchema` |
| `DELETE` | `/api/products/:id` | Borrado lógico (*Soft delete*, asigna `deletedAt`) | `idParamSchema` |
| `POST` | `/api/products/:id/restore` | Restaurar prenda eliminada (`deletedAt: null`) | `idParamSchema` |

---

## 📦 Scripts Disponibles

### Backend
* `npm start`: Inicia el servidor en producción.
* `npm run dev`: Inicia el servidor con recarga en caliente (`node --watch`).
* `npm run seed`: Limpia y puebla la base de datos con colecciones iniciales de prueba.

### Frontend
* `npm start`: Inicia el servidor de desarrollo de Angular en `http://localhost:4200`.
* `npm run build`: Compila la aplicación optimizada para producción en `dist/vintod-frontend`.

---

## 📄 Licencia

Proyecto con fines formativos y académicos para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

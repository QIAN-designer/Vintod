import { useEffect, useMemo, useState } from "react";

type View = "home" | "shop" | "details";
type IconName =
  | "arrow"
  | "bag"
  | "chevron"
  | "close"
  | "filter"
  | "heart"
  | "menu"
  | "minus"
  | "moon"
  | "plus"
  | "search"
  | "shield"
  | "sparkle"
  | "sun"
  | "user";

const photos = {
  hero: "https://images.unsplash.com/photo-1709916306474-4de3cd49cf01?auto=format&fit=crop&w=1800&q=88",
  rack: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=85",
  jacket:
    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=85",
  outfit:
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=85",
  denim:
    "https://images.unsplash.com/photo-1605092474347-574370143393?auto=format&fit=crop&w=1000&q=85",
  knit: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
  sneakers:
    "https://images.unsplash.com/photo-1616761525721-3fd9832908af?auto=format&fit=crop&w=1000&q=85",
  flatlay:
    "https://images.unsplash.com/photo-1739384879592-79903b12b2a6?auto=format&fit=crop&w=1000&q=85",
  shirts:
    "https://images.unsplash.com/photo-1709916314093-5bbc88f6ee8c?auto=format&fit=crop&w=1000&q=85",
  store:
    "https://images.unsplash.com/photo-1714583353759-ac534aae73ce?auto=format&fit=crop&w=1200&q=85",
};

const products = [
  {
    id: 1,
    name: "Chaqueta denim vintage",
    brand: "Levi’s",
    price: 68,
    oldPrice: 120,
    size: "M",
    category: "Chaquetas",
    image: photos.jacket,
    badge: "Selección",
  },
  {
    id: 2,
    name: "Cárdigan de lana",
    brand: "Sézane",
    price: 54,
    oldPrice: 95,
    size: "S",
    category: "Punto",
    image: photos.outfit,
    badge: "Como nuevo",
  },
  {
    id: 3,
    name: "Vaquero recto 501",
    brand: "Levi’s",
    price: 42,
    oldPrice: 89,
    size: "38",
    category: "Pantalones",
    image: photos.denim,
  },
  {
    id: 4,
    name: "Jersey gris merino",
    brand: "COS",
    price: 46,
    oldPrice: 99,
    size: "M",
    category: "Punto",
    image: photos.knit,
    badge: "Nuevo",
  },
  {
    id: 5,
    name: "Chuck 70 Hi",
    brand: "Converse",
    price: 38,
    oldPrice: 90,
    size: "39",
    category: "Calzado",
    image: photos.sneakers,
  },
  {
    id: 6,
    name: "Cazadora workwear",
    brand: "Carhartt",
    price: 72,
    oldPrice: 145,
    size: "L",
    category: "Chaquetas",
    image: photos.flatlay,
    badge: "Selección",
  },
  {
    id: 7,
    name: "Camisa popelín",
    brand: "Arket",
    price: 36,
    oldPrice: 69,
    size: "M",
    category: "Camisas",
    image: photos.shirts,
  },
  {
    id: 8,
    name: "Abrigo de lana camel",
    brand: "Massimo Dutti",
    price: 84,
    oldPrice: 199,
    size: "S",
    category: "Abrigos",
    image: photos.rack,
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 17h16" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    sparkle: <path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Header({
  view,
  navigate,
  dark,
  setDark,
  cartCount,
}: {
  view: View;
  navigate: (v: View) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  cartCount: number;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="announcement">
        ENVÍO GRATIS EN PEDIDOS DE MÁS DE 75 € <span>·</span> DEVOLUCIONES FÁCILES
      </div>
      <header className="site-header">
        <button className="mobile-icon" onClick={() => setMenu(true)} aria-label="Abrir menú">
          <Icon name="menu" />
        </button>
        <button className="logo" onClick={() => navigate("home")}>
          RE<span>·</span>WORN
        </button>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <button className={view === "home" ? "active" : ""} onClick={() => navigate("home")}>
            Inicio
          </button>
          <button className={view !== "home" ? "active" : ""} onClick={() => navigate("shop")}>
            Comprar
          </button>
          <button onClick={() => navigate("shop")}>Novedades</button>
          <button onClick={() => navigate("shop")}>Cómo funciona</button>
        </nav>
        <div className="header-actions">
          <button aria-label="Buscar" onClick={() => navigate("shop")}>
            <Icon name="search" />
          </button>
          <button className="desktop-action" aria-label="Cuenta">
            <Icon name="user" />
          </button>
          <button
            aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
            onClick={() => setDark(!dark)}
          >
            <Icon name={dark ? "sun" : "moon"} />
          </button>
          <button aria-label="Bolsa" className="bag-button">
            <Icon name="bag" />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>
      {menu && (
        <div className="menu-overlay" onClick={() => setMenu(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-head">
              <span className="logo">
                RE<span>·</span>WORN
              </span>
              <button onClick={() => setMenu(false)}>
                <Icon name="close" />
              </button>
            </div>
            {["Inicio", "Comprar", "Novedades", "Cómo funciona"].map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  navigate(index === 0 ? "home" : "shop");
                  setMenu(false);
                }}
              >
                {item}
                <Icon name="arrow" />
              </button>
            ))}
            <div className="mobile-menu-note">
              Moda con pasado.
              <br />
              Estilo con futuro.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductCard({
  product,
  onOpen,
  favorites,
  toggleFavorite,
}: {
  product: (typeof products)[number];
  onOpen: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={onOpen}>
        <img src={product.image} alt={product.name} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`heart ${favorites.includes(product.id) ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label="Añadir a favoritos"
        >
          <Icon name="heart" />
        </button>
      </div>
      <button className="product-info" onClick={onOpen}>
        <div>
          <span>{product.brand}</span>
          <span>Talla {product.size}</span>
        </div>
        <h3>{product.name}</h3>
        <p>
          <strong>{product.price} €</strong>
          <s>{product.oldPrice} €</s>
        </p>
      </button>
    </article>
  );
}

function Home({
  navigate,
  favorites,
  toggleFavorite,
}: {
  navigate: (v: View) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  return (
    <main>
      <section className="hero">
        <img src={photos.hero} alt="Selección de chaquetas vintage en un perchero" />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">PRE-OWNED, RE-LOVED</span>
          <h1>
            Tu próximo favorito
            <br />
            <em>ya tiene historia.</em>
          </h1>
          <p>
            Prendas únicas, seleccionadas una a una.
            <br />
            Mejor para tu armario. Mejor para el planeta.
          </p>
          <button className="button light-button" onClick={() => navigate("shop")}>
            Descubrir la colección <Icon name="arrow" />
          </button>
        </div>
        <div className="hero-side-note">SEGUNDA MANO · PRIMERA ELECCIÓN</div>
      </section>

      <section className="manifesto">
        <span className="eyebrow">NUESTRA FORMA DE VERLO</span>
        <h2>
          No necesitas más ropa.
          <br />
          Necesitas <em>la ropa correcta.</em>
        </h2>
        <p>
          Cada pieza de RE·WORN ha sido elegida por su calidad, carácter y capacidad de quedarse
          contigo mucho tiempo.
        </p>
      </section>

      <section className="category-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXPLORA A TU MANERA</span>
            <h2>Encuentra tu próxima pieza</h2>
          </div>
          <button className="text-link" onClick={() => navigate("shop")}>
            Ver todo <Icon name="arrow" />
          </button>
        </div>
        <div className="category-grid">
          {[
            ["Mujer", photos.outfit, "241 prendas"],
            ["Hombre", photos.flatlay, "186 prendas"],
            ["Denim", photos.denim, "92 prendas"],
          ].map(([name, image, count]) => (
            <button className="category-card" key={name} onClick={() => navigate("shop")}>
              <img src={image} alt={`Colección ${name}`} />
              <span className="category-overlay" />
              <span className="category-copy">
                <small>{count}</small>
                <strong>{name}</strong>
                <span>
                  Explorar <Icon name="arrow" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="new-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">RECIÉN LLEGADO</span>
            <h2>Nuevas vidas, cada semana</h2>
          </div>
          <button className="text-link" onClick={() => navigate("shop")}>
            Ver novedades <Icon name="arrow" />
          </button>
        </div>
        <div className="product-grid featured">
          {products.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => navigate("details")}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="impact">
        <div className="impact-image">
          <img src={photos.rack} alt="Perchero con ropa seleccionada" />
        </div>
        <div className="impact-copy">
          <span className="eyebrow">LO QUE AHORRAMOS JUNTOS</span>
          <h2>
            Vestir bien también puede
            <br />
            <em>sentar bien.</em>
          </h2>
          <p>
            Elegir segunda mano alarga la vida de las prendas y reduce el impacto de la industria de
            la moda. Cada compra es un pequeño cambio que suma.
          </p>
          <div className="impact-stats">
            <div>
              <strong>2,4M</strong>
              <span>
                litros de agua
                <br />
                ahorrados
              </span>
            </div>
            <div>
              <strong>8,7t</strong>
              <span>
                de CO₂
                <br />
                evitadas
              </span>
            </div>
            <div>
              <strong>12k</strong>
              <span>
                prendas con
                <br />
                nueva vida
              </span>
            </div>
          </div>
          <button className="text-link">
            Conoce nuestro impacto <Icon name="arrow" />
          </button>
        </div>
      </section>
    </main>
  );
}

function Shop({
  navigate,
  favorites,
  toggleFavorite,
}: {
  navigate: (v: View) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const [category, setCategory] = useState("Todo");
  const [sort, setSort] = useState("Recomendados");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const categories = ["Todo", "Chaquetas", "Punto", "Pantalones", "Camisas", "Calzado"];
  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === "Todo" || p.category === category) &&
        `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()),
    );
    return [...list].sort((a, b) =>
      sort === "Precio: menor"
        ? a.price - b.price
        : sort === "Precio: mayor"
          ? b.price - a.price
          : a.id - b.id,
    );
  }, [category, sort, search]);
  return (
    <main className="shop-page">
      <div className="shop-intro">
        <span className="eyebrow">COLECCIÓN</span>
        <h1>
          Piezas con pasado.
          <br />
          <em>Elegidas para tu futuro.</em>
        </h1>
        <p>Prendas únicas revisadas y listas para volver a formar parte de una historia.</p>
      </div>
      <div className="shop-toolbar">
        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          <label className="search-field">
            <Icon name="search" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar"
            />
          </label>
          <button className="filter-button" onClick={() => setFiltersOpen(!filtersOpen)}>
            <Icon name="filter" /> Filtros <span>{category === "Todo" ? "" : "1"}</span>
          </button>
          <label className="sort-select">
            Ordenar:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Recomendados</option>
              <option>Precio: menor</option>
              <option>Precio: mayor</option>
            </select>
          </label>
        </div>
      </div>
      {filtersOpen && (
        <div className="filter-panel">
          <div>
            <span>Estado</span>
            {["Como nuevo", "Muy bueno", "Bueno"].map((v) => (
              <label key={v}>
                <input type="checkbox" /> {v}
              </label>
            ))}
          </div>
          <div>
            <span>Talla</span>
            <div className="size-chips">
              {["XS", "S", "M", "L", "XL"].map((v) => (
                <button key={v}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span>Precio</span>
            <p>0 € — 200 €</p>
            <input type="range" min="0" max="200" defaultValue="120" />
          </div>
          <button className="close-filter" onClick={() => setFiltersOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
      )}
      <div className="results-line">
        <span>{filtered.length} piezas</span>
        <span>Cada prenda es única. Si te gusta, no la dejes escapar.</span>
      </div>
      {filtered.length ? (
        <div className="product-grid shop-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => navigate("details")}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No hemos encontrado esa pieza</h2>
          <p>Prueba con otra búsqueda o categoría.</p>
          <button
            className="button dark-button"
            onClick={() => {
              setSearch("");
              setCategory("Todo");
            }}
          >
            Ver toda la colección
          </button>
        </div>
      )}
      <div className="load-more">
        <span>
          Has visto {filtered.length} de {filtered.length} piezas
        </span>
        <div />
        <button className="button outline-button">Cargar más</button>
      </div>
    </main>
  );
}

function Details({
  navigate,
  favorites,
  toggleFavorite,
  addToCart,
}: {
  navigate: (v: View) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: () => void;
}) {
  const product = products[0];
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openInfo, setOpenInfo] = useState("Detalles");
  const handleAdd = () => {
    addToCart();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  return (
    <main className="details-page">
      <div className="breadcrumb">
        <button onClick={() => navigate("home")}>Inicio</button>
        <Icon name="chevron" size={13} />
        <button onClick={() => navigate("shop")}>Chaquetas</button>
        <Icon name="chevron" size={13} />
        <span>{product.name}</span>
      </div>
      <div className="details-layout">
        <div className="gallery">
          <div className="main-photo">
            <img src={product.image} alt={product.name} />
            <span>ÚNICA PIEZA</span>
          </div>
          <div className="secondary-photo">
            <img src={photos.flatlay} alt="Vista de conjunto de la chaqueta" />
          </div>
          <div className="secondary-photo">
            <img src={photos.rack} alt="Detalle de prendas vintage" />
          </div>
        </div>
        <div className="product-panel">
          <span className="eyebrow">VINTAGE · COMO NUEVO</span>
          <div className="title-row">
            <div>
              <p className="brand">{product.brand}</p>
              <h1>{product.name}</h1>
            </div>
            <button
              className={`panel-heart ${favorites.includes(product.id) ? "liked" : ""}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <Icon name="heart" />
            </button>
          </div>
          <div className="detail-price">
            <strong>{product.price} €</strong>
            <s>{product.oldPrice} €</s>
            <span>−43%</span>
          </div>
          <p className="tax-note">Impuestos incluidos. Envío calculado al finalizar.</p>
          <div className="divider" />
          <div className="condition">
            <div>
              <span>Estado</span>
              <strong>Como nuevo</strong>
            </div>
            <div className="condition-scale">
              <i />
              <i />
              <i />
              <i className="off" />
            </div>
            <p>Sin signos visibles de uso. Ha sido revisada por nuestro equipo.</p>
          </div>
          <div className="size-title">
            <span>Selecciona tu talla</span>
            <button>Guía de tallas</button>
          </div>
          <div className="detail-sizes">
            {["XS", "S", "M", "L"].map((s) => (
              <button
                key={s}
                className={selectedSize === s ? "selected" : ""}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="fit-note">Esta prenda talla normal. La modelo mide 1,74 m y lleva una M.</p>
          <div className="purchase-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Icon name="minus" size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Icon name="plus" size={16} />
              </button>
            </div>
            <button className={`button add-button ${added ? "added" : ""}`} onClick={handleAdd}>
              {added ? "Añadido a la bolsa" : "Añadir a la bolsa"}{" "}
              <Icon name={added ? "sparkle" : "bag"} />
            </button>
          </div>
          <div className="trust-row">
            <div>
              <Icon name="shield" />
              <span>
                <strong>Compra protegida</strong>Pago seguro y devolución fácil
              </span>
            </div>
            <div>
              <Icon name="sparkle" />
              <span>
                <strong>Revisado a mano</strong>Calidad verificada por expertos
              </span>
            </div>
          </div>
          <div className="accordions">
            {[
              [
                "Detalles",
                "Corte recto, denim de algodón grueso y lavado azul medio. Confeccionada en los años 90 y conservada en excelente estado.",
              ],
              [
                "Composición y cuidados",
                "100% algodón. Lavar del revés a 30 °C. No usar secadora.",
              ],
              [
                "Envíos y devoluciones",
                "Envío en 2–4 días laborables. Devoluciones disponibles durante 14 días.",
              ],
            ].map(([title, copy]) => (
              <div key={title}>
                <button onClick={() => setOpenInfo(openInfo === title ? "" : title)}>
                  <span>{title}</span>
                  <Icon name={openInfo === title ? "minus" : "plus"} />
                </button>
                {openInfo === title && <p>{copy}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="related">
        <div className="section-head">
          <div>
            <span className="eyebrow">TAMBIÉN TE PUEDE GUSTAR</span>
            <h2>Más hallazgos únicos</h2>
          </div>
          <button className="text-link" onClick={() => navigate("shop")}>
            Ver todo <Icon name="arrow" />
          </button>
        </div>
        <div className="product-grid featured">
          {products.slice(4, 8).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="newsletter">
        <div>
          <span className="eyebrow light">ÚNETE AL CÍRCULO</span>
          <h2>
            Historias, hallazgos y<br />
            un 10% para empezar.
          </h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Tu email" aria-label="Tu email" />
          <button>
            Suscribirme <Icon name="arrow" />
          </button>
          <p>Al suscribirte, aceptas nuestra política de privacidad.</p>
        </form>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <span className="logo">
            RE<span>·</span>WORN
          </span>
          <p>
            Moda con pasado.
            <br />
            Estilo con futuro.
          </p>
        </div>
        <div>
          <strong>Comprar</strong>
          <a>Moda mujer</a>
          <a>Moda hombre</a>
          <a>Novedades</a>
          <a>Marcas</a>
        </div>
        <div>
          <strong>Sobre nosotros</strong>
          <a>Nuestra historia</a>
          <a>Impacto</a>
          <a>Cómo funciona</a>
          <a>Vende con nosotros</a>
        </div>
        <div>
          <strong>Ayuda</strong>
          <a>Envíos y devoluciones</a>
          <a>Preguntas frecuentes</a>
          <a>Contacto</a>
          <a>Guía de tallas</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 RE·WORN. Todos los derechos reservados.</span>
        <span>Instagram &nbsp; Pinterest &nbsp; TikTok</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [dark, setDark] = useState(() => localStorage.getItem("reworn-theme") === "dark");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("reworn-theme", dark ? "dark" : "light");
  }, [dark]);
  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleFavorite = (id: number) =>
    setFavorites((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  return (
    <div className="app-shell">
      <Header view={view} navigate={navigate} dark={dark} setDark={setDark} cartCount={cartCount} />
      {view === "home" && (
        <Home navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
      {view === "shop" && (
        <Shop navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
      {view === "details" && (
        <Details
          navigate={navigate}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={() => setCartCount((c) => c + 1)}
        />
      )}
      <Footer />
    </div>
  );
}

/* ==========================================================================
   1. SELECTORES Y UTILIDADES GENERALES
   ========================================================================== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Ocultar el loader cuando la página haya cargado por completo
window.addEventListener("load", () => $("#loader").classList.add("hide"));


/* ==========================================================================
   2. HEADER Y NAVEGACIÓN MÓVIL
   ========================================================================== */
const header = $("#header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

const menuBtn = $("#menuBtn");
const nav = $("#nav");

// Abrir / cerrar menú en dispositivos móviles
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

// Cerrar el menú automáticamente al hacer clic en cualquier enlace de navegación
$$("nav a").forEach(a => 
  a.addEventListener("click", () => nav.classList.remove("open"))
);


/* ==========================================================================
   3. CONFIGURACIÓN DE TEMA (CLARO / OSCURO)
   ========================================================================== */
const themeBtn = $("#themeBtn");

// Comprobar si el usuario ya tenía guardada una preferencia de tema claro
if (localStorage.getItem("bw-theme") === "light") {
  document.body.classList.add("light");
  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Alternar entre modo claro y oscuro al hacer clic en el botón
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  
  localStorage.setItem("bw-theme", isLight ? "light" : "dark");
  themeBtn.innerHTML = isLight 
    ? '<i class="fa-solid fa-sun"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
});


/* ==========================================================================
   4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Dejar de observar una vez animado
    }
  });
}, { threshold: .12 });

$$(".reveal").forEach(el => observer.observe(el));


/* ==========================================================================
   5. FILTRADO DE PROYECTOS EN EL PORTAFOLIO
   ========================================================================== */
const filters = $$(".filter");
const projectsEls = $$(".project");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    // Cambiar estado activo de los botones de filtro
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    // Mostrar u ocultar proyectos según la categoría seleccionada
    projectsEls.forEach(card => {
      const cats = card.dataset.category.split(" ");
      const match = filter === "all" || cats.includes(filter);
      card.classList.toggle("hidden", !match);
    });
  });
});


/* ==========================================================================
   6. BASE DE DATOS DE PROYECTOS (MODAL)
   ========================================================================== */
const data = [
  {
    title: "MERCADO MAYORISTA ECOLÓGICO EL MILAGRO",
    cat: "01 / BRANDING",
    type: "Identidad visual ecológica",
    image: "img/projects/milagro.jpg",
    desc: "La muestra de marca presenta la versatilidad del logotipo aplicado sobre un kit de merchandising ecofriendly y papelería corporativa de alta gama. Las piezas clave —folder corporativo con hojas membretadas, tarjetas de presentación personalizadas, tote bag de algodón ecológico, libreta con tapas de madera, memorias USB en acabado natural, bolígrafo ecológico, tomatodo de bambú y una tablet con la presencia digital de la marca— refuerzan la coherencia visual con la identidad sostenible de Mercado Mayorista El Milagro. La disposición sobre la mesa de trabajo y los tonos cálidos proyectan una imagen profesional, moderna y lista para el entorno comercial actual."
  },
  {
    title: "LEYABYTE",
    cat: "02 / BRANDING + PACKAGING",
    type: "Identidad y packaging",
    image: "img/projects/leyabyte.jpg",
    desc: "Este proyecto consistió en el desarrollo integral de la identidad visual y el sistema de packaging para LEYABYTE, una marca de polos sublimados de alta tecnología.El diseño se centra en la fusión del arte tradicional y el mundo digital, representado por el logotipo de la L pixelada y una paleta de colores vibrantes y neón. Se diseñó una caja de envío premium en negro mate con detalles de marca, como cinta de sellado pixelada, y se integró el eslogan TUS IDEAS TOMAN FORMA para comunicar claramente la propuesta de valor de la marca. El resultado es una identidad cohesiva y moderna, que une el diseño del producto con una experiencia de unboxing memorable."
  },
  {
    title: "INFINITYLENS",
    cat: "03 / PUBLICIDAD",
    type: "Campaña de producto",
    image: "img/projects/infinitylens.jpg",
    desc: "Pieza gráfica desarrollado en Photoshop para una campaña de lentes oftálmicos de una marcas exclusiva unisex, orientada a estética, lectura y actitud."
  },
  {
    title: "CV COVESA",
    cat: "04 / SOCIAL MEDIA",
    type: "Publicaciones en sus redes sociales.",
    image: "img/projects/cvcovesa.jpg",
    desc: "Piezas visuales y gráfico para una marca inmobiliaria, con piezas adaptadas a contenido digital, servicios y comunicación social."
  },
  {
    title: "MR. LUCAS",
    cat: "05 / PUBLICIDAD",
    type: "Producto comestible",
    image: "img/projects/mrlucas.jpg",
    desc: "En Mister Luca’s, cada detalle cuenta. Presentamos nuestra doble burger gourmet: jugosa carne a la parrilla, queso derretido en su punto exacto y ingredientes frescos, presentada en una atmósfera cálida y amigable. Nuestro logo es el simbolo de nuestra marca que refleja la pasión por lo que hacemos. El logo en tono blanco estilizado enmarca nuestra promesa:Única y Diferente. Una experiencia pensada para los verdaderos amantes de la buena comida."
  },
  {
    title: "AFTERLIGHT",
    cat: "06 / EDITORIAL",
    type: "Póster / evento cultural",
    image: "img/projects/06-afterlight-editorial.jpg",
    desc: "Concepto de cartel cultural construido mediante Adobe Photoshop, se utilizó contraste, fotografía, geometría y una composición editorial cinematográfica."
  },
  {
    title: "MIKONOS",
    cat: "07 / PUBLICIDAD",
    type: "Póster / evento publicitario",
    image: "img/projects/mikonos.jpg",
    desc: "Presenta tres propuestas de estilismo (stacks) distribuidas en diagonal. Cada nivel combina un reloj principal (desde esferas minimalistas en oro rosa con correa azul marino, pasando por diseños rectangulares con detalles de perlas, hasta relojes unisex de esfera oscura) junto a una curaduría de brazaletes de eslabones, pulseras rígidas pulidas y pavé de diamantes en tonos dorados y cálidos."
  },
  {
      title: "INFINITYLENS",
      cat: "08 / DISEÑO WEB",
      type: "Plataforma UI/UX y Frontend",
      image: "img/projects/pagina-infinitylens.jpg",
      desc: "Diseño de un sistema Web de interfaz y desarrollo frontend y backend para una plataforma de gestión de ventas e inventarios de lentes de sol y oftálmicos."
  },
  {
      title: "ILUSTRACIÓN AUTORETRATO",
      cat: "09 / Ilustración digital",
      type: "Autoretrato de mi fotografía",
      image: "img/projects/ilustracion-autoretrato.jpg",
      desc: "Ilustración digital de un autoretrato realizado con Adobe illustrator y herramientas de diseño gráfico como Wacom."
  },
  {
      title: "ILUSTRACIÓN",
      cat: "10 / Ilustración digital",
      type: "ilustración de un Personaje para el restaurante El Mochero",
      image: "img/projects/elmochero.jpg",
      desc: "Ilustración digital de un personaje realizado con Adobe illustrator y herramientas de diseño gráfico como Wacom."
  }

];


/* ==========================================================================
   7. GESTIÓN DE LA VENTANA MODAL (DETALLES DE PROYECTOS)
   ========================================================================== */
const modal = $("#modal");
const modalImage = $("#modalImage");
const modalCat = $("#modalCat");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalType = $("#modalType");

// Abrir modal e inyectar la información correspondiente al proyecto seleccionado
projectsEls.forEach(card => {
  card.addEventListener("click", () => {
    const p = data[Number(card.dataset.project)];
    
    modalImage.src = p.image;
    modalImage.alt = p.title;
    modalCat.textContent = p.cat;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalType.textContent = p.type;
    
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

// Función global para cerrar el modal
function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// Eventos de cierre (botón, fondo oscuro y tecla Escape)
$("#modalClose").addEventListener("click", closeModal);
$(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// --- SCRIPT DE CURSOR SEGUIDOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower) {
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Mover el punto principal de inmediato
    cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
  });

  // Animación suave (inercia) para el círculo seguidor
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.transform = `translate3d(${followerX - 18}px, ${followerY - 18}px, 0)`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}


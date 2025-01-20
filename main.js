// Selección de elementos
const navSearch = document.getElementById("nav-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll(".filter-item");

// Configuración base para ScrollReveal
const scrollRevealOptions = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Función para inicializar ScrollReveal en múltiples elementos
const initScrollReveal = (selector, options = {}, additionalDelay = 0) => {
  ScrollReveal().reveal(selector, { ...scrollRevealOptions, ...options, delay: additionalDelay });
};

// ScrollReveal inicialización con efectos mejorados
initScrollReveal(".header__image img", { origin: "right", scale: 0.9 });
initScrollReveal(".header__content .section__subheader", { origin: "left" }, 500);
initScrollReveal(".header__content h1", { origin: "top", distance: "100px" }, 1000);
initScrollReveal(".header__content .header__btn", { scale: 0.5, opacity: 0 }, 1500);
initScrollReveal(".feature__card", { interval: 500, rotate: { x: 20, z: -10 } });
initScrollReveal(".music__content .section__header", { origin: "left", distance: "100px" });
initScrollReveal(".music__content p", { origin: "right" }, 500);
initScrollReveal(".music__btn", { scale: 0.8 }, 1000);
initScrollReveal(".discount__content .section__header", { scale: 1.2, opacity: 0 });
initScrollReveal(".discount__content p", { origin: "bottom", distance: "30px" }, 500);
initScrollReveal(".discount__btn", { rotate: { y: 180 } }, 1000);

// Inicialización mejorada de Swiper.js
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  effect: "coverflow",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Animación para los botones de filtro
const animateFilterButtons = () => {
  filterButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)";
      button.style.transition = "transform 0.3s ease";
    });
    
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });
  });
};

// Función mejorada para manejar el filtrado con animaciones
const handleFilter = (filterCategory) => {
  filterItems.forEach((item) => {
    const isVisible = filterCategory === "all" || item.classList.contains(filterCategory);
    
    if (!isVisible) {
      item.style.animation = "fadeOut 0.5s forwards";
      setTimeout(() => {
        item.classList.add("hidden");
      }, 500);
    } else {
      item.classList.remove("hidden");
      item.style.animation = "fadeIn 0.5s forwards";
    }
  });

  // Actualizar clases activas de los botones con animación
  filterButtons.forEach((btn) => {
    if (btn.id === filterCategory) {
      btn.classList.add("active");
      btn.style.animation = "pulse 0.5s";
    } else {
      btn.classList.remove("active");
    }
  });
};

// Animación para las tarjetas de productos
const initProductCardAnimations = () => {
  filterItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const img = item.querySelector("img");
      if (img) {
        img.style.transform = "scale(1.1)";
        img.style.transition = "transform 0.3s ease";
      }
    });
    
    item.addEventListener("mouseleave", () => {
      const img = item.querySelector("img");
      if (img) {
        img.style.transform = "scale(1)";
      }
    });
  });
};

// Animación para el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Inicializar todas las animaciones
document.addEventListener("DOMContentLoaded", () => {
  animateFilterButtons();
  initProductCardAnimations();
  
  // Añadir efecto parallax al header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const scrolled = window.scrollY;
    if (header) {
      header.style.backgroundPositionY = scrolled * 0.5 + "px";
    }
  });
});

// Añadir event listeners para el filtrado
filterButtons.forEach((button) => {
  button.addEventListener("click", () => handleFilter(button.id));
});

// Agregar este código a tu archivo main.js

// Función para manejar el botón de scroll top
const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add('active');
  } else {
    scrollTop.classList.remove('active');
  }
});

scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterCategory = button.id;
    filterItems.forEach((item) => {
      if (filterCategory === "all") {
        item.style.display = "block";
      } else {
        if (item.classList.contains(filterCategory)) {
          item.style.display = "block"; 
        } else {
          item.style.display = "none"; 
        }
      }
    });

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

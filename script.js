/* ======================================================
   GLOBAL HELPERS
====================================================== */
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

/* ======================================================
   MOBILE MENU
====================================================== */
const menuBtn = $("#menu-btn");
const closeBtn = $("#close-menu");
const mobileMenu = $("#mobile-menu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-y-full");
  mobileMenu.classList.add("translate-y-0");
});

closeBtn?.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-y-full");
  mobileMenu.classList.remove("translate-y-0");
});

/* ======================================================
   SMOOTH SCROLL ON NAVBAR CLICK
====================================================== */
$$("nav a, #mobile-menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Only scroll if href starts with #
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust offset for sticky navbar
          behavior: "smooth",
        });
      }
    }

    // Close mobile menu if open
    if (mobileMenu.classList.contains("translate-y-0")) {
      mobileMenu.classList.add("-translate-y-full");
      mobileMenu.classList.remove("translate-y-0");
    }
  });
});

/* ======================================================
   WHATSAPP BUTTON
====================================================== */
$("#whatsapp-btn")?.addEventListener("click", () => {
  const phone = "923068868886";
  const msg = encodeURIComponent(
    "Thanks for contacting us! I’m a professional web developer. Share your requirements and let’s build something amazing."
  );
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
});

/* ======================================================
   HERO TEXT ANIMATION
====================================================== */
window.addEventListener("load", () => {
  const hero = $("#heroText");
  hero?.classList.remove("opacity-0", "translate-y-10");
  hero?.classList.add("opacity-100", "translate-y-0");
});

/* ======================================================
   SCROLL REVEAL FOR COMPONENTS
====================================================== */
const revealItems = $$(
  "section, .menu-card, .text-center, footer, .max-w-6xl, .max-w-2xl"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
      } else {
        entry.target.classList.remove(
          "opacity-100",
          "translate-y-0",
          "scale-100"
        );
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((el) => {
  el.classList.add(
    "opacity-0",
    "translate-y-8",
    "scale-95",
    "transition-all",
    "duration-700"
  );
  revealObserver.observe(el);
});

/* ======================================================
   3D CARD TILT (MENU CARDS)
====================================================== */
$$(".menu-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = -(y - r.height / 2) / 15;
    const ry = (x - r.width / 2) / 15;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

/* ======================================================
   BUTTON RIPPLE + MICRO INTERACTIONS
====================================================== */
$$("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className =
      "absolute bg-white/30 rounded-full pointer-events-none animate-ping";

    const r = btn.getBoundingClientRect();
    ripple.style.width = ripple.style.height = "100px";
    ripple.style.left = e.clientX - r.left - 50 + "px";
    ripple.style.top = e.clientY - r.top - 50 + "px";

    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  btn.addEventListener(
    "mousedown",
    () => (btn.style.transform = "scale(0.95)")
  );
  btn.addEventListener("mouseup", () => (btn.style.transform = "scale(1)"));
});

/* ======================================================
   FLOATING IMAGES
====================================================== */
$$("img").forEach((img, i) => {
  img.style.animation = `float ${4 + (i % 3)}s ease-in-out infinite`;
});

/* ======================================================
   PAGE LOADER
====================================================== */
const loader = document.createElement("div");
loader.className = "loader-container";
loader.innerHTML = `
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
`;
document.body.appendChild(loader);

// Loader styles
const loaderStyle = document.createElement("style");
loaderStyle.innerHTML = `
  .loader-container {
    position: fixed;
    inset: 0;
    background-color: #090909;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    z-index: 10000;
  }

  .dot {
    width: 20px;
    height: 20px;
    background-color: #FFD700;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
  }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-20px); }
  }

  @keyframes pulse {
    0% {transform:scale(1);opacity:1}
    50% {transform:scale(1.15);opacity:.6}
    100% {transform:scale(1);opacity:1}
  }

  @keyframes float {
    0% {transform:translateY(0)}
    50% {transform:translateY(-14px)}
    100% {transform:translateY(0)}
  }
`;
document.head.appendChild(loaderStyle);

// Remove loader after page load
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }, 1200);
});

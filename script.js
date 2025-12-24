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
$$("nav a, #mobile-menu a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Only scroll if href starts with #
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust offset for sticky navbar
          behavior: "smooth"
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
// Select all sections, menu cards, titles, and footer, excluding navbar
const revealItems = $$(
  "section, .menu-card, .text-center, footer, .max-w-6xl, .max-w-2xl"
);

// Intersection Observer for reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
      } else {
        // Remove opacity if you scroll out of component
        entry.target.classList.remove("opacity-100", "translate-y-0", "scale-100");
      }
    });
  },
  { threshold: 0.15 }
);

// Initialize hidden state and observe
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

  btn.addEventListener("mousedown", () => (btn.style.transform = "scale(0.95)"));
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
loader.innerHTML = `
  <h1 class="text-3xl md:text-4xl font-[montserrat] font-extrabold">
    <span class="text-white">Flavor</span><span>Fuel</span>
  </h1>
`;
document.body.appendChild(loader);

Object.assign(loader.style, {
  position: "fixed",
  inset: 0,
  background: "#090909",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
  transition: "opacity 1s ease",
});

loader.querySelector("h1").style.cssText = `
  color:#C28B00;
  animation:pulse 1.2s infinite;
`;

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 1000);
  }, 1200);
});

/* ======================================================
   KEYFRAMES
====================================================== */
const style = document.createElement("style");
style.innerHTML = `
@keyframes pulse {
  0% {transform:scale(1);opacity:1}
  50% {transform:scale(1.15);opacity:.6}
  100% {transform:scale(1);opacity:1}
}
@keyframes float {
  0% {transform:translateY(0)}
  50% {transform:translateY(-14px)}
  100% {transform:translateY(0)}
}`;
document.head.appendChild(style);

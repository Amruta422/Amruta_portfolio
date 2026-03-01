document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".scroll-progress");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const yearTarget = document.querySelector("#year");
const imageTargets = document.querySelectorAll("img");
const themeToggle = document.querySelector("#theme-toggle");

const themeStorageKey = "portfolio-theme";
const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
  }
};

const initializeTheme = () => {
  const existingTheme = document.documentElement.getAttribute("data-theme");
  if (existingTheme === "dark" || existingTheme === "light") {
    applyTheme(existingTheme);
    return;
  }

  let resolvedTheme = "light";
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    resolvedTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : (prefersDark ? "dark" : "light");
  } catch (error) {
    resolvedTheme = "light";
  }

  applyTheme(resolvedTheme);
};

const extensionFallbackOrder = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

const createInlineFallback = (label) => {
  const safeLabel = (label || "Image")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f2e6d7" />
          <stop offset="100%" stop-color="#dccbb6" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#g)" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="44" fill="#5f5348">${safeLabel}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const getAlternativeSource = (src, attempted) => {
  const match = src.match(/^(.*)\.(webp|png|jpg|jpeg|svg)(\?.*)?$/i);
  if (!match) {
    return null;
  }

  const base = match[1];
  const currentExt = `.${match[2].toLowerCase()}`;
  const query = match[3] || "";

  for (const nextExt of extensionFallbackOrder) {
    if (nextExt === currentExt) {
      continue;
    }

    const candidate = `${base}${nextExt}${query}`;
    if (!attempted.has(candidate) && candidate !== src) {
      return candidate;
    }
  }

  return null;
};

const setupImageFallbacks = () => {
  imageTargets.forEach((img) => {
    const attempted = new Set([img.getAttribute("src") || ""]);

    img.addEventListener("error", () => {
      const currentSrc = img.getAttribute("src") || "";
      const nextSrc = getAlternativeSource(currentSrc, attempted);

      if (nextSrc) {
        attempted.add(nextSrc);
        img.src = nextSrc;
        return;
      }

      if (!img.dataset.inlineFallbackApplied) {
        img.dataset.inlineFallbackApplied = "true";
        img.src = createInlineFallback(
          img.dataset.fallbackLabel || img.alt || "Image"
        );
      }
    });
  });
};

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

setupImageFallbacks();
initializeTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch (error) {
      // Ignore storage errors and still apply the theme for this session.
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const setActiveNav = () => {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const linkTarget = href ? href.slice(1) : "";
    link.classList.toggle("active", linkTarget === currentId);
  });
};

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const current = window.scrollY;
  const percent = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
};

const onScroll = () => {
  updateScrollProgress();
  setActiveNav();
};

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("load", onScroll);

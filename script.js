const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const formButton = document.querySelector(".form-button");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");

const setTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("michael-periman-theme", theme);

  if (themeToggleLabel) {
    themeToggleLabel.textContent = theme === "dark" ? "Light" : "Dark";
  }
};

const storedTheme = localStorage.getItem("michael-periman-theme");
const preferredTheme =
  storedTheme ||
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

setTheme(preferredTheme);

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
};

syncHeader();
window.addEventListener("scroll", syncHeader);

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") || "dark";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
  observer.observe(item);
});

if (formButton) {
  formButton.addEventListener("click", () => {
    const name = document.querySelector('input[name="name"]')?.value.trim();
    const email = document.querySelector('input[name="email"]')?.value.trim();
    const message = document.querySelector('textarea[name="message"]')?.value.trim();
    const subject = encodeURIComponent("Website Inquiry");
    const body = encodeURIComponent(
      `Name: ${name || ""}\nEmail: ${email || ""}\n\n${message || ""}`
    );

    window.location.href = `mailto:michaelperiman.author@gmail.com?subject=${subject}&body=${body}`;
  });
}

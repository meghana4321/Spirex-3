
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.classList.toggle("active", isOpen);
});

// Close menu after clicking a navigation link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the navigation item for the visible section
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.id;

        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentId}`
          );
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.35
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Automatically update footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Close mobile menu when clicking outside it
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

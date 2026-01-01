// Modern mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // Animate backdrop on mobile
  if (window.innerWidth <= 768) {
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
});

// Modern mega menu toggle for mobile
const megaMenuParents = document.querySelectorAll(".has-mega-menu > a");

megaMenuParents.forEach((parent) => {
  parent.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();

      const megaMenu = parent.nextElementSibling;
      const isActive = megaMenu.classList.contains("active");

      // Close all other mega menus first
      document.querySelectorAll(".mega-menu").forEach((menu) => {
        if (menu !== megaMenu) {
          menu.classList.remove("active");
          const otherArrow =
            menu.previousElementSibling.querySelector(".arrow");
          if (otherArrow) otherArrow.style.transform = "rotate(0deg)";
        }
      });

      // Toggle current mega menu
      megaMenu.classList.toggle("active");

      // Rotate arrow icon
      const arrow = parent.querySelector(".arrow");
      if (arrow) {
        arrow.style.transform = megaMenu.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }
    }
  });
});

// Close mobile menu when clicking on a regular link
const regularLinks = document.querySelectorAll(
  ".nav-links > li:not(.has-mega-menu) > a"
);
regularLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";

      // Close any open mega menus
      document.querySelectorAll(".mega-menu").forEach((menu) => {
        menu.classList.remove("active");
      });

      // Reset arrow icons
      document.querySelectorAll(".arrow").forEach((arrow) => {
        arrow.style.transform = "rotate(0deg)";
      });
    }
  });
});

// CTA button click handler
const ctaButton = document.querySelector(".cta-button");
ctaButton.addEventListener("click", () => {
  alert(
    "Welcome to the redesigned Nexus navbar! This modern navigation system demonstrates cutting-edge web design principles."
  );
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.backdropFilter = "blur(20px)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(20px)";
    header.style.boxShadow = "none";
  }
});

// Close mega menus when clicking outside on desktop
document.addEventListener("click", (e) => {
  if (window.innerWidth > 768) {
    const isMegaMenu = e.target.closest(".has-mega-menu");
    const isInMegaMenu = e.target.closest(".mega-menu");

    if (!isMegaMenu && !isInMegaMenu) {
      document.querySelectorAll(".mega-menu").forEach((menu) => {
        menu.style.opacity = "0";
        menu.style.transform = "translateY(15px) scale(0.98)";
        setTimeout(() => {
          menu.style.display = "none";
        }, 300);
      });
    }
  }
});

// Initialize mega menus on desktop after hiding
const megaMenuItems = document.querySelectorAll(".has-mega-menu");
megaMenuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      const megaMenu = item.querySelector(".mega-menu");
      if (megaMenu) {
        megaMenu.style.display = "grid";
        setTimeout(() => {
          megaMenu.style.opacity = "1";
          megaMenu.style.transform = "translateY(0) scale(1)";
        }, 10);
      }
    }
  });
});

// Add active class to clicked nav items
document.querySelectorAll(".nav-links > li > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth > 768 && !this.closest(".has-mega-menu")) {
      e.preventDefault();
      document.querySelectorAll(".nav-links > li > a").forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});
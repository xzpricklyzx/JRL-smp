const menuButton = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
    });
}

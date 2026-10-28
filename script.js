const menuButton = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
    });
}

const serverState = document.querySelector("[data-server-state]");
const serverPlayers = document.querySelector("[data-server-players]");
const statusIndicator = document.querySelector(".status-indicator");

if (serverState && serverPlayers && statusIndicator) {
    const updateServerStatus = async () => {
        try {
            const response = await fetch("https://api.mcsrvstat.us/3/188.90.129.84", { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`Serverstatus-API gaf HTTP ${response.status}`);
            }

            const status = await response.json();
            if (typeof status.online !== "boolean") {
                throw new Error("Serverstatus-API gaf geen geldige online-status terug");
            }

            const online = status.online;
            serverState.textContent = online ? "Online" : "Offline";
            statusIndicator.classList.toggle("status-online", online);
            statusIndicator.classList.toggle("status-offline", !online);
            statusIndicator.classList.remove("status-unknown");

            const playerCount = status.players?.online;
            serverPlayers.textContent = online && Number.isInteger(playerCount) && playerCount >= 0
                ? `${playerCount} ${playerCount === 1 ? "speler" : "spelers"}`
                : "0 spelers";
        } catch (error) {
            serverState.textContent = "Status onbekend";
            serverPlayers.textContent = "Spelers onbekend";
            statusIndicator.classList.remove("status-online", "status-offline");
            statusIndicator.classList.add("status-unknown");
            console.error("De serverstatus kon niet worden opgehaald.", error);
        }
    };

    updateServerStatus();
    window.setInterval(updateServerStatus, 60_000);
}

(() => {
    // Configuration
    const CONFIG = {
        BREAKPOINTS: {
            MOBILE: 1023.5,
        },

        SELECTORS: {
            body: "body",
            navigation: "#cs-navigation",
            hamburger: "#cs-navigation .cs-toggle",
            menuWrapper: "#cs-navigation .cs-ul-wrapper",
            expandedMenu: "#cs-expanded",
            dropdownToggle: ".cs-dropdown-toggle",
            dropdown: ".cs-dropdown",
            dropdownMenu: ".cs-drop-ul",
        },

        CLASSES: {
            active: "cs-active",
            menuOpen: "cs-open",
        },
    };

    // DOM Elements
    const elements = {
        body: document.querySelector(CONFIG.SELECTORS.body),
        navigation: document.querySelector(CONFIG.SELECTORS.navigation),
        hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
        menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
        expandedMenu: document.querySelector(CONFIG.SELECTORS.expandedMenu),
    };

    // Utilities
    const isMobile = () =>
        window.matchMedia(
            `(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`
        ).matches;

    // Dropdown Management
    const dropdownManager = {
        close(dropdown) {
            if (!dropdown) return;

            dropdown.classList.remove(CONFIG.CLASSES.active);

            const button = dropdown.querySelector(
                CONFIG.SELECTORS.dropdownToggle
            );

            if (button) {
                button.setAttribute("aria-expanded", "false");
            }
        },

        open(dropdown) {
            if (!dropdown) return;

            dropdown.classList.add(CONFIG.CLASSES.active);

            const button = dropdown.querySelector(
                CONFIG.SELECTORS.dropdownToggle
            );

            if (button) {
                button.setAttribute("aria-expanded", "true");
            }
        },

        toggle(dropdown) {
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains(
                CONFIG.CLASSES.active
            );

            // Close all dropdowns first
            document
                .querySelectorAll(
                    `${CONFIG.SELECTORS.navigation} ${CONFIG.SELECTORS.dropdown}`
                )
                .forEach((item) => {
                    item.classList.remove(CONFIG.CLASSES.active);

                    const button = item.querySelector(
                        CONFIG.SELECTORS.dropdownToggle
                    );

                    if (button) {
                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });

            // Reopen clicked one if it wasn't already open
            if (!isOpen) {
                this.open(dropdown);
            }
        },

        closeAll() {
            document
                .querySelectorAll(
                    `${CONFIG.SELECTORS.navigation} ${CONFIG.SELECTORS.dropdown}`
                )
                .forEach((dropdown) => {
                    this.close(dropdown);
                });
        },
    };

    // Mobile Menu Management
    const menuManager = {
        open() {
            elements.navigation.classList.add(
                CONFIG.CLASSES.active
            );

            elements.body.classList.add(
                CONFIG.CLASSES.menuOpen
            );

            elements.hamburger.setAttribute(
                "aria-expanded",
                "true"
            );

            elements.expandedMenu.setAttribute(
                "aria-expanded",
                "true"
            );
        },

        close() {
            elements.navigation.classList.remove(
                CONFIG.CLASSES.active
            );

            elements.body.classList.remove(
                CONFIG.CLASSES.menuOpen
            );

            elements.hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

            elements.expandedMenu.setAttribute(
                "aria-expanded",
                "false"
            );

            dropdownManager.closeAll();
        },

        toggle() {
            const isOpen =
                elements.navigation.classList.contains(
                    CONFIG.CLASSES.active
                );

            if (isOpen) {
                this.close();
            } else {
                this.open();
            }
        },
    };

    // Event Listeners
    const initEvents = () => {
        // Hamburger
        if (elements.hamburger) {
            elements.hamburger.addEventListener(
                "click",
                () => {
                    menuManager.toggle();
                }
            );
        }

        // Mobile dropdowns
        document
            .querySelectorAll(
                `${CONFIG.SELECTORS.navigation} ${CONFIG.SELECTORS.dropdownToggle}`
            )
            .forEach((button) => {
                button.addEventListener(
                    "click",
                    (event) => {
                        // Desktop uses hover only
                        if (!isMobile()) {
                            return;
                        }

                        event.preventDefault();

                        const dropdown =
                            button.closest(
                                CONFIG.SELECTORS.dropdown
                            );

                        dropdownManager.toggle(
                            dropdown
                        );
                    }
                );
            });

        // ESC closes mobile nav
        document.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Escape") {
                    menuManager.close();
                }
            }
        );

        // Resize reset
        window.addEventListener("resize", () => {
            if (!isMobile()) {
                menuManager.close();
            }
        });
    };

    // Init
    initEvents();
})();
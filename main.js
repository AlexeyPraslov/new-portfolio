document.addEventListener("DOMContentLoaded", function () {
    // === Бургер-меню ===
    const burgerBtn = document.querySelector("#burger-toggle");
    const burgerDropdown = document.querySelector("#burger-dropdown");
    const header = document.querySelector(".header");

    // Определение текущей страницы и подсветка активной ссылки
    function highlightActiveLink() {
        const currentPage = window.location.pathname.split("/").pop();
        const menuLinks = document.querySelectorAll(".burger-dropdown-link");

        menuLinks.forEach((link) => {
            const linkHref = link.getAttribute("href");
            if (
                linkHref === currentPage ||
                (currentPage === "" && linkHref === "index.html") ||
                (currentPage === "/" && linkHref === "index.html")
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Вызываем функцию при загрузке страницы
    highlightActiveLink();

    // Сбрасываем состояние меню при загрузке страницы
    function resetMenuState() {
        // Всегда сбрасываем состояние меню при загрузке страницы
        if (burgerDropdown) {
            burgerDropdown.classList.remove("active");
        }
        if (header) {
            header.classList.remove("header--open");
        }
        const overlay = document.querySelector(".header__overlay");
        if (overlay) {
            overlay.setAttribute("hidden", "");
        }

        // Проверяем, был ли переход с другой страницы
        const referrer = document.referrer;
        if (referrer && referrer.includes(window.location.hostname)) {
            // Если был переход с другой страницы этого же сайта,
            // убедимся, что меню закрыто
            sessionStorage.setItem("menuClosed", "true");
        }
    }

    // Вызываем функцию при загрузке страницы
    resetMenuState();

    if (burgerBtn && burgerDropdown && header) {
        // Открытие/закрытие выпадающего меню бургера
        burgerBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            burgerDropdown.classList.toggle("active");
            header.classList.toggle("header--open");

            // Показываем/скрываем overlay
            const overlay = document.querySelector(".header__overlay");
            if (overlay) {
                if (burgerDropdown.classList.contains("active")) {
                    overlay.removeAttribute("hidden");
                    // Сбрасываем флаг закрытия меню
                    sessionStorage.removeItem("menuClosed");
                } else {
                    overlay.setAttribute("hidden", "");
                    // Устанавливаем флаг закрытия меню
                    sessionStorage.setItem("menuClosed", "true");
                }
            }

            // Закрываем меню контактов при открытии бургер-меню
            if (contactDropdown) {
                contactDropdown.classList.remove("active");
            }
        });

        // Закрытие при клике вне меню
        document.addEventListener("click", function () {
            burgerDropdown.classList.remove("active");
            header.classList.remove("header--open");

            // Скрываем overlay
            const overlay = document.querySelector(".header__overlay");
            if (overlay) {
                overlay.setAttribute("hidden", "");
            }
        });

        // Обработка кликов внутри меню
        burgerDropdown.addEventListener("click", function (e) {
            // Предотвращаем закрытие при клике внутри меню
            e.stopPropagation();

            // Если клик был по ссылке, закрываем меню после небольшой задержки
            // чтобы пользователь успел увидеть эффект нажатия
            if (e.target.classList.contains("burger-dropdown-link")) {
                // Добавляем класс для анимации нажатия
                e.target.classList.add("clicked");

                setTimeout(function () {
                    burgerDropdown.classList.remove("active");
                    header.classList.remove("header--open");

                    // Скрываем overlay
                    const overlay = document.querySelector(".header__overlay");
                    if (overlay) {
                        overlay.setAttribute("hidden", "");
                    }

                    // Сохраняем состояние меню в sessionStorage
                    sessionStorage.setItem("menuClosed", "true");
                }, 150);
            }
        });
    }

    // === Переключение темы ===
    const themeToggle = document.getElementById("toggle"); // id="toggle" из HTML

    // Инициализация темы при загрузке
    function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("theme-dark");
            if (themeToggle) themeToggle.checked = true;
        }
    }

    // Применение темы при изменении переключателя
    if (themeToggle) {
        themeToggle.addEventListener("change", function () {
            if (this.checked) {
                document.body.classList.add("theme-dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("theme-dark");
                localStorage.setItem("theme", "light");
            }
        });
    }

    // Запуск инициализации темы
    initTheme();

    // === Блок "Связь со мной" ===
    const contactBtn = document.querySelector("#contact-toggle");
    const contactDropdown = document.querySelector("#contact-dropdown");

    if (contactBtn && contactDropdown) {
        // Открытие/закрытие выпадающего меню
        contactBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            contactDropdown.classList.toggle("active");

            // Показываем/скрываем overlay
            const overlay = document.querySelector(".header__overlay");
            if (overlay) {
                if (contactDropdown.classList.contains("active")) {
                    overlay.removeAttribute("hidden");
                } else {
                    overlay.setAttribute("hidden", "");
                }
            }

            // Закрываем бургерное меню при клике на "Связь со мной"
            if (header && burgerDropdown) {
                header.classList.remove("header--open");
                burgerDropdown.classList.remove("active");
            }
        });

        // Закрытие при клике вне меню
        document.addEventListener("click", function () {
            contactDropdown.classList.remove("active");

            // Скрываем overlay если оба меню закрыты
            const overlay = document.querySelector(".header__overlay");
            const burgerActive =
                burgerDropdown && burgerDropdown.classList.contains("active");

            if (
                overlay &&
                !burgerActive &&
                !contactDropdown.classList.contains("active")
            ) {
                overlay.setAttribute("hidden", "");
            }
        });

        // Предотвращение закрытия при клике внутри меню
        contactDropdown.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    } else {
        console.warn("Элементы 'Связь со мной' не найдены. Проверьте HTML.");
    }

    // === Overlay для закрытия всех меню ===
    const overlay = document.querySelector(".header__overlay");

    if (overlay) {
        overlay.addEventListener("click", function () {
            // Закрываем бургер-меню
            if (header && burgerDropdown) {
                header.classList.remove("header--open");
                burgerDropdown.classList.remove("active");
            }

            // Закрываем меню контактов
            if (contactDropdown) {
                contactDropdown.classList.remove("active");
            }

            // Скрываем overlay
            this.setAttribute("hidden", "");
        });
    }
});

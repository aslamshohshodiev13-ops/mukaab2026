const $ = id => document.getElementById(id);

// admin.html находится рядом с папкой mukaab-admin-backend
const API = "mukaab-admin-backend/";

let currentType = null;
let currentItems = [];
let portfolioSubPage = "all";


/* =========================================================
   UTILS
========================================================= */

function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c]));
}


function toast(message, error = false) {

    const root = $("toastRoot");

    if (!root) {
        alert(message);
        return;
    }

    const d = document.createElement("div");

    d.className = "toast" + (error ? " error" : "");

    d.textContent = message;

    root.appendChild(d);

    setTimeout(() => {
        d.remove();
    }, 2800);
}


/* =========================================================
   API
========================================================= */

async function api(path, opts = {}) {

    const res = await fetch(API + path, {
        credentials: "same-origin",
        ...opts
    });

    let data = {};

    try {
        data = await res.json();
    } catch (_) {}

    if (res.status === 401) {

        window.location.href = "login.php";

        throw new Error("Не авторизован");
    }

    if (!res.ok) {

        throw new Error(
            data.error ||
            `Ошибка HTTP ${res.status}`
        );
    }

    return data;
}


function apiGet(path) {

    return api(path, {
        method: "GET"
    });
}


function apiPost(path, body) {

    return api(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}


/* =========================================================
   MODAL
========================================================= */

function closeModal() {

    $("modalRoot").innerHTML = "";
}


function modal(title, body) {

    $("modalRoot").innerHTML = `

        <div
            class="modal-overlay"
            id="modalOverlay"
        >

            <div class="modal-box">

                <div class="modal-head">

                    <div class="modal-title">
                        ${esc(title)}
                    </div>

                    <button
                        class="modal-close"
                        id="modalClose"
                    >
                        ×
                    </button>

                </div>

                ${body}

            </div>

        </div>

    `;


    $("modalClose")?.addEventListener(
        "click",
        closeModal
    );


    $("modalOverlay")?.addEventListener(
        "click",
        e => {

            if (
                e.target.id ===
                "modalOverlay"
            ) {

                closeModal();

            }

        }
    );
}


/* =========================================================
   PAGE TITLES
========================================================= */

const pages = {

    dashboard: [
        "Главная",
        "Обзор содержимого сайта"
    ],

    portfolio: [
        "Портфолио",
        "Управление проектами и публикациями"
    ],

    services: [
        "Услуги",
        "Управление услугами компании"
    ],

    architecture: [
        "Архитектура",
        "Содержимое страницы архитектуры"
    ],

    interior: [
        "Дизайн интерьера",
        "Содержимое страницы интерьера"
    ],

    furniture: [
        "Мебель",
        "Коллекции и мебельные решения"
    ],

    viz: [
        "3D-визуализация",
        "Услуги визуализации"
    ],

    supervision: [
        "Авторский надзор",
        "Этапы и описание услуги"
    ],

    designer: [
        "Designer Day",
        "Информация о проекте Designer Day"
    ],

    vacancies: [
        "Вакансии",
        "Управление вакансиями"
    ],

    media: [
        "Медиа",
        "Изображения и файлы сайта"
    ],

    settings: [
        "Настройки",
        "Общие настройки MUKAAB"
    ]

};


function setPageHeader(page) {

    $("pageTitle").textContent =
        pages[page]?.[0] || "MUKAAB";

    $("pageSubtitle").textContent =
        pages[page]?.[1] || "";
}


function setActiveNav(page) {

    document
        .querySelectorAll(".nav-item")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.page === page
            );

        });

}


/* =========================================================
   DASHBOARD
========================================================= */

async function dashboard() {

    setPageHeader("dashboard");


    $("pageContent").innerHTML = `

        <div
            class="stats"
            id="statsRow"
        >

            <div class="stat">
                <span>Загрузка…</span>
            </div>

        </div>


        <div class="card">

            <div class="section-head">

                <div>

                    <h2>
                        Быстрые действия
                    </h2>

                    <p>
                        Часто используемые функции
                    </p>

                </div>

            </div>


            <div class="quick-grid">

                <button
                    class="quick"
                    onclick="openPortfolioSection('add')"
                >

                    <strong>
                        + Добавить проект
                    </strong>

                    <span>
                        Новое портфолио
                    </span>

                </button>


                <button
                    class="quick"
                    onclick="editor('services')"
                >

                    <strong>
                        + Добавить услугу
                    </strong>

                    <span>
                        Новая услуга
                    </span>

                </button>


                <button
                    class="quick"
                    onclick="editor('vacancies')"
                >

                    <strong>
                        + Добавить вакансию
                    </strong>

                    <span>
                        Новая вакансия
                    </span>

                </button>


                <button
                    class="quick"
                    onclick="upload()"
                >

                    <strong>
                        ↑ Загрузить медиа
                    </strong>

                    <span>
                        Изображения сайта
                    </span>

                </button>

            </div>

        </div>

    `;


    try {

        const {
            counts = {}
        } = await apiGet(
            "api/items.php?action=counts"
        );


        let mediaCount = 0;


        try {

            const m =
                await apiGet(
                    "api/media.php"
                );

            mediaCount =
                (m.items || []).length;

        } catch (_) {}


        $("statsRow").innerHTML = `

            <div class="stat">

                <span>
                    Проекты
                </span>

                <b>
                    ${counts.portfolio || 0}
                </b>

                <small>
                    Портфолио
                </small>

            </div>


            <div class="stat">

                <span>
                    Услуги
                </span>

                <b>
                    ${counts.services || 0}
                </b>

                <small>
                    Все разделы
                </small>

            </div>


            <div class="stat">

                <span>
                    Вакансии
                </span>

                <b>
                    ${counts.vacancies || 0}
                </b>

                <small>
                    Открытые и закрытые
                </small>

            </div>


            <div class="stat">

                <span>
                    Медиа
                </span>

                <b>
                    ${mediaCount}
                </b>

                <small>
                    Файлов загружено
                </small>

            </div>

        `;


        updateSidebarCounts(counts);


    } catch (e) {

        $("statsRow").innerHTML = `

            <div class="stat">

                <span>
                    Ошибка загрузки данных
                </span>

            </div>

        `;

    }

}


function updateSidebarCounts(counts) {

    document
        .querySelectorAll(".nav-item")
        .forEach(x => {

            const b =
                x.querySelector("b");

            if (
                b &&
                counts[x.dataset.page] !== undefined
            ) {

                b.textContent =
                    counts[x.dataset.page];

            }

        });

}


/* =========================================================
   PORTFOLIO
   ВНУТРЕННЯЯ ПАНЕЛЬ
========================================================= */

async function openPortfolioSection(
    section = "all"
) {

    portfolioSubPage = section;

    setPageHeader("portfolio");

    renderPortfolioShell();


    if (section === "overview") {

        return portfolioOverview();

    }


    if (section === "featured") {

        return portfolioList("featured");

    }


    if (section === "drafts") {

        return portfolioList("drafts");

    }


    if (section === "media") {

        return portfolioMedia();

    }


    if (section === "add") {

        return editor("portfolio");

    }


    return portfolioList("all");

}


/* =========================================================
   PORTFOLIO SHELL
========================================================= */

function renderPortfolioShell() {

    $("pageContent").innerHTML = `

        <div
            class="portfolio-layout"
            style="
                display:grid;
                grid-template-columns:220px minmax(0,1fr);
                gap:20px;
                align-items:start;
            "
        >


            <!-- ВНУТРЕННЕЕ МЕНЮ -->

            <aside
                class="portfolio-inner-nav"
                style="
                    position:sticky;
                    top:20px;
                "
            >

                <div class="card">

                    <div
                        style="
                            font-size:11px;
                            letter-spacing:1.5px;
                            text-transform:uppercase;
                            color:#b99655;
                            margin-bottom:12px;
                        "
                    >
                        Портфолио
                    </div>


                    <button
                        class="inner-nav-btn"
                        data-psec="overview"
                    >
                        Обзор
                    </button>


                    <button
                        class="inner-nav-btn"
                        data-psec="all"
                    >
                        Все проекты
                    </button>


                    <button
                        class="inner-nav-btn"
                        data-psec="add"
                    >
                        + Добавить проект
                    </button>


                    <button
                        class="inner-nav-btn"
                        data-psec="featured"
                    >
                        Избранные
                    </button>


                    <button
                        class="inner-nav-btn"
                        data-psec="drafts"
                    >
                        Черновики
                    </button>


                    <button
                        class="inner-nav-btn"
                        data-psec="media"
                    >
                        Изображения
                    </button>

                </div>

            </aside>


            <!-- РАБОЧАЯ ОБЛАСТЬ -->

            <section
                id="portfolioInnerContent"
            ></section>


        </div>

    `;


    document
        .querySelectorAll(
            "[data-psec]"
        )
        .forEach(btn => {

            btn.style.cssText += `;

                display:block;
                width:100%;
                text-align:left;
                background:transparent;
                border:0;
                padding:11px 8px;
                color:#aaa;
                cursor:pointer;
                border-radius:6px;

            `;


            btn.addEventListener(
                "click",
                () =>
                    openPortfolioSection(
                        btn.dataset.psec
                    )
            );

        });

}


/* =========================================================
   PORTFOLIO OVERVIEW
========================================================= */

async function portfolioOverview() {

    const root =
        $("portfolioInnerContent");


    root.innerHTML = `

        <div class="card">

            <div class="section-head">

                <div>

                    <h2>
                        Обзор портфолио
                    </h2>

                    <p>
                        Все функции портфолио находятся здесь.
                    </p>

                </div>

            </div>


            <div class="grid-2">


                <div class="card">

                    <b>
                        Все проекты
                    </b>

                    <p>
                        Просмотр, редактирование
                        и удаление проектов.
                    </p>

                </div>


                <div class="card">

                    <b>
                        Избранные
                    </b>

                    <p>
                        Проекты, отмеченные
                        как избранные.
                    </p>

                </div>


                <div class="card">

                    <b>
                        Черновики
                    </b>

                    <p>
                        Проекты, которые пока
                        не опубликованы.
                    </p>

                </div>


                <div class="card">

                    <b>
                        Изображения
                    </b>

                    <p>
                        Медиафайлы,
                        используемые портфолио.
                    </p>

                </div>


            </div>

        </div>

    `;

}


/* =========================================================
   PORTFOLIO LIST
========================================================= */

async function portfolioList(
    mode = "all"
) {

    const root =
        $("portfolioInnerContent");


    root.innerHTML = `

        <div class="card">

            <div class="pane-tools">

                <input
                    class="search-box"
                    id="portfolioSearch"
                    placeholder="Поиск проекта..."
                >


                <button
                    class="btn-gold"
                    id="addProjectBtn"
                >
                    + Добавить проект
                </button>

            </div>


            <div
                class="table"
                id="portfolioRows"
            >

                <div class="row">

                    <div class="row-main">
                        Загрузка…
                    </div>

                </div>

            </div>

        </div>

    `;


    $("addProjectBtn").onclick =
        () => editor("portfolio");


    try {

        const r =
            await apiGet(
                "api/items.php?action=list&type=portfolio"
            );


        currentItems =
            r.items || [];


        let items =
            currentItems;


        if (mode === "featured") {

            items =
                items.filter(
                    x =>
                        Number(x.featured) === 1
                );

        }


        if (mode === "drafts") {

            items =
                items.filter(
                    x =>
                        x.status === "draft"
                );

        }


        renderPortfolioRows(items);


        $("portfolioSearch").oninput =
            e =>
                filterPortfolioRows(
                    e.target.value
                );


    } catch (e) {

        $("portfolioRows").innerHTML = `

            <div class="row">

                <div class="row-main">

                    Ошибка загрузки:
                    ${esc(e.message)}

                </div>

            </div>

        `;

    }

}


/* =========================================================
   PORTFOLIO ROWS
========================================================= */

function renderPortfolioRows(
    items
) {

    if (!items.length) {

        $("portfolioRows").innerHTML = `

            <div class="row">

                <div class="row-main">

                    Проектов пока нет.

                </div>

            </div>

        `;

        return;

    }


    $("portfolioRows").innerHTML =
        items.map(x => {

            const search =
                `${x.title_ru || ""}
                 ${x.title_en || ""}
                 ${x.category || ""}
                 ${x.location || ""}`
                    .toLowerCase();


            const status =
                x.status === "published"
                    ? "Опубликовано"
                    : x.status === "hidden"
                        ? "Скрыто"
                        : "Черновик";


            return `

                <div
                    class="row portfolio-row"
                    data-search="${esc(search)}"
                >


                    <div class="thumb">

                        <img
                            src="${esc(x.image || "")}"
                            onerror="
                                this.style.display='none'
                            "
                        >

                    </div>


                    <div class="row-main">

                        <div class="row-title">

                            ${esc(
                                x.title_ru ||
                                "Без названия"
                            )}

                        </div>


                        <div class="row-meta">

                            ${esc(
                                [
                                    x.category,
                                    x.location,
                                    x.area
                                ]
                                .filter(Boolean)
                                .join(" · ")
                            )}

                        </div>

                    </div>


                    <span
                        class="badge ${esc(
                            x.status || "draft"
                        )}"
                    >
                        ${status}
                    </span>


                    ${
                        Number(x.featured) === 1
                        ?
                        `
                            <span class="badge">
                                Избранное
                            </span>
                        `
                        :
                        ""
                    }


                    <div class="row-actions">

                        <button
                            class="small-btn"
                            onclick="
                                editor(
                                    'portfolio',
                                    ${Number(x.id)}
                                )
                            "
                        >
                            Редактировать
                        </button>


                        <button
                            class="small-btn"
                            onclick="
                                removeItem(
                                    ${Number(x.id)}
                                )
                            "
                        >
                            Удалить
                        </button>

                    </div>


                </div>

            `;

        }).join("");

}


function filterPortfolioRows(q) {

    q =
        String(q || "")
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(
            "#portfolioRows .portfolio-row"
        )
        .forEach(row => {

            row.style.display =
                !q ||
                row.dataset.search.includes(q)
                    ? "flex"
                    : "none";

        });

}


/* =========================================================
   PORTFOLIO MEDIA
========================================================= */

async function portfolioMedia() {

    const root =
        $("portfolioInnerContent");


    root.innerHTML = `

        <div class="card">

            <div class="section-head">

                <div>

                    <h2>
                        Изображения портфолио
                    </h2>

                    <p>
                        Загрузка и просмотр изображений.
                    </p>

                </div>


                <button
                    class="btn-gold"
                    onclick="upload()"
                >
                    + Загрузить
                </button>

            </div>


            <div
                class="gallery-grid"
                id="portfolioMediaGrid"
            >
                Загрузка…
            </div>

        </div>

    `;


    try {

        const {
            items = []
        } = await apiGet(
            "api/media.php"
        );


        renderMedia(
            items,
            "portfolioMediaGrid"
        );


    } catch (e) {

        $("portfolioMediaGrid").innerHTML =
            `Ошибка: ${esc(e.message)}`;

    }

}


/* =========================================================
   OTHER SECTIONS
========================================================= */

async function list(type) {

    if (type === "portfolio") {

        return openPortfolioSection(
            "all"
        );

    }


    if (type === "media") {

        return media();

    }


    currentType = type;


    setPageHeader(type);


    $("pageContent").innerHTML = `

        <div class="pane-tools">

            <input
                class="search-box"
                placeholder="Поиск..."
                oninput="filterRows(this.value)"
            >


            <button
                class="btn-gold"
                onclick="
                    editor('${type}')
                "
            >
                + Добавить
            </button>

        </div>


        <div
            class="table"
            id="listRows"
        >

            <div class="row">

                <div class="row-main">
                    Загрузка…
                </div>

            </div>

        </div>

    `;


    try {

        const {
            items = []
        } = await apiGet(
            `api/items.php?action=list&type=${encodeURIComponent(type)}`
        );


        currentItems =
            items;


        renderRows(
            items,
            type
        );


    } catch (e) {

        $("listRows").innerHTML = `

            <div class="row">

                <div class="row-main">

                    Ошибка загрузки:
                    ${esc(e.message)}

                </div>

            </div>

        `;

    }

}


function renderRows(
    items,
    type
) {

    if (!items.length) {

        $("listRows").innerHTML = `

            <div class="row">

                <div class="row-main">

                    Пока ничего нет.

                </div>

            </div>

        `;

        return;

    }


    $("listRows").innerHTML =
        items.map(x => `

            <div
                class="row"
                data-search="${esc(
                    `${x.title_ru || ""}
                     ${x.category || ""}
                     ${x.location || ""}`
                        .toLowerCase()
                )}"
            >


                <div class="thumb">

                    <img
                        src="${esc(x.image || "")}"
                        onerror="
                            this.style.display='none'
                        "
                    >

                </div>


                <div class="row-main">

                    <div class="row-title">

                        ${esc(
                            x.title_ru
                        )}

                    </div>


                    <div class="row-meta">

                        ${esc(
                            [
                                x.category,
                                x.location,
                                x.area
                            ]
                            .filter(Boolean)
                            .join(" · ")
                            ||
                            type
                        )}

                    </div>

                </div>


                <span
                    class="badge ${esc(
                        x.status || "draft"
                    )}"
                >

                    ${
                        x.status === "published"
                        ? "Опубликовано"
                        : x.status === "hidden"
                            ? "Скрыто"
                            : "Черновик"
                    }

                </span>


                <div class="row-actions">

                    <button
                        class="small-btn"
                        onclick="
                            editor(
                                '${type}',
                                ${Number(x.id)}
                            )
                        "
                    >
                        Редактировать
                    </button>


                    <button
                        class="small-btn"
                        onclick="
                            removeItem(
                                ${Number(x.id)}
                            )
                        "
                    >
                        Удалить
                    </button>

                </div>


            </div>

        `).join("");

}


function filterRows(q) {

    q =
        String(q || "")
            .toLowerCase();


    document
        .querySelectorAll(
            "#listRows .row"
        )
        .forEach(r => {

            r.style.display =
                !r.dataset.search ||
                r.dataset.search.includes(q)
                    ? "flex"
                    : "none";

        });

}


/* =========================================================
   DELETE PROJECT
========================================================= */

async function removeItem(id) {

    if (
        !confirm(
            "Удалить проект?"
        )
    ) {

        return;

    }


    try {

        await apiPost(
            "api/items.php",
            {
                action: "delete",
                id: Number(id)
            }
        );


        toast(
            "Удалено"
        );


        if (
            currentType ===
            "portfolio"
        ) {

            openPortfolioSection(
                "all"
            );

        } else {

            list(
                currentType
            );

        }


    } catch (e) {

        toast(
            "Ошибка: " + e.message,
            true
        );

    }

}


/* =========================================================
   MEDIA
========================================================= */

async function media() {

    setPageHeader(
        "media"
    );


    $("pageContent").innerHTML = `

        <div class="pane-tools">

            <input
                class="search-box"
                placeholder="Поиск изображения..."
                oninput="filterMedia(this.value)"
            >


            <button
                class="btn-gold"
                onclick="upload()"
            >
                + Загрузить
            </button>

        </div>


        <div
            class="gallery-grid"
            id="mediaGrid"
        >
            Загрузка…
        </div>

    `;


    try {

        const {
            items = []
        } = await apiGet(
            "api/media.php"
        );


        renderMedia(
            items,
            "mediaGrid"
        );


    } catch (e) {

        $("mediaGrid").innerHTML =
            `Ошибка: ${esc(e.message)}`;

    }

}


function renderMedia(
    items,
    targetId
) {

    const root =
        $(targetId);


    if (!root) {

        return;

    }


    if (!items.length) {

        root.innerHTML = `

            <div class="gallery-card">

                <div class="gallery-body">

                    Файлов пока нет

                </div>

            </div>

        `;

        return;

    }


    root.innerHTML =
        items.map(x => `

            <div
                class="gallery-card"
                data-search="${esc(
                    String(
                        x.filename || ""
                    ).toLowerCase()
                )}"
            >

                <div
                    class="gallery-thumb"
                >

                    <img
                        src="${esc(
                            x.url || ""
                        )}"
                        onerror="
                            this.style.display='none'
                        "
                    >

                </div>


                <div
                    class="gallery-body"
                >

                    <div
                        class="gallery-name"
                    >

                        ${esc(
                            x.filename || ""
                        )}

                    </div>


                    <div
                        class="gallery-actions"
                    >

                        <button
                            class="small-btn"
                            onclick="
                                copyPath(
                                    '${esc(
                                        x.url || ""
                                    )}'
                                )
                            "
                        >
                            Копировать
                        </button>


                        <button
                            class="small-btn"
                            onclick="
                                deleteMedia(
                                    ${Number(x.id)}
                                )
                            "
                        >
                            Удалить
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}


function filterMedia(q) {

    q =
        String(q || "")
            .toLowerCase();


    document
        .querySelectorAll(
            ".gallery-card"
        )
        .forEach(c => {

            c.style.display =
                !q ||
                (
                    c.dataset.search ||
                    ""
                ).includes(q)
                    ? "block"
                    : "none";

        });

}


function copyPath(url) {

    navigator
        .clipboard
        ?.writeText(url)
        .then(
            () =>
                toast(
                    "Путь скопирован"
                )
        )
        .catch(
            () =>
                toast(url)
        );

}


async function deleteMedia(id) {

    if (
        !confirm(
            "Удалить файл?"
        )
    ) {

        return;

    }


    try {

        await apiPost(
            "api/media.php",
            {
                action: "delete",
                id: Number(id)
            }
        );


        toast(
            "Удалено"
        );


        media();


    } catch (e) {

        toast(
            "Ошибка: " +
            e.message,
            true
        );

    }

}


/* =========================================================
   EDITOR PROJECT
========================================================= */

async function editor(
    type,
    id
) {

    let item = {

        title_ru: "",
        title_en: "",

        status: "draft",

        sort_order: 1,

        description_ru: "",
        description_en: "",

        image: "",

        featured: 0,

        category: "",
        location: "",
        area: "",

        filter_cat: "",
        tags: "",
        gallery: ""

    };


    if (id) {

        try {

            const r =
                await apiGet(
                    `api/items.php?action=get&id=${Number(id)}`
                );


            item =
                r.item ||
                item;


        } catch (e) {

            toast(
                "Ошибка загрузки записи: " +
                e.message,
                true
            );

            return;

        }

    }


    const isPortfolio =
        type === "portfolio";


    const extra =
        isPortfolio
        ?
        `

            <label
                class="form-label"
            >

                Фильтр на сайте

                <select
                    id="f_filter_cat"
                >

                    <option value="">
                        —
                    </option>

                    <option value="interior">
                        Интерьер
                    </option>

                    <option value="arch">
                        Архитектура
                    </option>

                    <option value="furniture">
                        Мебель
                    </option>

                    <option value="commercial">
                        Коммерческие
                    </option>

                </select>

            </label>


            <label
                class="form-label"
            >

                Теги

                <input
                    id="f_tags"
                    value="${esc(item.tags)}"
                    placeholder="Минимализм, Дерево"
                >

            </label>


            <label
                class="form-label wide"
            >

                Галерея

                <textarea
                    id="f_gallery"
                    placeholder="По одному пути на строку"
                >${esc(item.gallery)}</textarea>

            </label>

        `
        :
        "";


    modal(
        id
        ? "Редактировать проект"
        : "Добавить проект",

        `

        <form
            id="editorForm"
        >

            <div
                class="form-grid"
            >


                <label
                    class="form-label"
                >

                    Название RU

                    <input
                        id="f_title_ru"
                        value="${esc(
                            item.title_ru
                        )}"
                        required
                    >

                </label>


                <label
                    class="form-label"
                >

                    Название EN

                    <input
                        id="f_title_en"
                        value="${esc(
                            item.title_en
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Категория

                    <input
                        id="f_category"
                        value="${esc(
                            item.category
                        )}"
                        placeholder="Интерьер / Архитектура / Мебель / Коммерческие"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Город

                    <input
                        id="f_location"
                        value="${esc(
                            item.location
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Площадь

                    <input
                        id="f_area"
                        value="${esc(
                            item.area
                        )}"
                        placeholder="280 м²"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Статус

                    <select
                        id="f_status"
                    >

                        <option value="published">
                            Опубликован
                        </option>

                        <option value="draft">
                            Черновик
                        </option>

                        <option value="hidden">
                            Скрыт
                        </option>

                    </select>

                </label>


                <label
                    class="form-label"
                >

                    Порядок отображения

                    <input
                        id="f_sort_order"
                        type="number"
                        value="${esc(
                            item.sort_order ?? 1
                        )}"
                    >

                </label>


                <label
                    class="form-label wide"
                >

                    Главное изображение

                    <input
                        id="f_image"
                        value="${esc(
                            item.image
                        )}"
                        placeholder="images/project.jpg"
                    >

                </label>


                <label
                    class="form-label wide"
                >

                    Описание RU

                    <textarea
                        id="f_description_ru"
                    >${esc(
                        item.description_ru
                    )}</textarea>

                </label>


                <label
                    class="form-label wide"
                >

                    Описание EN

                    <textarea
                        id="f_description_en"
                    >${esc(
                        item.description_en
                    )}</textarea>

                </label>


                ${extra}


                <label
                    class="check"
                >

                    <input
                        id="f_featured"
                        type="checkbox"
                        ${
                            Number(
                                item.featured
                            ) === 1
                            ? "checked"
                            : ""
                        }
                    >

                    Избранный проект

                </label>


            </div>


            <div
                class="form-actions"
            >

                <button
                    type="button"
                    class="btn-ghost"
                    onclick="closeModal()"
                >
                    Отмена
                </button>


                <button
                    class="btn-gold"
                >
                    Сохранить
                </button>

            </div>


        </form>

        `
    );


    if ($("f_filter_cat")) {

        $("f_filter_cat").value =
            item.filter_cat || "";

    }


    $("f_status").value =
        item.status || "draft";


    $("editorForm").onsubmit =
        async e => {

            e.preventDefault();


            const payload = {

                action: "save",

                type,

                id: id || 0,


                title_ru:
                    $("f_title_ru").value,

                title_en:
                    $("f_title_en").value,


                category:
                    $("f_category").value,

                location:
                    $("f_location").value,

                area:
                    $("f_area").value,


                status:
                    $("f_status").value,

                sort_order:
                    $("f_sort_order").value,


                image:
                    $("f_image").value,


                description_ru:
                    $("f_description_ru").value,

                description_en:
                    $("f_description_en").value,


                featured:
                    $("f_featured").checked
                    ? 1
                    : 0,


                filter_cat:
                    isPortfolio
                    ? $("f_filter_cat").value
                    : (
                        item.filter_cat ||
                        ""
                    ),


                tags:
                    isPortfolio
                    ? $("f_tags").value
                    : (
                        item.tags ||
                        ""
                    ),


                gallery:
                    isPortfolio
                    ? $("f_gallery").value
                    : (
                        item.gallery ||
                        ""
                    )

            };


            try {

                await apiPost(
                    "api/items.php",
                    payload
                );


                closeModal();


                toast(
                    "Проект сохранён"
                );


                openPortfolioSection(
                    "all"
                );


            } catch (err) {

                toast(
                    "Ошибка: " +
                    err.message,
                    true
                );

            }

        };

}


/* =========================================================
   UPLOAD
========================================================= */

function upload() {

    modal(
        "Загрузка медиа",

        `

        <div
            class="dropzone"
            onclick="
                $('files').click()
            "
        >

            Нажмите для выбора изображений

            <br>

            <small>
                JPG, PNG, WEBP — до 8 МБ
            </small>


            <input
                id="files"
                type="file"
                multiple
                accept="image/*"
                hidden
            >

        </div>

        `
    );


    $("files").onchange =
        async () => {

            const files =
                $("files").files;


            if (!files.length) {

                return;

            }


            const fd =
                new FormData();


            for (
                const f of files
            ) {

                fd.append(
                    "files[]",
                    f
                );

            }


            try {

                const res =
                    await fetch(
                        API +
                        "api/media.php",
                        {
                            method: "POST",
                            credentials:
                                "same-origin",
                            body: fd
                        }
                    );


                let data = {};

                try {

                    data =
                        await res.json();

                } catch (_) {}


                if (!res.ok) {

                    throw new Error(
                        data.error ||
                        "Ошибка загрузки"
                    );

                }


                closeModal();


                toast(
                    `Загружено файлов: ${
                        (data.uploaded || [])
                            .length
                    }`
                );


                if (
                    portfolioSubPage ===
                    "media"
                ) {

                    portfolioMedia();

                }


            } catch (e) {

                toast(
                    "Ошибка: " +
                    e.message,
                    true
                );

            }

        };

}


/* =========================================================
   SETTINGS
========================================================= */

async function settings() {

    setPageHeader(
        "settings"
    );


    $("pageContent").innerHTML = `

        <div class="card">

            <div class="section-head">

                <div>

                    <h2>
                        Настройки
                    </h2>

                    <p>
                        Общие настройки сайта
                    </p>

                </div>

            </div>


            <div
                id="settingsForm"
            >
                Загрузка…
            </div>

        </div>

    `;


    try {

        const {
            settings: s = {}
        } =
            await apiGet(
                "api/settings.php"
            );


        $("settingsForm").innerHTML = `

            <div
                class="form-grid"
            >


                <label
                    class="form-label"
                >

                    Название сайта

                    <input
                        id="s_site_name"
                        value="${esc(
                            s.site_name || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Email

                    <input
                        id="s_email"
                        value="${esc(
                            s.email || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Телефон

                    <input
                        id="s_phone"
                        value="${esc(
                            s.phone || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Telegram

                    <input
                        id="s_telegram"
                        value="${esc(
                            s.telegram || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    WhatsApp

                    <input
                        id="s_whatsapp"
                        value="${esc(
                            s.whatsapp || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label"
                >

                    Instagram

                    <input
                        id="s_instagram"
                        value="${esc(
                            s.instagram || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label wide"
                >

                    Адрес

                    <textarea
                        id="s_address"
                    >${esc(
                        s.address || ""
                    )}</textarea>

                </label>


                <label
                    class="form-label"
                >

                    Язык

                    <select
                        id="s_lang"
                    >

                        <option
                            value="RU"
                            ${
                                s.lang === "RU"
                                ? "selected"
                                : ""
                            }
                        >
                            RU
                        </option>

                        <option
                            value="EN"
                            ${
                                s.lang === "EN"
                                ? "selected"
                                : ""
                            }
                        >
                            EN
                        </option>

                    </select>

                </label>


                <label
                    class="form-label wide"
                >

                    SEO Title

                    <input
                        id="s_seo_title"
                        value="${esc(
                            s.seo_title || ""
                        )}"
                    >

                </label>


                <label
                    class="form-label wide"
                >

                    SEO Description

                    <textarea
                        id="s_seo_description"
                    >${esc(
                        s.seo_description || ""
                    )}</textarea>

                </label>


            </div>


            <div
                class="form-actions"
            >

                <button
                    class="btn-gold"
                    id="saveSettingsBtn"
                >
                    Сохранить
                </button>

            </div>

        `;


        $("saveSettingsBtn").onclick =
            saveSettings;


    } catch (e) {

        $("settingsForm").innerHTML =
            `Ошибка: ${esc(
                e.message
            )}`;

    }

}


async function saveSettings() {

    const payload = {

        site_name:
            $("s_site_name").value,

        email:
            $("s_email").value,

        phone:
            $("s_phone").value,

        telegram:
            $("s_telegram").value,

        whatsapp:
            $("s_whatsapp").value,

        instagram:
            $("s_instagram").value,

        address:
            $("s_address").value,

        lang:
            $("s_lang").value,

        seo_title:
            $("s_seo_title").value,

        seo_description:
            $("s_seo_description").value

    };


    try {

        await apiPost(
            "api/settings.php",
            payload
        );


        toast(
            "Настройки сохранены"
        );


    } catch (e) {

        toast(
            "Ошибка: " +
            e.message,
            true
        );

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

async function renderSimple(
    type
) {

    setPageHeader(type);

    await list(type);

}


async function navigate(
    page
) {

    setActiveNav(page);


    if (
        page === "dashboard"
    ) {

        return dashboard();

    }


    if (
        page === "portfolio"
    ) {

        return openPortfolioSection(
            "overview"
        );

    }


    if (
        page === "media"
    ) {

        return media();

    }


    if (
        page === "settings"
    ) {

        return settings();

    }


    return renderSimple(page);

}


/* =========================================================
   LEFT MAIN MENU
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () =>
                navigate(
                    btn.dataset.page
                )
        );

    });


/* =========================================================
   LOGIN
========================================================= */

$("loginForm")?.addEventListener(
    "submit",
    async e => {

        e.preventDefault();


        const login =
            $("login").value.trim();


        const password =
            $("password").value;


        const error =
            $("loginError");


        error.classList.add(
            "hidden"
        );


        if (
            !login ||
            !password
        ) {

            error.textContent =
                "Введите логин и пароль";

            error.classList.remove(
                "hidden"
            );

            return;

        }


        try {

            await apiPost(
                "auth/login.php",
                {
                    username: login,
                    password: password
                }
            );


            $("loginScreen")
                .classList.add(
                    "hidden"
                );


            $("app")
                .classList.remove(
                    "hidden"
                );


            navigate(
                "dashboard"
            );


        } catch (err) {

            error.textContent =
                err.message ||
                "Неверный логин или пароль";


            error.classList.remove(
                "hidden"
            );

        }

    }
);


/* =========================================================
   PASSWORD
========================================================= */

$("togglePassword")
    ?.addEventListener(
        "click",
        () => {

            const p =
                $("password");


            p.type =
                p.type === "password"
                ? "text"
                : "password";

        }
    );


/* =========================================================
   OTHER BUTTONS
========================================================= */

$("forgot")
    ?.addEventListener(
        "click",
        () =>
            toast(
                "Обратитесь к разработчику для сброса пароля"
            )
    );


$("bellBtn")
    ?.addEventListener(
        "click",
        () =>
            toast(
                "Новых уведомлений нет"
            )
    );


$("searchBtn")
    ?.addEventListener(
        "click",
        () =>
            toast(
                "Глобальный поиск будет подключён позже"
            )
    );


$("logout")
    ?.addEventListener(
        "click",
        async () => {

            try {

                await apiPost(
                    "auth/logout.php",
                    {}
                );

            } catch (_) {}


            window.location.href =
                "login.php";

        }
    );


/* =========================================================
   INIT
========================================================= */

(async function init() {

    try {

        const r =
            await apiGet(
                "auth/check.php"
            );


        if (
            r.authenticated
        ) {

            $("loginScreen")
                .classList.add(
                    "hidden"
                );


            $("app")
                .classList.remove(
                    "hidden"
                );


            navigate(
                "dashboard"
            );

        }


    } catch (_) {

        // Остаёмся на экране входа

    }

})();
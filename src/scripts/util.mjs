export function pageTitle() {
    //-----------------------
    // All pages used to update the h2 with the page name was just a fun part of learning js could be drasticlly simplified by simply typing it into the h2 in html
    //-----------------------
    const activePage = document.getElementById("activePage");
    const home = document.getElementById("home");

    window.addEventListener('load', () => {
        const currentUrl = (window.location.href).split('/');
        const pageName = currentUrl[currentUrl.length - 1].replace('.html', '').toUpperCase();
        localStorage.setItem("title", pageName)
        if (localStorage.getItem("title") == 'INDEX') {
            localStorage.setItem("title", home.textContent)
        };
        activePage.textContent = localStorage.getItem('title');
    });
}

export function setLocalStore() {

}

export function getLocalStore() {

}

export function getJsonBin() {

}

export function updateJsonBIn() {

}
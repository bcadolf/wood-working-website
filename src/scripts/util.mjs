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

export function setLocalStore(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

export function getLocalStore(key) {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
}

// functions for accessing the JsonBin Api that stores the json files off site.
const JsonBinapiKey = '$2a$10$y10jYmSSIYvn6kJNyCOw3.8EHGp77diWFwVw5IepSN9mnPneo88SK';

export function getJsonBin(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-ACCESS-KEY': JsonBinapiKey
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        });
}

export async function updateJsonBin(key) {
    try {
        const newData = getLocalStore(key);
        // Send the PUT request to update the JSON file
        fetch(url, {
            method: 'PUT',
            headers: {
                'X-ACCESS-KEY': JsonBinapiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
    } catch (error) {
        console.error('Error updating entries:', error);
    }
}

export function setFirstSession(page) {
    document.addEventListener('DOMContentLoaded', () => {
        if (!sessionStorage.getItem(page)) {
            // Set Intial load value
            sessionStorage.setItem(page, 'true');
        }
    });
}

export function checkSession(page) {
    const load = sessionStorage.getItem(page);
    return load === 'true';
}
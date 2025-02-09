const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentyear.innerHTML = "&copy" + today.getFullYear();
lastModified.innerHTML = "Last Modified: " + document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


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



//-----------------------------
// Projects page dynamically transistion between project photos
//---------------------------
const projImgs = document.querySelectorAll('.proj-img');
let currentIndex = 0;

if (projImgs.length > 0) {
    const updateImages = () => {
        projImgs.forEach((img, i) => {
            img.classList.remove('partial');
            const offset = (i - currentIndex) % projImgs.length;
            img.style.transform = `translateX(${offset * 100}%)`;
        });
        projImgs[(currentIndex + 1) % projImgs.length].classList.add('partial');
        projImgs[(currentIndex + projImgs.length - 1) % projImgs.length].classList.add('partial');
    };

    projImgs.forEach((img, index) => {
        img.style.transform = `translateX(${100 * index}%)`;

        img.addEventListener('click', () => {
            if (img.classList.contains('partial')) {
                currentIndex = index;
                updateImages();
            }
        });
    });

    updateImages(); // Initial setup
};



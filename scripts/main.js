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
const about = document.getElementById("about");
const journal = document.getElementById("journal");
const projects = document.getElementById("projects");

if (localStorage.getItem("title") == null) {
    localStorage.setItem("title", home.textContent)
};

activePage.textContent = localStorage.getItem("title")

home.addEventListener("click", () => {
    localStorage.setItem("title", home.textContent)
});
about.addEventListener("click", () => {
    localStorage.setItem("title", about.textContent)
});
journal.addEventListener("click", () => {
    localStorage.setItem("title", journal.textContent)
});
projects.addEventListener("click", () => {
    localStorage.setItem("title", projects.textContent)
});

//-----------------------------
// Projects page dynamically transistion between project photos
//---------------------------
const projImgs = document.querySelectorAll('.proj-img');
let currentIndex = 0;

if (projImgs == true) {
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

//-----------------------------
// Journal page dialog box leading to forms for journal entry sumbission
//---------------------------
const addEntry = document.getElementById('add-entry')
const addEntryModal = document.getElementById('add-entry-modal')

if (addEntryModal) {
    addEntry.addEventListener('click', () => {
        addEntryModal.showModal();
    });
};

const closeModal = document.getElementById('close-entry-modal')
if (closeModal) {
    closeModal.addEventListener('click', () => {
        addEntryModal.close();
    });
};

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

//-----------------------------
// Journal page entry card and modal building
//---------------------------
const entryContainer = document.getElementById('entries');

if (entryContainer) {
    //-----------------------------
    // Journal page json fetch for the modals
    //---------------------------
    const url = 'https://bcadolf.github.io/wood-working-website/scripts/journal.json';

    async function callEntries() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            entryData(data.entries);
        } catch (error) {
            console.error('Error fetching entries:', error);
        };
    };

    callEntries();

    const entryData = (entries) => {
        entries.forEach((entry, index) => {
            let card = document.createElement('div');
            let titles = document.createElement('h3');

            let date = document.createElement('p');

            // set all the card element values
            card.classList.add('listView');
            card.setAttribute('data-id', index);
            titles.textContent = entry.title;
            date.textContent = entry.date;
            //add elements to card
            card.appendChild(date);
            card.appendChild(titles);
            // add card to page
            entryContainer.appendChild(card);
        });

        // Add click event listener to cards
        const listView = document.querySelectorAll('.listView');
        const journalModal = document.getElementById('journalModal');
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalContent = document.getElementById('modal-content');

        listView.forEach(card => {
            card.addEventListener('click', () => {
                const index = card.getAttribute('data-id');
                const entry = entries[index];
                modalTitle.textContent = entry.title;
                modalDate.textContent = `${entry.first} ${entry.last} ${entry.date}`;
                modalContent.textContent = entry.content;

                journalModal.showModal();
            });
        });

        // Close modal
        document.querySelector('.close-button').addEventListener('click', () => {
            journalModal.close();
        });
    };

};
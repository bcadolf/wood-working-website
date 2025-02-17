import { pageTitle, setLocalStore, getJsonBin, getLocalStore, updateJsonBin, checkSession, setFirstSession } from "./util.mjs";
import JournalEntries from "./JournalEntries.mjs";


pageTitle();
setFirstSession('journal');

//-----------------------------
// Journal page dialog box leading to forms for journal entry sumbission
//---------------------------
const addEntry = document.getElementById('add-entry')
const addEntryModal = document.getElementById('add-entry-modal')
const entryForm = document.getElementById('entry-form');
const entryContainer = document.getElementById('entries');

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
// Journal page json fetch for the modals
//---------------------------
const url = 'https://api.jsonbin.io/v3/b/67a8d436e41b4d34e487463c';
let storedEntries = getLocalStore('entries');
let sessionNum = checkSession('journal');


document.addEventListener('DOMContentLoaded', async () => {

    if (sessionNum) {
        entryData(storedEntries);
    } else {
        await getJsonBin(url)
            .then(data => {
                setLocalStore('entries', data.record.entries);
                storedEntries = data.record.entries; // Update storedEntries
                entryData(storedEntries); // Call entryData with updated storedEntries
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});


//-----------------------------
// Journal page entry card and modal building
//---------------------------
const entryData = (entries) => {
    entryContainer.innerHTML = ''; // Clear existing entries
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
            console.log("Selected Entry:", entry);
            modalTitle.textContent = entry.title;
            modalDate.textContent = `${entry.first} ${entry.last} ${entry.date}`;
            modalContent.textContent = entry.content;

            journalModal.showModal();
        });
    });
    if (journalModal) {
        // Close modal
        document.querySelector('.close-button').addEventListener('click', () => {
            journalModal.close();
        });
    }
};

entryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newEntry = new JournalEntries(
        document.getElementById('entry-title').value,
        document.getElementById('entry-date').value,
        document.getElementById('entry-fname').value,
        document.getElementById('entry-lname').value,
        document.getElementById('entry-content').value
    );

    let entries = getLocalStore('entries');
    entries.push(newEntry.toJson());
    setLocalStore('entries', entries);
    addEntryModal.close();
    entryData(entries);
    updateJsonBin('entries');
});


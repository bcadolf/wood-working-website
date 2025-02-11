import { pageTitle } from "./util.mjs";

pageTitle();

const addEntry = document.getElementById('add-entry');
const addEntryModal = document.getElementById('add-entry-modal');
const entryForm = document.getElementById('entry-form');
const entryContainer = document.getElementById('entries');
const successMessage = document.getElementById('success-message');

if (addEntryModal) {
    addEntry.addEventListener('click', () => {
        addEntryModal.showModal();
    });
}

const closeModal = document.getElementById('close-entry-modal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        addEntryModal.close();
    });
}

const entryData = (entries) => {
    entryContainer.innerHTML = ''; // Clear existing entries
    entries.forEach((entry, index) => {
        let card = document.createElement('div');
        let titles = document.createElement('h3');
        let date = document.createElement('p');

        card.classList.add('listView');
        card.setAttribute('data-id', index);
        titles.textContent = entry.title;
        date.textContent = entry.date;
        card.appendChild(date);
        card.appendChild(titles);
        entryContainer.appendChild(card);
    });

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

    if (journalModal) {
        document.querySelector('.close-button').addEventListener('click', () => {
            journalModal.close();
        });
    }
};

const apiKey = '$2a$10$y10jYmSSIYvn6kJNyCOw3.8EHGp77diWFwVw5IepSN9mnPneo88SK';
const url = 'https://api.jsonbin.io/v3/b/67a8d436e41b4d34e487463c';

const reloadEntries = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-ACCESS-KEY': apiKey
            }
        });
        const data = await response.json();
        entryData(data.record.entries);
    } catch (error) {
        console.error('Error reloading entries:', error);
    }
};

fetch(url, {
    method: 'GET',
    headers: {
        'X-ACCESS-KEY': apiKey
    }
})
    .then(response => response.json())
    .then(data => {
        entryData(data.record.entries);
    })
    .catch(error => console.error('Error fetching data:', error));

entryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newEntry = new JournalEntry(
        document.getElementById('entry-title').value,
        document.getElementById('entry-date').value,
        document.getElementById('entry-fname').value,
        document.getElementById('entry-lname').value,
        document.getElementById('entry-content').value
    );

    // Save the entry to local storage
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.push(newEntry.toJSON());
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    // Optionally, you can send entries to the server
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-ACCESS-KEY': apiKey
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        data.record.entries.push(newEntry.toJSON());

        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-ACCESS-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.record)
        });
        if (!updateResponse.ok) {
            throw new Error('Network response was not ok ' + updateResponse.statusText);
        }

        addEntryModal.close();
    } catch (error) {
        console.error('Error updating entries:', error);
    }

    reloadEntries();
});

// Load entries from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entryData(storedEntries);
});

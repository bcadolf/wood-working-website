//-----------------------------
// Journal page dialog box leading to forms for journal entry sumbission
//---------------------------
const addEntry = document.getElementById('add-entry')
const addEntryModal = document.getElementById('add-entry-modal')
const entryForm = document.getElementById('entry-form');
const entryContainer = document.getElementById('entries');
const successMessage = document.getElementById('success-message');

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
    if (journalModal) {
        // Close modal
        document.querySelector('.close-button').addEventListener('click', () => {
            journalModal.close();
        });
    }
};
//-----------------------------
// Journal page json fetch for the modals
//---------------------------
const apiKey = '$2a$10$y10jYmSSIYvn6kJNyCOw3.8EHGp77diWFwVw5IepSN9mnPneo88SK';
const url = 'https://api.jsonbin.io/v3/b/67a8d436e41b4d34e487463c';

const reloadEntries = async () => {
    try {
        const response =
            setTimeout(fetch(url, {
                method: 'GET',
                headers: {
                    'X-ACCESS-KEY': apiKey
                }
            }), 5000);
        const data = await response.json();
        entryContainer.innerHTML = ''; // Clear existing entries
        entryData(data.record.entries); // Reload entries
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
        console.log(data);
        entryData(data.record.entries);
    })
    .catch(error => console.error('Error fetching data:', error));

entryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newEntry = {
        title: document.getElementById('entry-title').value,
        date: document.getElementById('entry-date').value,
        first: document.getElementById('entry-fname').value,
        last: document.getElementById('entry-lname').value,
        content: document.getElementById('entry-content').value,
    };

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-ACCESS-KEY': apiKey
            }
        })
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();


        // Update data with new entry
        data.record.entries.push(newEntry);

        // Send the PATCH request to update the JSON file
        fetch(url, {
            method: 'PUT',
            headers: {
                'X-ACCESS-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.record)
        });
        addEntryModal.close();
    } catch (error) {
        console.error('Error updating entries:', error);
    }
    reloadEntries();
});



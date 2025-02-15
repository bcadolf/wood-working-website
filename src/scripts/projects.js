import { pageTitle } from "./util.mjs";
import ProjectData from "./ProjectData.mjs";


pageTitle();


// Fetch JSON data
async function fetchProjectData() {
    try {
        const response = await fetch('./temp/temp.json'); // Path to your JSON file
        const data = await response.json();
        return data.projects.map(project => new ProjectData(
            project.name,
            project.title,
            project.description,
            project.directions,
            project.supplies,
            project.cost,
            project.tools,
            project.difficulty,
            project.image,
            project.model
        ));
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}

// Display project icons
function displayProjects(projects) {
    const projIcons = document.getElementById('proj-icons');
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'icon';
        card.innerHTML = `<img src="${project.image}" alt="${project.title}" class="project-icon" data-index="${index}">`;
        projIcons.appendChild(card);
    });

    document.querySelectorAll('.project-icon').forEach(img => {
        img.addEventListener('click', (event) => {
            document.querySelectorAll('.project-icon').forEach(icon => icon.classList.remove('clicked'));
            event.target.classList.add('clicked');
            const index = event.target.getAttribute('data-index');
            projects[index].highlightCard();
        });
    });

    const randomIndex = Math.floor(Math.random() * projects.length);
    const randomProjectIcon = document.querySelector(`.project-icon[data-index="${randomIndex}"]`);
    if (randomProjectIcon) {
        randomProjectIcon.classList.add('clicked');
        projects[randomIndex].highlightCard();
    }

    document.getElementById('view-details').addEventListener('click', (event) => {
        event.preventDefault();
        const index = document.querySelector('.project-icon.clicked').getAttribute('data-index');
        projects[index].displayCard();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchProjectData();
    displayProjects(projects);
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

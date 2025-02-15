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



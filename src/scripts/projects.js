import { getJsonBin, pageTitle, setLocalStore, getLocalStore, setFirstSession, checkSession } from "./util.mjs";
import ProjectData from "./ProjectData.mjs";


pageTitle();
setFirstSession('projects');

// Fetch JSON data
const url = 'https://api.jsonbin.io/v3/b/67aab274ad19ca34f8feccd2';
let sessionNum = checkSession('projects');
let storedProjs = getLocalStore('projects').map(project => new ProjectData(
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

document.addEventListener('DOMContentLoaded', async () => {
    if (sessionNum) {
        displayProjects(storedProjs);
    } else {
        await getJsonBin(url)
            .then(data => {
                setLocalStore('projects', data.record.projects);
                storedProjs = data.record.projects.map(project => new ProjectData(
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
                displayProjects(storedProjs);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

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
        document.getElementById('proj-display').scrollIntoView({
            behavior: 'smooth'
        });

        document.getElementById('display-close').addEventListener('click', () => {
            document.getElementById('proj-display').style.display = "none";
        });
    });
}





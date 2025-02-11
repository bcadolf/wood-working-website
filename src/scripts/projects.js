import { pageTitle } from "./util.mjs";


pageTitle();

const projectContainer = document.getElementById('project-card-container');


function createProjCard() {

}

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
import { pageTitle } from "./util.mjs";


const currentyear = document.querySelector("#currentyear");

const today = new Date();

currentyear.innerHTML = "&copy" + today.getFullYear();

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

pageTitle();





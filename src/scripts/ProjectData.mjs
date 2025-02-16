export default class ProjectData {
    constructor(name, title, description, directions, supplies, cost, tools, difficulty, image, model = null) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.directions = directions;
        this.supplies = supplies;
        this.cost = cost;
        this.tools = tools;
        this.difficulty = difficulty;
        this.image = image;
        this.model = model || null;
    }

    toJson() {
        return {
            name: this.name,
            title: this.title,
            description: this.description,
            directions: this.directions,
            supplies: [this.supplies],
            cost: this.cost,
            tools: [this.tools],
            difficulty: this.difficulty,
            image: this.image,
            model: this.model
        }
    }

    // Method to update the second card with project data
    highlightCard() {
        const highlightImg = document.getElementById('highlight-img');
        const highlightTitle = document.getElementById('highlight-title');
        const highlightName = document.getElementById('highlight-name');
        const highlightDescription = document.getElementById('highlight-description');

        highlightImg.src = this.image;
        highlightImg.alt = `picture of ${this.title}`
        highlightTitle.textContent = this.title;
        highlightName.textContent = `Created By: ${this.name}`;
        highlightDescription.textContent = this.description;

        document.getElementById('proj-highlight').style.display = 'grid';
    }
    // update the full details display.
    displayCard() {
        const displayTitle = document.getElementById('display-title');
        const displayName = document.getElementById('display-name');
        const displayDescription = document.getElementById('display-description');
        const displayDirections = document.getElementById('display-directions');
        const displaySupplies = document.getElementById('display-supplies');
        const displayCost = document.getElementById('display-cost');
        const displayTools = document.getElementById('display-tools');
        const displayDifficulty = document.getElementById('display-difficulty');
        const displayImage = document.getElementById('display-image');
        const displayModel = document.getElementById('display-model');
        const button = document.createElement('button');

        button.id = 'display-close';
        button.textContent = 'X';

        displayTitle.textContent = this.title;
        displayTitle.appendChild(button);
        displayName.textContent = `Name: ${this.name}`;
        displayDescription.textContent = `Description: ${this.description}`;
        displayDirections.textContent = `Directions: ${this.directions}`;
        displaySupplies.textContent = `Supplies: ${this.supplies.join(', ')}`;
        displayCost.textContent = `Cost: ${this.cost}`;
        displayTools.textContent = `Tools: ${this.tools.join(', ')}`;
        displayDifficulty.textContent = `Difficulty: ${this.difficulty}`;
        displayImage.src = this.image;
        displayModel.textContent = `Model: ${this.model}`;

        document.getElementById('proj-display').style.display = 'block';
    }


}


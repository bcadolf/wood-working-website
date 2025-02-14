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
        highlightTitle.textContent = this.title;
        highlightName.textContent = `Created By: ${this.name}`;
        highlightDescription.textContent = this.description;

        document.getElementById('proj-highlight').style.display = 'block';
    }
    // update the full details display.
    displayCard() {
        const displayTitle = document.getElementById('display-title');
        const displayName = document.getElementById('display-name');
        const displayDescription = document.getElementById('display-description');
        const displayDetails = document.getElementById('display-details');

        displayTitle.textContent = this.title;
        displayName.textContent = this.name;
        displayDescription.textContent = this.description;
        displayDetails.textContent = `
            Directions: ${this.directions}
            Supplies: ${this.supplies.join(', ')}
            Cost: ${this.cost}
            Tools: ${this.tools.join(', ')}
            Difficulty: ${this.difficulty}
        `;

        document.getElementById('proj-display').style.display = 'block';
    }

}


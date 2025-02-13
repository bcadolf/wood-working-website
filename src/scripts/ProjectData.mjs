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
}


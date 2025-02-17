export function calcProj() {
    const difficulty = document.getElementById('difficulty').value;
    const time = parseFloat(document.getElementById('time').value) || 0;
    const materials = parseFloat(document.getElementById('materials').value) || 0;
    let difficultyNum = "";
    const difficultyMap = {
        "rookie": 0.5,
        "beginner": 1,
        "intermediate": 2,
        "professional": 4,
        "crazy": 8
    };
    if (difficulty) {
        difficultyNum = difficultyMap[difficulty] || 0;
    }
    const labor = difficultyNum * time;
    const overhead = (labor + materials) * 0.15;
    const profit = (labor + materials + overhead) * 0.1;
    const price = (labor + materials + overhead + profit).toFixed(2);
    return `$${price}`
}
// labor + materials + overhead + profits = price 
//price - (materials + overhead) = earnings 
//  labor = effort x time 
//difficulty = possibly use json data to load project into calc
//time = est hours of labor
//materials = raw lumber or none reusable items 
// overhead = labor + material * 0.15
// profits = labor + material + overhead 
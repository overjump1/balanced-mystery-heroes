var HEROES; // Declare a global variable
const COLORS = [
    "blue",
    "red"
];
var teams = {
    "blue": [],
    "red": []
};

$.getJSON("heroes.json", function(data) {
    HEROES = data; // Assign the retrieved data to the global variable
    showHeroes(); // Call the function to display the heroes
    buildTeam();
});

function showHeroes() {
    
    // Code to handle the retrieved data goes here
    var html = "";
    for (let team=0; team<2; team++) {
        for (let slot=0; slot<5; slot++) {
            var hero = randomHero();
            html += `
            <div class="rounded-xl max-w-40 bg-${COLORS[team]}-800 hover:bg-zinc-800">
                <img src="${hero["picture"]}" alt="${hero["title"]}" class="pointer-events-none rounded-xl border-4 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-zinc-900"">
                <div class="flex justify-center items-center">
                    <h2 class="text-white text-lg font-bold my-2 italic">${hero["title"].replace("-", " ")}</h2>
                    <img src="../imgs/roles/${hero["role"]}.svg" alt="${hero["role"]} role" class="w-8 h-8 my-2 p-1">
                </div>
            </div>`;
        }
    }
    $("#heroes").html(html);
}

function buildTeam() {
    for (team in teams){
        for (let i=0; i<10; i++) {
            let hero = randomHero();
            team.push(hero);
        }
    }
}

function randomHero() {
    var keys = Object.keys(HEROES);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    return HEROES[randomKey];
}
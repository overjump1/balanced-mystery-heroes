var HEROES; // Declare a global variable
const COLORS = [
    "blue",
    "red"
];
var teams = {
    "blue": [],
    "red": []
};
var ROLE_LAYOUT = {
    "tank": 1,
    "damage": 2,
    "support": 2
}
var team_players = 5;

$.getJSON("heroes.json", function(data) {
    HEROES = data; // Assign the retrieved data to the global variable
    $("#heroes").addClass("grid grid-cols-"+team_players+" gap-4 font-black"); // Add the grid class to the heroes div
    buildTeam();
    showHeroes(); // Call the function to display the heroes
});

function showHeroes() {
    // Code to handle the retrieved data goes here
    var html = "";
    for (let team=0; team<Object.keys(teams).length; team++) {
        for (let slot=0; slot<team_players; slot++) {
            var hero = teams[COLORS[team]][slot];
            html += `
            <div class="rounded-xl max-w-40 bg-${COLORS[team]}-800 hover:bg-zinc-800">
                <img src="${hero["picture"]}" alt="${hero["title"]}" class="rounded-xl border-4 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-zinc-900"">
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
    for (let team of Object.keys(teams)){
        for (let i=0; i<team_players; i++) {
            let hero = randomHero();
            teams[team].push(hero);
        }
    }
}

function randomHero() {
    var keys = Object.keys(HEROES);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    console.log(pickRoles(teams["blue"], 0.5))
    return HEROES[randomKey];
}

function getRemainingRoles(team){
    roles = ROLE_LAYOUT
    for (player in team){
        roles[team[player]["role"]] -= 1;
        if (roles[team[player]["role"]] == 0){
            delete roles[team[player]["role"]];
        }
    }
}

function pickRoles(team, temperature){
    if (Math.random() < temperature){
        role = Object.keys(ROLE_LAYOUT).sort(() => Math.random() - 0.5);
    } else {
        role = RandomProbebility(getRemainingRoles(team));
    }
    return role;
}

function RandomProbebility(dic){
    //picks a random key using probebility from values
    let random = Math.floor(Math.random() * 100);
    for(let prob in dic){
        if(prob>=random){
        return dic[prob];
        }
    }
}
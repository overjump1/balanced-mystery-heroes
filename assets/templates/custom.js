var HEROES; // Declare a global variable
const COLORS = [
    "blue",
    "red"
];
var teams = {
    "blue": [],
    "red": []
};
const ROLE_LAYOUT = {
    "tank": 1,
    "damage": 2,
    "support": 2
}
var team_players = 5;

$.getJSON("heroes.json", function(data) {
    HEROES = data; // Assign the retrieved data to the global variable
    $("#heroes").addClass("grid grid-cols-"+team_players+" gap-4 font-black"); // Add the grid class to the heroes div
    buildTeam();
});

function showHeroes() {
    // Code to handle the retrieved data goes here
    var html = "";
    for (let team_color of Object.keys(teams)) {
        for (let slot=0; slot<team_players; slot++) {
            var hero = teams[team_color][slot];
            html += `
            <div class="rounded-xl max-w-full sm:max-w-40 bg-${team_color}-800 hover:bg-zinc-800" team="${team_color}" slot="${slot}">
                <img src="${hero["picture"]}" alt="${hero["title"]}" class="w-full sm:min-h-[160px] sm:min-w-[160px] rounded-xl border-2 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-zinc-900">
                <div class="flex flex-col sm:flex-row justify-center items-center">
                    <h2 class="text-white text-lg font-bold italic text-center">${hero["title"].replace("-", " ")}</h2>
                    <img src="../imgs/roles/${hero["role"]}.svg" alt="${hero["role"]} role" class="h-8 p-1">
                </div>
            </div>`;
        }
    }
    $("#heroes").html(html);
}

function buildTeam(role_likelyhood=50) {
    teams = {
        "blue": [],
        "red": []
    };
    for (let team_color of Object.keys(teams)){
        for (let i=0; i<team_players; i++) {
            let hero = randomHero(team_color, role_likelyhood);
            teams[team_color].push(hero);
        }
    }
    showHeroes();
}

function randomHero(team_color, role_likelyhood){
    role = pickRoles(team_color, role_likelyhood);
    hero = chance.pickone(getHeroesByRole(role));
    
    return HEROES[hero];
}

function getHeroesByRole(role) {
    return Object.keys(HEROES).filter(hero => HEROES[hero]["role"] == role);
}

function getRemainingRoles(team_color){
    team = teams[team_color];
    roles = { ...ROLE_LAYOUT };
    for (let hero of team){
        roles[hero["role"]] -= 1;
    }
    return roles;
}

function pickRoles(team_color, likelyhood){
    
    // value from 0-100. 100 is 100% chance of picking the right role. 0 is 100% chance of picking a random role.
    if (!chance.bool({ likelihood: likelyhood })){
        role = chance.pickone(Object.keys(ROLE_LAYOUT));
    } else {
        remaining = getRemainingRoles(team_color);
        
        role = chance.weighted(Object.keys(remaining), Object.values(remaining));
    }
    return role;
}
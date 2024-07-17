var HEROES; // Declare a global variable

$.getJSON("heroes.json", function(data) {
    HEROES = data; // Assign the retrieved data to the global variable
    const COLORS = [
        "bg-blue-500",
        "bg-red-500",
    ]
    // Code to handle the retrieved data goes here
    console.log(random_hero()); // Example: Log the data to the console
    var html = "";
    for (let team=0; team<2; team++) {
        for (let slot=0; slot<5; slot++) {
            var hero = random_hero();
            html += `
            <div class="${COLORS[team]}">
                <img src="${hero["picture"]}" alt="${hero["title"]}" class="border-4">
                <h2 class="text-white text-lg font-bold mt-2">${hero["title"]}</h2>
                <img src="../imgs/roles/${hero["role"]}.svg" alt="${hero["role"]} role" class="w-6 h-6 mt-2">
            </div>`;
            console.log(random_hero());
        }
    }
    console.log(html);
    $("#heroes").html(html);
});

function random_hero() {
    var keys = Object.keys(HEROES);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    return HEROES[randomKey];
}
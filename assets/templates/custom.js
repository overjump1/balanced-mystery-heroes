var HEROES; // Declare a global variable

$.getJSON("heroes.json", function(data) {
    HEROES = data; // Assign the retrieved data to the global variable
    const COLORS = [
        "bg-blue-800",
        "bg-red-800",
    ]
    // Code to handle the retrieved data goes here
    console.log(random_hero()); // Example: Log the data to the console
    var html = "";
    for (let team=0; team<2; team++) {
        for (let slot=0; slot<5; slot++) {
            var hero = random_hero();
            html += `
            <div class="rounded-xl ${COLORS[team]}">
                <img src="${hero["picture"]}" alt="${hero["title"]}" class="rounded-xl border-4 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-zinc-900"">
                <div class="flex justify-center items-center">
                    <h2 class="text-white text-lg font-bold my-2 italic">${hero["title"].replace("-", " ")}</h2>
                    <img src="../imgs/roles/${hero["role"]}.svg" alt="${hero["role"]} role" class="w-8 h-8 my-2 p-1">
                </div>
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
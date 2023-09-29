// Arreglo para almacenar información de los pokemones
let pokemons = [];

// Elemento HTML para contener los pokemones
const poke_container = document.getElementById("poke_container");

// URL base de la API para obtener información de los pokemones
const url = "https://pokeapi.co/api/v2/pokemon";

// Número total de pokemones a obtener
const pokemons_number = 150;

// Elemento HTML para búsqueda de un Pokémon
const search = document.getElementById("search");

// Elemento HTML del formulario de búsqueda
const form = document.getElementById("form");

// Función asincrónica para obtener información de los pokemones
const fetchPokemons = async () => {
    // Itera a través de los números de los pokemones
    for (let i = 1; i <= pokemons_number; i++) {
        await getAllPokemon(i); // Obtiene información de un Pokémon específico
    }
    createPokemonCards(); // Crea tarjetas para cada Pokémon
};

// Función para eliminar los elementos de los pokemones
const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for (let i = 0; i < pokemonEls.length; i++) {
        const pokemonEl = pokemonEls[i];
        removablePokemons.push(pokemonEl);
    }
    removablePokemons.forEach((remPoke) => remPoke.remove());
};

// Función para obtener información de un Pokémon por su nombre
const getPokemon = (name) => {
    const searchPokemons = pokemons.filter((poke) => poke.name === name.toLowerCase());
    if (searchPokemons.length > 0) {
        removePokemon();
        searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
    } else {
        alert('Pokemon not found!');
    }
};

// Función asincrónica para obtener información de un Pokémon por su ID
const getAllPokemon = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    pokemons.push(pokemon);
}

// Función para crear tarjetas de Pokémon
function createPokemonCards() {
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

// Función para crear una tarjeta de un Pokémon específico
function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    // Obtener tipos de Pokémon
    const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    // Obtener estadísticas del Pokémon
    const poke_stat = pokemon.stats.map((el) => el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map((el) => el.base_stat);
    const base_stat = base_value.slice(0, 3)
    const stat = stats.map((stat, index) => {
        return `<li class="names">${stat}: ${base_stat[index]}</li>`;
    }).join("");

    // Contenido de la tarjeta del Pokémon
    const pokeInnerHTML =
        `<div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
        </div>

        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${poke_types}</span></small>
        </div>

        <div class="stats">
            <h2>Stats</h2>
            <div class="flex">
                <ul>${stat}</ul>
            </div>
        </div>
        `;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl); // Agrega la tarjeta del Pokémon al contenedor
};

// Evento al enviar el formulario de búsqueda
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.toLowerCase();
    if (searchTerm) {
        getPokemon(searchTerm); // Obtiene el Pokémon por el nombre proporcionado
        search.value = "";
    } else {
        alert('Please enter a Pokemon name.');
    }
});

// Inicializa la obtención de información de los pokemones
fetchPokemons();

import searchPokemonsByIdOrName from "./search-pokemons-by-id-or-name.js";

const d = document;

export default function pokemonSearch(pokemonSearch, buttonBar, pokemons) {
    const $pokemonSearch = d.getElementById(pokemonSearch),
    $buttonBar = d.getElementById(buttonBar),
    $pokemons = d.querySelector(pokemons);

    $pokemonSearch.addEventListener("click", () => {
        $buttonBar.innerHTML = "";

        $pokemons.innerHTML = "";

        $buttonBar.classList.remove("cg-1-3-rem");

        $buttonBar.innerHTML = `
            <input class="border-sections pd-x-0-5rem pd-y-1rem" id="write-name-id" placeholder="Enter pokemon's name or id" type="text">
            <button class="bg-color-white search" id="search">Search</button>
        `;

        searchPokemonsByIdOrName("write-name-id", "search", ".pokemons");
    });
}
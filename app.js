import generatePokemonOptionsButtonBar from "./generate-pokemon-options-button-bar.js";
import pokemonByType from "./pokemon-by-type.js";
import pokemonSearch from "./pokemon-search.js";
import searchPokemonsById from "./search-pokemons-by-id.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
    generatePokemonOptionsButtonBar("button-bar", [
        {
            backgroundColor: "var(--blue-color)",
            backgroundHoverColor: "var(--blue-alpha-color)",
            color: "var(--white-color)"
        },
        {
            backgroundColor: "var(--gray-color)",
            backgroundHoverColor: "var(--gray-alpha-color)",
            color: "var(--white-color)"
        },
        {
            backgroundColor: "var(--green-color)",
            backgroundHoverColor: "var(--green-alpha-color)",
            color: "var(--white-color)"
        },
        {
            backgroundColor: "var(--red-color)",
            backgroundHoverColor: "var(--red-alpha-color)",
            color: "var(--white-color)"
        },
        {
            backgroundColor: "var(--gold-color)",
            backgroundHoverColor: "var(--gold-alpha-color)",
            color: "var(--black-color)"
        },
        {
            backgroundColor: "var(--aquamarine-color)",
            backgroundHoverColor: "var(--aquamarine-alpha-color)",
            color: "var(--black-color)"
        },
        {
            backgroundColor: "var(--white-color)",
            backgroundHoverColor: "var(--white-alpha-color)",
            color: "var(--black-color)"
        },
        {
            backgroundColor: "var(--black-color)",
            backgroundHoverColor: "var(--black-alpha-second-color)",
            color: "var(--white-color)"
        }
    ]);
    searchPokemonsById(".pokemons");
    pokemonByType("pokemon-by-type", "button-bar", ".pokemons");
    pokemonSearch("pokemon-search", "button-bar", ".pokemons");
});
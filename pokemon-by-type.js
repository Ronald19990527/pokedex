import generatePokemonOptionsButtonBar from "./generate-pokemon-options-button-bar.js";

const d = document;

export default function pokemonByType(pokemonByType, buttonBar, pokemons) {
    const $pokemonByType = d.getElementById(pokemonByType),
    $buttonBar = d.getElementById(buttonBar),
    $pokemons = d.querySelector(pokemons);

    $pokemonByType.addEventListener("click", () => {
        d.getElementById("pokemon-by-type").classList.add("active");
        d.getElementById("primitive-pokemon-by-type").classList.remove("active");
        d.getElementById("pokemon-search").classList.remove("active");

        $buttonBar.innerHTML = "";

        $pokemons.innerHTML = "";

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
    })
}
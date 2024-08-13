const d = document;

export default function searchPokemonsByIdOrName(writeNameId, search, pokemons) {
    const $writeNameId = d.getElementById(writeNameId),
    $search = d.getElementById(search),
    $pokemons = d.querySelector(pokemons);

    $search.addEventListener("click", () => {
        if ($writeNameId.value !== "") getDataPokemon($writeNameId.value);
        else $pokemons.innerHTML = `
                <p>First enter pokemon's name or id</p>
                <img src="sticker-png-pikachu-i-choose-you-sad-icon-thumbnail.png" alt="Not found pokemon">
            `;
        console.log($writeNameId.value);
    });

    async function getDataPokemon(pokemon) {}
}
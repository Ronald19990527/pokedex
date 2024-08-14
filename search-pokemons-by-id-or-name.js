const d = document;

export default function searchPokemonsByIdOrName(writeNameId, search, pokemons) {
    const $writeNameId = d.getElementById(writeNameId),
    $search = d.getElementById(search),
    $pokemons = d.querySelector(pokemons);

    $search.addEventListener("click", () => {
        $pokemons.classList.remove("flex-row-start");

        if ($writeNameId.value !== "") getDataPokemon($writeNameId.value);
        else {
            $pokemons.innerHTML = `
                <article style="background-color: var(--black-color); color: var(--white-color); text-align: center;">
                    <h2><i>First enter pokemon's name or id</i></h2>
                    <img alt="Not found pokemon" class="w-h-max" src="adesivi-poke-ball---pokemon.jpg">
                </article>
            `;
        }
    });

    async function getDataPokemon(pokemon) {
        try {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`),
            json = await res.json(),
            types = [];

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            json.types.forEach((el) => {
                console.log(el);

                types.push(el.type.name);
            });

            $pokemons.innerHTML = `
                <article class="align-items-center flex-row-start">
                    <div>
                        <img src=${json.sprites.other.home.front_default ? json.sprites.other.home.front_default : "adesivi-poke-ball---pokemon.jpg"}>
                    </div>
                    <div>
                        <h2>${json.name}</h2>
                        <h3>N.°${json.id}</h3>
                        <div>
                            <h5>Data</h5>
                            <div class="flex-row-start">
                                <div>
                                    <h4>Height</h4>
                                    <small>${json.height} m</small>
                                    <h4>Types</h4>
                                    ${types}
                                </div>
                                <div>
                                    <h4>Weight</h4>
                                    <small>${json.weight} kg</small>
                                    <h4>Sound</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            `;

            console.log(json);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            console.log(`Error ${err.status}: ${message}`);

            $pokemons.innerHTML = `
                <article style="background-color: var(--black-color); color: var(--white-color); text-align: center;">
                    <h2><i>Not found pokemon with these specifications</i></h2>
                    <img alt="Not found pokemon" class="w-h-max" src="adesivi-poke-ball---pokemon.jpg">
                </article>
            `;
        }
    }
}
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
            types = ``,
            typesCount = 0;

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            json.types.forEach((el) => {
                typesCount++;

                types += `<small class="${typesCount % 2 !== 0 ? "bg-color-blue" : "bg-color-gray"} border-radios-3rem color-white pd-0-1rem">${el.type.name}</small> `;
            });

            $pokemons.innerHTML = `
                <article class="align-items-center border-sections flex-row-start justify-center pokemon-card">
                    <div class="max-width-15rem">
                        <img src=${json.sprites.other.home.front_default ? json.sprites.other.home.front_default : "adesivi-poke-ball---pokemon.jpg"}>
                    </div>
                    <div class="fb-60-percent">
                        <h2>${json.name}</h2>
                        <h3 class="color-gray">N.°${json.id}</h3>
                        <div class="border-aquamarine mg-top-1-5rem pd-0-5rem">
                            <h5 class="bg-color-white-alpha-second color-gray">Data</h5>
                            <div class="flex-row-start">
                                <div class="flex-grow-1">
                                    <h4 class="mg-y-0-5rem">Height</h4>
                                    <small>${json.height} m</small>
                                    <h4 class="mg-y-0-5rem">Types</h4>
                                    ${types}
                                </div>
                                <div class="flex-grow-1">
                                    <h4 class="mg-y-0-5rem">Weight</h4>
                                    <small>${json.weight} kg</small>
                                    <h4 class="mg-y-0-5rem">Sound</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        } catch (err) {
            $pokemons.innerHTML = `
                <article style="background-color: var(--black-color); color: var(--white-color); text-align: center;">
                    <h2><i>Not found pokemon with these specifications</i></h2>
                    <img alt="Not found pokemon" class="w-h-max" src="adesivi-poke-ball---pokemon.jpg">
                </article>
            `;
        } finally {
        }
    }
}
const d = document;

export default function searchPokemonsById(pokemons) {
    const $pokemons = d.querySelector(pokemons),
    $fragment = d.createDocumentFragment();

    d.addEventListener("click", e => {
        if (e.target.matches(".search-pokemons")) getDataPokemons(e.target.innerText);
    });

    async function getDataPokemons(type) {
        try {
            const $loader = d.createElement("img");
            let res = await fetch(`https://pokeapi.co/api/v2/type/${type}/`),
            json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            if (!$pokemons.classList.contains("flex-row-start")) $pokemons.classList.add("flex-row-start");

            $fragment.innerHTML = "";
            $pokemons.innerHTML = "";

            json.pokemon.forEach(async (el) => getPokemonInParticular(el.pokemon.url));

            $loader.setAttribute("src", "oval.svg");
            $loader.setAttribute("alt", "loader");

            $pokemons.appendChild($fragment);

            $pokemons.innerHTML = "";

            $pokemons.appendChild($loader);

            setTimeout(() => {
                $fragment.innerHTML = "";
                $pokemons.innerHTML = "";

                json.pokemon.forEach(async (el) => getPokemonInParticular(el.pokemon.url));

                $pokemons.appendChild($fragment);
            }, 1000);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $pokemons.innerHTML = `Error ${err.status}: ${message}`;
        } finally {
            console.log("Esto se ejecutará independiente del try... catch");
        }
    }

    async function getPokemonInParticular(pokemon) {
        try {
            let res = await fetch(pokemon),
            json = await res.json();
    
            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            const $card = d.createElement("article"),
            $image = d.createElement("img"),
            $pokemonName = d.createElement("h3"),
            $abilities = d.createElement("h5"),
            $abilitiesList = d.createElement("ul");

            if (json.sprites.other.home.front_default) $image.setAttribute("src", json.sprites.other.home.front_default);
            else $image.setAttribute("src", "adesivi-poke-ball---pokemon.jpg");
            $pokemonName.classList.add("mg-bottom-1rem");
            $pokemonName.classList.add("pd-x-0-5rem");
            $abilities.classList.add("mg-bottom-1rem");
            $abilities.classList.add("pd-x-0-5rem");
            if (json.name) $image.setAttribute("alt", json.name);
            $pokemonName.textContent = json.name;
            $abilities.textContent = "Abilities";
            json.abilities.forEach((el) => {
                const $li = d.createElement("li");

                $li.classList.add("pd-y-0-5rem");
                $li.innerHTML = `<small class="pd-x-0-5rem">${el.ability.name}</small>`;

                $abilitiesList.appendChild($li);
            });

            $card.appendChild($image);
            $card.appendChild($pokemonName);
            $card.appendChild($abilities);
            $card.appendChild($abilitiesList);
            $card.classList.add("card");
            $card.classList.add("pd-x-0-5rem");

            $fragment.appendChild($card);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $pokemons.innerHTML = `Error ${err.status}: ${message}`;
        } finally {
            console.log("Esto se ejecutará independiente del try... catch");
        }
    }
}
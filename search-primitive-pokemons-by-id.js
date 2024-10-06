import generatePokemonOptionsButtonBar from "./generate-pokemon-options-button-bar.js";
import showEvolutions from "./show-evolutions.js";

const d = document;

export default function searchPrimitivePokemonsById(pokemons, primitivePokemonByType, buttonBar) {
    const $pokemons = d.querySelector(pokemons),
    $buttonBar = d.getElementById(buttonBar),
    $primitivePokemonByType = d.getElementById(primitivePokemonByType),
    $fragment = d.createDocumentFragment();

    $primitivePokemonByType.addEventListener("click", () => {
        if (d.getElementById("pokemon-search").classList.contains("active")) {
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
        }

        d.getElementById("pokemon-by-type").classList.remove("active");
        d.getElementById("primitive-pokemon-by-type").classList.add("active");
        d.getElementById("pokemon-search").classList.remove("active");

        d.addEventListener("click", e => {
            if (e.target.matches(".search-pokemons") && d.getElementById("primitive-pokemon-by-type").classList.contains("active")) getDataPokemons(e.target.innerText);
        });
    
        d.addEventListener("keydown", e => {
            if (e.key === "Enter")
                d.querySelectorAll(".search-pokemons").forEach(type => {
                    if (type.classList.contains("active") && d.getElementById("primitive-pokemon-by-type").classList.contains("active")) getDataPokemons(type.innerText);
                });
        })

        async function getDataPokemons(type) {
            try {
                const $loader = d.createElement("img");
                let res = await fetch(`https://pokeapi.co/api/v2/type/${type}/`),
                json = await res.json();

                if (!res.ok) throw {};

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
                }, 5000);
            } catch (err) {
                $pokemons.classList.remove("flex-row-start");
    
                $pokemons.innerHTML = `
                    <article style="background-color: var(--black-color); color: var(--white-color); text-align: center;">
                        <h2><i>Not found pokemon with these specifications</i></h2>
                        <img alt="Not found pokemon" class="w-h-max" src="adesivi-poke-ball---pokemon.jpg">
                    </article>
                `;
            } finally {
            }
        }

        async function getPokemonInParticular(pokemon) {
            try {
                let res1 = await fetch(pokemon),
                json1 = await res1.json(),
                res2 = await fetch(json1.species.url),
                json2 = await res2.json(),
                res4 = await fetch(json2.evolution_chain.url),
                json4 = await res4.json();

                if (!res1.ok || !res2.ok) throw {};

                if (json2.evolves_from_species === null) {
                    let res3 = await fetch(json2.varieties[0].pokemon.url),
                    json3 = await res3.json();

                    const $card = d.createElement("article"),
                    $image = d.createElement("img"),
                    $pokemonName = d.createElement("h3"),
                    $abilities = d.createElement("h5"),
                    $abilitiesList = d.createElement("ul"),
                    $buttonAudio = d.createElement("button"),
                    $buttonEvolutions = d.createElement("button");
        
                    if (json3.sprites.other.home.front_default) $image.setAttribute("src", json3.sprites.other.home.front_default);
                    else $image.setAttribute("src", "adesivi-poke-ball---pokemon.jpg");
                    $pokemonName.classList.add("mg-bottom-1rem");
                    $pokemonName.classList.add("pd-x-0-5rem");
                    $abilities.classList.add("mg-bottom-1rem");
                    $abilities.classList.add("pd-x-0-5rem");
                    $buttonAudio.classList.add("bg-color-gray", "border-radios-0-5rem", "button-play", "mg-bottom-1rem", "pd-0-5rem");
                    $buttonAudio.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--white-color)" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        </svg>
                        <small class="color-white">Play</i></small>
                    `;
                    $buttonEvolutions.classList.add("bg-color-gold", "border-radios-0-5rem", "button-play", "color-white", "mg-bottom-1rem", "pd-0-5rem");
                    $buttonEvolutions.innerHTML = `Show Evolutions`;
                    if (json3.name) $image.setAttribute("alt", json3.name);
                    $pokemonName.textContent = json3.name;
                    $abilities.textContent = "Abilities";
                    json3.abilities.forEach((el) => {
                        const $li = d.createElement("li");
        
                        $li.classList.add("pd-y-0-5rem");
                        $li.innerHTML = `<small class="pd-x-0-5rem">${el.ability.name}</small>`;
        
                        $abilitiesList.appendChild($li);
                    });
        
                    $card.appendChild($image);
                    $card.appendChild($pokemonName);
                    $card.appendChild($abilities);
                    $card.appendChild($abilitiesList);
                    $card.appendChild($buttonAudio);
                    $card.appendChild($buttonEvolutions);
                    $card.classList.add("card");
                    $card.classList.add("pd-x-0-5rem");
        
                    $fragment.appendChild($card);

                    let pokemonSound = new Audio(json3.cries.latest ? json3.cries.latest : json3.cries.legacy);

                    $buttonAudio.addEventListener("click", () => {
                        pokemonSound.play();
                    });

                    $buttonEvolutions.addEventListener("click", (e) => {
                        showEvolutions(json4.id)
                    });
                }
            } catch (err) {
                $pokemons.classList.remove("flex-row-start");

                $pokemons.innerHTML = `
                    <article style="background-color: var(--black-color); color: var(--white-color); text-align: center;">
                        <h2><i>Not found pokemon with these specifications</i></h2>
                        <img alt="Not found pokemon" class="w-h-max" src="adesivi-poke-ball---pokemon.jpg">
                    </article>
                `;
            } finally {
            }
        }
    });
}
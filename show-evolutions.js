const d = document;

export default function showEvolutions(id) {
    const $modalWindowContainer = d.createElement("section"),
    $buttonClose = d.createElement("button"),
    $fragment = d.createDocumentFragment(),
    $body = d.querySelector("body");

    async function getEvolutions() {
        try {
            let res1 = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`),
            json1 = await res1.json(),
            res2,
            json2,
            res3,
            json3;
            if (json1.chain.evolves_to.length !== 0) {
                res2 = await fetch(json1.chain.evolves_to[0].species.url);
                json2 = await res2.json();
                res3 = await fetch(json2.varieties[0].pokemon.url);
                json3 = await res3.json();
            }
            let res4,
            json4,
            res5,
            json5;
            if (json1.chain.evolves_to[0].evolves_to.length !== 0) {
                res4 = await fetch(json1.chain.evolves_to[0].evolves_to[0].species.url);
                json4 = await res4.json();
                res5 = await fetch(json4.varieties[0].pokemon.url);
                json5 = await res5.json();
            }

            const $pokemonEvolutions = d.createElement("div");

            const createPokemonCard = function(pokemonData) {
                const $card = d.createElement("article"),
                $image = d.createElement("img"),
                $pokemonName = d.createElement("h3"),
                $abilities = d.createElement("h5"),
                $abilitiesList = d.createElement("ul"),
                $buttonAudio = d.createElement("button");

                pokemonData.sprites.other.home.front_default ? $image.setAttribute("src", pokemonData.sprites.other.home.front_default) : $image.setAttribute("src", "adesivi-poke-ball---pokemon.jpg");
                $pokemonName.classList.add("mg-bottom-1rem");
                $pokemonName.classList.add("pd-x-0-5rem");
                $abilities.classList.add("mg-bottom-1rem");
                $abilities.classList.add("pd-x-0-5rem");
                $buttonAudio.classList.add("bg-color-gray", "border-radios-0-5rem", "button-play", "mg-bottom-1rem", "pd-0-5rem");
                $buttonAudio.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--white-color)" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                    </svg>
                    <small class="color-white">Play</small>
                `;
                if (pokemonData.name) {
                    $image.setAttribute("alt", pokemonData.name);
                    $pokemonName.textContent = pokemonData.name;
                }
                $abilities.textContent = "Abilities";
                pokemonData.abilities.forEach((el) => {
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
                $card.classList.add("card");
                $card.classList.add("pd-x-0-5rem");
                $card.classList.add("flex-grow-1", "bg-color-white");

                $pokemonEvolutions.appendChild($card);

                let pokemonSound = new Audio(pokemonData.cries.latest ? pokemonData.cries.latest : pokemonData.cries.legacy);

                $buttonAudio.addEventListener("click", () => {
                    pokemonSound.play();
                });
            }

            if (json3) createPokemonCard(json3);

            if (json5) createPokemonCard(json5);

            $buttonClose.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            `;
            $buttonClose.classList.add("button-close");
            $pokemonEvolutions.classList.add("flex-row-start", "pd-1rem", "bg-color-blue", "pokemon-evolution");
            $pokemonEvolutions.children.length === 2 ? $pokemonEvolutions.classList.add("max-width-40rem") : $pokemonEvolutions.classList.add("max-width-25rem");
            $modalWindowContainer.classList.add("modal-window-container");

            $pokemonEvolutions.appendChild($buttonClose);
            $modalWindowContainer.appendChild($pokemonEvolutions);
            $fragment.appendChild($modalWindowContainer);
            $body.appendChild($fragment);

            d.addEventListener("click", (e) => {
                if (e.target.matches(".modal-window-container") || e.target.matches(".button-close *")) d.querySelector(".modal-window-container").remove();
            });
        } catch (error) { 
            const $modalWindowContainer = d.createElement("section"),
            $pokemonEvolutions = d.createElement("div"),
            $imageError = d.createElement("img"),
            $errorMessage = d.createElement("h1"),
            $fragment = d.createDocumentFragment(),
            $body = d.querySelector("body");

            $errorMessage.classList.add("errorMessage", "text-align-center");
            $errorMessage.textContent = "Not Found Pokemons";
            $imageError.setAttribute("src", "adesivi-poke-ball---pokemon.jpg");
            $imageError.setAttribute("alt", "error");
            $pokemonEvolutions.classList.add("error", "pokemon-evolution");
            $buttonClose.classList.add("button-close");
            $buttonClose.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            `;

            $pokemonEvolutions.appendChild($errorMessage);
            $pokemonEvolutions.appendChild($imageError);
            $pokemonEvolutions.appendChild($buttonClose);

            $modalWindowContainer.classList.add("modal-window-container");
            $modalWindowContainer.appendChild($pokemonEvolutions);
            $fragment.appendChild($modalWindowContainer);
            $body.appendChild($fragment);

            d.addEventListener("click", (e) => {
                if (e.target.matches(".modal-window-container") || e.target.matches(".button-close *")) d.querySelector(".modal-window-container").remove();
            });
        } finally {}
    }

    getEvolutions();
}
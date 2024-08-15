const d = document;

export default function generatePokemonOptionsButtonBar(buttonBar, buttonStyles) {
    const $buttonBar = d.getElementById(buttonBar),
    $fragment = d.createDocumentFragment();

    $buttonBar.innerHTML = "";

    if (!$buttonBar.classList.contains("cg-1-3-rem")) $buttonBar.classList.add("cg-1-3-rem")

    async function getDataTypesPokemons() {
        try {
            let res = await fetch("https://pokeapi.co/api/v2/type/"),
            json = await res.json(),
            iteratorArraysStyles = 0;

            if (!res.ok) throw { status: res.status, statusText: res.statusText };

            json.results.forEach((el) => {
                const $button = document.createElement("button");

                $button.style.setProperty("--background-color", buttonStyles[iteratorArraysStyles].backgroundColor);
                $button.style.setProperty("--background-hover-color", buttonStyles[iteratorArraysStyles].backgroundHoverColor);
                $button.style.setProperty("--color", buttonStyles[iteratorArraysStyles].color);
                $button.classList.add("button");
                $button.classList.add("search-pokemons");
                $button.textContent = el.name;
                $button.innerHTML = `${el.name}`;
                $fragment.appendChild($button);

                iteratorArraysStyles === 7 ? iteratorArraysStyles = 0 : iteratorArraysStyles++;
            });

            $buttonBar.appendChild($fragment);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $buttonBar.innerHTML = `Error ${err.status}: ${message}`;
        } finally {
        }
    }

    getDataTypesPokemons();
}
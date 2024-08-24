const d = document;

export default function selectPokemonsByCursors(buttons) {
    buttons[0].classList.add("active");

    d.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") right();
        else if (e.key === "ArrowLeft") left();
    });

    function right() {
        let active = false;

        buttons.forEach((button) => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");

                active = true;
            } else if (active) {
                button.classList.add("active");

                active = false;
            }
        });
    }

    function left() {
        let active = false;

        buttons.forEach((button, index) => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");

                active = true;
            } else if (active) {
                buttons[index - 2].classList.add("active");

                active = false;
            }
        });
    }
}
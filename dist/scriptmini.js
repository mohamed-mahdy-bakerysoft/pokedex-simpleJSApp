let pokemonRepository = (function () {
    let e = [];
    function t(t) {
        "object" == typeof t && "name" in t
            ? e.push(t)
            : console.log("pokemon is not correct");
    }
    function n() {
        return e;
    }
    function i(e) {
        return fetch(e.detailsUrl)
            .then((e) => e.json())
            .then((t) => {
                (e.imageUrl = t.sprites.front_default),
                    (e.backImageUrl = t.sprites.back_default),
                    (e.height = t.height),
                    (e.weight = t.weight),
                    (e.abilities = t.abilities.map((e) => e.ability.name));
            })
            .catch((e) => console.error(e));
    }
    return {
        getAll: n,
        add: t,
        addListItem: function e(t) {
            let n = document.querySelector(".pokemon-list"),
                l = document.createElement("li"),
                o = document.createElement("button");
            (o.innerText = t.name),
                l.classList.add("list-group-item", "col-12", "col-md-4"),
                o.classList.add("btn", "btn-primary", "btn-block"),
                o.setAttribute("data-toggle", "modal"),
                o.setAttribute("data-target", "#pokeModal"),
                l.appendChild(o),
                n.appendChild(l),
                o.addEventListener("click", () =>
                    (function e(t) {
                        i(t).then(() => {
                            let e = document.querySelector(".modal-body"),
                                n = document.querySelector(".modal-title");
                            (n.innerHTML = ""), (e.innerHTML = "");
                            let i = document.createElement("h1");
                            i.innerText = t.name;
                            let l = document.createElement("p");
                            l.innerText = "Height: " + t.height;
                            let o = document.createElement("p");
                            o.innerText = "Weight: " + t.weight;
                            let a = document.createElement("p");
                            a.innerText = "Abilities: " + t.abilities.join(", ");
                            let r = document.createElement("img");
                            (r.src = t.imageUrl),
                                (r.style.height = "150px"),
                                (r.style.width = "150px");
                            let s = document.createElement("img");
                            (s.src = t.backImageUrl),
                                (s.style.height = "150px"),
                                (s.style.width = "150px"),
                                n.appendChild(i),
                                e.appendChild(r),
                                e.appendChild(s),
                                e.appendChild(l),
                                e.appendChild(o),
                                e.appendChild(a);
                        });
                    })(t)
                );
        },
        loadList: function e() {
            return fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
                .then((e) => e.json())
                .then((e) => {
                    e.results.forEach((e) => {
                        t({ name: e.name, detailsUrl: e.url });
                    });
                })
                .catch((e) => console.error(e));
        },
        loadDetails: i,
        searchPokemon: function e(t) {
            let n = t.target.value.toLowerCase();
            document.querySelectorAll(".pokemon-list li").forEach((e) => {
                e.textContent.toLowerCase().includes(n)
                    ? (e.style.display = "list-item")
                    : (e.style.display = "none");
            });
        },
    };
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
    });
}),
    document
        .getElementById("mySearch")
        .addEventListener("input", pokemonRepository.searchPokemon);


let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

    // Function to add a Pokémon to the repository
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    // Function to get all Pokémon in the repository
    function getAll() {
        return pokemonList;
    }

    // Function to create a list item and display a Pokémon
    function addListItem(pokemon) {
        let list = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");

        button.innerText = pokemon.name;
        listItem.classList.add("list-group-item", "col-12", "col-md-4");
        button.classList.add("btn", "btn-primary", "btn-block");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokeModal");

        listItem.appendChild(button);
        list.appendChild(listItem);

        // Add event listener for showing Pokémon details
        button.addEventListener("click", () => showDetails(pokemon));
    }

    // Function to load the list of Pokémon from the API
    function loadList() {
        return fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach((pokemon) => {
                    add({ name: pokemon.name, detailsUrl: pokemon.url });
                });
            })
            .catch((error) => console.error(error));
    }

    // Function to fetch details of a Pokémon
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then((response) => response.json())
            .then((data) => {
                pokemon.imageUrl = data.sprites.front_default;
                pokemon.backImageUrl = data.sprites.back_default; // Back image
                pokemon.height = data.height;
                pokemon.weight = data.weight;
                pokemon.abilities = data.abilities.map(ability => ability.ability.name); // Extracting ability names using map function
            })

            .catch((error) => console.error(error));
    }

    // Function to show details of a Pokémon in the modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            let modalBody = document.querySelector(".modal-body");
            let modalTitle = document.querySelector(".modal-title");

            modalTitle.innerHTML = "";
            modalBody.innerHTML = "";

            let title = document.createElement("h1");
            title.innerText = pokemon.name;

            let height = document.createElement("p");
            height.innerText = "Height: " + pokemon.height;
            let weight = document.createElement("p");
            weight.innerText = "Weight: " + pokemon.weight;
            
            // Displaying abilities
            let abilities = document.createElement("p");
            abilities.innerText = "Abilities: " + pokemon.abilities.join(", "); // join function to display list of abilities
            
            //displaying Fronz and Back Images
            let image = document.createElement("img");
            image.src = pokemon.imageUrl;
            image.style.height = "150px";
            image.style.width = "150px";
            
            let backImage = document.createElement("img");
            backImage.src = pokemon.backImageUrl;
            backImage.style.height = "150px";
            backImage.style.width = "150px";

            modalTitle.appendChild(title);
            modalBody.appendChild(image);
            modalBody.appendChild(backImage);
            modalBody.appendChild(height);
            modalBody.appendChild(weight);
            modalBody.appendChild(abilities);
        });
    }

    // Function to search Pokémon by name
    function searchPokemon(event) {
        let searchQuery = event.target.value.toLowerCase();
        let listItems = document.querySelectorAll(".pokemon-list li");

        listItems.forEach((item) => {
            let pokemonName = item.textContent.toLowerCase();
            if (pokemonName.includes(searchQuery)) {
                item.style.display = "list-item";
            } else {
                item.style.display = "none";
            }
        });
    }

    // Exposing the public API
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        searchPokemon: searchPokemon,
    };
})();

// Load the list of Pokémon and display them
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Add the search functionality
document
    .getElementById("mySearch")
    .addEventListener("input", pokemonRepository.searchPokemon);

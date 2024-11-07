//used API and added all the elements into an array
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
        } else {
        console.log("pokemon is not correct");
        }
    }

    function getAll() {
		return pokemonList;
	}
    //created list of buttons using DOM
    function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listpokemon = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
        
        button.addEventListener('click', function() {
        showDetails(pokemon); 
        });

		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
	}

    //loaded the list from array in page in list form on a button
    function loadList() {
    return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
                json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    //funtion to load details 
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //function to show details in modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(
            pokemon.name, 
            'Height: ' + pokemon.height,
            pokemon.imageUrl
            );
        });
    }

//created modal and showd on the click
function showModal(title, text, img) {
    
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    
    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    let pokeName = document.createElement('h1');
    pokeName.innerText = title;

    let pokeDetails = document.createElement('p');
    pokeDetails.innerText = text;

    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", img);
    pokeImg.setAttribute("width", "300");
    pokeImg.setAttribute("height", "210");

    modal.appendChild(closeButton);
    modal.appendChild(pokeName);
    modal.appendChild(pokeDetails);
    modal.appendChild(pokeImg);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}
//function to hide modal on close 
function hideModal() {
    modalContainer.classList.remove('is-visible');
}
//close clicking outside
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
});

return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
	};

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

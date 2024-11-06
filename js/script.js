/*alert('Hello World');

let favoriteFood = 'Chicken Biryani';
document.write(favoriteFood);*/
/*let message = "";

//for loop to display list on the page
for(let i= 0; i < pokemonList.length; i++){
    if(pokemonList[i].height > 1){
        message = "- Wow, that's big!";
    } else {
        message = "";
    }
    document.write(
        `${pokemonList[i].name} (height: ${pokemonList[i].height}) 
        ${message} 
        <br>`
    );
} */

//Exercise 1.5 solution part 2 IIFE
let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 1, types: ['grass', 'poison'] },
        { name: 'Venusaur', height: 2, types: ['grass', 'poison'] },
        { name:'Charmander', height: 0.6 , types:['fire'] },
        { name:'Butterfree', height: 1.1 , types:['bug' , 'flying'] },
        { name: 'Nidoking', height: 1.4, types: ['ground', 'poison'] },
    ];

    /*function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };*/

    function getAll() {
		return pokemonList;
	}

	function add(pokemon) {
		{pokemonList.push(pokemon);}
	}

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

	function showDetails(pokemon) {
		console.log(pokemon)
	}

	return {
		add: add,
		getAll: getAll,
		showDetails: showDetails,
		addListItem: addListItem,
	};

})();


/*let pokemons = pokemonRepository.getAll();

//Exercise 1.5 solution part 1
pokemons.forEach(pokemon => {
    if(pokemon.height >= 1){
        document.write('Wow that is big <br><br>');
    }
    document.write(pokemon.name + ' | ' + pokemon.height + ' | ' + pokemon.types + '<br>');
});*/

pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});

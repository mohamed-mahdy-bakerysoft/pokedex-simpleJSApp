/*alert('Hello World');

let favoriteFood = 'Chicken Biryani';
document.write(favoriteFood);*/

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['grass', 'poison']
    },
    {
        name: 'Ivysaur',
        height: 1,
        types: ['grass', 'poison']

    },
    {
        name: 'Venusaur',
        height: 2,
        types: ['grass', 'poison']

    },
    {
        name:'Charmander',
        height: 0.6 ,
        types:['fire']
    },
    {
        name:'Butterfree',
        height: 1.1 ,
        types:['bug' , 'flying']
    },
    {
        name: 'Nidoking',
        height: 1.4,
        types: ['ground', 'poison']
    }
];

let message = "";

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
}
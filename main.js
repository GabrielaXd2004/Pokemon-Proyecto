const contenedorPokemon = document.querySelector('#contenedorPokemon');

document.addEventListener('DOMContentLoaded', () => {
    nombresPokemones()
});

function cambiarPaginaInicio() {
    document.location.href = 'index.html';
}

function cambiarPaginaPokedex() {
    document.location.href = 'pokedex.html';
}

async function nombresPokemones() { /* LLAMA LOS NOMBRES DE LOS POKEMONES */
    // Limite 110
    const key = `https://pokeapi.co/api/v2/pokemon/?limit=12`; 

    // fetch(key)
    //     .then(respuesta => respuesta.json())
    //     .then(resultado => mostrarPokemonHTML(resultado.results));

    try {
        const respuesta = await fetch(key);
        const resultado = await respuesta.json();
        mostrarPokemonHTML(resultado.results)
    } catch (error) {
        console.log(error);
    }
}

async function infoPokemones(pokemon) { /* LLAMA LA INFO DE CADA POKEMON */
    
    const key = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    
    // fetch(key) 
    // .then( respuesta => respuesta.json())
    // .then( resultado => iterarNameInfo(resultado));
    
    try {
        const respuesta = await fetch(key);
        const resultado = await respuesta.json();
        iterarNameInfo(resultado);
    } catch (error) {
        console.log(error);
    }
}

function mostrarPokemonHTML(nombres) {
    
    // GENERA LA INFO CONECTANDO LOS NOMBRES
    nombres.forEach( nombre => {
        const { name } = nombre;
        infoPokemones(name)
    })
    
}

function iterarNameInfo(datas) {

    const imgOne = datas.sprites.front_default;
    const { name, types, id } = datas;

    cardHTML( name, imgOne, types, id);
}

function cardHTML( nombres, imagen, tipos, id ) {
    const cardDiv = document.createElement('DIV');
    cardDiv.classList.add('p-3','py-2','transition','hover:-translate-y-1', 'hover:scale-100');

    const cardImgDiv = document.createElement('DIV');
    cardImgDiv.classList.add('bg-gray-100','rounded','flex','justify-center','cursor-pointer');

    const img = document.createElement('IMG');
    img.classList.add('w-full');
    img.src = imagen;

    const cardInfoDiv = document.createElement('DIV');
    
    const infoNumero = document.createElement('SPAN');
    infoNumero.classList.add('text-gray-400','font-bold','text-xs','px-2')
    infoNumero.innerHTML = `Nº ${id}`;

    const cardNombreDiv = document.createElement('DIV');
    
    const infoNombre = document.createElement('H1');
    infoNombre.classList.add('text-gray-700','font-bold','text-2xl','capitalize', 'px-2','py-1')
    infoNombre.textContent = nombres;

    const cardTipoDiv = document.createElement('DIV');
    cardTipoDiv.classList.add('grid','grid-cols-3','gap-1','px-2');

    tipos.forEach(tipo => {
        const infoTipos = document.createElement('h1');
        infoTipos.textContent = tipo.type.name;
        infoTipos.classList.add('rounded','text-center','text-[10px]','capitalize', 'text-white','font-bold','py-[2px]');
        switch (tipo.type.name) {
            case 'bug':
                infoTipos.style.backgroundColor = '#729f3f';
                break;
            case 'dragon':
                infoTipos.style.backgroundColor = '#f16e57';
                break;
            case 'electric':
                infoTipos.style.backgroundColor = '#eed535';
                break;
            case 'fairy':
                infoTipos.style.backgroundColor = '#fdb9e9';
                break;
            case 'fighting':
                infoTipos.style.backgroundColor = '#d56723';
                break;
            case 'fire':
                infoTipos.style.backgroundColor = '#fd7d24';
                break;
            case 'flying':
                infoTipos.style.backgroundColor = '#3dc7ef';
                break;
            case 'ghost':
                infoTipos.style.backgroundColor = '#7b62a3';
                break;
            case 'grass':
                infoTipos.style.backgroundColor = '#9bcc50';
                break;
            case 'ground':
                infoTipos.style.backgroundColor = '#ab9842';
                break;
            case 'ice':
                infoTipos.style.backgroundColor = '#51c4e7';
                break;
            case 'normal':
                infoTipos.style.backgroundColor = '#a4acaf';
                break;
            case 'poison':
                infoTipos.style.backgroundColor = '#b97fc9';
                break;
            case 'psychic':
                infoTipos.style.backgroundColor = '#f366b9';
                break;
            case 'rock':
                infoTipos.style.backgroundColor = '#a38c21';
                break;
            case 'steel':
                infoTipos.style.backgroundColor = '#9eb7b8';
                break;
            case 'water':
                infoTipos.style.backgroundColor = '#4592c4';
                break;
            default:
                break;
        }

        cardTipoDiv.appendChild( infoTipos );
    })
    

    cardDiv.appendChild( cardImgDiv )
    cardDiv.appendChild( cardInfoDiv );
    cardImgDiv.appendChild( img );
    cardInfoDiv.appendChild( infoNumero );
    cardInfoDiv.appendChild( cardNombreDiv );
    cardNombreDiv.appendChild( infoNombre );
    cardInfoDiv.appendChild( cardTipoDiv );

    contenedorPokemon.appendChild(cardDiv);
}

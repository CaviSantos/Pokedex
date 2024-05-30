const pokeName = document.querySelector('.poke-name')
const pokeNumber  = document.querySelector('.poke-number')
const pokeGif = document.querySelector('.foto')
const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const buttonAvancar = document.querySelector('.btn-avancar')
const buttonVoltar = document.querySelector('.btn-voltar')
const buttonVerTime = document.querySelector('.btn-adc-time')
const buttonADCTime = document.querySelector('.button1')
const time=[];
const tiraPokemonTime = document.querySelectorAll('.choosed img');
const tipos = document.querySelector('.poke-infos3')
const inputNomeTime = document.querySelector('.nometime')

let seekpokemon = 1;
let posicaoArray =0;


const pokenomes = [`bulbasaur`, `ivysaur`, `venusaur`, `charmander`, `charmeleon`, `charizard`,`squirtle`, `wartortle`, `blastoise`, `caterpie`, `metapod`, `butterfree`,`weedle`, `kakuna`, `beedrill`, `pidgey`, `pidgeotto`, `pidgeot`, `rattata`,
`raticate`, `spearow`, `fearow`, `ekans`, `arbok`, `pikachu`, `raichu`,`sandshrew`, `sandslash`, `nidoran♀`, `nidorina`, `nidoqueen`, `nidoran♂`,`nidorino`, `nidoking`, `clefairy`, `clefable`, `vulpix`, `ninetales`,`jigglypuff`, `wigglytuff`, `zubat`,
`golbat`, `oddish`, `gloom`, `vileplume`,`paras`, `parasect`, `venonat`, `venomoth`, `diglett`, `dugtrio`, `meowth`,`persian`, `psyduck`, `golduck`, `mankey`, `primeape`, `growlithe`, `arcanine`,`poliwag`, `poliwhirl`, `poliwrath`, `abra`, `kadabra`,
`alakazam`, `machop`,`machoke`, `machamp`, `bellsprout`, `weepinbell`, `victreebel`, `tentacool`,`tentacruel`, `geodude`, `graveler`, `golem`, `ponyta`, `rapidash`, `slowpoke`,`slowbro`, `magnemite`, `magneton`, `farfetch'd`, `doduo`, `dodrio`, `seel`,
`dewgong`, `grimer`, `muk`, `shellder`, `cloyster`, `gastly`, `haunter`,`gengar`, `onix`, `drowzee`, `hypno`, `krabby`, `kingler`, `voltorb`, `electrode`,`exeggcute`, `exeggutor`, `cubone`, `marowak`, `hitmonlee`, `hitmonchan`,`lickitung`, `koffing`,
`weezing`, `rhyhorn`, `rhydon`, `chansey`, `tangela`,`kangaskhan`, `horsea`, `seadra`, `goldeen`, `seaking`, `staryu`, `starmie`,`mr. mime`, `scyther`, `jynx`, `electabuzz`, `magmar`, `pinsir`, `tauros`,`magikarp`, `gyarados`, `lapras`, `ditto`, `eevee`,
`vaporeon`, `jolteon`,`flareon`, `porygon`, `omanyte`, `omastar`, `kabuto`, `kabutops`, `aerodactyl`,`snorlax`, `articuno`, `zapdos`, `moltres`, `dratini`, `dragonair`, `dragonite`,`mewtwo`, `mew`];

function isNumeric(str) {
    var er = /^[0-9]+$/;
    return (er.test(str));
}

const findPokemon = async (pokemon) => { 

    if(isNumeric(pokemon) && pokemon<=151){
        const  APIresp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if(APIresp.status === 200){
            const data = await APIresp.json();
            return data;
        }
    }
    if(typeof pokemon=='number' && pokemon <= 151){
        const APIresp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if(APIresp.status === 200){
            const data = await APIresp.json();
            return data;
        }
    }
    if(typeof pokemon == 'string' && pokenomes.includes(pokemon) ){
        const APIresp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        
        if(APIresp.status === 200){
            const data = await APIresp.json();
            return data;
        }
    }
    
    
}

const mostrapokemon = async (pokemon) => {
    const data = await findPokemon(pokemon);

    if (data) {
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        input.value = '';
        seekpokemon = data.id;
        tipos.innerHTML = '';

        if (data.types && data.types.length > 0) {
            if (data.types.length === 1) {
                const tipoElement = document.createElement('span');
                tipoElement.textContent = data.types[0].type.name;
                tipos.appendChild(tipoElement);
            } else if (data.types.length === 2) {
                const tipoElement1 = document.createElement('span');
                tipoElement1.textContent = data.types[0].type.name;
                tipos.appendChild(tipoElement1);

                const hifen = document.createElement('span');
                hifen.textContent = ' - ';
                tipos.appendChild(hifen);

                const tipoElement2 = document.createElement('span');
                tipoElement2.textContent = data.types[1].type.name;
                tipos.appendChild(tipoElement2);
            }
        } else {
            const tipoElement = document.createElement('span');
            tipoElement.textContent = 'Sem tipo';
            tipos.appendChild(tipoElement);
        }

        pokeGif.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    } else {
        pokeName.innerHTML = 'not found';
        pokeGif.src = '';
        pokeNumber.innerHTML = 'not found';
        pokeTipo.innerHTML = '';
    }
}
    

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    mostrapokemon(input.value.toLowerCase());
    input.value = '';
});

mostrapokemon(seekpokemon);

buttonVoltar.addEventListener('click', () =>{
    if(seekpokemon > 1){
        seekpokemon -= 1;
        mostrapokemon(seekpokemon);
    }

});
buttonAvancar.addEventListener('click', () =>{
    if(seekpokemon < 151){
        seekpokemon +=1;
        mostrapokemon(seekpokemon);
    }
});


buttonADCTime.addEventListener('click', () => {
    if (posicaoArray<6) {
        time[posicaoArray]=seekpokemon;
        document.querySelector('.imgP' + posicaoArray).setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${seekpokemon}.png` );
        posicaoArray+=1;
    }
    for (let index = 0; index < 6; index++) {

           
        if (time[index]!=undefined) {


            document.querySelector('.imgP' + index).setAttribute('class', ' hoverTiraPokemon imgP' + index);
            
        }
        
    }

});


tiraPokemonTime.forEach((div, index) => {
    div.addEventListener('click', () => {
        if (time[index] != undefined) {
            time.splice(index, 1);
            posicaoArray--;
            for (let i = 0; i < 6; i++) {
                if (time[i] == undefined) {
                    document.querySelector('.imgP' + i).setAttribute('src', `./src/interrogacao-pokemons.png`);
                    document.querySelector('.imgP' + i).setAttribute('class', 'imgP' + i);
                } else {
                    document.querySelector('.imgP' + i).setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${time[i]}.png`);
                }
            }
        }
    });
});   





document.addEventListener('DOMContentLoaded', () => {
    if (buttonVerTime) {
        buttonVerTime.addEventListener('click', () => {
            const nomeDoTime = inputNomeTime.value;

            if(nomeDoTime.length === 0) {
                alert('Dê um nome ao seu time!');
            }

            else if(time.length < 6){
                alert('complete o seu time!');
            }
            
            else if (nomeDoTime.length !== 0) {
                const timeString = JSON.stringify(time);
                

                window.location.href = `time.html?teamName=${encodeURIComponent(nomeDoTime)}&time=${encodeURIComponent(timeString)}`;
            }
            
            
        });
    }
});











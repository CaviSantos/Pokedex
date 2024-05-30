const pokeName = document.querySelector('.poke-nome')
const pokeNumber  = document.querySelector('.poke-id')



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setTeamName() {
    const teamName = getQueryParam('teamName');
    if (teamName) {
        document.getElementById('displayValue').textContent = decodeURIComponent(teamName);
    }
}
const searchPokemon = async (pokemon)=>{
    const respostaAPI= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (respostaAPI.status === 200) {
        const data = await respostaAPI.json();
        return data;
    }
}


function getTime (){
    const timeString = getQueryParam('time');
    if(timeString){
        const timeArray = JSON.parse(decodeURIComponent(timeString));
        console.log('Time: ', timeArray);

        timeArray.forEach(async(pokemonId, index) => {
            const imgPkm = document.querySelector(`.imgP${index}`);
            const idpkm = document.querySelector(`.poke-id-${index}`);
            const namepkm = document.querySelector(`.poke-nome-${index}`);
            const tipopkm = document.querySelector(`.poke-tipo-${index}`);
            const hppkm = document.querySelector(`.poke-hp-${index}`);
            const ataquepkm = document.querySelector(`.poke-ataque-${index}`);
            const velocidadepkm = document.querySelector(`.poke-velocidade-${index}`);
            const defesapkm = document.querySelector(`.poke-defesa-${index}`);


            if(imgPkm){
                imgPkm.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;
            }

            const pokemonData =  await searchPokemon(pokemonId);
            if(pokemonData){
                if(idpkm){
                    idpkm.textContent = `ID: ${pokemonData.id}`;
                }
                if(namepkm){
                    namepkm.textContent = pokemonData.name;
                }
                if(tipopkm){
                    const tipos = pokemonData.types.map(typeInfo => typeInfo.type.name).join(' | ');
                    tipopkm.textContent = tipos;
                }
                if(hppkm){
                    const hp = pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat;
                    hppkm.textContent = `HP: ${hp}`;
                }
                if(ataquepkm){
                    const ataque = pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat;
                    ataquepkm.textContent = `Ataque: ${ataque}`;
                }
                if(velocidadepkm){
                    const velocidade = pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat;
                    velocidadepkm.textContent = `speed: ${velocidade}`;
                }
                if(defesapkm){
                    const defesa = pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat;
                    defesapkm.textContent = `Força: ${defesa}`;
                }
            }
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    setTeamName();
    getTime();
});



import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: response.data.name,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      })
      setPokemonChosen(true);
    })
      .catch((error) => {
        console.error("Error fetching the Pokémon data:", error);
        setPokemonChosen(false);
      });
  };
  return (
    <div className="App">
      <div className="TitleSection">
        <h2>Pokemon Stats</h2>
        <input type="text" placeholder="Saisissez le nom ....." onChange={(event) => { setPokemonName(event.target.value) }} />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Pokemon no encontrado</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <h3>Species : {pokemon.species}</h3>
            <h3>type : {pokemon.type}</h3>
            <h4>Hp : {pokemon.hp}</h4>
            <h3>Attack : {pokemon.attack}</h3>
            <h3>Defense : {pokemon.defense}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

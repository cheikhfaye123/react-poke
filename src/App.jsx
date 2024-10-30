import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const fetchPokemonList = async () => {
    const response = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const fetchedPokemonList = response.data.results.map((pokemon) => ({
      id: pokemon.name,
      value: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    }));
    setPokemonList(fetchedPokemonList);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemon({
          name: response.data.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
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
        <input
          list="pokemon-list"
          placeholder="Saisissez le nom ....."
          value={pokemonName}
          onChange={(event) => { setPokemonName(event.target.value) }}
        />
        <datalist id="pokemon-list">
          {pokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.value} />
          ))}
        </datalist>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Pokemon no encontrado</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <h3>Species : {pokemon.species}</h3>
            <h3>Type : {pokemon.type}</h3>
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

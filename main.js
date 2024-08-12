import { Pokemon } from "./pokemon.js";
import { random, logAction, createClickCounter } from "./utils.js";
import { pokemons } from "./pokemons.js";

const logs = [
  "[PERSONNAGE #1] remembered something important, but suddenly [PERSONNAGE #2], frightened out of his wits, struck the forearm of the enemy.",
  "[PERSONAGE #1] choked, and for that, [PERSONAGE #2] was startled by a direct knee strike to the forehead of the enemy.",
  "[PERSONAGE #1] forgot himself, but at this time the insolent [PERSONAGE #2], having made a willful decision, silently approached from behind and struck.",
  "[PERSONAGE #1] came to his senses, but suddenly [PERSONAGE #2] accidentally delivered a powerful blow.",
  "[PERSONAGE #1] choked, but at that time, [PERSONAGE #2] reluctantly crushed his opponent's <censored cut> with his fist.",
  "[PERSONAGE #1] was surprised, and [PERSONAGE #2] staggered back and threw a sneaky punch.",
  "[PERSONAGE #1] blew his nose, but suddenly [PERSONAGE #2] delivered a crushing blow.",
  "[PERSONAGE #1] staggered, and suddenly the insolent [PERSONAGE #2] gratuitously kicked at his opponent's leg.",
  "[PERSONAGE #1] got upset as suddenly, unexpectedly [PERSONAGE #2] casually slammed his foot into his opponent's stomach.",
  "[PERSONNAGE #1] was trying to say something, but suddenly, unexpectedly, [PERSONNAGE #2], out of boredom, smashed his opponent's eyebrow."
];
let character, enemy;

const init = () => {
  console.log("Start Game!");

  populatePokemonSelection();

  const playerPokemonSelect = document.getElementById("player-pokemon");
  const enemyPokemonSelect = document.getElementById("enemy-pokemon");

  const updatePokemons = () => {
    const playerPokemon = pokemons.find(
      (p) => p.name === playerPokemonSelect.value
    );
    const enemyPokemon = pokemons.find(
      (p) => p.name === enemyPokemonSelect.value
    );

    character = new Pokemon({
      ...playerPokemon,
      healthId: "health-character",
      progressBarId: "progressbar-character",
    });
    enemy = new Pokemon({
      ...enemyPokemon,
      healthId: "health-enemy",
      progressBarId: "progressbar-enemy",
    });

    character.updatePokemonInfo();
    enemy.updatePokemonInfo();

    updateAttackButtons(character.attacks);
  };

  playerPokemonSelect.addEventListener("change", updatePokemons);
  enemyPokemonSelect.addEventListener("change", updatePokemons);

  updatePokemons();
};

const updateAttackButtons = (attacks) => {
  const buttonsContainer = document.getElementById("attack-buttons");
  buttonsContainer.innerHTML = "";

  attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.textContent = `${attack.name}`;
    button.classList.add("button");
    button.onclick = createAttackHandler(attack);
    buttonsContainer.appendChild(button);
  });
};

const createAttackHandler = (attack) => {
  let counter = attack.maxCount;
  return () => {
    if (counter > 0) {
      const damage = random(attack.minDamage, attack.maxDamage);
      console.log(
        `${character.name} use ${attack.name}, causing damage ${damage}`
      );
      enemy.changeHP(damage, logAction, character.name, logs);
      counter--;
    } else {
      console.log(`Attack ${attack.name} no longer available`);
    }
  };
};

const populatePokemonSelection = () => {
  const playerPokemonSelect = document.getElementById("player-pokemon");
  const enemyPokemonSelect = document.getElementById("enemy-pokemon");

  pokemons.forEach((pokemon) => {
    playerPokemonSelect.add(new Option(pokemon.name, pokemon.name));
    enemyPokemonSelect.add(new Option(pokemon.name, pokemon.name));
  });
};

document.addEventListener("DOMContentLoaded", init);

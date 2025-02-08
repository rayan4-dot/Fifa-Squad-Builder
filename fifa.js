
let squad = [];


window.onload = function() {
  const storedSquad = localStorage.getItem('squad');
  if (storedSquad) {
    squad = JSON.parse(storedSquad);
    displaySquad();
  }
};

function toggleAttributes() {
  const position = document.getElementById("playerPosition").value;
  if (position === "GK") {
    document.getElementById("outfieldAttributes").style.display = "none";
    document.getElementById("goalkeeperAttributes").style.display = "block";
  } else {
    document.getElementById("outfieldAttributes").style.display = "block";
    document.getElementById("goalkeeperAttributes").style.display = "none";
  }
}

function createPlayer() {
  const name = document.getElementById("playerName").value;
  const image = document.getElementById("playerImage").value;
  const position = document.getElementById("playerPosition").value;


  const positionFilled = squad.some(player => player.position === position);
  if (positionFilled) {
    alert(`The position ${position} is already filled.`);
    return;
  }

  let player;

  if (position === "GK") {
    player = {
      name,
      image,
      position,
      diving: parseInt(document.getElementById("playerDiving").value),
      handling: parseInt(document.getElementById("playerHandling").value),
      kicking: parseInt(document.getElementById("playerKicking").value),
      reflexes: parseInt(document.getElementById("playerReflexes").value),
      speed: parseInt(document.getElementById("playerSpeed").value),
      positioning: parseInt(document.getElementById("playerPositioning").value)
    };
  } else {
    player = {
      name,
      image,
      position,
      pace: parseInt(document.getElementById("playerPace").value),
      shooting: parseInt(document.getElementById("playerShoot").value),
      dribbling: parseInt(document.getElementById("playerDribble").value),
      physical: parseInt(document.getElementById("playerPhysic").value)
    };
  }

  squad.push(player);
  saveSquad();
  displaySquad();
  resetForm();
}

function displaySquad() {
  const positions = {
    ST: "ST-card",
    LW: "LW-card",
    RW: "RW-card",
    CM: ["CM-card-1", "CM-card-2", "CM-card-3"],
    LB: "LB-card",
    CB: ["CB-card-1", "CB-card-2"],
    RB: "RB-card",
    GK: "GK-card"
  };


  Object.values(positions).flat().forEach(id => {
    const card = document.getElementById(id);
    card.innerHTML = `<span class="position-label">${id.split('-')[0]}</span>`;
  });

  squad.forEach((player, index) => {
    const cardId = Array.isArray(positions[player.position]) ? positions[player.position].shift() : positions[player.position];
    const playerCard = document.getElementById(cardId);
    playerCard.innerHTML = `
      <img src="${player.image}" alt="${player.name}">
      <div class="name">${player.name}</div>
      <div class="stats">
        ${player.position === "GK" ? `
          <p>DIV ${player.diving} | HAN ${player.handling} | KIC ${player.kicking}</p>
          <p>REF ${player.reflexes} | SPD ${player.speed} | POS ${player.positioning}</p>
        ` : `
          <p>PAC ${player.pace} | SHO ${player.shooting} | DRI ${player.dribbling} | PHY ${player.physical}</p>
        `}
      </div>
      <div class="actions">
        <button class="edit" onclick="updatePlayer(${index})"><i class="fas fa-edit"></i></button>
        <button class="delete" onclick="deletePlayer(${index})"><i class="fas fa-trash-alt"></i></button>
      </div>
      <span class="position-label">${player.position}</span>
    `;
  });
}

function updatePlayer(index) {
  const player = squad[index];
  document.getElementById("playerName").value = player.name;
  document.getElementById("playerImage").value = player.image;
  document.getElementById("playerPosition").value = player.position;
  toggleAttributes();

  if (player.position === "GK") {
    document.getElementById("playerDiving").value = player.diving;
    document.getElementById("playerHandling").value = player.handling;
    document.getElementById("playerKicking").value = player.kicking;
    document.getElementById("playerReflexes").value = player.reflexes;
    document.getElementById("playerSpeed").value = player.speed;
    document.getElementById("playerPositioning").value = player.positioning;
  } else {
    document.getElementById("playerPace").value = player.pace;
    document.getElementById("playerShoot").value = player.shooting;
    document.getElementById("playerDribble").value = player.dribbling;
    document.getElementById("playerPhysic").value = player.physical;
  }

  deletePlayer(index);
}

function deletePlayer(index) {
  squad.splice(index, 1);
  saveSquad();
  displaySquad();
}

function resetForm() {
  document.getElementById("playerName").value = "";
  document.getElementById("playerImage").value = "";
  document.getElementById("playerPosition").value = "ST";
  toggleAttributes();

  document.getElementById("playerPace").value = "";
  document.getElementById("playerShoot").value = "";
  document.getElementById("playerDribble").value = "";
  document.getElementById("playerPhysic").value = "";

  document.getElementById("playerDiving").value = "";
  document.getElementById("playerHandling").value = "";
  document.getElementById("playerKicking").value = "";
  document.getElementById("playerReflexes").value = "";
  document.getElementById("playerSpeed").value = "";
  document.getElementById("playerPositioning").value = "";
}

function saveSquad() {
  localStorage.setItem('squad', JSON.stringify(squad));
}

        let squad = [];


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

            displaySquad();
            resetForm();
        }

        function displaySquad() {
            const squadList = document.getElementById("squadList");
            squadList.innerHTML = "";
        
            squad.forEach((player, index) => {
                let playerInfo = `
                    <div class="player">
                        <img src="${player.image}" alt="${player.name}">
                        <h3>${player.name}</h3>
                        <p>${player.position}</p>
                        <div class="stats">
                `;
        
                if (player.position === "GK") {
                    playerInfo += `
                        <p>DIV ${player.diving} | HAN ${player.handling} | KIC ${player.kicking}</p>
                        <p>REF ${player.reflexes} | SPD ${player.speed} | POS ${player.positioning}</p>
                    `;
                } else {
                    playerInfo += `
                        <p>PAC ${player.pace} | SHO ${player.shooting} | DRI ${player.dribbling} | PHY ${player.physical}</p>
                    `;
                }
        
                playerInfo += `
                        </div>
                        <button class="edit" onclick="updatePlayer(${index})">Edit</button>
                        <button class="delete" onclick="deletePlayer(${index})">Delete</button>
                    </div>
                `;
        
                squadList.innerHTML += playerInfo;
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

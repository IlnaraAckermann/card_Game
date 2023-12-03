const state = {
	score: {
		playerScore: 0,
		computerScore: 0,
		scoreBox: document.getElementById("score_points"),
	},
	cardSprites: {
		avatar: document.getElementById("card-image"),
		name: document.getElementById("card-name"),
		type: document.getElementById("card-type"),
	},
    playerSides: {
        player1: 'player-cards',
        player1Box: document.querySelector("#player-cards"),
        computer: 'computer-cards',
        computerBox: document.querySelector("#computer-cards"),
    },
	fieldCards: {
		player: document.getElementById("player-field-card"),
		computer: document.getElementById("computer-field-card"),
	},
	action: {
		button: document.getElementById("next-duel"),
	},
};


const pathImg = "./src/assets/icons/";
const cardData = [
	{
		id: 0,
		name: "Blue Eyes White Dragon",
		type: "Paper",
		img: `${pathImg}dragon.png`,
        winOf: [1],
        loseOf: [2],
	},
	{
		id: 1,
		name: "Exodia",
		type: "Rock",
		img: `${pathImg}exodia.png`,
        winOf: [2],
        loseOf: [0],
	},
	{
		id: 2,
		name: "Dark Magician",
		type: "Scissors",
		img: `${pathImg}magician.png`,
        winOf: [1],
        loseOf: [0],
	},
	
];

async function getRandomCardID(){
    const randomIndex =Math.floor(Math.random()*cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px")
    cardImage.setAttribute("src", "../src/assets/icons/card-back.png")
    cardImage.setAttribute("data-id", randomIdCard)
    cardImage.classList.add("card")

    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener("mouseover", ()=>{
            drawSelected(randomIdCard)
        })

        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"))
        })
    }
    return cardImage
}

async function drawButton(text){
    state.action.button.innerText=text;
    state.action.button.style.display="block";
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResult="EMPATE!"
    let playerCard = cardData[playerCardId]

    if(playerCard.winOf.includes(computerCardId)){
        duelResult="GANHOU!"
        state.score.playerScore++
    }

    if(playerCard.loseOf.includes(computerCardId)){
        duelResult="PERDEU!"
        state.score.computerScore++
    }

    return duelResult
}

async function removeAllCardsImages(){
    let {computerBox, player1Box} = state.playerSides;
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img)=> img.remove())
    
    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img)=> img.remove())
}

async function setCardsField(cardId){
    await removeAllCardsImages();
    let computerCardId = await getRandomCardID();

    state.fieldCards.player.style.display="block";
    state.fieldCards.computer.style.display="block";
    
    state.fieldCards.player.src=cardData[cardId].img;
    state.fieldCards.computer.src=cardData[computerCardId].img;  

    let duelResult= await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult)
}

async function updateScore(){
    state.score.scoreBox.innerText=`WIN ${state.score.playerScore} | Lose ${state.score.computerScore}`
}

async function drawSelected(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i=0; i<cardNumbers; i++) {
        const randomIdCard = await getRandomCardID();
        const cardImage = await createCardImage(randomIdCard, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

async function resetDuel(){
    state.cardSprites.avatar.src='';
    state.action.button.style.display="none";

    state.fieldCards.player.style.display="none"
    state.fieldCards.computer.style.display="none"
    init()

}

function init() {
    drawCards(5, state.playerSides.computer)
    drawCards(5, state.playerSides.player1)
}

init();

const state = {
	socres: {
		player: 0,
		computer: 0,
		scoreBox: document.getElementById("score_points"),
	},
	cardSprites: {
		avatar: document.getElementById("card-image"),
		name: document.getElementById("card-name"),
		type: document.getElementById("card-type"),
	},
	fieldCards: {
		player: document.getElementById("player-field-card"),
		computer: document.getElementById("computer-field-card"),
	},
	action: {
		button: document.getElementById("next-duel"),
	},
};

const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards',
}

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
		type: "Paper",
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

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"))
        })
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelected(IdCard)
    })

    return cardImage

}

async function drawCards(cardNumbers, fieldSide){
    for(let i=0; i<cardNumbers; i++) {
        const randomIdCard = await getRandomCardID();
        const cardImage = await createCardImage(randomIdCard, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function init() {
    drawCards(5, playerSides.computer)
    drawCards(5, playerSides.player1)
}

init();

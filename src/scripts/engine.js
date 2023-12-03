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
		player: document.getElementById("computer-field-card"),
	},
	action: {
		button: document.getElementById("next-duel"),
	},
};
const pathImg = ".src/assets/icons/";
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

function init() {}

init();

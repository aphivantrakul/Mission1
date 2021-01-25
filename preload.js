// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	const colorQuestion = document.getElementById('colorQuestion');
	const foodQuestion = document.getElementById('foodQuestion');
	const animalQuestion = document.getElementById('animalQuestion');

	colorQuestion.addEventListener('click', function(){
		ipcRenderer.send("questionClicked", "colorQuestion");
	});

	foodQuestion.addEventListener('click', function(){
		ipcRenderer.send("questionClicked", "foodQuestion");
	});

	animalQuestion.addEventListener('click', function(){
		ipcRenderer.send("questionClicked", "animalQuestion");
	});
})


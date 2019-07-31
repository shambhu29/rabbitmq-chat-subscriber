'use strict';

var welcomeForm = document.querySelector('#welcomeForm');
welcomeForm.addEventListener('submit', connect, true)

var stompClient = null;

function connect(event) {

	document.querySelector('#welcome-page').classList.add('hidden');
	document.querySelector('#dialogue-page').classList.remove('hidden');

	var socket = new SockJS('/chatApp-Sub');
	stompClient = Stomp.over(socket);

	stompClient.connect({}, connectionSuccess);
	event.preventDefault();
}

function connectionSuccess() {
	stompClient.subscribe('/topic/javainuse', onMessageReceived);
}

const canvasOutput = document.getElementById('canvasOutput');

function onMessageReceived(payload) {
	
	var message = JSON.parse(payload.body);	
	//console.log('DATA::' + message.content);
	canvasOutput.src = message.content;	
}
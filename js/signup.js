var dontContinue=document.querySelector('.dont-continue');
var signUp=document.querySelector('.signup');
var blank=document.querySelector('.blank');
var message=document.querySelector('.message');

function openMessage(){
	blank.style.display ='block';
	message.style.display = 'block';

}

signUp.onclick = openMessage; 

function closeMessage(){
	blank.style.display='none';
	message.style.display='none';
}

dontContinue.onclick=closeMessage;
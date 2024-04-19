let numberChoice = document.getElementById('number_choice');

let characterNr = document.getElementById('character_nr');
characterNr.addEventListener('input', ()=>{numberChoice.innerHTML = characterNr.value})
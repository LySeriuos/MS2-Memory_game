// Adding modal after uploading page 
$(document).ready(function(){
  
    function showModal(){
     $('#modal-container').show();
     $('html body').css('overflow', 'hidden');
    }

    function closeModal(){
        $('#modal-container').hide();
    };
   

    // Game will start and modal will close after pressing button "Start"  

    $('#close').click(function(){
        closeModal();
    });

    $('.btn-start').click(function(){        
        setTimeout(function(){startFlashing();},1000); 
        closeModal(); 
                  
       });           
});

// Adding new player to an array and saving it to local.storage 

    var arrPlayers = localStorage.getItem("arrPlayers");
    arrPlayers = (arrPlayers) ? JSON.parse(arrPlayers) : [];
    temp = [];

for(let i of arrPlayers)
    i && temp.push(i); // copy each non-empty value to the 'temp' array

arrPlayers = temp;
    console.log(arrPlayers);
    
    
    function add() {  
        var obj = {};  
    $('.name_form input[type="text"]').each(function(){ arrPlayers.push($(this).val()); });
    document.getElementById("exampleFormControlInput1").value = '';
    
    localStorage.setItem("arrPlayers", JSON.stringify(arrPlayers));
    };    
    $('#modal_button').on('click', add);
   
// The last provided player name is showing in the game as current player. 
    const modalButton = document.querySelector('#modal_button');
    const testingUpdate = document.querySelector('#testingUpdate');

    modalButton.onclick = function() {
        let name = arrPlayers[arrPlayers.length - 1];
        console.log(name);
        testingUpdate.textContent = name;
           val(); 
           dif();  
      };
     
      // To use saved names in local storage for future game players name selection
       
      var select = document.getElementById("exampleFormControlSelect1"); 
      var players = JSON.parse(localStorage.getItem("arrPlayers"));

      for(var i = 0; i < players.length; i++) {
    var opt = players[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    $("#exampleFormControlSelect1 option[value='yourValue']").length > 1; // I'm using 1 for not showing up empty list options when choosing player.
    };

    // selected player is showing in the game as a current player.
    function val() {
    let chosePlayer = document.getElementById("exampleFormControlSelect1").value; 
    testingUpdate.textContent = chosePlayer;
};
   // showing dificullty level in the game
function dif() {
    let difLevel = document.getElementById("exampleFormControlSelect2").value; 
    difficulty.textContent =difLevel;
};

   

   




// arrenging query solectors for colour sectors 
const topLeft = document.querySelector('.top-left-sector');
const topRight = document.querySelector('.top-right-sector');
const bottomLeft = document.querySelector('.bottom-left-sector');
const bottomRight = document.querySelector('.top-right-sector');

//creating a array to give random sequence in the game

const sequences = [topLeft, bottomLeft, bottomRight, topRight];

//getting length of the sector and picking a random index   
const getRandomSector = () => {
   const sectors = [topLeft, bottomLeft, bottomRight, topRight]
   return sectors[parseInt(Math.random()* sectors.length)];
}
const sequence =  [getRandomSector()];
let sequenceToGuess = [...sequence]

//flashing random colour from array sequences
const flash = (sector) => {
return new Promise(resolve =>{
   sector.className += ' active';
   setTimeout(() => {
sector.className = sector.className.replace(' active', '');
//setting break time between double colour flashing
setTimeout(() => {
    resolve();
}, 250);
}, 1000)
});
};

let canClick = false;

const sectorClicked = sectorClicked => {
    if(!canClick) return;
    const expectedSector = sequenceToGuess.shift();
    if (expectedSector === sectorClicked) {
        if (sequenceToGuess.length === 0) {
    //start new round
    sequence.push(getRandomSector());
    sequenceToGuess = [...sequence];
    startFlashing();
        }
       
    } else {
        //end game
        alert('Sorry, but you did mistake');       
    }   
};


const startFlashing = async () => {
    canClick = false;
    for (const sector of sequence) {
        await flash(sector);
    }
    canClick = true;
}
  startFlashing();

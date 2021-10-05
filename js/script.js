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

       $('.btnRules').click(function(){
        showModal();
    });

    $('.btnDiff').click(function(){
        showModal();
    });

    $('.btnCreate').click(function(){
        showModal();
    });

    $('.btnChoossPlayer').click(function(){       
        showModal();
        
    });

    $("#btnRules").on("click", function() {
        $("#modal").show();
    });

   

});

// Adding new player to an array and saving it to local.storage 

    let arrPlayers = localStorage.getItem("arrPlayers");
    arrPlayers = (arrPlayers) ? JSON.parse(arrPlayers) : [];
    temp = [];

for(let i of arrPlayers)
    i && temp.push(i); // copy each non-empty value to the 'temp' array

arrPlayers = temp;
    console.log(arrPlayers);
    
    
    function add() {  
          
    $('.name_form input[type="text"]').each(function(){ arrPlayers.push($(this).val()); });
    document.getElementById("exampleFormControlInput1").value = '';
   
    localStorage.setItem("arrPlayers", JSON.stringify(arrPlayers));
    testingUpdate.textContent = arrPlayers[arrPlayers.length - 1];
        };

    
    
   

// The last provided player name is showing in the game as current player. 
    let modalButton = document.querySelector('#modal_button');
    let testingUpdate = document.querySelector('#testingUpdate');

    function chosePlayer() {
        let chosePlayer = select.value; 
        testingUpdate.textContent = chosePlayer;
        
    };

    $('#modal_button').click(function(){
        if($('#exampleFormControlInput1').val() == ''){
            chosePlayer();           
        } else {
            add();
        }
     });
        
    
   


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
    
   // showing dificullty level in the game
function dif() {
    let difLevel = document.getElementById("exampleFormControlSelect2").value; 
    difficulty.textContent = difLevel;
};

   // counting scores of the game, one finished sequence one score
function incrementScore(){
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
    
    
    let currrentPlayer = document.querySelector('#testingUpdate').textContent;
    console.log(currrentPlayer);   
    let playerInfo = {name:currrentPlayer, score: oldScore};   
    
    // converting objects to a array
    
    

   
// Put array into storage
    


var playerStats = [];

playerStats = JSON.parse(localStorage.getItem('playerStats'));
playerStats.push(playerInfo);
localStorage.setItem('playerStats', JSON.stringify(playerStats));
let bele = JSON.parse(localStorage.getItem('playerStats')); // Returns ["yes"]
console.log(bele);






    
    

    };

    function reductionScore(){
        let oldScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText = --oldScore;
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
    incrementScore()
        }
       
    } else {
        //end game
        alert('Sorry, but you did mistake');  
        reductionScore()     
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

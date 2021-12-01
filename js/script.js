// Adding modal after uploading page 
$(document).ready(function(){
    
   // Clicking button Rules to open modal
     $('.btnRules').click(function(){
         $('.modal-container-2').fadeIn('slow');
     });
     //Closing modal
     $('.close-btn-rules, #modal_button_rules').click(function(){
        $('.modal-container-2').fadeOut('slow');
    });
    // Clicking button Choose Player to open modal
    $('.btnChoossPlayer, .btnDiff, .btnCreate').click(function(){
        $('.modal-container').fadeIn('slow');
    });
    //Closing modal
    $('.close-btn').click(function(){
       $('.modal-container').fadeOut('slow');
    });
    //Closing modal and starting the game with startFlashing()
    $('.btn-start').click(function(){
        $('.modal-container').fadeOut('slow');
        setTimeout(() => {
            startFlashing()
          }, 1000);
     });
     // Clicking button Rules to open modal
     $('.btnLeaderboard').click(function(){
    $('.modal-leaderboard').fadeIn('slow');
    });
     //Closing modal
    $('.close-btn-leaderboard, #modal_button_leaderboard').click(function(){
    $('.modal-leaderboard').fadeOut('slow');
    });    
    setTimeout(() => {
        startFlashing()
      }, 1000);        
        setTimeout(function(){
          $(".notify").removeClass("active");
          $("#notifyType").removeClass("failure");
        },2000);
      });
    

    

   

// Adding new player to an array and saving it to local.storage 

    let arrPlayers = localStorage.getItem("arrPlayers");
    arrPlayers = (arrPlayers) ? JSON.parse(arrPlayers) : [];
    temp = [];

for(let i of arrPlayers)
    i && temp.push(i); // copy each non-empty value to the 'temp' array

arrPlayers = temp;
    console.log(arrPlayers);
    
    // The last provided player name is showing in the game as current player.

    function add() {            
    $('.name_form input[type="text"]').each(function(){arrPlayers.push($(this).val()); });
    document.getElementById("exampleFormControlInput1").value = '';   
    localStorage.setItem("arrPlayers", JSON.stringify(arrPlayers));
    testingUpdate.textContent = arrPlayers[arrPlayers.length - 1];
    jQuery('span').text('0') //put default value on change, player on change gets 0 scores.
        };

 // selected player is showing in the game as a current player.   
 
    let modalButton = document.querySelector('#modal_button');
    let testingUpdate = document.querySelector('#testingUpdate');

    function chosePlayer() {
        let chosePlayer = select.value; 
        testingUpdate.textContent = chosePlayer;
        jQuery('span').text('0'); //put default value on change, player on change gets 0 scores.   
        
        };

    $('#modal_button').click(function(){
        if($('#exampleFormControlInput1').val() == ''){
            chosePlayer(); 
                      
        } else {
            add();
             // the restart() function does not alloud to change palyer name or add new, because of restarting page and it is always going to be anonymus!!!!!!
        }
     });
        
      // To use saved names in local storage for future game players name selection

      var select = document.getElementById("exampleFormControlSelect1");        
      var players = JSON.parse(localStorage.getItem("arrPlayers"));      
        if (players != null) {
      for(var i = 0; i < players.length; i++) {    
        var opt = players[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
        $("#exampleFormControlSelect1 option[value='yourValue']").length > 0;     
      }};
    
   // counting scores of the game, one finished sequence one score
    function incrementScore(){
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore; 
    
    let currrentPlayer = document.querySelector('#testingUpdate').textContent;
    console.log(currrentPlayer);   
    let playerInfo = {"name" :currrentPlayer, "score": oldScore};  
    console.log(playerInfo); 
    
    // converting objects to a array and putting array into local.storage
    // saving only incrementScore because I will need only info for highest scores
    // Parse the serialized data back into an aray of objects
    playerStats = JSON.parse(localStorage.getItem('session')) || [];
    // Push the new data onto the array
    playerStats.push(playerInfo);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('session', JSON.stringify(playerStats));

    console.log(playerStats);    
               
     //Showing players with top three scores in the Leader Board.    

               let lastThree = playerStats.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
               let lastThreeList = lastThree.slice(Math.min(lastThree.length -3));
               let lastThreeReversed = lastThreeList.reverse();
               let listTop = document.getElementById("topThree");           
               listTop.innerHTML = lastThreeReversed.map(lastThreeReversed => {
                     return `<li>${lastThreeReversed.name} - ${lastThreeReversed.score}</li>`;
                         })
                         .join("");          

     //showing the highest scores of current player

     result = playerStats.reduce((a, {name, score}) => {
        if (name.includes(currrentPlayer)) a.push({name, score});
        return a;
          }, []);
          
     //showing top20 of players with the most scores
        
     let blaBla = playerStats.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
     let anotherCheck = blaBla.slice(Math.min(blaBla.length -20));
     let gangster = anotherCheck.reverse();
     let topFifteen = document.querySelector('#topFifteen');            
     topFifteen.innerHTML = gangster.map(gangster => {
           return `<li>${gangster.name} - ${gangster.score}</li>`;
               })
               .join("");

      console.log(gangster)

     let highScores =  Math.max.apply(Math, result.map(function(o) { return o.score; }));
       document.getElementById("highScore").textContent = highScores;
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

// showing dificullty level in the game and made conditions for each level

let x = 500;
let y = 1000;
let difficulty = document.querySelector('#difficulty');
let selectDif = document.getElementById("exampleFormControlSelect2"); 

function dif() {
    let difLevel = selectDif.value;
    difficulty.textContent = difLevel;
    $("#exampleFormControlSelect2 option[value='yourValue']").length > 0;    

   if (difLevel === "Medium"){
    clearTimeout()
     x = 500;
   y = 500;
   
} else if (difLevel === "Hard"){
    clearTimeout()
     x = 250;
   y = 250;

    } else {
    clearTimeout()
    x = 500;
    y = 1000; 
   }
};
dif();

// audio for the game. With these function able to manipulate sounds evenwith longer one
let audio = new Audio("assets/FOODGware_Wine stopper (ID 0274)_BSB (1).wav");
let anotherAudio = new Audio("assets/sounds/1-note-high-pizz.mp3")
let failAudio = new Audio("assets/sounds/soundscrate-audience-impressed-ahhh-1.mp3")
let correctAudio = new Audio("assets/sounds/soundscrate-audience-cheers-variation-5.mp3")
let flashAudio = new Audio("assets/sounds/piano040.wav")

function muteAudio(){
    if (audio.mute == false) 
{
    audio.muted = true;
    anotherAudio.muted = true;
    failAudio.muted = true;
    correctAudio.muted = true;
    flashAudio.muted = true;
}
else 
{
    audio.mute = true;
      document.getElementById('audioPlayer').muted = false;
      audio.muted = false;
    anotherAudio.muted = false;
    failAudio.muted = false;
    correctAudio.muted = false;
    flashAudio.muted = false;
}
};

let button = document.getElementById('mute');
    button.onclick = function (){

        if (audio.muted === false) {    
            enableMute();
            $('#mute').addClass('muted');
            
     }
     else {
        disableMute();
        
        $('#mute').addClass('unmuted');
            if ( $('#mute').hasClass('muted') )
            $('#mute').removeClass('muted').addClass('unmuted');
    }


    };

function enableMute() {    
    audio.muted = true;
    anotherAudio.muted = true;
    failAudio.muted = true;
    correctAudio.muted = true;
    flashAudio.muted = true;
    
};

function disableMute() { 

    audio.muted = false;
    anotherAudio.muted = false;
    failAudio.muted = false;
    correctAudio.muted = false;
    flashAudio.muted = false;
};

function audioClick(){	
	anotherAudio.currentTime=0;
	anotherAudio.play()
	console.log(anotherAudio.currentTime);
	setInterval(function(){
		if(anotherAudio.currentTime>1){
			anotherAudio.pause();
				}
			});
		};

function audioFlash(){	
        flashAudio.currentTime=0.5;
        flashAudio.play();
            console.log(flashAudio.currentTime);
            setInterval(function(){
                if(flashAudio.currentTime>1.5){
                    flashAudio.pause();
                        }
                    },100);
                };        

// need to reset sectors when player is onchange.
//getting length of the sector and picking a random index   
let getRandomSector = () => {
   let sectors = [topLeft, bottomLeft, bottomRight, topRight]
   return sectors[parseInt(Math.random()* sectors.length)];  
}
  
const sequence =  [getRandomSector()];
let sequenceToGuess = [...sequence]

//flashing random colour from array sequences
const flash = (sector) => {
return new Promise(resolve =>{    
   audioFlash()
   sector.className += ' active';
   setTimeout(() => {
sector.className = sector.className.replace(' active', '');
//send a message for problem solution............................

//setting break time between double colour flashing
setTimeout(() => {
    resolve();
}, x);
}, y)
});
};

let canClick = false;

const sectorClicked = sectorClicked => {
    if(!canClick) return;
    audioClick();    
    const expectedSector = sequenceToGuess.shift();    
    if (expectedSector === sectorClicked) {
    if (sequenceToGuess.length === 0) {
    //start new round
    correctAudio.play();
    sequence.push(getRandomSector());
    sequenceToGuess = [...sequence];
    setTimeout(() => {
        startFlashing()
      }, 1000);
    
    incrementScore();
        }
        
       
    } else {
        //end game
       failAudio.play();
        reductionScore();       
        sequenceToGuess = [...sequence];
        setTimeout(() => {
            startFlashing()
          }, 1500);
          canClick = false; // this is to prevent double click after sequence were flashed.        
    }   
};

const startFlashing = async () => {
    canClick = false;
    for (const sector of sequence) {
        await flash(sector);
    }
    canClick = true;
}
 

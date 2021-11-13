// Adding modal after uploading page 
$(document).ready(function(){
    

    function showModal(){     
     $('#modal-container').show();
     $('html body').css('overflow', 'hidden');
    }

    function showModal2(){
        $('#modal-container-2').show();
        $('html body').css('overflow', 'hidden');
       }

    function showModal3(){
        $('#modal-leaderboard').show();
        $('html body').css('overflow', 'hidden');
       }   

    function closeModal2(){
        $('#modal-container-2').hide();
    };

    function closeModal3(){
        $('#modal-leaderboard').hide();
    };

    function closeModal(){
        $('#modal-container').hide();        
    };

    $(document).ready(function () {

        $('.modal').on("hidden.bs.modal", function (e) { //fire on closing modal box
               if ($('.modal2:visible').length) { // check whether parent modal is opend after child modal close
                   $('body').addClass('modal-open'); // if open mean length is 1 then add a bootstrap css class to body of the page
               }
           });
       });
   

    // Game will start and modal will close after pressing button "Start"  

    $('.close-btn-rules, #modal_button_rules').click(function(){
        closeModal2();        
    });
    $('.close-btn').click(function(){
        closeModal();        
    });

    $('.close-btn-leaderboard, #modal_button_leaderboard').click(function(){
        closeModal3();        
    });
    
   
    
    $('.btn-start').click(function(){        
        setTimeout(function(){startFlashing()},1000); 
        closeModal();          
       }); 

       $('.btn-close').click(function(){        
        closeModal();          
       }); 

    $('.btnRules').click(function(){
        showModal2();
    });

    $('.btnDiff').click(function(){
        showModal();
    });

    $('.btnLeaderboard').click(function(){
        showModal3();
    });

    $('.btnCreate').click(function(){
        showModal();
    });

    $('.btnChoosPlayer').click(function(){       
        showModal();
        
    });

    $("#btnRules").on("click", function() {
        $("#modal").show();
    });

    $(".btn-start-game").on("click", function() {
        startFlashing();
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
    
    // The last provided player name is showing in the game as current player.

    function add() {            
    $('.name_form input[type="text"]').each(function(){ arrPlayers.push($(this).val()); });
    document.getElementById("exampleFormControlInput1").value = '';
   
    localStorage.setItem("arrPlayers", JSON.stringify(arrPlayers));
    testingUpdate.textContent = arrPlayers[arrPlayers.length - 1];
        };

 // selected player is showing in the game as a current player.   
 
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
      
        if (players != null) {
      for(var i = 0; i < players.length; i++) {
        
    
    var opt = players[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    $("#exampleFormControlSelect1 option[value='yourValue']").length > 0; // I'm using 1 for not showing up empty list options when choosing player.
    
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
    
    // Managing map. to get unique arrays of keys and values.

     let uniqueObjArray = [
         ...new Map(playerStats.map((item) => [item["name"], item])).values(),
     ];

     console.log(uniqueObjArray);

     let test_uniqueObjArray_map = playerStats.map((item) => [
         item["score"], item]);

                 
     let test_uniqueObjArray_NewMap = new Map(test_uniqueObjArray_map);

     let test_uniqueObjArray_NewMap_keys = test_uniqueObjArray_NewMap.keys();
      
     let test_uniqueObjArray_NewMap_values = test_uniqueObjArray_NewMap.values();
       
     let test_uniqueObjArray_NewMap_values_asArray = [...test_uniqueObjArray_NewMap_values];
             
        //Showing players with top three scores in the Leader Board.

     let topThree = test_uniqueObjArray_NewMap_values_asArray.slice(Math.max(test_uniqueObjArray_NewMap_values_asArray.length - 3, 1))
      
     let listTop = document.getElementById("topThree");
        
           listTop.innerHTML = topThree.map(topThree => {
           return `<li>${topThree.name}-${topThree.score}</li>`;
               })
               .reverse()
               .join("");

        //showing the highest scores of current player

        result = playerStats.reduce((a, {name, score}) => {
            if (name.includes(currrentPlayer)) a.push({name, score});
            return a;
          }, []);
          console.log(result);


        //showing top20 of players with the most scores
        
        let blaBla = playerStats.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
     let anotherCheck = blaBla.slice(Math.min(blaBla.length -20));
     let gangster = anotherCheck.reverse();

     let topFifteen = document.querySelector('#topFifteen');

            
     topFifteen.innerHTML = gangster.map(gangster => {
           return `<li>${gangster.name} - ${gangster.score}</li>`;
               })
               .join("");

               console.log(topFifteen);

          

          

         
          

         
   



          

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
var audio = new Audio("assets/FOODGware_Wine stopper (ID 0274)_BSB (1).wav");



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
}, x);
}, y)
});
};




let canClick = false;

const sectorClicked = sectorClicked => {
    audio.play();
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
        alert('Sorry, but you did mistake, Press STRAT button to try again!');  
        reductionScore()  
         
        sequence.push(getRandomSector());
    sequenceToGuess = [...sequence];
    
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

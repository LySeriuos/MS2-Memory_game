// Adding modal after uploading page 
$(document).ready(function(){
    // if statement is to check which player name should be used in HTML after reload the page. 
        if ((localStorage.getItem("playerSelected") !== null) && (document.getElementById("userInput") == null)){
            theCurrentPlayer.innerText = localStorage.getItem("playerSelected")  
                       
            }   else  if ((localStorage.getItem("playerSelected") === null) && (localStorage.getItem("allCreatedPlayers") === null)){
                theCurrentPlayer.textContent = document.getElementById("dropDownSelection").value;                                                
                } else {
                    theCurrentPlayer.textContent = allCreatedPlayers[allCreatedPlayers.length - 1];                      
                };                
                chosePlayer();         
       
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
            window.location.reload(); 
            setTimeout(() => {            
                startFlashing();
              }, 1000);
         });
    // Clicking button Rules to open modal
         $('.btnLeaderboard').click(function(){
        $('.modal-leaderboard').fadeIn('slow');
        alert('working')
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
    // audio section
    // audio for the game. With these function able to manipulate sounds even with longer one
    document.addEventListener("touchstart", function(){}, true);
    
    function WebAudio(src) {
        if(src) this.load(src);
    }
    
    WebAudio.prototype.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    WebAudio.prototype.load = function(src) {
        if(src) this.src = src;
        console.log('Loading audio ' + this.src);
        var self = this;
        var request = new XMLHttpRequest;
        request.open("GET", this.src, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            self.audioContext.decodeAudioData(request.response, function(buffer) {
                if (!buffer) {
                    if(self.onerror) self.onerror();
                    return;
                }
    
                self.buffer = buffer;
    
                if(self.onload)
                    self.onload(self);
            }, function(error) {
                self.onerror(error);
            });
        };
        request.send();
    };
    
        let audio = new WebAudio("assets/FOODGware_Wine stopper (ID 0274)_BSB (1).wav");
        audio.onload = function() {
            audio.play();
        }
    
        let anotherAudio = new WebAudio("assets/sounds/1-note-high-pizz.mp3")
        anotherAudio.onload = function() {
            anotherAudio.play();
        }
        
        let failAudio = new WebAudio("assets/sounds/soundscrate-audience-impressed-ahhh-1.mp3")
        failAudio.onload = function() {
            failAudio.play();
        }
    
        let correctAudio = new WebAudio("assets/sounds/soundscrate-audience-cheers-variation-5.mp3")
        correctAudio.onload = function() {
            correctAudio.play();
        }
        
        let flashAudio = new WebAudio("assets/sounds/piano040.wav")
        flashAudio.onload = function() {
            flashAudio.play();
        }
    
        WebAudio.prototype.play = function() {
        source = this.audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.audioContext.destination); 
        source.start(0);   
    };
    
        // the sounds do not start play directly, all game sounds after page loads is in silence mode class 
        let button = document.getElementById('mute');
        let muteIcon = JSON.parse(localStorage.getItem('muteIcon')) || []; 

        button.onclick = function (){
            if (audio.muted === false) {               
                enableMute();
                
                 $('#mute').addClass('muted');
                if ( $('#mute').hasClass('unmuted') ){
                $('#mute').removeClass('unmuted').addClass('muted')
                muteIcon.push('muted'); 
                
                WebAudio.prototype.play = function() {
                    source = this.audioContext.createBufferSource();
                    source.buffer = this.buffer;
                    
                }}
                } else { 
                    disableMute() ;     
            $('#mute').addClass('unmuted');
                if ( $('#mute').hasClass('muted') ){
                $('#mute').removeClass('muted').addClass('unmuted')
                muteIcon.push('unmuted');  
                    
               // overwriting function to play sounds when used class "unmuted"      
               WebAudio.prototype.play = function() {
                source = this.audioContext.createBufferSource();
                source.buffer = this.buffer;
                source.connect(this.audioContext.destination);
                source.start(0);        
            }}};
        localStorage.setItem('muteIcon', JSON.stringify(muteIcon));
    };

    // saving current sound settings mute or unmute to the local storage. After reload it stays the same as before.
    // disconnecting buffer source from audioContext destination gives muted sound in the game.
    let saveMute = JSON.parse(localStorage.getItem('muteIcon'));
    console.log(saveMute);
    
    if (localStorage.getItem('muteIcon') !== null){
    let buttonIcon = saveMute[saveMute.length -1];            
    console.log(buttonIcon); 
    
    if(buttonIcon === 'muted'){
        $('#mute').removeClass().addClass('muted')
        WebAudio.prototype.play = function() {
            source = this.audioContext.createBufferSource();
            source.buffer = this.buffer;          
        };
    };   
};  
    function touchStarted() {
        getAudioContext().resume();
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

                    //manipulating players input and saving to local storage

        let modalButton = document.querySelector('#modal_button');
        let theCurrentPlayer = document.querySelector('#theCurrentPlayer');
        let select = document.getElementById("dropDownSelection");
        let allCreatedPlayers = localStorage.getItem("allCreatedPlayers");

                    
    // Adding new player to an array and saving it to local.storage 
    
    allCreatedPlayers = (allCreatedPlayers) ? JSON.parse(allCreatedPlayers) : [];
    temp = [];

    for(let i of allCreatedPlayers)
        i && temp.push(i); // copy each non-empty value to the 'temp' array
    allCreatedPlayers = temp;

// the added player is showing directly in the choose player list, need to fix problem
//need to check if player name already exists
    function add() {            
        $('.name_form input[type="text"]').each(function(){allCreatedPlayers.push($(this).val()); });
        document.getElementById("userInput").value = '';   
        localStorage.setItem("allCreatedPlayers", JSON.stringify(allCreatedPlayers));
        theCurrentPlayer.textContent = allCreatedPlayers[allCreatedPlayers.length - 1];
    };

// selected player is showing in the game as a current player.   
 
    function chosePlayer() {
        $('#dropDownSelection').change(function() {
        localStorage.setItem('playerSelected', this.value);
    });
    if(localStorage.getItem('playerSelected')){
        $('#dropDownSelection').val(localStorage.getItem('playerSelected'));
        let chosePlayer = localStorage.getItem('playerSelected');         
        theCurrentPlayer.textContent = chosePlayer;  
        console.log(chosePlayer); 
    }    
        };

    $('#modal_button').click(function(){
        if($('#userInput').val() == ''){
            chosePlayer();  
            alert('chosePlayer')                    
        } else {
            localStorage.removeItem('playerSelected');
            add();
            alert('add') 
        }});
        
// To use saved names in local storage for future game players name selection

           
      var players = JSON.parse(localStorage.getItem("allCreatedPlayers"));      
        if (players != null) {
      for(var i = 0; i < players.length; i++) {    
        var opt = players[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
        $("#dropDownSelection option[value='yourValue']").length > 0;     
        }};

    // manipulating user scores
    // had an issue to with scores, I couldnt find out how to show top scores before the game started, or  i could, but scores always was starting at 1.
       
    function incrementScore(){
        currrentPlayer  = theCurrentPlayer.textContent;
        let oldScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText = oldScore;
        let playerInfo = {"name" :currrentPlayer, "score": oldScore};    
    // converting objects to a array and putting array into local.storage
    // saving only incrementScore because I will need only info for highest scores
    // Parse the serialized data back into an aray of objects
        let playerStats = JSON.parse(localStorage.getItem('session')) || [];
    // Push the new data onto the array
        playerStats.push(playerInfo);
    // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('session', JSON.stringify(playerStats));
        playerStats = JSON.parse(localStorage.getItem('session'))    
        
    //Showing players with top three scores in the Leader Board.    
    
        let lastThree = playerStats.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
        let lastThreeList = lastThree.slice(Math.min(lastThree.length -3));
        console.log(lastThreeList);
        let lastThreeReversed = lastThreeList.reverse();
        let listTop = document.getElementById("topThree");           
            listTop.innerHTML = lastThreeReversed.map(lastThreeReversed => {
                return `<li>${lastThreeReversed.name} - ${lastThreeReversed.score}</li>`;
                    })
                    .join(""); 
                       
    //showing top20 of players with the most scores
        let theList = playerStats.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
        let bestTwenty = theList.slice(Math.min(theList.length -20));
        let topTwentyList = bestTwenty.reverse();
        let topFifteen = document.querySelector('#topFifteen');                 
        topFifteen.innerHTML = topTwentyList.map(topTwentyList => {
              return `<li>${topTwentyList.name} - ${topTwentyList.score}</li>`;
                  })
                  .join(""); 
    
    //showing the highest scores of current player
    if(playerStats !== null){
         result = playerStats.reduce((a, {name, score}) => {
            if (name.includes(currrentPlayer)) a.push({name, score});
            return a;
              }, []);
            } else {
                return;
            }
           let highScores =  Math.max.apply(Math, result.map(function(o) { return o.score; }));
           document.getElementById("highScore").textContent = highScores;       
            };
            
    incrementScore();
    
    function reductionScore(){
            let oldScore = parseInt(document.getElementById("score").innerText);
            document.getElementById("score").innerText = --oldScore;
            };
    // showing dificullty level in the game and made conditions for each level
    
        let x = 500;
        let y = 1000;
        let difficulty = document.querySelector('#difficulty');
        let selectDif = document.getElementById("exampleFormControlSelect2"); 
    
    
    function dif() {
           // Re-serialize the array back into a string and store it in localStorage
       $(function() {
        $('#exampleFormControlSelect2').change(function() {
            localStorage.setItem('todoData', this.value);
        });
        if(localStorage.getItem('todoData')){
            $('#exampleFormControlSelect2').val(localStorage.getItem('todoData'));
        }
        let realDif = localStorage.getItem('todoData');
        difficulty.textContent = realDif;    
    
        if (realDif === "Medium"){
            clearTimeout()
             x = 500;
           y = 500;
           
        } else if (realDif === "Hard"){
            clearTimeout()
             x = 250;
           y = 250;
        
            } else {
            difficulty.textContent = selectDif.value;  
            clearTimeout()
            x = 500;
            y = 1000; 
           }});  
            };
    dif();  
    
     // arrenging query solectors for colour sectors 
        const topLeft = document.querySelector('.top-left-sector');
        const topRight = document.querySelector('.top-right-sector');
        const bottomLeft = document.querySelector('.bottom-left-sector');
        const bottomRight = document.querySelector('.top-right-sector');
    
     //creating a array to give random sequence in the game
    
        const sequences = [topLeft, bottomLeft, bottomRight, topRight];
    //getting length of the sector and picking a random index 
    function getRandomSector(){
       let sectors = [topLeft, bottomLeft, bottomRight, topRight]   
       return sectors[parseInt(Math.random()* sectors.length)];    
        };
     
        const sequence =  [getRandomSector()];
        let sequenceToGuess = [...sequence]
    
    //flashing random colour from array sequences
        const flash = (sector) => {
        return new Promise(resolve =>{     
        audioFlash()
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
        if(!canClick) return;
        audioClick();    
        const expectedSector = sequenceToGuess.shift();    
        if (expectedSector === sectorClicked) {
        if (sequenceToGuess.length === 0) {
        //start new round
        let oldScore = parseInt(document.getElementById("score").innerText);
        document.getElementById("score").innerText = ++oldScore;
        correctAudio.play();
        sequence.push(getRandomSector());
        sequenceToGuess = [...sequence];
        setTimeout(() => {
            startFlashing()
          }, 1000);    
        incrementScore();
            }} else {
            //end game
           failAudio.play();
            reductionScore();       
            sequenceToGuess = [...sequence];
            setTimeout(() => {
                startFlashing()
              }, 1500);
              canClick = false; // this is to prevent double click after sequence were flashed.        
            }};
    
        const startFlashing = async () => {
        canClick = false;
        for (const sector of sequence) {
            await flash(sector);
        }
        canClick = true;
        };
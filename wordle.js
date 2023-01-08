var height = 6; //number of guessses
var width = 5; //length of the word

var row = 0; //current guess (attemp #)
var col = 0; // current letter for that attempt
var gameOver = false;

var wordList = ["argon", "boron", "radon", "xenon", "gases", "atoms", "metal", "water", "react", "oxide", "sarin", "agent", "amide", "abide", "alloy", "world", "earth", "react", "group", "state", "amine", "dimer", "diazo", "admix", "diene", "thiol", "study", "nylon", "lewis", "bonds", "marie", "curie", "force", "ceria", "vsepr", "redox", "anion", "kroto", "diazo", "solid", "ceria", "octect", "agent", "prout", "break", "furan", "diene", "thiol", "diazo", "admix", "amine", "earth", "water", "alloy"]
var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

// words = [Index] 
// word = words[random number]

window.onload = function(){
    intialize();
}

function intialize() {
    //Create the board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="title">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }

    }

    // Create the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "BacK"]
    ]

    /*for (let i = 0, i < keyboard.length; i++) {
        //let currRow = keyboard[i];
        //let keyboardRow = document.createElement("div");
        /keyboard.classList.add("keyboard-row");

        for (let j = 0, j < currRow.length, j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {

            }
        }
    } */
    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;
        
        // alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1
                }
            }
        }

        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1; //start new row
            col = 0; /// start at 0 for now
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;

        }
    })

}

function update() {
    let correct = 0;
    let letterCount = {};
    for (let i =0; i < word.length; i++) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;

        }
    }

    //first iteration, chekc all the correct one

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        
        //Is it in the correct postion?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;


        }
        

        if (correct == width) {
            gameOver = true;
        }
    }

    //go again and mark which ones are present but in wrong position.

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        
        if (!currTile.classList.contains("correct")) {
            //Is it in the word?
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                letterCount[letter] -= 1;

            }

            //Not in the word
            else {
                currTile.classList.add("absent");
            }
        }

    }
}

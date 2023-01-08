var height = 6; //number of guessses
var width = 7; //length of the word

var row = 0; //current guess (attemp #)
var col = 0; // current letter for that attempt
var gameOver = false;

var wordList = ["arsenic", "bismuth", "bohrium", "bromine", "cadmium", "caesium", "calcium", "dubnium", "fermiun", "gallium", "hafnium", "hahnium", "hassium", "holmium", "iridium", "krypton", "lithium","mercury", "niobium", "rhenium", "silicon", "sulfur", "terbium", "thorium", "thulium", "uranium", "wolfram", "Yttrium", "alchemy", "science", "zymurgy", "ferment", "chemist", "chymist", "metrics", "thermic", "gaseous", "atomist", "poisons", "nitride", "leavens", "distill", "triodes", "halogen", "reagent", "isotope", "aniline", "achiral", "complex", "acyclic", "alcohol", "allomer", "amalgam", "analyte", "aqueous", "boiling", "burette", "cathode", "charles", "process", "colloid", "complex", "compton", "coulomb", "crystal", "cuvette", "density", "element", "elution", "entropy", "faraday", "hydrate", "hydrous", "isotope", "kinetic", "lattice", "ligand", "melting", "mineral", "mixture", "neutron", "nuclear", "nucleus", "nuclide", "orbital", "organic", "osmosis", "oxyacid", "partial", "peracid", "phibond", "pipette", "primary", "radical", "Raoult", "reagent", "rotamer", "solvent", "spatial", "tarnish", "terpene", "tyndall", "unitcell", "valence", "valency"]
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

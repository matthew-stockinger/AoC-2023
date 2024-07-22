const { getInputFile } = require("./utils");

const data = getInputFile("./day2input.txt");

const testData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const maxReds = 12;
const maxGreens = 13;
const maxBlues = 14;

const testMap = gamesMap(testData);
const part1Map = gamesMap(data);

console.log(possibleGameSum(testMap));
console.log(possibleGameSum(part1Map));

//////// part 2//////////

powers = [];
part1Map.forEach((game, i) => {
    powers.push(power(game));
});
console.log(powers);
console.log(
    powers.reduce((total, power) => {
        return total + power;
    }, 0)
);

//////////////////////////

function power(game) {
    let mins = minRGB(game);
    return mins.reduce((product, min) => {
        return product * min;
    }, 1);
}

// what's the minimum # of cubes of each color to make a game possible?
// game {array} - [[r, g, b], [r, g, b]]
// return {array} - [r, g, b]
function minRGB(game) {
    let mins = game.reduce(
        (currentMins, hand) => {
            return currentMins.map((min, i) => Math.max(min, hand[i]));
        },
        [0, 0, 0]
    );
    return mins;
}

function possibleGameSum(gameMap) {
    let sum = 0;
    for (let i = 1; i <= gameMap.size; i++) {
        sum += gamePossible(gameMap.get(i)) ? i : 0;
    }
    return sum;
}

// take string of games and convert to Map data structure
// gameData {string} - formatted as above, games separated by \n
// return {Map}
function gamesMap(gameData) {
    let gamesMap = new Map();
    let gamesList = gameData.split("\n");
    let idRegex = /\d+(?=:)/g;
    gamesList.forEach((game) => {
        let gameID = Number(game.match(idRegex)[0]);
        let gameNums = getGameNums(game);
        gamesMap.set(gameID, gameNums);
    });
    return gamesMap;
}

// game {string} - string of format above describing game
// return {array} - array of arrays.  e.g. [[r, b, g], [r, g, b]]
function getGameNums(game) {
    game = game.slice(game.indexOf(": ") + 2);
    let handStrings = game.split("; ");
    let hands = [];
    handStrings.forEach((hand) => {
        let numRed = hand.match(/\d+(?=\sred)/g);
        numRed = numRed ? Number(numRed[0]) : 0;
        let numBlue = hand.match(/\d+(?=\sblue)/g);
        numBlue = numBlue ? Number(numBlue[0]) : 0;
        let numGreen = hand.match(/\d+(?=\sgreen)/g);
        numGreen = numGreen ? Number(numGreen[0]) : 0;
        hands.push([numRed, numGreen, numBlue]);
    });
    return hands;
}

// checks if hand is possible, given maxReds, etc. above.
// hand {array} - [r, g, b]
// return {boolean}
function handPossible(hand) {
    if (hand[0] <= maxReds && hand[1] <= maxGreens && hand[2] <= maxBlues) {
        return true;
    } else {
        return false;
    }
}

// checks if a list of games is possible.
// game {array} - [[r, g, b], [r, g, b]]
// return {bool}
function gamePossible(game) {
    return game.every((hand) => handPossible(hand));
}

// let myMap = new Map();
// myMap.set(1, [
//     [4, 0, 3],
//     [1, 2, 6],
//     [0, 2, 0],
// ]);

// console.log(myMap.get(1));

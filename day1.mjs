import path from "node:path";
import fs from "node:fs/promises";

let testInputs = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
let inputFile = await fs.open(path.resolve("day1input.txt"), "r");
let data = await inputFile.readFile("utf8");
data = data.split("\n").map((s) => s.trimEnd());

// console.log(sumVals(data));
// console.log(
//     data.reduce((total, amendedCalibrationVal) => {
//         let calibrationVal = getCalibrationVal(amendedCalibrationVal);
//         return total + calibrationVal;
//     }, 0)
// );

// finds first and last numeric digit in a string.
// amendedCalibrationVal {string}
// return {number}
function getCalibrationVal(amendedCalibrationVal) {
    let numericDigits = amendedCalibrationVal.match(/[0-9]/g);
    let firstDigit = numericDigits[0];
    let lastDigit = numericDigits[numericDigits.length - 1];
    return Number(firstDigit + lastDigit);
}

function sumVals(calibrationValList) {
    // console.log(calibrationValList[0]);
    // console.log(getCalibrationVal(calibrationValList[0]));
    if (calibrationValList.length == 1) {
        return getCalibrationVal(calibrationValList[0]);
    } else {
        return (
            getCalibrationVal(calibrationValList[0]) +
            sumVals(calibrationValList.slice(1))
        );
    }
}

await inputFile.close();

///////////// part 2 //////////////
let part2Inputs = [
    "two1nine",
    "eightwothree",
    "threeeightwo",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];

inputFile = await fs.open(path.resolve("day1input.txt"), "r");
data = await inputFile.readFile("utf8");
data = data.split("\n").map((s) => s.trimEnd());

let regex = /[0-9]|one|two|three|four|five|six|seven|eight|nine/g;

let digitMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

// finds first and last numeric digit in a string.
// amendedCalibrationVal {string}
// return {number}
function getCalibrationVal2(amendedCalibrationVal) {
    let numericDigits = amendedCalibrationVal.match(regex);
    let firstDigit = digitMap[numericDigits[0]];
    let lastDigit = digitMap[numericDigits[numericDigits.length - 1]];
    return Number(String(firstDigit) + String(lastDigit));
}

function sumVals2(calibrationValList) {
    if (calibrationValList.length == 1) {
        return getCalibrationVal2(calibrationValList[0]);
    } else {
        return (
            getCalibrationVal2(calibrationValList[0]) +
            sumVals2(calibrationValList.slice(1))
        );
    }
}

console.log("part 2 tests:", sumVals2(part2Inputs));
// console.log("part 2 file:", sumVals2(data));

await inputFile.close();

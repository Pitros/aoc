"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const input = fs_1.default.readFileSync("./day2/input_test.txt", "utf-8");
const lines = input.split("\n").filter(Boolean);
const testlines = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'];
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
const games = testlines.map((l, i) => {
    const draws = l
        .split(":");
    // .map((d) => d.split(";").map((m) => m.split(",").map((d) => d.split(" "))));
    console.log(draws);
    return { game: i + 1 };
});
//# sourceMappingURL=index.js.map
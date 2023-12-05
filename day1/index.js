"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const input = fs_1.default.readFileSync("./day1/input_test.txt", "utf-8");
const lines = input.split("\n");
const sol1 = lines
    .filter(Boolean)
    .map((l) => l.match(/\d/g))
    .filter((l) => l && l.length > 1)
    .map((l) => Number(`${l[0]}${l[l.length - 1]}`))
    .reduce((acc, curr) => acc + curr, 0);
const toNum = (v) => {
    switch (v) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        default:
            return Number(v);
    }
};
const sol2 = lines // ['8kgplfhvtvqpfsblddnineoneighthg']//lines
    .filter(Boolean)
    // .map(l => {
    //   const numbers = [];
    //   for (let i = 0; i < l.length; i++) {
    //     const v = l.substring(i).match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/)
    //     if (v?.[0]) {
    //       numbers.push(toNum(v[0] as any))
    //     }
    //   }
    //   return numbers;
    // })
    .map((l) => [...l.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].flatMap(v => [...v]).filter(Boolean))
    .map((l) => l.map(toNum))
    .map((l, i) => { console.log(`${lines[i]} ${l.join(', ')}`); return l; })
    .map((l) => Number(`${l[0]}${l[l.length - 1]}`))
    .reduce((acc, curr) => acc + curr, 0);
console.log(sol2);
//# sourceMappingURL=index.js.map
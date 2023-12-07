"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const lines = fs_1.default.readFileSync("./day5/t.txt", "utf-8").split(/\n\n/);
const seeds = lines[0]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((n) => Number(n));
const maps = lines.slice(1).map((l) => {
    const rows = l
        .split(":")[1]
        .split(/\n/)
        .filter(Boolean)
        .map((r) => r.split(" ").map((r) => Number(r)));
    const m = rows.map(([destination, source, size]) => ({ destination, source, size }));
    m.sort((a, z) => a.source - z.source);
    return m;
});
const getLocation = (seed) => {
    let temp = seed;
    maps.forEach((map) => {
        const range = map.find((r) => r.source <= temp && temp < r.source + r.size);
        if (range) {
            temp = range.destination + (temp - range.source);
        }
    });
    return temp;
};
const sol1 = () => {
    const result = seeds.map((seed) => getLocation(seed));
    result.sort((a, z) => a - z);
    console.log(result);
};
const sol2 = () => {
    const seedRanges = seeds.slice(0, seeds.length / 2).map((_, i) => [seeds[2 * i], seeds[2 * i + 1]]);
    let lowest = getLocation(seedRanges[0][0]);
    seedRanges.forEach((range) => {
        for (let i = 0; i < range[1]; i++) {
            lowest = Math.min(lowest, getLocation(range[0] + i));
        }
        // progress
        console.log(range, lowest);
    });
    return lowest;
};
sol1();
console.time('p2');
sol2();
console.timeEnd('p2');
//# sourceMappingURL=index.js.map
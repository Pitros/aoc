"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const lines = fs_1.default.readFileSync("./day8/t.txt", "utf-8").split(/\n/).filter(Boolean);
const instr = lines.shift().split("");
const map = lines.reduce((map, route) => {
    const data = route.match(/\w+/g);
    map[data[0]] = { L: data[1], R: data[2] };
    return map;
}, {});
const sol1 = () => {
    let tries = 0;
    let node = "AAA";
    while (node !== "ZZZ") {
        node = map[node][instr[tries % instr.length]];
        tries++;
    }
    return tries;
};
const sol2 = () => {
    const nodes = Object.keys(map).filter((node) => node.endsWith("A"));
    let tries = 0;
    const hits = nodes.reduce((acc, _node, i) => {
        acc[i] = [];
        return acc;
    }, {});
    while (nodes.some((node) => !node.endsWith("Z")) && tries < 300000) {
        nodes.forEach((node, i) => {
            nodes[i] = map[node][instr[tries % instr.length]];
            if (nodes[i].endsWith("Z")) {
                hits[i].push(tries + 1 - (hits[i].at(-1) || 0));
            }
        });
        tries++;
    }
    const starts = Object.values(hits).map((v) => v[0]);
    const matches = Object.values(hits).map((v) => v[0]);
    while (new Set(matches).size !== 1) {
        const min = Math.min(...matches);
        matches.forEach((match, i) => {
            if (match === min) {
                matches[i] += starts[i];
            }
        });
    }
    return matches[0];
};
console.log(sol1());
console.log(sol2());
//# sourceMappingURL=index.js.map
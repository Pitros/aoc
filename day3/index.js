"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const lines = fs_1.default.readFileSync("./day3/t.txt", "utf-8").split("\n").filter(Boolean);
const task1 = lines.reduce((sum, line, lineNumber) => {
    const matches = [...line.matchAll(/(\d+)/g)].map((m) => ({
        match: m[0],
        index: m.index,
    }));
    const validMatches = matches.filter((match) => {
        const left = Math.max(0, match.index - 1);
        const right = Math.min(lines[0].length, match.index + match.match.length + 1);
        const top = Math.max(0, lineNumber - 1);
        const bottom = Math.min(lines.length - 1, lineNumber + 1);
        const n = [
            lines[top].substring(left, right),
            lines[lineNumber].substring(left, right),
            lines[bottom].substring(left, right),
        ];
        const c = n.join("").replace(/\d/g, "").replace(/\./g, "");
        return c.length > 0;
    });
    return validMatches.reduce((acc, curr) => acc + Number(curr.match), sum);
}, 0);
const task2 = lines.reduce((sum, line, lineNumber) => {
    const matches = [...line.matchAll(/\*/g)].map((m) => m.index);
    return matches.reduce((acc, index) => {
        const top = Math.max(0, lineNumber - 1);
        const bottom = Math.min(lines.length - 1, lineNumber + 1);
        const n = [];
        for (let i = top; i <= bottom; i++) {
            n.push(...[...lines[i].matchAll(/(\d+)/g)].map((m) => ({
                match: m[0],
                index: m.index,
            })));
        }
        const validN = n.filter((n) => Math.abs(n.index - index) < 2 || Math.abs(n.index + n.match.length - 1 - index) < 2);
        // console.log(validN.map(n => `${Math.abs(n.index-index)} ${Math.abs(n.index + n.match.length - index)} ${index} ${JSON.stringify(n)}`))
        // console.log('all', index, n);
        // console.log('valid', validN);
        if (validN.length === 2) {
            return acc + validN.reduce((s, m) => s * Number(m.match), 1);
        }
        return acc;
    }, sum);
}, 0);
console.log(task2);
//# sourceMappingURL=index.js.map
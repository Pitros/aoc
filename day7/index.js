"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const lines = fs_1.default.readFileSync("./day7/t.txt", "utf-8").split(/\n/).filter(Boolean);
const cardValues1 = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const cardValues2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
const run = (sol2) => {
    const cardValues = sol2 ? cardValues2 : cardValues1;
    const data = lines.map((l) => {
        const d = l.split(" ");
        const cardVC = d[0].split("").reduce((acc, c) => {
            acc[c] = acc[c] + 1 || 1;
            return acc;
        }, {});
        const rank = (() => {
            const jCount = cardVC["J"];
            if (sol2) {
                delete cardVC["J"];
            }
            const vals = Object.entries(cardVC).sort((a, z) => z[1] - a[1]);
            if (!vals[0]) {
                return 1;
            }
            if (sol2) {
                vals[0][1] += jCount || 0;
            }
            switch (vals.length) {
                case 1:
                    return 1;
                case 2: {
                    if (vals[0][1] === 4) {
                        return 2;
                    }
                    return 3;
                }
                case 3: {
                    if (vals[0][1] === 2 && vals[1][1] === 2) {
                        return 5;
                    }
                    return 4;
                }
                case 4:
                    return 6;
                case 5:
                    return 7;
            }
        })();
        return {
            cards: d[0],
            cardVC,
            rank,
            bid: Number(d[1]),
        };
    });
    data.sort((z, a) => {
        if (a.rank !== z.rank) {
            return a.rank - z.rank;
        }
        for (let i = 0; i < 5; i++) {
            if (a.cards[i] != z.cards[i]) {
                return cardValues.indexOf(a.cards[i]) - cardValues.indexOf(z.cards[i]);
            }
        }
        return 1;
    });
    const sum = data.reduce((sum, card, i) => {
        return sum + (i + 1) * card.bid;
    }, 0);
    return sum;
};
console.log(run(false));
console.log(run(true));
// console.log(data);
//# sourceMappingURL=index.js.map
//@ts-ignore
import fs from "fs";
const lines: string[] = fs.readFileSync("./day4/t.txt", "utf-8").split("\n").filter(Boolean);

const cards = lines.map((line, i) => {
  const [won, my] = line
    .split(":")[1]
    .split("|")
    .map((l) =>
      l
        .trim()
        .split(/\s+/)
        .map((n) => Number(n))
    );

  return { game: i + 1, won, my, wins: 0 };
});

const sol1 = () =>
  cards.reduce((total, card) => {
    let matches = 0;
    let num = 0;

    card.my.forEach((n) => {
      if (card.won.includes(n)) {
        matches = matches * 2 || 1;
        num = num + 1 || 1;
      }
    });

    card.wins = num;
    

    return total + matches;
  }, 0);

const sol2 = () => {
  const totals = {};

  let lastCard = 0;
  let total = 0;

  const cc = Object.keys(lines).reduce((acc, i) => {
    acc[i] = 1;
    return acc;
  }, {});

  while (lastCard < cards.length) {
    const card = cards[lastCard];
    totals[card.game] = totals[card.game] + 1 || 1;
    total++;
    cc[lastCard]--;

    let nextToAdd = lastCard + 1;
    for (let i = 1; i <= card.wins; i++) {
      if (cc[nextToAdd]) {
        cc[nextToAdd]++;
        if (cc[nextToAdd + 1]) {
          nextToAdd++;
        }
      }
    }

    if (cc[lastCard] == 0) {
      lastCard++;
    }
  }

  return total;
};

console.log(sol1());
console.log(sol2());

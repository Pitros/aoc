//@ts-ignore
import fs from "fs";
const lines: string[] = fs.readFileSync("./day6/t.txt", "utf-8").split(/\n/).filter(Boolean);

const data = lines.map((l) =>
  l
    .split(":")[1]
    .split(/\s+/)
    .filter(Boolean)
    .map((v) => Number(v))
);

const calcRace = (time: number, record: number) => {
  let winCount = 0;

  for (let i = 1; i < time; i++) {
    if (i * (time - i) > record) {
      winCount++;
    }
  }

  return winCount;
};

const sol1 = data[0]
  .map((time, raceNo) => calcRace(time, data[1][raceNo]))
  .reduce((result, race) => result * race, 1);

const data2 = lines.map((l) => l.split(":")[1].replace(/\s+/g, "")).map(n => Number(n));

const sol2 = calcRace(data2[0], data2[1]);

console.log(sol2);

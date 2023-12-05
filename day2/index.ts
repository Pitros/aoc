//@ts-ignore
import fs from "fs";
const lines: string[] = fs
  .readFileSync("./day2/test.txt", "utf-8")
  .split("\n")
  .filter(Boolean);
const testlines: string[] = fs
  .readFileSync("./day2/test_e.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

const games = lines.map((l, i) => {
  const draws = l
    .split(":")[1]
    .split(";")
    .map((m) =>
      m.split(",").map((d) => {
        const v = d.trim().split(" ");
        return { count: Number(v[0]), color: v[1] as "red" | "green" | "blue" };
      })
    );

  return { game: i + 1, draws };
});

const verifyDraw = ({
  color,
  count,
}: {
  count: number;
  color: "red" | "green" | "blue";
}) => {
  if (color === "red") {
    return count < 13;
  } else if (color === "green") {
    return count < 14;
  }
  return count < 15;
};

const sol1 = () => {
  const doable = games.filter((g) => {
    return g.draws.every((draw) => draw.every((pack) => verifyDraw(pack)));
  });

  const sum = doable.reduce((acc, cur) => cur.game + acc, 0);

  return sum;
};

const sol2 = () => {
  const minCounts = games.map((g) => {
    const mins = {
      red: 0,
      green: 0,
      blue: 0,
    };

    g.draws.forEach((draw) =>
      draw.forEach((pack) => {
        if (mins[pack.color] < pack.count) {
          mins[pack.color] = pack.count;
        }
      })
    );

    return Object.values(mins).reduce((acc, cur) => acc * cur);
  });

  const sum = minCounts.reduce((acc, cur) => cur + acc, 0);

  return sum
};

console.log(sol2());

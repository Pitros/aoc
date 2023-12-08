//@ts-ignore
import fs from "fs";
const lines: string[] = fs.readFileSync("./day8/t.txt", "utf-8").split(/\n/).filter(Boolean);

const instr: Array<"L" | "R"> = lines.shift().split("") as any;

const map = lines.reduce((map, route) => {
  const data = route.match(/\w+/g);
  map[data[0]] = { L: data[1], R: data[2] };
  return map;
}, {} as Record<string, { L: string; R: string }>);

const sol1 = () => {
  let tries = 0;
  let node = "AAA";

  while (node !== "ZZZ") {
    node = map[node][instr[tries % instr.length]];
    tries++;
  }

  return tries;
};

const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const sol2 = () => {
  const nodes = Object.keys(map).filter((node) => node.endsWith("A"));

  let tries = 0;

  const hits = nodes.reduce((acc, _node, i) => {
    acc[i] = [];
    return acc;
  }, {} as Record<string, number[]>);

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

  // brute force
  //   const matches = Object.values(hits).map((v) => v[0]);

  //   while (new Set(matches).size !== 1) {
  //     const min = Math.min(...matches);
  //     matches.forEach((match, i) => {
  //       if (match === min) {
  //         matches[i] += starts[i];
  //       }
  //     });
  //   }

  //   return matches[0];

  // lcm
  return starts.reduce((acc, curr) => lcm(acc, curr), 1);
};

console.log(sol1());
console.time("sol2");
console.log(sol2());
console.timeEnd("sol2");

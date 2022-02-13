import { Conjugator, Mood } from "./conjugation";

const [, , conclusive, mood] = process.argv;

const result = new Conjugator({ log: (val) => console.log(val) }).conjugate(
  conclusive,
  mood as Mood
);

console.log(result);

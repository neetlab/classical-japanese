import { Conjugator } from "./conjugation";

const NA = expect.anything();

test.each([
  [
    "ru",
    {
      mizen: "re",
      renyo: "re",
      shusi: "ru",
      rentai: "ruru",
      izen: "rure",
      mere: "reyo",
    },
  ],
  [
    "raru",
    {
      mizen: "rare",
      renyo: "rare",
      shusi: "raru",
      rentai: "raruru",
      izen: "rarure",
      mere: "rareyo",
    },
  ],
  [
    "su",
    {
      mizen: "se",
      renyo: "se",
      shusi: "su",
      rentai: "suru",
      izen: "sure",
      mere: "seyo",
    },
  ],
  [
    "sasu",
    {
      mizen: "sase",
      renyo: "sase",
      shusi: "sasu",
      rentai: "sasuru",
      izen: "sasure",
      mere: "saseyo",
    },
  ],
  [
    "simu",
    {
      mizen: "sime",
      renyo: "sime",
      shusi: "simu",
      rentai: "simuru",
      izen: "simure",
      mere: "simeyo",
    },
  ],
  [
    "zu",
    {
      mizen: "zara",
      renyo: "zari",
      shusi: "zu",
      rentai: "zaru",
      izen: "zare",
      mere: "zare",
    },
  ],
  [
    "mu",
    {
      mizen: NA,
      renyo: NA,
      shusi: "mu",
      rentai: "mu",
      izen: "me",
      mere: NA,
    },
  ],
  [
    "muzu",
    {
      mizen: NA,
      renyo: NA,
      shusi: "muzu",
      rentai: "muzuru",
      izen: "muzure",
      mere: NA,
    },
  ],
  [
    "masi",
    {
      mizen: "masika",
      renyo: NA,
      shusi: "masi",
      rentai: "masi",
      izen: "masika",
      mere: NA,
    },
  ],
  [
    "zi",
    {
      mizen: NA,
      renyo: NA,
      shusi: "zi",
      rentai: "zi",
      izen: "zi",
      mere: NA,
    },
  ],
  [
    "mahosi",
    {
      mizen: "mahosikara",
      renyo: "mahosikari",
      shusi: "mahosi",
      rentai: "mahosikaru",
      izen: "mahosikere",
      mere: NA,
    },
  ],
  [
    "tasi",
    {
      mizen: "takara",
      renyo: "takari",
      shusi: "tasi",
      rentai: "takaru",
      izen: "takere",
      mere: NA,
    },
  ],
  [
    "ki",
    {
      mizen: "se",
      renyo: NA,
      shusi: "ki",
      rentai: "si",
      izen: "sika",
      mere: NA,
    },
  ],
  [
    "keri",
    {
      mizen: "kera",
      renyo: NA,
      shusi: "keri",
      rentai: "keru",
      izen: "kere",
      mere: NA,
    },
  ],
  [
    "kemu",
    {
      mizen: NA,
      renyo: NA,
      shusi: "kemu",
      rentai: "kemu",
      izen: "keme",
      mere: NA,
    },
  ],
  [
    "tu",
    {
      mizen: "te",
      renyo: "te",
      shusi: "tu",
      rentai: "turu",
      izen: "ture",
      mere: "teyo",
    },
  ],
  [
    "nu",
    {
      mizen: "na",
      renyo: "ni",
      shusi: "nu",
      rentai: "nuru",
      izen: "nure",
      mere: "ne",
    },
  ],
  [
    "tari",
    {
      mizen: "tara",
      renyo: "tari",
      shusi: "tari",
      rentai: "taru",
      izen: "tare",
      mere: "tare",
    },
  ],
  [
    "ri",
    {
      mizen: "ra",
      renyo: "ri",
      shusi: "ri",
      rentai: "ru",
      izen: "re",
      mere: "re",
    },
  ],
  [
    "besi",
    {
      mizen: "bekara",
      renyo: "bekari",
      shusi: "besi",
      rentai: "bekaru",
      izen: "bekere",
      mere: NA,
    },
  ],
  [
    "ramu",
    {
      mizen: NA,
      renyo: NA,
      shusi: "ramu",
      rentai: "ramu",
      izen: "rame",
      mere: NA,
    },
  ],
  [
    "rasi",
    {
      mizen: NA,
      renyo: NA,
      shusi: "rasi",
      rentai: "rasi",
      izen: "rasi",
      mere: NA,
    },
  ],
  [
    "meri",
    {
      mizen: NA,
      renyo: "meri",
      shusi: "meri",
      rentai: "meru",
      izen: "mere",
      mere: NA,
    },
  ],
  [
    "nari",
    {
      mizen: NA,
      renyo: "nari",
      shusi: "nari",
      rentai: "naru",
      izen: "nare",
      mere: NA,
    },
  ],
  [
    "mazi",
    {
      mizen: "mazikara",
      renyo: "mazikari",
      shusi: "mazi",
      rentai: "mazikaru",
      izen: "mazikere",
      mere: NA,
    },
  ],
  [
    "nari",
    {
      mizen: "nara",
      renyo: "nari",
      shusi: "nari",
      rentai: "naru",
      izen: "nare",
      mere: "nare",
    },
  ],
  [
    "tari",
    {
      mizen: "tara",
      renyo: "tari",
      shusi: "tari",
      rentai: "taru",
      izen: "tare",
      mere: "tare",
    },
  ],
  [
    "gotosi",
    {
      mizen: "gotoku",
      renyo: "gotoku",
      shusi: "gotosi",
      rentai: "gotoki",
      izen: NA,
      mere: NA,
    },
  ],
])("test %s", (conclusive, expected) => {
  const conjugator = new Conjugator({ log: () => void {} });
  expect({
    mizen: conjugator.conjugate(conclusive, "mizen"),
    renyo: conjugator.conjugate(conclusive, "renyo"),
    shusi: conjugator.conjugate(conclusive, "shusi"),
    rentai: conjugator.conjugate(conclusive, "rentai"),
    izen: conjugator.conjugate(conclusive, "izen"),
    mere: conjugator.conjugate(conclusive, "mere"),
  }).toEqual(expected);
});

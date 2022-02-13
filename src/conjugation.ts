// 終止形で語幹が削られる助動詞のもとの語幹
const EXCEPTIONAL_CONCLUSIVE_FORMS = {
  zu: "zari",
  mahosi: "mahosikari",
  tasi: "takari",
  besi: "bekari",
  // ramu: "rami",
  mazi: "mazikari",
};

export type Mood = "mizen" | "renyo" | "shusi" | "rentai" | "izen" | "mere";

export type Flexions = {
  [mood in Mood]: string;
};

const getConjugationRoot = (conclusive: string) => {
  if (conclusive.endsWith("i")) {
    return conclusive.replace(/i$/, "");
  }

  if (conclusive.endsWith("u")) {
    return conclusive.replace(/u$/, "");
  }

  throw new Error();
};

const conjugateAuxiliaryVerbSuffixedByI = (root: string): Flexions => {
  return {
    mizen: root + "a",
    renyo: root + "i",
    shusi: root + "i",
    rentai: root + "u",
    izen: root + "e",
    mere: root + "e",
  };
};

const conjugateAuxiliaryVerbSuffixedByU = (root: string) => {
  return {
    mizen: root + "e",
    renyo: root + "e",
    shusi: root + "u",
    rentai: root + "uru",
    izen: root + "ure",
    mere: root + "eyo",
  };
};

const getFlexions = (_conclusive: string) => {
  const conclusive =
    EXCEPTIONAL_CONCLUSIVE_FORMS[_conclusive] != null
      ? EXCEPTIONAL_CONCLUSIVE_FORMS[_conclusive]
      : _conclusive;

  const root = getConjugationRoot(conclusive);

  if (conclusive.endsWith("i")) {
    return conjugateAuxiliaryVerbSuffixedByI(root);
  }

  if (conclusive.endsWith("u")) {
    return conjugateAuxiliaryVerbSuffixedByU(root);
  }

  throw new Error();
};

const harmonize = (mood: Mood, flexion: string) => {
  // 已然形の kari は kere になる
  // まほしかれ → まほしけれ
  if (mood === "izen") {
    flexion = flexion.replace(/kare$/, "kere");
  }

  // 終止形の kar が s になる
  // たし、べし、なほし、まじ
  if (mood === "shusi") {
    flexion = flexion.replace(/kar/, "s");
  }

  // emur または mur は m になる。
  if (!/[iuo]mur/.test(flexion)) {
    flexion = flexion.replace(/mur/, "m");
  }

  // 連音が一個になる
  flexion = flexion.replace(/sisi$/, "si");
  flexion = flexion.replace(/zisi$/, "zi");

  return flexion;
};

export const conjugate = (conclusive: string) => {
  const flexions = getFlexions(conclusive);

  const e = Object.entries(flexions).map(([mood, flexion]) => [
    mood,
    harmonize(mood as Mood, flexion),
  ]);

  return Object.fromEntries(e);
};

// 終止形で語幹が削られる助動詞のもとの語幹
const EXCEPTIONAL_CONCLUSIVE_FORMS: Record<string, string | null> = {
  zu: "zari",
  mahosi: "mahosikari",
  tasi: "takari",
  besi: "bekari",
  mazi: "mazikari",
};

export type Mood = "mizen" | "renyo" | "shusi" | "rentai" | "izen" | "mere";

export type Flexions = {
  [mood in Mood]: string;
};

export interface Logger {
  log(text: string): void;
}

export class Conjugator {
  constructor(private readonly _logger: Logger) {}

  private _getConjugationRoot = (conclusive: string): string => {
    if (conclusive.endsWith("i")) {
      const root = conclusive.replace(/i$/, "");
      this._logger.log(
        `[語幹] この助動詞の語幹は終止形の最後の母音を除いた ${root} です。`
      );
      return root;
    }

    if (conclusive.endsWith("u")) {
      const root = conclusive.replace(/u$/, "");
      this._logger.log(
        `[語幹] この助動詞の語幹は終止形の最後の母音を除いた ${root} です。`
      );
      return root;
    }

    throw new Error();
  };

  private _conjugateAuxiliaryVerbSuffixedByI = (
    root: string,
    mood: Mood
  ): string => {
    if (mood === "mizen") {
      const flexion = root + "a";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、未然形の活用 a を加えた ${flexion} です。`
      );
      return flexion;
    }

    if (mood === "renyo") {
      const flexion = root + "i";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、連用形の活用 i を加えた ${flexion} です。`
      );
      return flexion;
    }

    if (mood === "shusi") {
      const flexion = root + "i";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、終止形の活用は i を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "rentai") {
      const flexion = root + "u";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、連体形の活用は u を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "izen") {
      const flexion = root + "e";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、已然形の活用は e を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "mere") {
      const flexion = root + "e";
      this._logger.log(
        `[活用] 終止形が i で終わる助動詞のため、命令形の活用は e を加えた${flexion} です。`
      );
      return flexion;
    }

    throw new Error();
  };

  private _conjugateAuxiliaryVerbSuffixedByU = (
    root: string,
    mood: Mood
  ): string => {
    if (mood === "mizen") {
      const flexion = root + "e";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、未然形の活用は e を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "renyo") {
      const flexion = root + "e";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、連用形の活用は e を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "shusi") {
      const flexion = root + "u";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、終止形の活用は u を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "rentai") {
      const flexion = root + "uru";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、連体形の活用は uru を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "izen") {
      const flexion = root + "ure";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、已然形の活用は ure を加えた${flexion} です。`
      );
      return flexion;
    }

    if (mood === "mere") {
      const flexion = root + "eyo";
      this._logger.log(
        `[活用] 終止形が u で終わる助動詞のため、命令形の活用は eyo を加えた${flexion} です。`
      );
      return flexion;
    }

    throw new Error();
  };

  private _getFlexions = (_conclusive: string, mood: Mood): string => {
    const originalConclusive = EXCEPTIONAL_CONCLUSIVE_FORMS[_conclusive];
    const conclusive =
      originalConclusive != null ? originalConclusive : _conclusive;

    if (originalConclusive != null) {
      this._logger.log(
        `[終止形の例外] この助動詞は終止形で語幹が削られるため、終止形として「${conclusive}」を使用します。`
      );
    }

    const root = this._getConjugationRoot(conclusive);

    if (conclusive.endsWith("i")) {
      return this._conjugateAuxiliaryVerbSuffixedByI(root, mood);
    }

    if (conclusive.endsWith("u")) {
      return this._conjugateAuxiliaryVerbSuffixedByU(root, mood);
    }

    throw new Error();
  };

  private _harmonize = (mood: Mood, flexion: string): string => {
    // 已然形の kari は kere になる
    // まほしかれ → まほしけれ
    if (mood === "izen" && flexion.match(/kare$/)) {
      flexion = flexion.replace(/kare$/, "kere");
      this._logger.log(
        `[音便] 已然形は kare で終わるため「${flexion}」になります`
      );
    }

    // 終止形の kar が s になる
    // たし、べし、なほし、まじ
    if (mood === "shusi" && flexion.match(/kar/)) {
      flexion = flexion.replace(/kar/, "s");
      this._logger.log(
        `[音便] 終止形は kar が含まれるため、「${flexion}」 になります`
      );
    }

    // emur または mur は m になる。
    if (!/imur/.test(flexion) && /mur/.test(flexion)) {
      flexion = flexion.replace(/mur/, "m");
      this._logger.log(
        `[音便] mur が含まれ、直前の母音が i でないため「${flexion}」 になります`
      );
    }

    // 連音が一個になる
    if (flexion.match(/(sisi|zisi)/)) {
      flexion = flexion.replace(/sisi$/, "si");
      flexion = flexion.replace(/zisi$/, "zi");
      this._logger.log(`[音便] 連音が含まれるため「${flexion}」 になります`);
    }

    return flexion;
  };

  public conjugate = (conclusive: string, mood: Mood) => {
    const flexion = this._getFlexions(conclusive, mood);
    const harmonized = this._harmonize(mood, flexion);
    return harmonized;
  };
}

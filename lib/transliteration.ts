// Cyrillic to Latin mapping for Uzbek
const cyrillicToLatin: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "j",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "x",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sh",
  ъ: "'",
  ы: "i",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  ў: "o'",
  қ: "q",
  ғ: "g'",
  ҳ: "h",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "J",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "X",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Sh",
  Ъ: "'",
  Ы: "I",
  Ь: "",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
  Ў: "O'",
  Қ: "Q",
  Ғ: "G'",
  Ҳ: "H",
}

// Latin to Cyrillic mapping for Uzbek
const latinToCyrillic: Record<string, string> = {
  a: "а",
  b: "б",
  v: "в",
  g: "г",
  d: "д",
  e: "е",
  j: "ж",
  z: "з",
  i: "и",
  y: "й",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
  x: "х",
  h: "ҳ",
  q: "қ",
  A: "А",
  B: "Б",
  V: "В",
  G: "Г",
  D: "Д",
  E: "Е",
  J: "Ж",
  Z: "З",
  I: "И",
  Y: "Й",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  O: "О",
  P: "П",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  F: "Ф",
  X: "Х",
  H: "Ҳ",
  Q: "Қ",
}

// Special combinations for Latin to Cyrillic
const latinSpecialCombinations: [string, string][] = [
  ["yo", "ё"],
  ["ch", "ч"],
  ["sh", "ш"],
  ["ts", "ц"],
  ["yu", "ю"],
  ["ya", "я"],
  ["o'", "ў"],
  ["g'", "ғ"],
  ["Yo", "Ё"],
  ["Ch", "Ч"],
  ["Sh", "Ш"],
  ["Ts", "Ц"],
  ["Yu", "Ю"],
  ["Ya", "Я"],
  ["O'", "Ў"],
  ["G'", "Ғ"],
]

// Special combinations for Cyrillic to Latin
const cyrillicSpecialChars: string[] = ["ё", "ч", "ш", "ц", "ю", "я", "ў", "ғ", "Ё", "Ч", "Ш", "Ц", "Ю", "Я", "Ў", "Ғ"]

/**
 * Transliterate text between Cyrillic and Latin Uzbek
 *
 * @param text Text to transliterate
 * @param direction Direction of transliteration ('cyrillic-to-latin' or 'latin-to-cyrillic')
 * @returns Transliterated text
 */
export function transliterate(text: string, direction: "cyrillic-to-latin" | "latin-to-cyrillic"): string {
  if (!text) return ""

  // Handle HTML content by preserving tags
  if (text.includes("<")) {
    // Split text by HTML tags
    const parts = text.split(/(<[^>]*>)/)
    return parts
      .map((part) => {
        // If it's an HTML tag, leave it as is
        if (part.startsWith("<") && part.endsWith(">")) {
          return part
        }
        // Otherwise, transliterate the text
        return transliterateText(part, direction)
      })
      .join("")
  }

  return transliterateText(text, direction)
}

/**
 * Transliterate plain text without HTML
 */
function transliterateText(text: string, direction: "cyrillic-to-latin" | "latin-to-cyrillic"): string {
  if (direction === "cyrillic-to-latin") {
    let result = text

    // First replace special characters
    for (const char of cyrillicSpecialChars) {
      if (result.includes(char)) {
        result = result.split(char).join(cyrillicToLatin[char] || char)
      }
    }

    // Then replace remaining chars
    return result
      .split("")
      .map((char) => cyrillicToLatin[char] || char)
      .join("")
  } else {
    let result = text

    // First replace special combinations
    for (const [latin, cyrillic] of latinSpecialCombinations) {
      result = result.split(latin).join(cyrillic)
    }

    // Then replace remaining single characters
    return result
      .split("")
      .map((char) => latinToCyrillic[char] || char)
      .join("")
  }
}


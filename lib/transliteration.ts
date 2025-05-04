/**
 * Transliteration utility for Uzbek language
 * Converts between Latin and Cyrillic scripts
 */

// Latin to Cyrillic mapping
const latinToCyrillic: Record<string, string> = {
  a: "а",
  b: "б",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "ҳ",
  i: "и",
  j: "ж",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "қ",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  x: "х",
  y: "й",
  z: "з",
  A: "А",
  B: "Б",
  D: "Д",
  E: "Е",
  F: "Ф",
  G: "Г",
  H: "Ҳ",
  I: "И",
  J: "Ж",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  O: "О",
  P: "П",
  Q: "Қ",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  V: "В",
  X: "Х",
  Y: "Й",
  Z: "З",
  sh: "ш",
  Sh: "Ш",
  SH: "Ш",
  ch: "ч",
  Ch: "Ч",
  CH: "Ч",
  yo: "ё",
  Yo: "Ё",
  YO: "Ё",
  yu: "ю",
  Yu: "Ю",
  YU: "Ю",
  ya: "я",
  Ya: "Я",
  YA: "Я",
  "o'": "ў",
  "O'": "Ў",
  "g'": "ғ",
  "G'": "Ғ",
  "'": "ъ",
}

// Cyrillic to Latin mapping
const cyrillicToLatin: Record<string, string> = {
  а: "a",
  б: "b",
  д: "d",
  е: "e",
  ф: "f",
  г: "g",
  ҳ: "h",
  и: "i",
  ж: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  қ: "q",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  в: "v",
  х: "x",
  й: "y",
  з: "z",
  А: "A",
  Б: "B",
  Д: "D",
  Е: "E",
  Ф: "F",
  Г: "G",
  Ҳ: "H",
  И: "I",
  Ж: "J",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Қ: "Q",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  В: "V",
  Х: "X",
  Й: "Y",
  З: "Z",
  ш: "sh",
  Ш: "Sh",
  ч: "ch",
  Ч: "Ch",
  ё: "yo",
  Ё: "Yo",
  ю: "yu",
  Ю: "Yu",
  я: "ya",
  Я: "Ya",
  ў: "o'",
  Ў: "O'",
  ғ: "g'",
  Ғ: "G'",
  ъ: "'",
}

// Special combinations for Latin to Cyrillic
const latinSpecialCombinations = ["sh", "ch", "yo", "yu", "ya", "o'", "g'"]
const latinSpecialCombinationsCapitalized = ["Sh", "Ch", "Yo", "Yu", "Ya", "O'", "G'"]
const latinSpecialCombinationsUppercase = ["SH", "CH", "YO", "YU", "YA"]

/**
 * Detects if the text is in Cyrillic or Latin script
 * @param text Text to analyze
 * @returns 'cyrillic' or 'latin'
 */
function detectScript(text: string): "cyrillic" | "latin" {
  // Count Cyrillic and Latin characters
  let cyrillicCount = 0
  let latinCount = 0

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (/[а-яА-ЯёЁўЎқҚғҒҳҲ]/.test(char)) {
      cyrillicCount++
    } else if (/[a-zA-Z]/.test(char)) {
      latinCount++
    }
  }

  return cyrillicCount > latinCount ? "cyrillic" : "latin"
}

/**
 * Transliterates text between Latin and Cyrillic scripts
 * @param text Text to transliterate
 * @param direction Optional direction ('latin-to-cyrillic' or 'cyrillic-to-latin')
 * @returns Transliterated text
 */
export function transliterate(text: string, direction?: "latin-to-cyrillic" | "cyrillic-to-latin"): string {
  // If no direction is specified, detect it
  if (!direction) {
    const detectedScript = detectScript(text)
    direction = detectedScript === "latin" ? "latin-to-cyrillic" : "cyrillic-to-latin"
  }

  // Handle HTML tags
  const htmlTagRegex = /<[^>]*>/g
  const htmlTags: string[] = []

  // Replace HTML tags with placeholders
  let processedText = text.replace(htmlTagRegex, (match) => {
    htmlTags.push(match)
    return `__HTML_TAG_${htmlTags.length - 1}__`
  })

  let result = ""

  if (direction === "latin-to-cyrillic") {
    // Process special combinations first
    for (const combo of [
      ...latinSpecialCombinationsUppercase,
      ...latinSpecialCombinationsCapitalized,
      ...latinSpecialCombinations,
    ]) {
      processedText = processedText.split(combo).join(latinToCyrillic[combo] || combo)
    }

    // Process remaining characters
    for (let i = 0; i < processedText.length; i++) {
      const char = processedText[i]
      result += latinToCyrillic[char] || char
    }
  } else {
    // Process character by character for Cyrillic to Latin
    for (let i = 0; i < processedText.length; i++) {
      const char = processedText[i]
      result += cyrillicToLatin[char] || char
    }
  }

  // Restore HTML tags
  return result.replace(/__HTML_TAG_(\d+)__/g, (_, index) => htmlTags[Number.parseInt(index)])
}

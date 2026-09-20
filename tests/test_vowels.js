function isVowel(char) {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(char.toLowerCase());
}

function countVowels(text) {
  if (!text) {
    return {
      total: 0,
      breakdown: { a: 0, e: 0, i: 0, o: 0, u: 0 },
      consonants: 0,
      words: 0,
      characters: 0,
    };
  }

  const clean = text.toLowerCase();
  let total = 0;
  const breakdown = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  let consonants = 0;

  for (let i = 0; i < clean.length; i++) {
    const char = clean.charAt(i);
    if (isVowel(char)) {
      total++;
      if (breakdown[char] !== undefined) {
        breakdown[char]++;
      }
    } else if (char >= "a" && char <= "z") {
      consonants++;
    }
  }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;

  return { total, breakdown, consonants, words, characters };
}

function assert(condition, message) {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

console.log("Running Vowel Counter Unit Tests...\n");

// Test 1: Empty text
const emptyRes = countVowels("");
assert(emptyRes.total === 0 && emptyRes.characters === 0, "Empty text returns 0 vowels and 0 characters");

// Test 2: Standard lowercase sentence
const res1 = countVowels("hello world");
// 'e', 'o', 'o' -> 3 vowels
assert(res1.total === 3, "Detects 3 vowels in 'hello world'");
assert(res1.breakdown.e === 1 && res1.breakdown.o === 2, "Breakdown counts 1 'e' and 2 'o'");
assert(res1.consonants === 7, "Counts 7 consonants in 'hello world'");
assert(res1.words === 2, "Counts 2 words in 'hello world'");

// Test 3: Uppercase and mixed case
const res2 = countVowels("AEIOU aeiou");
assert(res2.total === 10, "Detects 10 vowels in uppercase and lowercase 'AEIOU aeiou'");
assert(res2.breakdown.a === 2, "Breakdown correctly identifies 2 'a' vowels");

// Test 4: Text with no vowels
const res3 = countVowels("rhythm crypt 123 !@#");
assert(res3.total === 0, "Correctly identifies 0 vowels in 'rhythm crypt 123 !@#'");
assert(res3.consonants === 11, "Correctly counts 11 consonants");

// Test 5: Pangram test
const res4 = countVowels("The quick brown fox jumps over the lazy dog");
// e, u, i, o, o, u, o, e, e, a, o -> 11 vowels
assert(res4.total === 11, "Pangram vowel count matches expected 11");
assert(res4.words === 9, "Pangram word count matches 9");

console.log("\nAll 5 Vowel Counter unit tests passed successfully!");

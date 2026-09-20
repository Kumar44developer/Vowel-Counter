function isVowel(char) {
  var vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(char ? char.toLowerCase() : "");
}

function checkVowels() {
  var inputElem = document.getElementById("inputText");
  var text = inputElem ? inputElem.value : "";
  var clean = text.toLowerCase();
  
  var vowelCount = 0;
  var breakdown = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  var consonants = 0;

  for (var i = 0; i < clean.length; i++) {
    var char = clean.charAt(i);
    if (isVowel(char)) {
      vowelCount++;
      if (breakdown[char] !== undefined) {
        breakdown[char]++;
      }
    } else if (char >= "a" && char <= "z") {
      consonants++;
    }
  }

  var words = text.trim() ? text.trim().split(/\s+/).length : 0;
  var characters = text.length;

  var result = document.getElementById("result");
  if (result) {
    result.textContent = "Total Vowels: " + vowelCount;
  }

  updateBreakdownUI({
    vowels: vowelCount,
    breakdown: breakdown,
    consonants: consonants,
    words: words,
    characters: characters
  });
}

function updateBreakdownUI(stats) {
  var ids = ["a", "e", "i", "o", "u"];
  ids.forEach(function (v) {
    var badge = document.getElementById("count-" + v);
    if (badge) {
      badge.textContent = stats.breakdown[v];
    }
  });

  var countConsonants = document.getElementById("count-consonants");
  if (countConsonants) countConsonants.textContent = stats.consonants;

  var countWords = document.getElementById("count-words");
  if (countWords) countWords.textContent = stats.words;

  var countChars = document.getElementById("count-chars");
  if (countChars) countChars.textContent = stats.characters;
}

function setSampleText(sample) {
  var inputElem = document.getElementById("inputText");
  if (inputElem) {
    inputElem.value = sample;
    checkVowels();
    inputElem.focus();
  }
}

function clearText() {
  var inputElem = document.getElementById("inputText");
  if (inputElem) {
    inputElem.value = "";
    checkVowels();
    inputElem.focus();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var inputElem = document.getElementById("inputText");
  if (inputElem) {
    inputElem.addEventListener("input", checkVowels);
  }
});

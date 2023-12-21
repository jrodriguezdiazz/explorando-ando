const nlp = require('compromise');
const levenshtein = require('js-levenshtein');


const isSimilar = (word1, word2) => {
  const maxDistance = Math.floor(Math.max(word1.length, word2.length) * 0.2);
  return levenshtein(word1.toLowerCase(), word2.toLowerCase()) <= maxDistance;
};

const analyzeText = (text, qualities) => {
  const doc = nlp(text);
  const nouns = doc.nouns().out('array');
  const adjectives = doc.adjectives().out('array');
  const words = nouns.concat(adjectives);
  return qualities.filter(quality =>
    words.some(word => isSimilar(word, quality))
  );
};



module.exports = {
  analyzeText
};

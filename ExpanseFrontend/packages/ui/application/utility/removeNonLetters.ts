/*
    /[^\p{L}]/gu: This regular expression matches any character that is not a Unicode letter.
    \p{L}: Matches any kind of letter from any language.
    The u flag enables Unicode matching.
    The g flag ensures that all matches in the string are replaced, not just the first one. 

    const originalString = "Héllo, Wørld! 123";
    const cleanedString = removeNonLetters(originalString);

    console.log(cleanedString); // Output: HélloWørld
*/
export function removeNonLetters(str) {
  return str.replace(/[^\p{L}]/gu, "")
}

/*
    /[^0-9]/g: This regular expression matches any character that is not a digit (0-9).
    replace(/[^0-9]/g, ''): This method call replaces all non-number characters with an empty string, effectively removing them from the original string. 
    const originalString = "Phone: (123) 456-7890";
    const cleanedString = removeNonNumbers(originalString);

    console.log(cleanedString); // Output: 1234567890
*/
export function removeNonNumbers(str) {
  return str.replace(/[^0-9]/g, "")
}

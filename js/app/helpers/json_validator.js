export default function JsonValidator() {}

/**
 * Returns true if the given JSON string str is valid JSON
 */
JsonValidator.isValidJson = function(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

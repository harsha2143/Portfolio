const BACKTICK_LIKES = /[\u02CB\u2035\u2032\uFF40\u2018\u2019]/g;
const SMART_DOUBLE = /[\u201C\u201D]/g;
const SMART_SINGLE = /[\u2018\u2019]/g;
const ELLIPSIS = /\u2026/g;
const EM_DASH = /\u2014/g;
const EN_DASH = /\u2013/g;
const NBSP = /\u00A0/g;

export function preprocessContent(content) {
  if (!content) return content;
  return content
    .replace(BACKTICK_LIKES, "`")
    .replace(SMART_DOUBLE, '"')
    .replace(SMART_SINGLE, "'")
    .replace(ELLIPSIS, "...")
    .replace(EM_DASH, "---")
    .replace(EN_DASH, "--")
    .replace(NBSP, " ");
}

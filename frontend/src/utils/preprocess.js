const BACKTICK_LIKES = /[\u02CB\u2035\u2032\uFF40\u2018\u2019]/g;

export function preprocessContent(content) {
  if (!content) return content;
  return content.replace(BACKTICK_LIKES, '`');
}

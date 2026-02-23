export function getReadingTimeFromHtml(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const WORDS_PER_MINUTE = 200;
  const wordCount = text.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

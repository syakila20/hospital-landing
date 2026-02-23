export function injectHeadingIds(html: string) {
  let index = 0;
  return html.replace(/<h2>/gi, () => {
    return `<h2 id="section-${index++}">`;
  });
}

export function extractToc(html: string) {
  const matches = [...html.matchAll(/<h2 id="(section-\d+)">(.*?)<\/h2>/gi)];

  return matches.map((match) => ({
    id: match[1],
    title: match[2],
  }));
}

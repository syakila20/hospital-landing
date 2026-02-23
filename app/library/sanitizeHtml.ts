import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

export function wrapImages(html: string) {
  return html.replace(
    /<img([^>]*)alt="([^"]*)"([^>]*)>/g,
    `
    <figure class="health-figure">
      <div class="health-image-wrapper">
        <img $1 alt="$2" $3 loading="lazy" decoding="async" />
      </div>
      <figcaption class="health-caption">
        $2
      </figcaption>
    </figure>
    `,
  );
}

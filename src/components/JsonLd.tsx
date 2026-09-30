/**
 * Renders a JSON-LD structured data block into the document head.
 *
 * Each node gets a stable `id` so the tag is emitted exactly once per document
 * instead of stacking duplicates when a page includes several schemas.
 */
export function JsonLd({ id, data }: { id: string; data: object | object[] }) {
  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data;

  return (
    <script
      id={`jsonld-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Tools() {
  const tools = [
    { slug: 'jpg-to-pdf', title: 'JPG → PDF' },
    { slug: 'merge', title: 'Merge PDF' },
    { slug: 'split', title: 'Split PDF' },
    { slug: 'compress', title: 'Compress PDF' },
    { slug: 'pdf-to-jpg', title: 'PDF → JPG' },
    { slug: 'word-to-pdf', title: 'Word → PDF' },
    { slug: 'protect', title: 'PDF Protect (Password)' },
    { slug: 'unlock', title: 'PDF Unlock' },
  ];
  return (
    <div className="container">
      <h2>Tools</h2>
      <div className="tools-grid">
        {tools.map(t => (
          <div className="card" key={t.slug}>
            <h3>{t.title}</h3>
            <p>Tool: {t.slug}</p>
            <a href={`/tools/${t.slug}`}>Open</a>
          </div>
        ))}
      </div>
    </div>
  );
}

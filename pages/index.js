export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>PDFNest</h1>
        <nav>
          <a href="/tools">Tools</a> | <a href="/auth/login">Login</a>
        </nav>
      </header>

      <section>
        <h2>Welcome to PDFNest</h2>
        <p>Convert, merge, split and protect PDF files — Vercel-ready starter.</p>
      </section>
    </div>
  );
}

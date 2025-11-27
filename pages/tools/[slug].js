import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ToolPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!files) return alert("Please select files");
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append('file', f));
    setLoading(true);
    try {
      const resp = await axios.post(`/api/tools/${slug}`, fd, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([resp.data]));
      const a = document.createElement('a');
      // determine filename
      a.href = url;
      a.download = `${slug}-result`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      const m = err?.response?.data?.message || err.message;
      alert("Error: " + m);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Tool: {slug}</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <div style={{marginTop:12}}>
          <button type="submit">{loading ? 'Processing...' : 'Process'}</button>
        </div>
      </form>
    </div>
  );
}

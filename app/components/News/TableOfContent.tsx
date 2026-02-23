type TocItem = {
  id: string;
  title: string;
};

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold mb-3">Daftar Isi</h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-slate-600 hover:text-blue-600"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

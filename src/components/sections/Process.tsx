const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "Kita bicara: masalah apa, target user siapa, batasan budget & waktu. Tanpa jargon, tanpa upselling.",
  },
  {
    n: "02",
    title: "Proposal",
    desc: "Saya kirim ruang lingkup, timeline, dan harga tetap. Anda tahu persis apa yang akan dibangun.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Saya kerjakan dengan update mingguan dan akses preview. Anda bisa kasih feedback kapan saja.",
  },
  {
    n: "04",
    title: "Handover",
    desc: "Deploy, dokumentasi, dan training singkat. Garansi 30 hari untuk bug atau penyesuaian kecil.",
  },
];

export function Process() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="eyebrow">Cara kerja</div>
        <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
          Empat langkah,
          <br />
          <span className="italic text-accent">tanpa kejutan di tengah jalan.</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-surface p-6">
              <div className="font-serif text-3xl text-accent">{s.n}</div>
              <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

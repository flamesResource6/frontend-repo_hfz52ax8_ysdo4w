import { useState } from 'react';

export default function Scanner() {
  const [barcode, setBarcode] = useState('');
  const [scanned, setScanned] = useState([]);

  const onScan = () => {
    if (!barcode) return;
    setScanned((s) => [{ code: barcode, time: new Date().toLocaleTimeString() }, ...s]);
    setBarcode('');
  };

  return (
    <section id="scanner" className="py-10 px-6">
      <div className="max-w-3xl mx-auto rounded-2xl bg-slate-900/70 border border-white/10 p-6">
        <h3 className="text-white text-xl font-semibold">Barcode Scanner</h3>
        <p className="text-white/60 text-sm mt-1">Demo input to simulate scanning a cylinder barcode.</p>
        <div className="mt-4 flex gap-3">
          <input value={barcode} onChange={(e)=>setBarcode(e.target.value)} placeholder="Scan or type barcode" className="flex-1 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
          <button onClick={onScan} className="px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium">Add</button>
        </div>
        <div className="mt-4 space-y-2">
          {scanned.map((s, i)=> (
            <div key={i} className="rounded-xl border border-white/10 p-3 text-white/80 text-sm flex items-center justify-between">
              <span>{s.code}</span>
              <span className="text-white/50">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

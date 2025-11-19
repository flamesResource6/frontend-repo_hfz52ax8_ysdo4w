import { useEffect, useState } from 'react';

export default function Inventory() {
  const backend = import.meta.env.VITE_BACKEND_URL || '';
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ barcode: '', gas_type: 'LPG', capacity_kg: 12 });

  const load = async () => {
    const res = await fetch(`${backend}/inventory`).then(r=>r.json()).catch(()=>[]);
    setItems(res);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${backend}/inventory`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, capacity_kg: parseFloat(form.capacity_kg) })});
      setForm({ barcode: '', gas_type: 'LPG', capacity_kg: 12 });
      load();
    } catch {}
  };

  return (
    <section id="inventory" className="py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <h3 className="text-white text-xl font-semibold">Add Cylinder</h3>
          <form onSubmit={add} className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-white/70">Barcode</label>
              <input value={form.barcode} onChange={e=>setForm(f=>({...f, barcode: e.target.value}))} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" required />
            </div>
            <div>
              <label className="block text-sm text-white/70">Gas Type</label>
              <select value={form.gas_type} onChange={e=>setForm(f=>({...f, gas_type: e.target.value}))} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white">
                <option>LPG</option>
                <option>O2</option>
                <option>CO2</option>
                <option>N2</option>
                <option>Ar</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70">Capacity (kg)</label>
              <input type="number" step="0.1" value={form.capacity_kg} onChange={e=>setForm(f=>({...f, capacity_kg: e.target.value}))} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
            </div>
            <div className="col-span-2">
              <button className="w-full py-2.5 rounded-lg bg-white text-slate-900 font-medium">Add Cylinder</button>
            </div>
          </form>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 overflow-x-auto">
          <h3 className="text-white text-xl font-semibold mb-4">Inventory</h3>
          <table className="w-full text-left text-white/80 text-sm">
            <thead className="text-white/60">
              <tr>
                <th className="py-2">Barcode</th>
                <th className="py-2">Gas</th>
                <th className="py-2">Capacity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx} className="border-t border-white/10">
                  <td className="py-2">{it.barcode}</td>
                  <td className="py-2">{it.gas_type}</td>
                  <td className="py-2">{it.capacity_kg} kg</td>
                  <td className="py-2">{it.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

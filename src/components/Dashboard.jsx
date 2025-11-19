import { useEffect, useState } from 'react';

export default function Dashboard({ user }) {
  const backend = import.meta.env.VITE_BACKEND_URL || '';
  const [stats, setStats] = useState({ cylinders: 0, orders: 0, deliveries: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [inv, ord, del] = await Promise.all([
          fetch(`${backend}/inventory`).then(r=>r.json()).catch(()=>[]),
          fetch(`${backend}/orders`).then(r=>r.json()).catch(()=>[]),
          fetch(`${backend}/deliveries`).then(r=>r.json()).catch(()=>[]),
        ]);
        setStats({ cylinders: inv.length||0, orders: ord.length||0, deliveries: del.length||0 });
      } catch {}
    };
    load();
  }, [backend]);

  return (
    <section className="py-10 px-6" id="dashboard">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <p className="text-white/60 text-sm">Cylinders</p>
          <p className="text-3xl font-semibold text-white">{stats.cylinders}</p>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <p className="text-white/60 text-sm">Orders</p>
          <p className="text-3xl font-semibold text-white">{stats.orders}</p>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <p className="text-white/60 text-sm">Deliveries</p>
          <p className="text-3xl font-semibold text-white">{stats.deliveries}</p>
        </div>
      </div>
    </section>
  );
}

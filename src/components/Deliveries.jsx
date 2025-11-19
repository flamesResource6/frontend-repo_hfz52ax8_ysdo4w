import { useEffect, useState } from 'react';

export default function Deliveries() {
  const backend = import.meta.env.VITE_BACKEND_URL || '';
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const t = await fetch(`${backend}/deliveries`).then(r=>r.json()).catch(()=>[]);
    setTasks(t);
  };

  useEffect(() => { load(); }, []);

  const createTask = async () => {
    await fetch(`${backend}/deliveries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: 'manual', status: 'assigned' }) });
    load();
  };

  return (
    <section id="deliveries" className="py-10 px-6">
      <div className="max-w-6xl mx-auto rounded-2xl bg-slate-900/70 border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-semibold">Delivery Tasks</h3>
          <button onClick={createTask} className="px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium">New Task</button>
        </div>
        <div className="mt-4 space-y-3">
          {tasks.map((t)=> (
            <div key={t._id} className="rounded-xl border border-white/10 p-3 text-white/80 text-sm">
              <p>Task #{t._id} • Status: {t.status} • Order: {t.order_id}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

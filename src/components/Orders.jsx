import { useEffect, useState } from 'react';

export default function Orders() {
  const backend = import.meta.env.VITE_BACKEND_URL || '';
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', email: '' });
  const [cart, setCart] = useState([{ gas_type: 'LPG', capacity_kg: 12, quantity: 1 }]);

  const load = async () => {
    const [cust, ord] = await Promise.all([
      fetch(`${backend}/customers`).then(r=>r.json()).catch(()=>[]),
      fetch(`${backend}/orders`).then(r=>r.json()).catch(()=>[]),
    ]);
    setCustomers(cust);
    setOrders(ord);
  };

  useEffect(() => { load(); }, []);

  const addCustomer = async (e) => {
    e.preventDefault();
    await fetch(`${backend}/customers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', phone: '', address: '', email: '' });
    load();
  };

  const addOrder = async (customer_id) => {
    await fetch(`${backend}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer_id, items: cart }) });
    load();
  };

  return (
    <section id="orders" className="py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <h3 className="text-white text-xl font-semibold">Create Customer</h3>
          <form onSubmit={addCustomer} className="mt-4 grid grid-cols-2 gap-4">
            <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} className="col-span-2 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" required />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm(f=>({...f, phone: e.target.value}))} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" required />
            <input placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
            <input placeholder="Address" value={form.address} onChange={e=>setForm(f=>({...f, address: e.target.value}))} className="col-span-2 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" required />
            <button className="col-span-2 py-2.5 rounded-lg bg-white text-slate-900 font-medium">Add Customer</button>
          </form>
          <div className="mt-6">
            <h4 className="text-white font-medium">Cart</h4>
            <div className="mt-3 flex gap-3">
              <select value={cart[0].gas_type} onChange={e=>setCart([{...cart[0], gas_type: e.target.value}])} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white">
                <option>LPG</option>
                <option>O2</option>
                <option>CO2</option>
              </select>
              <input type="number" step="0.1" value={cart[0].capacity_kg} onChange={e=>setCart([{...cart[0], capacity_kg: parseFloat(e.target.value) }])} className="w-28 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
              <input type="number" value={cart[0].quantity} onChange={e=>setCart([{...cart[0], quantity: parseInt(e.target.value) }])} className="w-24 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Customers & Orders</h3>
          <div className="space-y-4">
            {customers.map((c)=> (
              <div key={c._id} className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{c.name}</p>
                    <p className="text-white/60 text-sm">{c.phone} • {c.address}</p>
                  </div>
                  <button onClick={()=>addOrder(c._id)} className="px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium">Place Order</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h4 className="text-white font-medium mb-2">Recent Orders</h4>
            <div className="space-y-3">
              {orders.map((o)=> (
                <div key={o._id} className="rounded-xl border border-white/10 p-3 text-white/80 text-sm">
                  <p>Order #{o._id} • Status: {o.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

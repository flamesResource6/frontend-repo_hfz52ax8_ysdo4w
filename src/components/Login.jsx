import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@gas.local');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${backend}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login" className="py-10 px-6">
      <div className="max-w-md mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white text-2xl font-semibold">Login</h2>
        <p className="text-white/60 text-sm mt-1">Use the demo account to sign in.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-white/80">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm text-white/80">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full py-2.5 rounded-lg bg-white text-slate-900 font-medium disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
}

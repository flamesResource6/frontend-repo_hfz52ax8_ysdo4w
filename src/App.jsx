import { useState } from 'react'
import Hero from './components/Hero'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Inventory from './components/Inventory'
import Orders from './components/Orders'
import Deliveries from './components/Deliveries'
import Scanner from './components/Scanner'

function App() {
  const [session, setSession] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      {!session ? (
        <Login onLogin={setSession} />
      ) : (
        <>
          <Dashboard user={session.user} />
          <div id="features" className="px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
                <h3 className="text-xl font-semibold">Business Dashboard</h3>
                <p className="text-white/70 mt-2 text-sm">Overview of key stats and quick actions.</p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6">
                <h3 className="text-xl font-semibold">Delivery Tracking</h3>
                <p className="text-white/70 mt-2 text-sm">Track delivery tasks and status updates.</p>
              </div>
            </div>
          </div>
          <Inventory />
          <Orders />
          <Deliveries />
          <Scanner />
        </>
      )}

      <footer className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center text-white/60 text-sm">Built with love for operations teams</div>
      </footer>
    </div>
  )
}

export default App

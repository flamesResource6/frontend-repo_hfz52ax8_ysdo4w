import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-6 md:p-10 border border-white/10">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Gas Cylinder Management</h1>
          <p className="mt-3 md:mt-4 text-white/80 max-w-2xl">Manage inventory, customer orders, deliveries, and barcode scanning in one streamlined workspace.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#login" className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium shadow hover:shadow-lg transition">Get Started</a>
            <a href="#features" className="px-5 py-2.5 rounded-lg bg-slate-900/70 text-white border border-white/20 hover:bg-slate-900/90 transition">Explore Features</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </section>
  );
}

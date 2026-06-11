export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3L8 3L13 8L8 13L3 8L8 3Z" fill="white" opacity="0.9" />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-white text-sm">
                MeU <span className="text-violet-400">UI Hub</span>
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Internal Design System & Component Store. Chuẩn hóa UI cho tất
              cả dự án của MeU.
            </p>
          </div>

          {/* System */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Hệ thống
            </h4>
            <ul className="space-y-2">
              {["Design Tokens", "Components", "Themes", "Guidelines"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              {["Docs Site", "Roadmap", "Changelog", "Contribution"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Stack
            </h4>
            <ul className="space-y-2">
              {["React + Next.js", "TypeScript", "TailwindCSS", "shadcn/ui"].map((l) => (
                <li key={l}>
                  <span className="text-sm text-slate-600">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            © 2026 MeU Solutions. MeU UI Hub — Internal Design System v1.0
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-700">Phase 1 · In Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

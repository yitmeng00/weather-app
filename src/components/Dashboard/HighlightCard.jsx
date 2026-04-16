import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function HighlightCard({ icon, label, children }) {
    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/8 hover:border-sky-400/20 hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={icon} className="text-sky-400 text-xs" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                    {label}
                </span>
            </div>
            {children}
        </div>
    );
}

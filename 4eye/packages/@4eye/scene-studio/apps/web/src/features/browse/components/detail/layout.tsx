/** Shared layout primitives for DetailPanel sections. */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
      <div className="text-neutral-500 text-xs pt-1">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

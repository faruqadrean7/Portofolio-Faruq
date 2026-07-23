export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex items-center gap-3 text-muted">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:120ms]" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:240ms]" />
      </div>
    </div>
  );
}

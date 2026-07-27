const BELT_COLORS: Record<
  string,
  { fill: string; stripe: string; border: string }
> = {
  white: { fill: '#F4F4F4', stripe: '#1A1A1A', border: 'rgba(212,175,55,0.45)' },
  blue: { fill: '#1B4F9C', stripe: '#F4F4F4', border: 'rgba(212,175,55,0.35)' },
  purple: { fill: '#5A2D82', stripe: '#F4F4F4', border: 'rgba(212,175,55,0.35)' },
  brown: { fill: '#6B3F24', stripe: '#F4F4F4', border: 'rgba(212,175,55,0.35)' },
  black: { fill: '#111111', stripe: '#F4F4F4', border: 'rgba(212,175,55,0.65)' },
};

export function WebBeltBadge({
  belt,
  stripes,
}: {
  belt: string;
  stripes: number;
}) {
  const palette = BELT_COLORS[belt] ?? BELT_COLORS.white;

  return (
    <div className="space-y-3">
      <div
        className="flex h-7 w-56 items-center justify-between rounded-md border px-2.5"
        style={{ backgroundColor: palette.fill, borderColor: palette.border }}
        aria-label={`${belt} belt with ${stripes} stripes`}
      >
        <span className="h-4 w-2 rounded-sm bg-gold/70" />
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 4 }).map((_, index) => {
            const filled = index < stripes;
            return (
              <span
                key={index}
                className="h-4 w-2.5 rounded-[1px]"
                style={{
                  backgroundColor: filled ? palette.stripe : 'transparent',
                  border: filled ? undefined : `1px solid ${palette.stripe}`,
                  opacity: filled ? 1 : 0.2,
                }}
              />
            );
          })}
        </div>
        <span className="h-4 w-2 rounded-sm bg-gold/70" />
      </div>
      <p className="text-sm capitalize text-white">
        {belt} · {stripes} stripe{stripes === 1 ? '' : 's'}
      </p>
    </div>
  );
}

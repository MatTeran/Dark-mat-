import Link from 'next/link';

import { getCoachWebData } from '@/lib/data';

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = 'week' } = await searchParams;
  const data = getCoachWebData();
  const classes = await data.classes.list();
  const today = new Date().toISOString().slice(0, 10);

  const filtered =
    view === 'day'
      ? classes.filter((item) => item.date === today)
      : classes;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Calendar</p>
          <h1 className="font-display text-3xl text-white">Schedule</h1>
          <p className="text-sm text-mute">
            Desktop day / week / list views — not the mobile schedule UI.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['day', 'week', 'list'] as const).map((item) => (
            <Link
              key={item}
              href={`/schedule?view=${item}`}
              className={`rounded-xl px-3 py-2 text-sm capitalize ${
                view === item
                  ? 'bg-gold/15 text-gold-bright'
                  : 'border border-line text-mute'
              }`}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/schedule/new"
            className="rounded-xl bg-gold px-3 py-2 text-sm font-semibold text-ink"
          >
            Add class
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-mute">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Instructor</th>
              <th className="px-4 py-3">Gi</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Waitlist</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-line/80">
                <td className="px-4 py-3 text-mute">{item.date}</td>
                <td className="px-4 py-3 text-mute">
                  {item.startTime}–{item.endTime}
                </td>
                <td className="px-4 py-3 text-white">{item.title}</td>
                <td className="px-4 py-3 text-mute">{item.instructorName}</td>
                <td className="px-4 py-3 text-mute">
                  {item.giType === 'gi' ? 'Gi' : 'No-Gi'}
                </td>
                <td className="px-4 py-3 capitalize text-mute">{item.level}</td>
                <td className="px-4 py-3 text-mute">
                  {item.reservedCount}/{item.capacity}
                </td>
                <td className="px-4 py-3 text-mute">{item.waitlistCount}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/schedule/${item.id}`} className="text-xs text-gold">
                      Roster
                    </Link>
                    <Link
                      href={`/check-in?classId=${item.id}`}
                      className="text-xs text-gold"
                    >
                      Check-In
                    </Link>
                    <Link
                      href={`/schedule/${item.id}/edit`}
                      className="text-xs text-gold"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

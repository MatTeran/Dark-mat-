import type { ScheduleClass } from '../types/schedule';

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export interface LaidOutClass {
  item: ScheduleClass;
  /** 0-based column within overlapping group. */
  column: number;
  /** Total columns in the overlap cluster. */
  columns: number;
  startMinutes: number;
  endMinutes: number;
}

/**
 * Classic calendar overlap layout for one day's classes.
 */
export function layoutDayClasses(classes: ScheduleClass[]): LaidOutClass[] {
  const sorted = [...classes]
    .map((item) => ({
      item,
      startMinutes: toMinutes(item.startTime),
      endMinutes: toMinutes(item.endTime),
    }))
    .sort(
      (a, b) =>
        a.startMinutes - b.startMinutes || a.endMinutes - b.endMinutes,
    );

  const active: Array<{ endMinutes: number; column: number }> = [];
  const result: Array<
    Omit<LaidOutClass, 'columns'> & { columns?: number }
  > = [];

  for (const entry of sorted) {
    for (let i = active.length - 1; i >= 0; i -= 1) {
      if (active[i].endMinutes <= entry.startMinutes) {
        active.splice(i, 1);
      }
    }

    const used = new Set(active.map((slot) => slot.column));
    let column = 0;
    while (used.has(column)) {
      column += 1;
    }

    active.push({ endMinutes: entry.endMinutes, column });
    result.push({
      item: entry.item,
      column,
      startMinutes: entry.startMinutes,
      endMinutes: entry.endMinutes,
    });
  }

  // Cluster by overlapping windows and assign column counts.
  const clusters: number[][] = [];
  let current: number[] = [];
  let clusterEnd = -1;

  result.forEach((entry, index) => {
    if (current.length === 0) {
      current = [index];
      clusterEnd = entry.endMinutes;
      return;
    }
    if (entry.startMinutes < clusterEnd) {
      current.push(index);
      clusterEnd = Math.max(clusterEnd, entry.endMinutes);
      return;
    }
    clusters.push(current);
    current = [index];
    clusterEnd = entry.endMinutes;
  });
  if (current.length > 0) {
    clusters.push(current);
  }

  for (const cluster of clusters) {
    const columns =
      Math.max(...cluster.map((index) => result[index].column)) + 1;
    for (const index of cluster) {
      result[index].columns = columns;
    }
  }

  return result.map((entry) => ({
    item: entry.item,
    column: entry.column,
    columns: entry.columns ?? 1,
    startMinutes: entry.startMinutes,
    endMinutes: entry.endMinutes,
  }));
}

export function minutesToY(
  minutes: number,
  startHour: number,
  hourHeight: number,
): number {
  return ((minutes - startHour * 60) / 60) * hourHeight;
}

export function durationToHeight(
  startMinutes: number,
  endMinutes: number,
  hourHeight: number,
): number {
  return Math.max(((endMinutes - startMinutes) / 60) * hourHeight, 22);
}

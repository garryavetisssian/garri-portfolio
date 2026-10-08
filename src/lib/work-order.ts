/** Keep other projects in their existing order; Vivaro follows the slot cases. */
export function orderCollectionItems<T extends { slug: string }>(items: T[], collection: string): T[] {
  if (collection !== 'entertainment') return items;
  const vivaro = items.find(item => item.slug === 'vivaro');
  if (!vivaro) return items;
  const ordered = items.filter(item => item.slug !== 'vivaro');
  const lastSlot = ordered.findLastIndex(item => ['spearthrone', 'roos-ruckus'].includes(item.slug));
  if (lastSlot < 0) return items;
  ordered.splice(lastSlot + 1, 0, vivaro);
  return ordered;
}

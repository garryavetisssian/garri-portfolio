/** Keep other projects in their existing order; Vivaro follows the slot cases. */
export function orderCollectionItems<T extends { slug: string }>(items: T[], collection: string): T[] {
  if (collection === 'products') {
    const priority = ['balvoi', 'ineed', 'xy-ecosystem', 'nexwave', 'dispatch-center', 'aihive', 'vivaro', 'razer-ui'];
    const rank = (slug: string) => { const index = priority.indexOf(slug); return index === -1 ? priority.length : index; };
    return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
  }
  if (collection !== 'entertainment') return items;
  const vivaro = items.find(item => item.slug === 'vivaro');
  if (!vivaro) return items;
  const ordered = items.filter(item => item.slug !== 'vivaro');
  const lastSlot = ordered.findLastIndex(item => ['spearthrone', 'roos-ruckus'].includes(item.slug));
  if (lastSlot < 0) return items;
  ordered.splice(lastSlot + 1, 0, vivaro);
  return ordered;
}

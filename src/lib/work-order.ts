/** Lead with shipped iGaming work, while making each case's current status explicit. */
export function orderCollectionItems<T extends { slug: string }>(items: T[], collection: string): T[] {
  if (collection === 'products') {
    const priority = ['balvoi', 'ineed', 'xy-ecosystem', 'nexwave', 'dispatch-center', 'aihive', 'vivaro', 'razer-ui'];
    const rank = (slug: string) => { const index = priority.indexOf(slug); return index === -1 ? priority.length : index; };
    return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
  }
  if (collection !== 'entertainment') return items;
  const priority = ['duck-master', 'keno', 'xy-ecosystem', 'vivaro', 'roos-ruckus', 'spearthrone'];
  const rank = (slug: string) => { const index = priority.indexOf(slug); return index === -1 ? priority.length : index; };
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}

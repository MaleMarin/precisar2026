/** URL slug for a Precisando category label (stable, ASCII). */
export function categoryToSlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

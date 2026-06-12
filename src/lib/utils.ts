/** Minimal class joiner (no clsx/tailwind-merge dependency needed yet). */
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}

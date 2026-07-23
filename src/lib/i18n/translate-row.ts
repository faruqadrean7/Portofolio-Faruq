import type { Locale } from "./dictionary";

type Translatable<TBase, TTrans> = TBase & {
  translations?: Partial<Record<Exclude<Locale, "id">, Partial<TTrans>>>;
};

/**
 * Pick a translated field from a row's `translations` JSONB; fallback to the
 * row's default-language column when the key is missing.
 *
 * Default columns hold Indonesian (the source of truth). Other locales come
 * from translations[locale]. If the locale is "id" or the translation key
 * is empty, we return the default column as-is.
 */
export function tField<
  TBase,
  TTrans extends object,
  K extends keyof TTrans & keyof TBase,
>(
  row: Translatable<TBase, TTrans>,
  locale: Locale,
  key: K,
): TBase[K] {
  if (locale === "id") return row[key];
  const t = row.translations?.[locale as Exclude<Locale, "id">];
  const v = t?.[key];
  if (v === undefined || v === null) return row[key];
  if (typeof v === "string" && v.trim() === "") return row[key];
  if (Array.isArray(v) && v.length === 0) return row[key];
  return v as unknown as TBase[K];
}

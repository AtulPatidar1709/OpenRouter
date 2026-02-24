export function isJwtPayload(obj: unknown): obj is { sub: string } {
  if (typeof obj !== "object" || obj === null) return false;

  const o = obj as Record<string, unknown>;

  return (
    typeof o.sub === "string"
  );
}

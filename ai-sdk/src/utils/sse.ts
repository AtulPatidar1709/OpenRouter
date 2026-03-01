export async function* parseSSE(res: Response) {
  if (!res.body) throw new Error("Response body is empty");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() || "";

    for (const part of parts) {
      if (!part.startsWith("data: ")) continue;

      const data = part.slice(6).trim();

      if (data === "[DONE]") {
        yield "[DONE]";
        return;
      }

      yield JSON.parse(data);
    }
  }
}

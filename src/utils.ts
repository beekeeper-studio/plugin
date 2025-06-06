export function generateUUID() {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);

  buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
  buf[8] = (buf[8] & 0x3f) | 0x80; // variant

  const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");

  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20),
  ].join("-");
}

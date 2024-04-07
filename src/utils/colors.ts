export const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

export function colorize(color: keyof typeof colors, message: string): string {
  return `${colors[color]}${message}${colors.reset}`;
}

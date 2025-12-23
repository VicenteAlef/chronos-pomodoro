export function formateSecondsToMinutes(seconds: number): string {
  const minutes: string = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsMod: string = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${minutes}:${secondsMod}`;
}

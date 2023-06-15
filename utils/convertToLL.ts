export default function convertToLL({
  usd,
  rate,
}: {
  usd: number;
  rate: number;
}): string {
  return (Math.round(Number(usd * rate) / 1000) * 1000 + " L.L")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

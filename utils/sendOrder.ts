import convertToLL from "./convertToLL";

export default function sendOrder({
  selectedItems,
  rate,
  phoneNumber,
  address,
}: {
  selectedItems: any;
  rate: number;
  phoneNumber: string;
  address: string;
}) {
  let message = ``;
  let totalUSD = 0;

  message += `Address: ${address}\n---------------------------\n`;

  selectedItems.forEach((item: SelectedItem) => {
    const { product, count } = item;
    const totalPriceUSD = count * product.usdprice;
    message += `${count} ${product.name}\n`;
    totalUSD += totalPriceUSD;
  });
  const totalPriceLBP = convertToLL({ usd: totalUSD, rate });

  message += `\n---------------------------\nTotal: $${totalUSD.toFixed(
    2,
  )} / ${totalPriceLBP}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}

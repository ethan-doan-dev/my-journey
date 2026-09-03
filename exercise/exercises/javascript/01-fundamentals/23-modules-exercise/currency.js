export const USD_TO_VND = 26000;

export function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
}

export default function convertUsdToVnd(usdAmount) {
  return usdAmount * USD_TO_VND;
}
// Format number to locale
export function toCommas(value: number) {
  return !value
    ? value
    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

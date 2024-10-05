import numeral from "numeral";

export const convertParams = (params: any) => {
  return Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");
};

export const convertNumber = (value: number) => {
  return numeral(value).format("0,0");
};

export const convertToMillionDongFixed = (value: number, type: string) => {
  if (type === "0") {
    const millionDong = value / 1_000_000;
    // Trả về kết quả dưới dạng chuỗi với 2 chữ số thập phân
    if (millionDong % 1 !== 0) {
      // Nếu có dư, làm tròn lên 1 đơn vị
      return millionDong.toFixed(1);
    }
    return millionDong;
  }

  if (type === "1") {
    return numeral(value).format("0,0");
  }
};

export const renderRangeSalary = (
  salaryFrom: number,
  salaryTo: number,
  type: string
) => {
  if (salaryFrom === 0 && salaryTo === 0) return "Thoả thuận";

  return `${convertToMillionDongFixed(
    salaryFrom,
    "0"
  )} - ${convertToMillionDongFixed(salaryTo, "0")} triệu`;
};

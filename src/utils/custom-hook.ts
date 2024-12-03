import dayjs from "dayjs";
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

export const getFileName = (file: string) => {
  const arrFile = file.split("/");
  return arrFile[arrFile.length - 1];
};

export const formatDateDifference = (date: string): string => {
  const now = dayjs(); // Current date
  const inputDate = dayjs(date); // Input date
  const diffInDays = now.diff(inputDate, "day");

  if (diffInDays === 0) {
    return "Vừa cập nhật";
  }

  if (diffInDays < 30) {
    return `Cập nhật ${diffInDays} ngày trước`;
  }

  if (diffInDays < 365) {
    const diffInMonths = now.diff(inputDate, "month");
    return `Cập nhật${diffInMonths} tháng trước`;
  }

  const diffInYears = now.diff(inputDate, "year");
  return `Cập nhật ${diffInYears} năm trước`;
};

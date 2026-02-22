import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default dayjs;
export { dayjs };
// ======================================
// Formatter (usado em páginas de listagem)
// ======================================
export function dateFormatter(
  date?: string | Date | null,
  format = "DD/MM/YYYY"
) {
  if (!date) return "";
  try {
    // se já existe um dayjs default no arquivo, isso funciona igual
    // se não existir, ajuste para a forma que você já usa no arquivo
    // @ts-ignore
    return dayjs(date).format(format);
  } catch {
    return "";
  }
}
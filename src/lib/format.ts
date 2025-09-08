import BigNumber from "bignumber.js";

// separate
export const separate = (value: number | string, formatString?: number) => {
  let decimalPart = "";
  if (formatString) {
    decimalPart = ".".padEnd(formatString + 1, "0");
  }
  if (value && !Number.isNaN(value)) {
    const val = String(value);
    let integerPart = val;
    const integerLen = val.length;
    if (val.includes(".")) {
      [integerPart] = val.split(".");
      decimalPart = `.${val.split(".")[1]}`;
      if (formatString) {
        decimalPart = decimalPart.padEnd(formatString + 1, "0");
      }
    }

    if (integerLen <= 3) {
      return `${integerPart}${decimalPart}`;
    }
    return `${integerPart.replace(
      /(\d)(?=(?:\d{3})+$)/g,
      "$1,",
    )}${decimalPart}`;
  }
  return `0${decimalPart}`;
};

// numeral
export const numeral = (
  context: string | number | undefined,
  formatString = 2,
) => {
  // let value = context;
  if (context) {
    let star = "";
    if (`${Number(context)}`.includes("e+")) {
      const bigValue = `${context}`;
      if (bigValue.includes(".")) {
        const int = bigValue.split(".")[0];
        let dec = bigValue.split(".")[1];
        dec = dec.slice(0, formatString);
        return Number(dec) === 0 ? `${int}` : `${int}.${dec}`;
      }
      return context.toString();
    }
    let value = Number(context);
    if (value < 0) {
      value = Math.abs(value);
      star = "-";
    }
    const bitLength = formatString > 8 ? 8 : formatString;
    let zoom = 1;
    for (let i = 0; i < bitLength; i += 1) {
      zoom *= 10;
    }

    value = new BigNumber(value).times(zoom).toNumber();
    value = Math.floor(value) / zoom;
    const resVal = value;
    const val = resVal.toString();
    if (val.includes("e-")) {
      return value.toFixed(bitLength);
    }
    return star + resVal.toString();
  }
  if (Number(context) === 0) {
    return 0;
  }
  return 0;
};

// amountFormat
export const amountFormat = (
  value: number | string | undefined,
  formatString = 8,
) => {
  const baseNum = 1 / Math.pow(10, formatString);
  if (Number(value) > 0 && Number(value) < baseNum) {
    return `< ${baseNum.toFixed(formatString)}`;
  }
  const parResult = separate(numeral(value, formatString), formatString);
  const result = parResult.toString().replace(/(?:\.0*|(\.\d+?)0+)$/, "$1");
  return result;
};

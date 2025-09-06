

import BigNumber from "bignumber.js";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numFormat = (num: number | string, digits = 2) => {
  if (num !== undefined) {
    num = Number(String(num).replace(/\$\s?|(,*)/g, ""));
    const si: any = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (
      new BigNumber(num)
        .div(new BigNumber(si[i].value))
        .toNumber()
        .toFixed(digits)
        .replace(rx, "$1") + si[i].symbol
    );
  }
  return "--";
};

export function getStateValue(path: string): any {
  const obj = JSON.parse(localStorage.getItem("yomo") || "{}");
  if (!obj || !obj.state) return undefined;
  
  return path.split('.').reduce((acc, key) => {
    if (acc && acc.hasOwnProperty(key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export function splitBySeparator<T>(arr: T[], separator: T): T[][] {
  const result: T[][] = [];
  let temp: T[] = [];

  for (const item of arr) {
    if (item === separator) {
      if (temp.length > 0) {
        result.push(temp);
        temp = [];
      }
    } else {
      temp.push(item);
    }
  }

  if (temp.length > 0) {
    result.push(temp);
  }

  return result;
}

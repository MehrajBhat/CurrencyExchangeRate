export enum Currency {
    USD = "usd",
    EUR = "eur",
    JPY = "jpy",
    CHF = "chf",
    CAD = "cad",
    AUD = "aud",
    ZAR = "zar"
  }
  
  export const getCurrencyArrayColumn = (): string[] => {
    return Object.values(Currency);
  };
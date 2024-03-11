import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import Dropdown from "../DropDown/DropDown";
import Table from "../Table/Table";
import DatePicker from "../DatePicker/DatePicker";
import { url } from "../Config/api";

function formatDateToYYYYMMDD(date: Date): string | null {
  if (!(date instanceof Date)) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [defaultBaseCurrency, setDefaultBaseCurrency] = useState("eur");
  const [currencyValueData, setCurrencyValueData] = useState();
  const [date, setDate] = useState(formatDateToYYYYMMDD(new Date()) || "");
  const [loading, setLoading] = useState(true);
  // const [disabledDropDown, setDisabledDropDown] = useState(true);

  const [columnHeading, setColmnHeading] = useState([
    "usd",
    "eur",
    "jpy",
    "chf",
    "cad",
    "aud",
    "zar",
  ]);

  const getCurrencyList = () => {
    setLoading(true);
    axios
      .get(`${url}latest/v1/currencies.json`)
      .then((res: any) => {
        if (res.status === 200) {
          setCurrencies(res.data);
          setLoading(false);
        } else alert("Can not load data");
      })
      .catch((err) => console.log("errr 11", err.response.data));
  };

  const getCurrencyValueDetails = useCallback(() => {
    setLoading(true);
    if (defaultBaseCurrency && date) {
      let dateArr = [];
      const givenDate = moment(date);
      for (let i = 0; i < 6; i++) {
        dateArr.push(
          moment(givenDate).subtract(i, "days").format("YYYY-MM-DD")
        );
      }

      const promises = dateArr.map((newDate) =>
        axios
          .get(`${url}${newDate}/v1/currencies/${defaultBaseCurrency}.json`)
          .then((response) => ({
            newDate,
            rate: response.data[defaultBaseCurrency],
          }))
          .catch((error) => {
            return {
              newDate,
              rate: null,
            };
          })
      );

      Promise.all(promises) // get data for previos 7 days
        .then((results) => {
          const rates: any = [];
          results.forEach((result) => {
            rates.push(result);
          });
          setCurrencyValueData(rates);
          setLoading(false);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [date, defaultBaseCurrency]);

  const handleSelect = (option: any) => {
    setDefaultBaseCurrency(option);
  };

  const handleSelectedCurrency = (option: any) => {
    if (columnHeading.length < 7) {
      setColmnHeading((prevArray) => [...prevArray, option]);
      // setDisabledDropDown (false)
    } else {
      // setDisabledDropDown (true)
    }
  };

  const handleDate = (option: any) => {
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the input date and the current date
    let date1 = new Date(option);
    const differenceInMilliseconds = currentDate.getTime() - date1.getTime();

    // Calculate the difference in days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    // Check if the difference is greater than 90 days
    if (differenceInDays > 90) {
      alert("Selected date is greater than 90 days from the current date");
    } else {
      setDate(option);
    }
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  useEffect(() => {
    getCurrencyValueDetails();
  }, [getCurrencyValueDetails]);

  return (
    <>
      <div>
        <h1>Currency Exchange Rate</h1>
        {!loading && currencies && currencyValueData ? (
          <>
            <Dropdown
              // disabled={disabledDropDown}
              label={"Select Currency"}
              value={defaultBaseCurrency}
              options={currencies}
              onSelect={handleSelect}
            />
            <DatePicker date={date} onChange={handleDate} />
            <Dropdown
              label={"Add Currency"}
              value={defaultBaseCurrency}
              options={currencies}
              onSelect={handleSelectedCurrency}
              // disabled={disabledDropDown}
            />
            <Table
              data={currencyValueData}
              currencyList={currencies}
              columnHeading={columnHeading}
              setColmnHeading={setColmnHeading}
            />
          </>
        ) : (
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            Loading data...
          </div>
        )}
      </div>
    </>
  );
};

export default CurrencyConverter;

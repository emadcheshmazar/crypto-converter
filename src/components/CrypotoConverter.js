import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoInput from "./CryptoInput";
import { Button } from "antd";
import reverseIcon from "../assets/reverse.png";
import reverseIconUpDown from "../assets/reverse-updown.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/CryptoConverter.scss";

function CrypotoConverter() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleConvert();
  }, [fromCoin, toCoin, fromAmount, toAmount]);

  const handleConvert = () => {
    if (fromAmount && fromCoin && toCoin) {
      const fromCoinPrice = coins.find(
        (coin) => coin.symbol === fromCoin
      )?.current_price;
      const toCoinPrice = coins.find(
        (coin) => coin.symbol === toCoin
      )?.current_price;
      if (fromCoinPrice && toCoinPrice) {
        const convertedAmount = fromAmount * (fromCoinPrice / toCoinPrice);
        setToAmount(convertedAmount.toFixed(4));
      }
    }
  };

  const handleReverse = () => {
    setReverse(prevState => !prevState)
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="App">
      <h1 className="title mb-5">Crypto Converter</h1>
      <div className="input-wrapper col-12">
        <div className="input-container col-12">
          <CryptoInput
            title={"From Coin:"}
            coins={coins}
            loading={loading}
            inputValue={fromAmount}
            selectValue={fromCoin}
            InputOnChange={(e) => setFromAmount(e.target.value)}
            selectOnChange={(e) => setFromCoin(e)}
            type="number"
            readOnly={false}
          />
        </div>
        <div className="reverse-container">
          <span className="reverse" onClick={handleReverse}>
            <img src={reverse ? reverseIcon : reverseIconUpDown} alt="reverse-button" />
          </span>
        </div>
        <div className="input-container col-12">
          <CryptoInput
            title={"To Coin:"}
            coins={coins}
            loading={loading}
            inputValue={toAmount}
            selectValue={toCoin}
            InputOnChange={(e) => setFromAmount(e.target.value)}
            selectOnChange={(e) => setToCoin(e)}
            type="text"
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CrypotoConverter;

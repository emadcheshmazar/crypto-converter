import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoInput from "./CryptoInput";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/CryptoConverter.scss'


function CrypotoConverter() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

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
      const fromCoinRate = coins.find(
        (coin) => coin.symbol === fromCoin
      )?.current_price;
      const toCoinRate = coins.find(
        (coin) => coin.symbol === toCoin
      )?.current_price;
      if (fromCoinRate && toCoinRate) {
        const convertedAmount = fromAmount * (fromCoinRate / toCoinRate);
        setToAmount(convertedAmount.toFixed(4));
      }
    }
  };

  const handleReverse = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="App d-flex row">
      <h1>Crypto Converter</h1>
      <div className="forms-container">
        <CryptoInput
          title={"From Coin:"}
          coins={coins}
          loading={loading}
          inputValue={fromAmount}
          selectValue={fromCoin}
          InputOnChange={(e) => setFromAmount(e.target.value)}
          selectOnChange={(e) => setFromCoin(e.target.value)}
          type="number"
          readOnly={false}
        />
        <div className="buttons-container">
          <button onClick={handleReverse} disabled={loading}>
            Reverse
          </button>
        </div>
        <div className="forms-container">
          <CryptoInput
            title={"To Coin:"}
            coins={coins}
            loading={loading}
            inputValue={toAmount}
            selectValue={toCoin}
            InputOnChange={(e) => setFromAmount(e.target.value)}
            selectOnChange={(e) => setToCoin(e.target.value)}
            type="text"
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CrypotoConverter;

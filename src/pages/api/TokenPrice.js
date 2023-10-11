// components/TokenPrice.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const TokenPrice = () => {
  let [price, setPrice] = useState(null);
  const coin = 'inheritance-art'; // Access the coin symbol from the query parameters

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=inheritance-art&vs_currencies=usd'
        );

        const data = response.data;
        if (data && data[coin] && data[coin].usd) {
          const tempPrice = data[coin.usd];
          console.log('temp price:', tempPrice);
          setPrice(price);
        } else {
          console.log(data);
          setPrice(0);
        }
      } catch (error) {
        console.error('Error fetching token price:', error);
        setPrice(0);
      }
    };

    fetchTokenPrice();
  }, []);

  return price;
};

export default TokenPrice;

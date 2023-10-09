// components/TokenPrice.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const TokenPrice = () => {
  const [price, setPrice] = useState(null);
  const coin = 'inheritance-art'; // Access the coin symbol from the query parameters

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=inheritance-art&vs_currencies=usd'
        );

        const data = response.data;
        if (data && data[coin] && data[coin].usd) {
          setPrice(data[coin].usd);
        } else {
          console.log(data);
          setPrice('Price not available');
        }
      } catch (error) {
        console.error('Error fetching token price:', error);
        setPrice('Error fetching price');
      }
    };

    fetchTokenPrice();
  }, []);

  return (
    <div>
      <Typography color={'white'}>$iAI Token Price: ${parseFloat(price).toFixed(2)}</Typography>
    </div>
  );
};

export default TokenPrice;

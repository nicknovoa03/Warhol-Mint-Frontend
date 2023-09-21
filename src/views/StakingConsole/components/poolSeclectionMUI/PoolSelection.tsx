import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { BigNumber, ethers } from 'ethers';
import { ERC20BalanceOf, ERC721BalanceOf } from '../../../../components/contracts/wagmiContracts';
import { useAccount } from 'wagmi';
import getNFTMetadata from '../../../../components/nfts/NFTMetadata';
import { nftMetadataDictionary } from '../../../../components/nftData/nftMetadataDictionary';
import Image from 'next/image';
import WarholImage from '../../../../../public/NFT-image.png';

const pools = [
  {
    title: 'Fractional Warhol Mint',
    background: WarholImage,
    size: 4,
    href: '/FractionalMint'
  },
  {
    title: 'Physical Warhol Mint',
    background: WarholImage,
    size: 4,
    href: '/Pool2'
  },
  {
    title: 'AI Companion Bot',
    background: WarholImage,
    size: 4,
    href: '/Pool3'
  }
];

const PoolSelection = () => {
  const theme = useTheme();
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [iAIbalanceAmount, setiAIBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [NFTBalanceAmount, setNFTBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [nftMetadata, setNFTMetadata] = useState<string[]>([]);
  let [ownedNfts, setOwnedNfts] = useState<{ [key: string]: number }>({});
  let [prestigeFlag, setPrestigeFlag] = useState<Boolean>(false);
  let [destinationInheritanceFlag, setDestinationInheritanceFlag] = useState<Boolean>(false);
  let { address, isConnected } = useAccount();

  // Save Connected Address to state
  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  // set NFT's Owned
  useEffect(() => {
    fetchData();
  }, [connectedAddress]);

  async function fetchData() {
    const loadNftMetadata = await getNFTMetadata(connectedAddress!);
    setNFTMetadata(loadNftMetadata);
  }

  // set NFT background data to state
  useEffect(() => {
    matchMetadata();
  }, [nftMetadata]);

  function matchMetadata() {
    let nftBackgroundDictionary: { [key: string]: number } = {};
    for (let i in nftMetadata) {
      // get nft number
      let nftNumber = nftMetadata[i];
      // get background type
      let nftBackground = nftMetadataDictionary[nftNumber.toString()];
      let backgroundIdentifier: string;
      // check background and set identifier
      if (nftBackground == 'Destination Inheritance') {
        backgroundIdentifier = 'DI';
      } else if (nftBackground == 'Basquiat' || nftBackground == 'Warhol') {
        backgroundIdentifier = 'Prestige';
      } else {
        backgroundIdentifier = 'Standard';
      }
      // add to dictionary or increment count
      if (!nftBackgroundDictionary[backgroundIdentifier]) {
        nftBackgroundDictionary[backgroundIdentifier] = 1;
      } else {
        nftBackgroundDictionary[backgroundIdentifier]++;
      }
    }
    //console.log('nft dic:', nftBackgroundDictionary);
    // set state
    setOwnedNfts(nftBackgroundDictionary);
  }

  // User erc20 Balance
  const iAIBalanceData = ERC20BalanceOf({ ownerAddress: connectedAddress! });
  useEffect(() => {
    if (iAIBalanceData) {
      setiAIBalanceAmount(iAIBalanceData);
    }
  }, [iAIBalanceData]);

  // User erc721Balance
  const NFTBalanceData = ERC721BalanceOf({ ownerAddress: connectedAddress! });
  useEffect(() => {
    if (NFTBalanceData) {
      setNFTBalanceAmount(NFTBalanceData);
    }
  }, [NFTBalanceData]);

  // Set NFT data
  useEffect(() => {
    //let nfts: any = Object.values(ownedNfts)[0];
    //console.log('owned nfts:', ownedNfts);
    //console.log('nft count:', Object.keys(nfts));
    for (const key in ownedNfts) {
      if (key == 'Prestige') {
        setPrestigeFlag(true);
      } else if (key == 'DI') {
        setPrestigeFlag(true);
        setDestinationInheritanceFlag(true);
      }
    }
    //console.log('prestige flag:', prestigeFlag);
    //console.log('DI flag:', destinationInheritanceFlag);
  }, [ownedNfts, nftMetadata]);

  return (
    <Grid container spacing={4}>
      {pools.map((item, i) => (
        <Grid item md={item.size} key={i}>
          <Box
            component={Card}
            height={1}
            display={'flex'}
            flexDirection={'column'}
            bgcolor={theme.palette.common.black}
            sx={{ borderRadius: 3, border: '1px solid white' }}
            data-aos={'flip-left'}
          >
            <CardContent>
              <Box marginBottom={3}>
                <Typography variant={'h4'} align="center" color={theme.palette.common.white} marginBottom={2}>
                  <Box component={'span'} fontWeight={600}>
                    {item.title}
                  </Box>
                </Typography>
              </Box>
              <Box borderRadius={5} margin={2} maxWidth={{ md: 350 }} data-aos={'zoom-in'}>
                <Image alt="Background Image" src={item.background} quality={50} />
              </Box>
            </CardContent>
            <Box flexGrow={1} />
            <CardActions sx={{ justifyContent: 'center', marginBottom: 3, marginTop: -2 }}>
              <Button size={'large'} variant={'contained'} href={item.href}>
                Learn More
              </Button>
            </CardActions>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PoolSelection;

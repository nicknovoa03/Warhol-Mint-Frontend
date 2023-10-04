import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BigNumber } from 'ethers';
import { ERC20BalanceOf } from '../../../../components/contracts/wagmiContracts';
import { useAccount } from 'wagmi';
import getNFTMetadata from '../../../../components/nfts/NFTMetadata';
import Image from 'next/image';
import WarholImage from '../../../../../public/NFT-image.png';
import AiImage from '../../../../../public/AI.jpg';
import PhysicalWarholImage from '../../../../../public/background.jpg';

const pools = [
  {
    title: 'Warhol Spawn Bundle',
    background: PhysicalWarholImage,
    size: 4,
    href: '/PhysicalMint'
  },
  {
    title: 'Warhol Fine Art Spawn',
    background: WarholImage,
    size: 4,
    href: '/FractionalMint'
  },
  {
    title: 'Reservation for Ai Human Model',
    background: AiImage,
    size: 4,
    href: '/AiBotMint'
  }
];

const MintSelection = () => {
  const theme = useTheme();
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [iAIbalanceAmount, setiAIBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [nftMetadata, setNFTMetadata] = useState<string[]>([]);

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

  // User erc20 Balance
  const iAIBalanceData = ERC20BalanceOf({ ownerAddress: connectedAddress! });
  useEffect(() => {
    if (iAIBalanceData) {
      setiAIBalanceAmount(iAIBalanceData);
    }
  }, [iAIBalanceData]);

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

export default MintSelection;

import { Box, Divider, Grid, Link, Typography } from '@mui/material';
import Main from '../../layouts/Main/Main';
import { grey } from '@mui/material/colors';
import { Web3Button } from '@web3modal/react';
import { BigNumber, ethers } from 'ethers';
import theme from '../../theme';
import IAiLogo from '../../components/logos/IAiLogo';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Container from '../../components/Container';
import PoolSelection from './components/poolSeclectionMUI/PoolSelection';
import { ERC20BalanceOf, ERC721BalanceOf } from '../../components/contracts/wagmiContracts';
import SimpleAccordion from './components/information/accordian';

function StakingConsole() {
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [iAIbalanceAmount, setiAIBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [NFTBalanceAmount, setNFTBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let { address, isConnected } = useAccount();

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

  // Save Connected Address to state
  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  return (
    <>
      <Main>
        <Container>
          <Box display="flex" flexDirection={'column'} alignItems={'center'} data-aos={'fade-in'}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.9);',
                px: 5,
                py: 3,
                borderRadius: 3,
                border: '1px solid white'
              }}
              data-aos={'flip-down'}
            >
              <Box display={'flex'} flexDirection={'column'} maxWidth={700}>
                <Typography variant="h4" align="center" color="white" fontWeight={'bold'} data-aos={'zoom-out-down'}>
                  iAI Warhol Mint
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ my: 2 }} color="white" data-aos={'zoom-out-up'}>
                  inheritance Art’s 9022 where art meets culture, fashion and story telling. Join us as we travel the
                  universe with Ætheling on his way to Destination inheritance.
                </Typography>
                <SimpleAccordion />
              </Box>
              <Box
                marginTop={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Web3Button />
                </Box>
                {connectedAddress && (
                  <>
                    <Box>
                      <Typography align="center" fontSize={22} sx={{ mt: 3 }} color={grey[100]}>
                        $iAI Balance: {Number(ethers.utils.formatEther(iAIbalanceAmount)).toFixed(3)}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
            <Box marginY={5}>
              <Typography
                variant="h3"
                align="center"
                color="white"
                fontWeight={'bold'}
                data-aos={'zoom-in'}
                textTransform="uppercase"
              >
                Select Your Mint
              </Typography>
            </Box>
            <Box>
              <PoolSelection />
            </Box>
          </Box>
        </Container>
      </Main>
    </>
  );
}

export default StakingConsole;

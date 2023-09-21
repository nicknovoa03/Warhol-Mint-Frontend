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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                maxWidth={{ md: 500 }}
              >
                <Grid item container justifyContent={'center'} display="flex">
                  <Grid item container justifyContent={'center'} sm={3} xs={12}>
                    <Box maxWidth={{ xs: 70, md: 70 }} data-aos={'zoom-in'} marginTop={{ md: 1 }}>
                      <IAiLogo />
                    </Box>
                  </Grid>
                  <Grid item container sm={9} xs={12} marginTop={{ md: 1 }} data-aos={'zoom-in'}>
                    <Grid item sm={12}>
                      <Typography
                        fontSize={22}
                        color="white"
                        fontWeight={'bold'}
                        textTransform="uppercase"
                        align="center"
                      >
                        9022 Ambassador Console
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={14} align="center" color="white">
                        Earn $iAI rewards for your contributions to the ecosystem
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box marginTop={4} width={'75%'}>
                <Divider
                  flexItem
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    height: '1px'
                  }}
                />
              </Box>
              <Box display={'flex'} flexDirection={'column'} marginTop={3}>
                <Typography
                  align="center"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  Information:
                </Typography>
                <Typography fontSize={12} align="center" color="white">
                  - inheritance Art will offer 9022 Ambassador Pools for holders of the 9022 NFT collection
                  <br /> - Your 9022 NFTs will determine which Ambassador Pools you have access to
                  <br /> - Ambassador Pools will give 9022 holders the ability to participate in spreading awareness
                  while being rewarded for their efforts
                  <br />
                </Typography>
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
                    <Box>
                      <Typography align="center" fontSize={22} sx={{ mt: 1 }} color={grey[100]}>
                        9022 Held: {Number(NFTBalanceAmount)}
                      </Typography>
                    </Box>
                    <Box>
                      <Link href="https://opensea.io/account?search[collections][0]=9022-collection" target="_blank">
                        <Typography align="center" fontSize={18} sx={{ mt: 0 }} color={grey[100]}>
                          View On Opensea
                        </Typography>
                      </Link>
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
                Select Your Pool
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

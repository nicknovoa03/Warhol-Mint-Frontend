import { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Divider, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import Main from '../../layouts/Main';
import Container from '../../components/Container';
import { BigNumber, ethers } from 'ethers';
import { Web3Button } from '@web3modal/react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { MainButton, MintSlider } from '../../components/form/formElements';
import theme from '../../theme';
import { ContractAddress, WalletAddress } from '../../components/form/stakeElements';
import { ERC20BalanceOf } from '../../components/contracts/wagmiContracts';
import { ERC20Allowance, ApprovePoolPreparedContract, MintWarhol } from '../../components/contracts/wagmiContracts';
import { MintContractTestAddress } from '../../components/contracts/contractAddresses';
import { parseEther } from 'viem';
import Image from 'next/image';
import WarholImage from '../../../public/NFT-image.png';
import { reserve } from '../../components/contracts/appCaller';
import axios from 'axios';

function FractionalMint() {
  let [iAIprice, setiAIprice] = useState<number>(0.0);
  let [balanceAmount, setBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [mintAmount, setMintAmount] = useState<number>(1);
  let [allowanceSet, setAllowance] = useState(false);
  let [allowanceAmount, setAllowanceAmount] = useState<number>(0);
  let [poolAmount, setPoolAmount] = useState<BigNumber>(BigNumber.from(0));
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let { address, isConnected } = useAccount();
  const blockExplorer = 'https://etherscan.com';
  const usdAmount = 200;
  const coin = 'inheritance-art'; // Access the coin symbol from the query parameters
  let purchaseCost;

  //iAI price
  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=inheritance-art&vs_currencies=usd'
        );

        const data = response.data;
        if (data && data[coin] && data[coin].usd) {
          setiAIprice(data[coin].usd);
        } else {
          console.log(data);
          setiAIprice(0.0);
        }
      } catch (error) {
        console.error('Error fetching token price:', error);
        setiAIprice(0.0);
      }
    };

    fetchTokenPrice();
  }, []);

  // User Balance
  const balanceData = ERC20BalanceOf({
    ownerAddress: connectedAddress!
  });

  // Allowance
  const allowanceData = ERC20Allowance({
    ownerAddress: connectedAddress,
    spenderAddress: MintContractTestAddress
  });

  // Approve
  const approveConfig = ApprovePoolPreparedContract({
    tokenAmount: parseEther((100000000).toString()),
    spenderAddress: MintContractTestAddress
  });
  const { data: approveData, write: writeERC20Approve } = useContractWrite(approveConfig);

  const { isLoading: isLoadingERC20Approve, isSuccess: approveIsSuccessful } = useWaitForTransaction({
    hash: approveData?.hash
  });

  // Mint
  const fractionalMintConfig = MintWarhol(mintAmount);

  const { data: mintdata, write: mintWrite } = useContractWrite(fractionalMintConfig);

  const { isLoading: mintIsLoading, isSuccess: mintIsSuccessful } = useWaitForTransaction({
    hash: mintdata?.hash
  });

  useEffect(() => {
    if (balanceData) {
      setBalanceAmount(balanceData);
    }
  }, [balanceData]);

  useEffect(() => {
    if (allowanceData) {
      setAllowanceAmount(parseFloat(ethers.utils.formatEther(allowanceData)));
      if (allowanceAmount > 0) {
        setAllowance(true);
      }
    }
  }, [allowanceData, allowanceAmount]);

  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  function handleSlider(event: Event | React.SyntheticEvent, value: number | number[]) {
    event.preventDefault();
    if (!Array.isArray(value)) {
      setMintAmount(value);
    }
  }

  async function executeMint() {
    // usd price divided by iAI price, then mutiply times amount to mint
    purchaseCost = parseFloat((usdAmount / iAIprice).toFixed(2)) * mintAmount;
    console.log('iai cost:', purchaseCost);
    //mintWrite?.();
    //reserve(connectedAddress, iAiCost, mintAmount, 1);
  }

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
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Grid item container justifyContent={'center'} display="flex">
                  <Grid item container xs={12} marginTop={{ md: 1 }} data-aos={'zoom-in-left'}>
                    <Grid item sm={12}>
                      <Typography
                        fontSize={22}
                        align="center"
                        color="white"
                        fontWeight={'bold'}
                        textTransform="uppercase"
                      >
                        Warhol Fine Art Spawn (20 Pieces){' '}
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={14} align="center" color="white">
                        Own a fractional share of an original Warhol artwork{' '}
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
              <Box marginTop={3}>
                <Button size={'large'} variant={'contained'} href={'/'}>
                  Back To Console{' '}
                </Button>
              </Box>
              <Box borderRadius={10} marginTop={3} maxWidth={{ md: 350 }} data-aos={'zoom-in'}>
                <Image alt="Background Image" src={WarholImage} quality={50} />
              </Box>
              <Box display={'flex'} flexDirection={'column'} marginTop={3} maxWidth={350}>
                <Typography
                  align="center"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  NFT Information:
                </Typography>
                <Typography fontSize={12} align="center" color="white" data-aos={'flip-left'} marginTop={-2}>
                  <br /> Own a fractional share of a original Warhol artwork
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'column'} marginTop={3} maxWidth={350}>
                <Typography
                  align="center"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  Reservation Instructions:
                </Typography>
                <Typography fontSize={12} align="center" color="white" data-aos={'flip-left'} marginTop={-2}>
                  <br /> To make a reservation for your Warhol Fine Art Spawn, connect your wallet to our minting dApp
                  here, sign the transaction and confirm it in your wallet.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 2
                }}
                data-aos={'zoom-out'}
              >
                <Typography fontSize={16} color={grey[100]}>
                  Reservation Cost: $200 of $1,000 total (in iAI tokens)
                </Typography>
                <Box>
                  <Typography color={'white'}>iAI Token Price: ${iAIprice!.toFixed(2)}</Typography>
                </Box>
                {connectedAddress && (
                  <>
                    <Typography fontSize={16} color={grey[100]}>
                      Balance: {Number(ethers.utils.formatEther(balanceAmount)).toFixed(3)} $iAi
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 300,
                  mt: 3
                }}
                data-aos="fade-up"
              >
                {connectedAddress ? (
                  <>
                    <Box width={{ sm: 450 }} marginY={3}>
                      <MintSlider
                        onChangeCommitted={(event: Event | React.SyntheticEvent, value: number | number[]) =>
                          handleSlider(event, value)
                        }
                        valueLabelDisplay="auto"
                        aria-label="Mint Amount"
                        marks={true}
                        min={1}
                        max={2}
                        sx={{
                          mt: 0,
                          mb: 0
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        fontSize={16}
                        color="white"
                        align="center"
                        sx={{
                          mt: 0
                        }}
                      >
                        QUANTITY SELECTOR: {mintAmount}
                      </Typography>
                      <Typography fontSize={16} color={grey[100]} align="center">
                        Total Cost: {parseFloat((usdAmount / iAIprice).toFixed(2)) * mintAmount} $iAi
                      </Typography>
                    </Box>
                    {!allowanceSet ? (
                      <MainButton
                        fullWidth
                        variant="contained"
                        disabled={!writeERC20Approve || isLoadingERC20Approve}
                        onClick={() => writeERC20Approve?.()}
                      >
                        {isLoadingERC20Approve ? 'Approving...' : `Approve  $iAi`}
                      </MainButton>
                    ) : (
                      <MainButton fullWidth variant="contained" onClick={() => executeMint()}>
                        {mintIsLoading ? 'Minting... ' : `Mint ${mintAmount} Fine Art Spawn `}
                      </MainButton>
                    )}
                    {approveIsSuccessful && (
                      <>
                        <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                          Successfully Approved $iAi!
                        </Typography>
                        <Link href={`${blockExplorer}/tx/${approveData?.hash}`} target="_blank" underline="hover">
                          <Typography fontSize={20} align="center" color="white">
                            View Transaction
                          </Typography>
                        </Link>
                      </>
                    )}
                    {mintIsSuccessful && (
                      <>
                        <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                          Successfully Minted {mintAmount} iAi Fine Art Spawn!
                        </Typography>
                        <Link href={`${blockExplorer}/tx/${mintdata?.hash}`} target="_blank" underline="hover">
                          <Typography fontSize={20} align="center" color="white">
                            View Transaction
                          </Typography>
                        </Link>
                      </>
                    )}
                    <ContractAddress address={MintContractTestAddress} />
                    <Web3Button />
                    <WalletAddress address={connectedAddress} />
                  </>
                ) : (
                  <>
                    <Web3Button />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Main>
    </>
  );
}

export default FractionalMint;

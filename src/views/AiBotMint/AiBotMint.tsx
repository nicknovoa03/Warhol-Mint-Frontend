import { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Divider, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import Main from '../../layouts/Main';
import Container from '../../components/Container';
import { BigNumber, ethers } from 'ethers';
import { Web3Button } from '@web3modal/react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { MainButton } from '../../components/form/formElements';
import theme from '../../theme';
import { ContractAddress, WalletAddress } from '../../components/form/stakeElements';
import { ERC20BalanceOf } from '../../components/contracts/wagmiContracts';
import { ERC20Allowance, ApprovePoolPreparedContract, MintWarhol } from '../../components/contracts/wagmiContracts';
import { NFT_ContractAddress } from '../../components/contracts/contractAddresses';
import { parseEther } from 'viem';
import Image from 'next/image';
import AiImage from '../../../public/AI.jpg';
import axios from 'axios';

function AiBotMint() {
  let [iAIprice, setiAIprice] = useState<number>(0.25);
  let [totalPrice, setTotalPrice] = useState<BigInt>(BigInt(0));
  let [balanceAmount, setBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [allowanceSet, setAllowance] = useState(false);
  let [allowanceAmount, setAllowanceAmount] = useState<number>(0);
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let { address, isConnected } = useAccount();
  const blockExplorer = 'https://etherscan.com';
  const usdAmount = 1000;
  const coin = 'inheritance-art'; // Access the coin symbol from the query parameters

  // User Balance
  const balanceData = ERC20BalanceOf({
    ownerAddress: connectedAddress!
  });

  // Allowance
  const allowanceData = ERC20Allowance({
    ownerAddress: connectedAddress,
    spenderAddress: NFT_ContractAddress
  });

  // Approve
  const approveConfig = ApprovePoolPreparedContract({
    tokenAmount: parseEther((100000000).toString()),
    spenderAddress: NFT_ContractAddress
  });

  const { data: approveData, write: writeERC20Approve } = useContractWrite(approveConfig);

  const { isLoading: isLoadingERC20Approve, isSuccess: approveIsSuccessful } = useWaitForTransaction({
    hash: approveData?.hash
  });

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

  useEffect(() => {
    const tempPrice = BigInt(Math.round(usdAmount / iAIprice) * 10 ** 18);
    console.log('totalPrice:', tempPrice);
    setTotalPrice(tempPrice);
  }, [iAIprice]);

  // Mint
  const AiMintConfig = MintWarhol({
    iAIamount: totalPrice,
    numberOfTokens: 1,
    uriNumber: 3
  });

  const { data: mintData, write: mintWrite } = useContractWrite(AiMintConfig);

  const { isLoading: mintIsLoading, isSuccess: mintIsSucccessful } = useWaitForTransaction({
    hash: mintData?.hash
  });

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
                        AI Human Model (20 Pieces)
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={14} align="center" color="white">
                        Make a reservation for your personal Ai Human Model
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box marginTop={2} width={'75%'}>
                <Divider
                  flexItem
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    height: '1px'
                  }}
                />
              </Box>
              <Box marginTop={3} data-aos={'zoom-in'}>
                <Button size={'large'} variant={'contained'} href={'/'}>
                  Back To Console{' '}
                </Button>
              </Box>
              <Box borderRadius={10} marginTop={3} maxWidth={{ md: 350 }} data-aos={'zoom-in'}>
                <Image alt="Background Image" src={AiImage} quality={50} />
              </Box>
              <Box display={'flex'} flexDirection={'column'} marginTop={3} maxWidth={350}>
                <Typography
                  align="center"
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'flip-right'}
                  textTransform="uppercase"
                >
                  AI Information:
                </Typography>
                <Typography fontSize={12} align="center" color="white" data-aos={'flip-left'} marginTop={-2}>
                  <br /> Ai Human Models are semi-autonomous and fully capable of natural language processing, imbuing
                  these digital creations with life, personality, and incredible capabilities.
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
                  Mint Instructions:
                </Typography>
                <Typography fontSize={12} align="center" color="white" data-aos={'flip-left'} marginTop={-2}>
                  <br /> To reserve your Ai Human Model, connect your wallet to our smart contract here, sign the
                  transaction and confirm it in your wallet.
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
                  Reservation Cost: $1,000 of $5,000 total (in iAI tokens){' '}
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
                <Typography fontSize={16} color={grey[100]} align="center" marginBottom={1}>
                  Total Cost: {parseFloat((usdAmount / iAIprice).toFixed(2))} $iAi
                </Typography>
                {connectedAddress ? (
                  <>
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
                      <MainButton
                        fullWidth
                        variant="contained"
                        disabled={!mintWrite || mintIsLoading}
                        onClick={() => mintWrite?.()}
                      >
                        {mintIsLoading ? 'Reserving... ' : `Reserve`}
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
                    {mintIsSucccessful && (
                      <>
                        <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                          Successfully Locked $iAi!
                        </Typography>
                        <Link href={`${blockExplorer}/tx/${mintData?.hash}`} target="_blank" underline="hover">
                          <Typography fontSize={20} align="center" color="white">
                            View Transaction
                          </Typography>
                        </Link>
                      </>
                    )}
                    <ContractAddress address={NFT_ContractAddress} />
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

export default AiBotMint;

import { useEffect, useState } from 'react';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';
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
import {
  ERC20Allowance,
  PoolPreparedContract,
  ApprovePoolPreparedContract
} from '../../components/contracts/poolWagmiContract';
import { Pool1ContractAddress } from '../../components/contracts/contractAddresses';
import { parseEther } from 'viem';
import Image from 'next/image';
import WarholImage from '../../../public/NFT-image.png';

function FractionalMint() {
  let [balanceAmount, setBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [mintAmount, setMintAmount] = useState<number>(1);
  let [allowanceSet, setAllowance] = useState(false);
  let [allowanceAmount, setAllowanceAmount] = useState<number>(0);
  let [poolAmount, setPoolAmount] = useState<BigNumber>(BigNumber.from(0));
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let { address, isConnected } = useAccount();
  const blockExplorer = 'https://etherscan.com';

  // User Balance
  const balanceData = ERC20BalanceOf({
    ownerAddress: connectedAddress!
  });

  // Allowance
  const allowanceData = ERC20Allowance({
    ownerAddress: connectedAddress,
    spenderAddress: Pool1ContractAddress
  });


  // Approve
  const approveConfig = ApprovePoolPreparedContract({
    tokenAmount: parseEther((100000000).toString()),
    spenderAddress: Pool1ContractAddress
  });
  const { data: approveData, write: writeERC20Approve } = useContractWrite(approveConfig);

  const { isLoading: isLoadingERC20Approve, isSuccess: approveIsSuccessful } = useWaitForTransaction({
    hash: approveData?.hash
  });

  // Lock
  const poolConfig = PoolPreparedContract({
    poolAmount: poolAmount,
    poolAddress: Pool1ContractAddress
  });

  const { data: poolData, write: stakeWrite } = useContractWrite(poolConfig);

  const { isLoading: stakeIsLoading, isSuccess: stakeIsSuccessful } = useWaitForTransaction({
    hash: poolData?.hash
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
                        Fractional Warhol Mint
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography fontSize={14} align="center" color="white">
                        Mint a fractional share of a Warhol Artwork
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
                <MainButton href="/">Back to console</MainButton>{' '}
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
                  Mint Information:
                </Typography>
                <Typography fontSize={12} align="left" color="white" data-aos={'flip-left'} marginTop={-2}>
                  <br /> -To mint your artwork, connect your wallet to our minting dapp here, sign the transaction and
                  confirm it in your wallet.
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
                  Cost: $500
                </Typography>
                {connectedAddress && (
                  <>
                    <Typography fontSize={16} sx={{ mb: 5 }} color={grey[100]}>
                      Balance: {Number(ethers.utils.formatEther(balanceAmount)).toFixed(3)} $iAi
                    </Typography>
                  </>
                )}
                <Box width={{ sm: 450 }}>
                  <MintSlider
                    onChangeCommitted={(event: Event | React.SyntheticEvent, value: number | number[]) =>
                      handleSlider(event, value)
                    }
                    valueLabelDisplay="auto"
                    aria-label="Mint Amount"
                    marks={true}
                    min={1}
                    max={5}
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
                      mt: 0,
                      mb: 2
                    }}
                  >
                    QUANTITY SELECTOR
                  </Typography>
                </Box>
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
                        disabled={!stakeWrite || stakeIsLoading}
                        onClick={() => stakeWrite?.()}
                      >
                        {stakeIsLoading ? 'Locking... ' : `Lock ${ethers.utils.formatEther(poolAmount)} $iAI`}
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
                    {stakeIsSuccessful && (
                      <>
                        <Typography variant="h6" align="center" sx={{ mt: 1 }} color="white">
                          Successfully Locked $iAi!
                        </Typography>
                        <Link href={`${blockExplorer}/tx/${poolData?.hash}`} target="_blank" underline="hover">
                          <Typography fontSize={20} align="center" color="white">
                            View Transaction
                          </Typography>
                        </Link>
                      </>
                    )}
                    <ContractAddress address={Pool1ContractAddress} />
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
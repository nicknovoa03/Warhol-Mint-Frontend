import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import Container from '../../../../components/Container';
import { MainButton, StakeCell, StakeTableContainer, WithDrawButton } from '../../../../components/form/formElements';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import {
  AllPooled,
  ClaimRewardPreparedContract,
  PoolBalance,
  UnpoolPreparedContract,
  WithdrawPositionPreparedContract
} from '../../../../components/contracts/poolWagmiContract';
import { Pool3ContractAddress } from '../../../../components/contracts/contractAddresses';

type StakeTableProps = {
  address: `0x${string}` | undefined;
};

interface StakeData {
  id: number;
  startDate: string;
  amount: string;
  reward: string;
  penalty: string;
  endDate: string;
  stakeComplete: boolean;
}

export default function StakeTable({ address }: StakeTableProps) {
  let [pool1Balance, setPool1Balance] = useState<String>('0');
  let [hasPools, setHasPools] = useState(false);
  let [activePools, setActivePools] = useState<StakeData[]>([]);
  let [selectedIndex, setSelectedIndex] = useState<number>();
  let [hasRewards, setHasRewards] = useState<Boolean>(false);

  function createData(
    id: number,
    startDate: string,
    amount: string,
    reward: number,
    penalty: number,
    endDate: string,
    stakeComplete: boolean
  ) {
    return { id, startDate, amount, reward, penalty, endDate, stakeComplete };
  }
  const penalty = 25;
  const reward = 5.5;
  const lockTime = 182;

  // Unstake
  const unstakeConfig = UnpoolPreparedContract({
    index: selectedIndex!,
    poolAddress: Pool3ContractAddress
  });

  const { data: unstakeData, write: unstakeWrite } = useContractWrite(unstakeConfig);

  const { isLoading: unstakeIsLoading } = useWaitForTransaction({
    hash: unstakeData?.hash
  });

  // Withdraw
  const withdrawConfig = WithdrawPositionPreparedContract({
    index: selectedIndex!,
    poolAddress: Pool3ContractAddress
  });
  const { data: withdrawData, write: withdrawWrite } = useContractWrite(withdrawConfig);
  const { isLoading: withdrawIsLoading } = useWaitForTransaction({
    hash: withdrawData?.hash
  });

  // Claim Rewards
  const claimRewardConfig = ClaimRewardPreparedContract({ poolAddress: Pool3ContractAddress });
  const { data: claimRewardsData, write: claimRewardsWrite } = useContractWrite(claimRewardConfig);
  const { isLoading: claimRewardsIsLoading } = useWaitForTransaction({
    hash: claimRewardsData?.hash
  });

  // Staking balance
  const stakingBalanceData = PoolBalance({
    ownerAddress: address!,
    poolAddress: Pool3ContractAddress
  }) as BigNumber;

  // Staking postions
  const staked = AllPooled({
    ownerAddress: address,
    poolAddress: Pool3ContractAddress
  });

  useEffect(() => {
    if (stakingBalanceData) {
      setPool1Balance(ethers.utils.formatEther(stakingBalanceData));
    }
  }, [stakingBalanceData]);

  // This is a React useEffect hook that will run whenever the value of `staked` changes
  useEffect(() => {
    // Check if `staked` is an array and has at least one element
    if (Array.isArray(staked) && staked.length > 0) {
      let activeStake: any = [];
      setHasPools(true);
      // Iterate through each element in `staked`
      let currentDate = new Date();
      for (let i = 0; i < staked.length; i++) {
        // Convert the `amount` value from Wei to Ether
        let amount = ethers.utils.formatEther(staked[i].amount);
        // Convert the timestamp value to a JavaScript Date object for the start and end dates
        let startDate = new Date(staked[i].timestamp.toNumber() * 1000);
        let endDate = new Date(staked[i].timestamp.toNumber() * 1000);
        // Add 30 days to the end date
        endDate.setDate(endDate.getDate() + lockTime);
        // check if end date is passed the current datez
        let stakeComplete = false;
        if (endDate < currentDate) {
          stakeComplete = true;
          setHasRewards(true);
        }
        // Create an object with the formatted start date, amount, reward rate, penalty rate, and formatted end date
        let stakeData = createData(
          i,
          startDate.toLocaleString(),
          amount,
          reward,
          penalty,
          endDate.toLocaleString(),
          stakeComplete
        );
        // Add the stake data object to the `activeStake` array
        activeStake.push(stakeData);
      }
      setActivePools(activeStake);
    }
  }, [staked]);

  function handleWithdrawClick(id: number) {
    setIndexFromClick(id);
    if (withdrawWrite) {
      //console.log(selectedIndex)
      withdrawWrite();
    }
  }

  function handleUnstakeClick(id: number) {
    setIndexFromClick(id);
    if (unstakeWrite) {
      //console.log(selectedIndex)
      unstakeWrite();
    }
  }

  function setIndexFromClick(id: number) {
    setSelectedIndex(id);
  }

  return (
    <>
      {hasPools && (
        <Container>
          <Box display="flex" flexDirection={'column'} alignItems={'center'} data-aos={'fade-in'}>
            <Box marginBottom={3}>
              <Typography
                variant="h4"
                align="center"
                sx={{ mt: 1 }}
                color="white"
                fontWeight={'bold'}
                data-aos={'zoom-in'}
                textTransform="uppercase"
              >
                Active Pools
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.7);',
                px: 2,
                py: 3,
                borderRadius: 3,
                border: '1px solid white'
              }}
              maxWidth={{ xs: 375, sm: 550, md: 750, lg: 1000 }}
              data-aos={'zoom-in-up'}
            >
              <StakeTableContainer>
                <Typography
                  fontSize={18}
                  align="center"
                  sx={{ mb: 3 }}
                  color="white"
                  fontWeight={'bold'}
                  data-aos={'zoom-in'}
                  textTransform="uppercase"
                >
                  Personally Pooled: {pool1Balance} $iAI
                </Typography>
                {hasRewards && (
                  <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
                    <MainButton
                      disabled={!claimRewardsWrite || claimRewardsIsLoading}
                      onClick={() => claimRewardsWrite?.()}
                      variant="contained"
                    >
                      Claim Rewards
                    </MainButton>
                  </Box>
                )}
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StakeCell align="center">ID</StakeCell>
                      <StakeCell align="center">START DATE</StakeCell>
                      <StakeCell align="center">AMOUNT</StakeCell>
                      <StakeCell align="center">REWARD</StakeCell>
                      <StakeCell align="center">PENALTY</StakeCell>
                      <StakeCell align="center">END DATE</StakeCell>
                      <StakeCell align="center"></StakeCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activePools
                      .slice()
                      .reverse()
                      .map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StakeCell align="center">{row.id + 1}</StakeCell>
                          <StakeCell align="center">{row.startDate}</StakeCell>
                          <StakeCell align="center">{row.amount}</StakeCell>
                          <StakeCell align="center">{row.reward + '%'}</StakeCell>
                          <StakeCell align="center">{row.penalty + '%'}</StakeCell>
                          <StakeCell align="center">{row.endDate}</StakeCell>
                          <StakeCell align="center">
                            {!row.stakeComplete && (
                              <WithDrawButton disabled={withdrawIsLoading} onClick={() => handleWithdrawClick(row.id)}>
                                {withdrawIsLoading ? 'Loading...' : 'Withdraw'}
                              </WithDrawButton>
                            )}
                            {row.stakeComplete && (
                              <WithDrawButton disabled={unstakeIsLoading} onClick={() => handleUnstakeClick(row.id)}>
                                {withdrawIsLoading ? 'Loading...' : 'Unstake'}
                              </WithDrawButton>
                            )}
                          </StakeCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </StakeTableContainer>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

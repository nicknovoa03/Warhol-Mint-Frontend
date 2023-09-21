import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import Pool from './ABI/iAIPool1.json';
import {
  ReadPoolContractProps,
  ReadPoolDetailsContractProps,
  PoolContractProps,
  UnpoolingContractProps,
  erc20ApproveProps,
  AllowanceProps,
  iAI_ContractAddress,
  ClaimRewardContractProps
} from './wagmiContracts';

export const testPoolContract: `0x${string}` = '0xd1cc357af989564b251104b671eb6a58bf00dc06';

//Pool1ContractAddress = testPoolContract;

// Approve token for tokenTransfer
export const ApprovePoolPreparedContract = (props: erc20ApproveProps) => {
  const { config } = usePrepareContractWrite({
    address: iAI_ContractAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [props.spenderAddress, props.tokenAmount]
  });
  return config;
};

// Get Allowance for token owner and spender
export const ERC20Allowance = (props: AllowanceProps) => {
  const { data } = useContractRead({
    address: iAI_ContractAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [props.ownerAddress!, props.spenderAddress]
  });
  return data;
};

// Initiate Stake
export const PoolPreparedContract = (props: PoolContractProps) => {
  const { config } = usePrepareContractWrite({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'pool',
    args: [props.poolAmount]
  });
  return config;
};

// Unstake without penalty
export const UnpoolPreparedContract = (props: UnpoolingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'unPool',
    args: [props.index]
  });
  return config;
};

//Unstake with penalty
export const WithdrawPositionPreparedContract = (props: UnpoolingContractProps) => {
  const { config } = usePrepareContractWrite({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'withdrawPosition',
    args: [props.index]
  });
  return config;
};

// Claim Reward
export const ClaimRewardPreparedContract = (props: ClaimRewardContractProps) => {
  const { config } = usePrepareContractWrite({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'claimReward'
  });
  return config;
};

// Get staking balance for an address
export const PoolBalance = (props: ReadPoolContractProps) => {
  const { data } = useContractRead({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'poolPostions',
    args: [props.ownerAddress]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const PoolDetails = (props: ReadPoolDetailsContractProps) => {
  const { data } = useContractRead({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'poolPostionDetails',
    args: [props.ownerAddress, props.index]
  });
  return data;
};

// Get staking detials for specifc stake with an index
export const AllPooled = (props: ReadPoolContractProps) => {
  const { data } = useContractRead({
    address: props.poolAddress,
    abi: Pool.abi,
    functionName: 'allPooled',
    args: [props.ownerAddress]
  });
  return data;
};

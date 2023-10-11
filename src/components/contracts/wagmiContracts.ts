import { BigNumber } from 'ethers';
import { useContractRead, erc20ABI, usePrepareContractWrite } from 'wagmi';
import TokenEth from './ABI/TokenEth.json';
import Collection9022 from './ABI/Collection9022.json';
import { MintContractTestAddress, testiAIaddress } from './contractAddresses';
import WarholJson from './ABI/warhol.json';

export type AllowanceProps = {
  ownerAddress: `0x${string}` | undefined;
  spenderAddress: `0x${string}`;
};

export type erc20ApproveProps = {
  spenderAddress: `0x${string}`;
  tokenAmount: bigint;
};

export type BalanceProps = {
  ownerAddress: `0x${string}`;
};

export type MintingProps = {
  iAIamount: BigInt;
  numberOfTokens: number;
  uriNumber: number;
};

// Get balance of for token owner
export const ERC20BalanceOf = (props: BalanceProps) => {
  const { data } = useContractRead({
    address: testiAIaddress,
    abi: TokenEth.abi,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data as BigNumber;
};

// Get balance of for token owner
export const ERC721BalanceOf = (props: BalanceProps) => {
  const { data } = useContractRead({
    address: MintContractTestAddress,
    abi: Collection9022.abi,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data as BigNumber;
};

export const MintWarhol = (props: MintingProps) => {
  const { config } = usePrepareContractWrite({
    address: MintContractTestAddress,
    abi: WarholJson.abi,
    functionName: 'mint',
    args: [props.iAIamount, props.numberOfTokens, props.uriNumber]
  });
  return config;
};

// Approve token for tokenTransfer
export const ApprovePoolPreparedContract = (props: erc20ApproveProps) => {
  const { config } = usePrepareContractWrite({
    address: testiAIaddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [props.spenderAddress, props.tokenAmount]
  });
  return config;
};

// Get Allowance for token owner and spender
export const ERC20Allowance = (props: AllowanceProps) => {
  const { data } = useContractRead({
    address: testiAIaddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [props.ownerAddress!, props.spenderAddress]
  });
  return data;
};

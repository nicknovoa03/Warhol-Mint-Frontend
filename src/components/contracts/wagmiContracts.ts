import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import TokenEth from './ABI/TokenEth.json';
import Collection9022 from './ABI/Collection9022.json';
import { testiAIaddress } from './mintWagmiContracts';

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

export let iAI_ContractAddress: `0x${string}` = '0x6dDe4fFD6dB302Bc9a46850f61399e082f6c2122';
export let NFT_ContractAddress: `0x${string}` = '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796';

//iAI_ContractAddress = testERC20;
//NFT_ContractAddress = testNFT;

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
    address: NFT_ContractAddress,
    abi: Collection9022.abi,
    functionName: 'balanceOf',
    args: [props.ownerAddress!]
  });
  return data as BigNumber;
};

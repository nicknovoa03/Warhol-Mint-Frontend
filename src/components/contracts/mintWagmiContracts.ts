import { usePrepareContractWrite, useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';
import { erc20ApproveProps, AllowanceProps } from './wagmiContracts';
import { MintContractTestAddress } from './contractAddresses';
import WarholJson from './ABI/warhol.json';
import { parseGwei } from 'viem';

export const testPoolContract: `0x${string}` = '0xd1cc357af989564b251104b671eb6a58bf00dc06';
export const testiAIaddress: `0x${string}` = '0xB83cA21FED7054bAE76613cEd0215FaA06706361';

//Pool1ContractAddress = testPoolContract;

export const MintWarhol = (numberOfTokens: number) => {
  const { config } = usePrepareContractWrite({
    address: MintContractTestAddress,
    abi: WarholJson.abi,
    functionName: 'mint',
    args: [numberOfTokens],
    gasPrice: parseGwei("20"),
    gas: parseGwei("21000"),
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

import { Box, CircularProgress, Typography } from '@mui/material';
import { AddressLink } from './formElements';
const blockExplorer = 'https://etherscan.com/address/';
//const sepoliaExplorer = 'https://sepolia.etherscan.io/address/';

type address = { address: `0x${string}` };
export const WalletAddress = (props: address) => {
  const link = blockExplorer.concat(props.address!);
  return (
    <Typography sx={{ mt: 1 }}>
      <AddressLink href={link} target="_blank" variant="subtitle1" underline="hover">
        CONNECTED WALLET
      </AddressLink>
    </Typography>
  );
};

export const ContractAddress = (props: address) => {
  const link = blockExplorer.concat(props.address);
  return (
    <Typography sx={{ mt: 1, mb: 3 }}>
      <AddressLink href={link} target="_blank" variant="subtitle1" underline="hover" textTransform={'uppercase'}>
        Contract Address
      </AddressLink>
    </Typography>
  );
};

export const Approving = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ mt: 2 }}>Approving</Typography>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};

import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { BigNumber, ethers } from 'ethers';
import { ERC20BalanceOf, ERC721BalanceOf } from '../../../../components/contracts/wagmiContracts';
import { useAccount } from 'wagmi';
import getNFTMetadata from '../../../../components/nfts/NFTMetadata';
import { nftMetadataDictionary } from '../../../../components/nftData/nftMetadataDictionary';

const pools = [
  {
    title: 'Pool 1',
    features: [
      'THRESHOLD: 10,000 iAI Tokens',
      'Minimum 9022 NFTs Required: 1',
      'YEARLY Distribution on iAI THRESHOLD: 2%'
    ],
    iAiTokenReqs: 10,
    nftCountReqs: 1,
    size: 4,
    href: '/Pool1'
  },
  {
    title: 'Pool 2',
    features: [
      'THRESHOLD: 30,000 iAI Tokens',
      'Minimum 9022 NFTs Required: 2',
      'YEARLY Distribution on iAI THRESHOLD: 4%'
    ],
    iAiTokenReqs: 30000,
    nftCountReqs: 1,
    size: 4,
    href: '/Pool2'
  },
  {
    title: 'Pool 3',
    features: [
      'THRESHOLD: 100,000 iAI Tokens',
      'Minimum 9022 NFTs Required: 3-10',
      'YEARLY Distribution on iAI THRESHOLD: 5.5%',
      '.5% will be added to the total distribution for each NFT held >3. Max 9% iAI THRESHOLD'
    ],
    iAiTokenReqs: 100000,
    nftCountReqs: 3,
    size: 4,
    href: '/Pool3'
  }
];
const prestigePool = {
  title: 'Prestige Ambassador',
  features: [
    'THRESHOLD: 200,000 iAI Tokens',
    '9022 NFTs Required: Prestige',
    'YEARLY Distribution on iAI THRESHOLD: 10%'
  ],
  iAiTokenReqs: 200000,
  size: 6,
  href: '/PoolPrestige'
};

const PoolDI = {
  title: 'Destination Inheritance Ambassador',
  features: [
    'THRESHOLD: 300,000 iAI Tokens',
    '9022 NFTs Required: Destination Inheritance',
    'YEARLY Distribution on iAI THRESHOLD: 12%'
  ],
  iAiTokenReqs: 300000,
  size: 6,
  href: '/PoolDI'
};

const PoolSelection = () => {
  const theme = useTheme();
  let [connectedAddress, setConnectedAddress] = useState<`0x${string}` | undefined>();
  let [iAIbalanceAmount, setiAIBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [NFTBalanceAmount, setNFTBalanceAmount] = useState<BigNumber>(BigNumber.from(0));
  let [nftMetadata, setNFTMetadata] = useState<string[]>([]);
  let [ownedNfts, setOwnedNfts] = useState<{ [key: string]: number }>({});
  let [prestigeFlag, setPrestigeFlag] = useState<Boolean>(false);
  let [destinationInheritanceFlag, setDestinationInheritanceFlag] = useState<Boolean>(false);
  let { address, isConnected } = useAccount();

  // Save Connected Address to state
  useEffect(() => {
    setConnectedAddress(address);
  }, [isConnected]);

  // set NFT's Owned
  useEffect(() => {
    fetchData();
  }, [connectedAddress]);

  async function fetchData() {
    const loadNftMetadata = await getNFTMetadata(connectedAddress!);
    setNFTMetadata(loadNftMetadata);
  }

  // set NFT background data to state
  useEffect(() => {
    matchMetadata();
  }, [nftMetadata]);

  function matchMetadata() {
    let nftBackgroundDictionary: { [key: string]: number } = {};
    for (let i in nftMetadata) {
      // get nft number
      let nftNumber = nftMetadata[i];
      // get background type
      let nftBackground = nftMetadataDictionary[nftNumber.toString()];
      let backgroundIdentifier: string;
      // check background and set identifier
      if (nftBackground == 'Destination Inheritance') {
        backgroundIdentifier = 'DI';
      } else if (nftBackground == 'Basquiat' || nftBackground == 'Warhol') {
        backgroundIdentifier = 'Prestige';
      } else {
        backgroundIdentifier = 'Standard';
      }
      // add to dictionary or increment count
      if (!nftBackgroundDictionary[backgroundIdentifier]) {
        nftBackgroundDictionary[backgroundIdentifier] = 1;
      } else {
        nftBackgroundDictionary[backgroundIdentifier]++;
      }
    }
    //console.log('nft dic:', nftBackgroundDictionary);
    // set state
    setOwnedNfts(nftBackgroundDictionary);
  }

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

  // Set NFT data
  useEffect(() => {
    //let nfts: any = Object.values(ownedNfts)[0];
    //console.log('owned nfts:', ownedNfts);
    //console.log('nft count:', Object.keys(nfts));
    for (const key in ownedNfts) {
      if (key == 'Prestige') {
        setPrestigeFlag(true);
      } else if (key == 'DI') {
        setPrestigeFlag(true);
        setDestinationInheritanceFlag(true);
      }
    }
    //console.log('prestige flag:', prestigeFlag);
    //console.log('DI flag:', destinationInheritanceFlag);
  }, [ownedNfts, nftMetadata]);

  return (
    <Grid container spacing={4}>
      {pools.map((item, i) => (
        <Grid item md={item.size} key={i}>
          <Box
            component={Card}
            height={1}
            display={'flex'}
            flexDirection={'column'}
            bgcolor={theme.palette.common.black}
            sx={{ borderRadius: 3, border: '1px solid white' }}
            data-aos={'flip-left'}
          >
            <CardContent
              sx={{
                padding: 4
              }}
            >
              <Box marginBottom={0}>
                <Typography variant={'h4'} align="center" color={theme.palette.common.white}>
                  <Box component={'span'} fontWeight={600}>
                    {item.title}
                  </Box>
                </Typography>
              </Box>

              <Box marginBottom={2}>
                <Typography variant={'h5'} align="center" color={theme.palette.common.white}>
                  {Number(NFTBalanceAmount) >= item.nftCountReqs &&
                  Number(ethers.utils.formatEther(iAIbalanceAmount)) >= item.iAiTokenReqs ? (
                    <Box
                      component="span"
                      sx={{
                        padding: 0.5,
                        color: 'green'
                      }}
                      fontWeight={600}
                    >
                      Eligible
                    </Box>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        padding: 0.5,
                        color: 'red'
                      }}
                      fontWeight={600}
                    >
                      ineligible
                    </Box>
                  )}
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {item.features.map((feature, j) => (
                  <Grid item xs={12} key={j}>
                    <Box component={ListItem} padding={0}>
                      <Box component={ListItemAvatar} minWidth={'auto !important'} marginRight={2}>
                        <Box component={Avatar} bgcolor={theme.palette.primary.main} width={20} height={20}>
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={feature} style={{ color: theme.palette.common.white }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Box flexGrow={1} />

            <CardActions sx={{ justifyContent: 'flex-end', padding: 4 }}>
              <Button size={'large'} variant={'contained'} href={item.href}>
                Learn More
              </Button>
            </CardActions>
          </Box>
        </Grid>
      ))}

      <Grid item md={prestigePool.size}>
        <Box
          component={Card}
          height={1}
          display={'flex'}
          flexDirection={'column'}
          bgcolor={theme.palette.common.black}
          sx={{ borderRadius: 3, border: '1px solid white' }}
          data-aos={'flip-left'}
        >
          <CardContent
            sx={{
              padding: 4
            }}
          >
            <Box marginBottom={0}>
              <Typography variant={'h4'} align="center" color={theme.palette.common.white}>
                <Box component={'span'} fontWeight={600}>
                  {prestigePool.title}
                </Box>
              </Typography>
            </Box>

            <Box marginBottom={2}>
              <Typography variant={'h5'} align="center" color={theme.palette.common.white}>
                {prestigeFlag && Number(ethers.utils.formatEther(iAIbalanceAmount)) >= prestigePool.iAiTokenReqs ? (
                  <Box
                    component="span"
                    sx={{
                      padding: 0.5,
                      color: 'green'
                    }}
                    fontWeight={600}
                  >
                    Eligible
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{
                      padding: 0.5,
                      color: 'red'
                    }}
                    fontWeight={600}
                  >
                    ineligible
                  </Box>
                )}
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {prestigePool.features.map((feature, j) => (
                <Grid item xs={12} key={j}>
                  <Box component={ListItem} padding={0}>
                    <Box component={ListItemAvatar} minWidth={'auto !important'} marginRight={2}>
                      <Box component={Avatar} bgcolor={theme.palette.primary.main} width={20} height={20}>
                        <svg
                          width={12}
                          height={12}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Box>
                    </Box>
                    <ListItemText primary={feature} style={{ color: theme.palette.common.white }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Box flexGrow={1} />

          <CardActions sx={{ justifyContent: 'flex-end', padding: 4 }}>
            <Button size={'large'} variant={'contained'} href={prestigePool.href}>
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Grid>

      <Grid item md={PoolDI.size}>
        <Box
          component={Card}
          height={1}
          display={'flex'}
          flexDirection={'column'}
          bgcolor={theme.palette.common.black}
          sx={{ borderRadius: 3, border: '1px solid white' }}
          data-aos={'flip-left'}
        >
          <CardContent
            sx={{
              padding: 4
            }}
          >
            <Box marginBottom={0}>
              <Typography variant={'h4'} align="center" color={theme.palette.common.white}>
                <Box component={'span'} fontWeight={600}>
                  {PoolDI.title}
                </Box>
              </Typography>
            </Box>

            <Box marginBottom={2}>
              <Typography variant={'h5'} align="center" color={theme.palette.common.white}>
                {destinationInheritanceFlag &&
                Number(ethers.utils.formatEther(iAIbalanceAmount)) >= PoolDI.iAiTokenReqs ? (
                  <Box
                    component="span"
                    sx={{
                      padding: 0.5,
                      color: 'green'
                    }}
                    fontWeight={600}
                  >
                    Eligible
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{
                      padding: 0.5,
                      color: 'red'
                    }}
                    fontWeight={600}
                  >
                    ineligible
                  </Box>
                )}
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {PoolDI.features.map((feature, j) => (
                <Grid item xs={12} key={j}>
                  <Box component={ListItem} padding={0}>
                    <Box component={ListItemAvatar} minWidth={'auto !important'} marginRight={2}>
                      <Box component={Avatar} bgcolor={theme.palette.primary.main} width={20} height={20}>
                        <svg
                          width={12}
                          height={12}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Box>
                    </Box>
                    <ListItemText primary={feature} style={{ color: theme.palette.common.white }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Box flexGrow={1} />
          <CardActions sx={{ justifyContent: 'flex-end', padding: 4 }}>
            <Button size={'large'} variant={'contained'} href={PoolDI.href}>
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PoolSelection;

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Warhol Fractional Mint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Benefits for 9022 Holders: <br /> - Access to gated merchandise
            <br /> - Access to Ambassador Program IAI <br /> Seed Holder Benefits:
            <br />
            Seed holders of inheritance Art&apos;s Seed NFT (BEP20) can leverage a 30% rebate on their 9022, so long as
            they use the same wallet/same address on the Ethereum Blockchain, that holds their Seed NFT.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Warhol Physical Mint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Seed holders of inheritance Art&apos;s Seed NFT (BEP20) can leverage a 30% rebate on their 9022, so long as
            they use the same wallet/same address on the Ethereum Blockchain, that holds their Seed NFT. <br />
            <br />
            One for one rebate will be available. Example: If you hold one iAI Seed NFT (Binance Smart Chain) and you
            purchase one 9022 using the same wallet (Ethereum), you will receive a 30% rebate once verified by the
            inheritance Art team on your purchase of a 9022.
            <br /> <br />
            If you hold three Seed NFTs and purchase four 9022s, you will receive a rebate on three of the four 9022s
            purchased.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>AI Companion Mint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Seed holders of inheritance Art&apos;s Seed NFT (BEP20) can leverage a 30% rebate on their 9022, so long as
            they use the same wallet/same address on the Ethereum Blockchain, that holds their Seed NFT. <br />
            <br />
            One for one rebate will be available. Example: If you hold one iAI Seed NFT (Binance Smart Chain) and you
            purchase one 9022 using the same wallet (Ethereum), you will receive a 30% rebate once verified by the
            inheritance Art team on your purchase of a 9022.
            <br /> <br />
            If you hold three Seed NFTs and purchase four 9022s, you will receive a rebate on three of the four 9022s
            purchased.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Warhol Fractional Mint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Own a fractional share of a original Warhol artwork</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Warhol Physical Mint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Own a physical copy of a original Warhol artwork</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography>AI Human Model</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            AI Model will respond to spoken language with general information about the subject provided in prerecorded
            responses purchased.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

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
          <Typography>Warhol Spawn Bundle</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Own a fractional share of an original Warhol artwork and a unique physical artwork hand-painted by Æthelstan
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Warhol Fine Art Spawn</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Own a physical share of a original Warhol artwork</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography>Reservation for Ai Human Model</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ai Human Models are semi-autonomous and fully capable of natural language processing, imbuing these digital
            creations with life, personality, and incredible capabilities.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import { Button, Link, Slider, TableCell, TableContainer, TextField, styled } from '@mui/material';
import { blue, grey, orange } from '@mui/material/colors';

const IALogoColor = 'gold';

export const AddressLink = styled(Link)({
  color: blue[50],
  '&.MuiLink-underlineHover': {
    color: grey[500]
  }
});

export const PoolSelectionButton = styled(Button)({
  fontSize: 18,
  margin: '10px',
  padding: '10px',
  width: '100%',
  border: '2px solid',
  textAlign: 'center',
  '&.MuiButton-root': {
    color: grey[50],
    backgroundColor: grey[900]
  },
  '&:hover': {
    backgroundColor: grey[50],
    color: grey[900]
  },
  '&:active': {
    backgroundColor: IALogoColor,
    color: grey[900]
  }
});

export const MainButton = styled(Button)({
  fontSize: 18,
  padding: '12px',
  border: '3px solid',
  lineHeight: 2,
  borderRadius: 30,
  '&.MuiButton-root': {
    boxShadow: blue[50],
    backgroundColor: blue[400],
    borderColor: blue[700],
    color: blue[50]
  },
  '&:hover': {
    backgroundColor: blue[50],
    borderColor: blue[700],
    color: blue[700]
  },
  '&:active': {
    backgroundColor: blue[500],
    borderColor: blue[50],
    color: blue[50]
  }
});

export const StakeCell = styled(TableCell)({
  color: grey[100]
});

export const WithDrawButton = styled(Button)({
  '&.MuiButton-root': {
    boxShadow: grey[50],
    borderColor: grey[700],
    color: grey[100]
  },
  '&:hover': {
    backgroundColor: grey[500],
    color: grey[50]
  },
  '&:active': {
    backgroundColor: IALogoColor,
    color: grey[50]
  }
});

export const UnstakeButton = styled(Button)({
  '&.MuiButton-root': {
    color: grey[800],
    backgroundColor: grey[50]
  },
  '&:hover': {
    backgroundColor: grey[500],
    color: grey[50]
  },
  '&:active': {
    backgroundColor: IALogoColor,
    color: grey[50]
  }
});

export const StakeAmountField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white'
  },
  '& .MuiInputLabel-root': {
    color: 'white'
  },
  '& .MuiOutlinedInput-input': {
    color: 'white'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  }
});

export const StakeTableContainer = styled(TableContainer)({});

export const MintSlider = styled(Slider)({
  color: orange[50],
  height: 5,
  '& .MuiSlider-track': {
      border: 'none'
  },
  '& .MuiSlider-thumb': {
      height: 15,
      width: 15,
      backgroundColor: orange[50],
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          width: 20,
          height: 20,
      },
      '&:before': {
          display: 'none'
      }
  },
  '& .MuiSlider-rail': {
      opacity: 0.3
  },
  '& .MuiSlider-valueLabel': {
      color: orange[50],
      lineHeight: 1.2,
      fontSize: 15,
      width: 30,
      height: 30,
      borderRadius: '50% 50% 50% 0%',
      backgroundColor: orange[500],
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
      },
      '& > *': {
          transform: 'rotate(45deg)'
      }
  }
})

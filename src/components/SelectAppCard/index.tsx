import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface SelectAppCardProps {
  item: string;
  to: string;
  disabled?: boolean;
}

export const SelectAppCard = ({
  item,
  to,
  disabled,
}: SelectAppCardProps): JSX.Element => {
  return (
    <Grid item xs={6}>
      <Button
        sx={{ width: '100%', height: '100px' }}
        variant="outlined"
        component={Link}
        to={to}
        disabled={disabled}
      >
        {disabled ? '???' : item}
      </Button>
    </Grid>
  );
};

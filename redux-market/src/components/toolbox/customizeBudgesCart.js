import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
//import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 2px',
  },
}))(Badge);

export default function CustomizedBadges(props) {
  return (
    //<IconButton aria-label="cart" className="p-0 ml-2">
      <StyledBadge className="p-0 ml-auto" badgeContent={props.quantity} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
   // </IconButton>
  );
}
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { Slide } from 'react-reveal'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Badge, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List,
IconButton, ListItem, ListItemIcon, ListItemText, Avatar} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ff1313"
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  linkH5: {
    textDecoration: 'none',
    color: 'white'
  },
  linkList:{
    textDecoration: 'none',
    color: '#1f1f1f',
    "&:hover": {
      color: '#ff1313'
    }
  },
  listIcon:{
    color: '#757575',
    "&:hover":{
      color: '#ff1313'
    }
  }

}));

const NavigationAppBar = (props) =>{
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Slide left duration={1500}>
          <Toolbar>
            <IconButton    
              aria-label="Открыть меню"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h5" noWrap>
                <Link className={classes.linkH5} to="/main">
                  Kumdang-2
                </Link>
              </Typography>
          </Toolbar>
        </Slide>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Link to="/main"><Avatar alt="kumdang-2" src={'assets/avatar/logo.png'} className={classes.bigAvatar} /></Link>
          <Link className={classes.linkList} to="/main"><Typography variant="h6" noWrap>Kumdang-2</Typography></Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link className={classes.linkList} to="/categorie"> 
            <ListItem button>
              <ListItemIcon> 
                <CategoryIcon className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText primary={"Category"} ></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/products">
            <ListItem button>
              <ListItemIcon>
                <ShoppingBasketOutlinedIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText primary={"Product"} />
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/mail">
            <ListItem button>
              <ListItemIcon> 
              <Badge className={classes.margin} badgeContent={props.mails.length} color="secondary">
                <MailIcon className={classes.listIcon} />
              </Badge> 
              </ListItemIcon>
              <ListItemText primary={"Mail"} />
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/users">
            <ListItem button>
              <ListItemIcon> 
                <AccountCircleIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText primary={"Accounts"} />
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/orders">
            <ListItem button>
              <ListItemIcon> 
                <PaymentIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
     </div>
  );
}

NavigationAppBar.propTypes = {
  mailsCount: PropTypes.number
};

export default NavigationAppBar
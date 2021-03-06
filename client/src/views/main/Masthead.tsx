import React, { memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import hackerImage from '../../images/hacker.png';
import Button from '@material-ui/core/Button';
import { AppDataHelper } from '../../services/appDataHelper';

export const Masthead = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			userSelect: 'none',
		},
		content: {
			height: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		leftPart: {
			display: 'flex',
			alignItems: 'center',
		},
		navLinks: {},
		list: {
			height: 100,
			display: 'flex',
			alignItems: 'center',
		},
		listItem: {
			flex: '0 0 auto',
			width: 'auto',
			height: '1.5rem',
			'&:nth-of-type(1)': {
				paddingLeft: 0,
			},
			'&:last-of-type': {
				paddingRight: 0,
			},
		},
		link: {
			textDecoration: 'none',
			transition: 'all 0.2s ease-in-out',
			color: '#aaa',
			'&:hover': {
				color: '#ccc',
			},
		},
		currentPath: {
			textDecoration: 'none',
			color: '#fff',
			pointerEvents: 'none',
		},
		centerPart: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
		},
		appLogo: {
			height: 80,
			position: 'relative',
			top: 16,
			filter: 'drop-shadow(0 4px 4px #000)',
		},
		appTitle1: {
			position: 'relative',
			width: 75,
			left: 35,
		},
		appTitle2: {
			position: 'relative',
			width: 75,
			left: -35,
		},
		rightPart: {
			display: 'flex',
			alignItems: 'center',
		},
		actionButton: {
			marginLeft: 16,
			textTransform: 'none',
		},
	}));
	const classes = useStyles();

	const leftLinks: Array<{ text: string; to: string }> = [
		{ text: 'Home', to: '/' },
		{ text: 'Grid', to: '/config' },
		{ text: 'About', to: '/about' },
	];

	const rightLinks: Array<{ text: string; to: string }> = [];

	const myLocation = useLocation();

	const isCurrentPathLink = (linkTo: string) => {
		if (linkTo === '/') {
			return myLocation.pathname === '/' || myLocation.pathname === '/home';
		} else {
			return myLocation.pathname.startsWith(linkTo);
		}
	};

	const history = useHistory();

	const handleClickHomeIcon = () => {
		history.push('/');
	};

	const handleClickLogin = () => {
		history.push('/login');
	};

	return (
		<Box id="Masthead" className={classes.root}>
			<Box className={classes.content}>
				<Box className={classes.leftPart}>
					<Box className={classes.navLinks}>
						<List className={classes.list}>
							{leftLinks.map((link, index) => (
								<ListItem key={index} className={classes.listItem}>
									<Link to={link.to} className={isCurrentPathLink(link.to) ? classes.currentPath : classes.link}>
										<ListItemText primary={link.text} />
									</Link>
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
				<Box onClick={handleClickHomeIcon} className={classes.centerPart}>
					<Typography variant="h4" className={`${classes.appTitle1} mono`}>
						{AppDataHelper.appNamePart1}
					</Typography>
					<img src={hackerImage} alt="logo" className={classes.appLogo} />
					<Typography variant="h4" className={`${classes.appTitle2} mono`}>
						{AppDataHelper.appNamePart2}
					</Typography>
				</Box>
				<Box className={classes.rightPart}>
					<Box className={classes.navLinks}>
						<List className={classes.list}>
							{rightLinks.map((link, index) => (
								<ListItem key={index} className={classes.listItem}>
									<Link to={link.to} className={link.to === myLocation.pathname ? classes.currentPath : classes.link}>
										<ListItemText primary={link.text} />
									</Link>
								</ListItem>
							))}
						</List>
					</Box>
					<Button disabled={true} onClick={handleClickLogin} variant="contained" size="small" className={classes.actionButton}>
						Log In
					</Button>
				</Box>
			</Box>
		</Box>
	);
});

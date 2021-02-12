import React, { memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import hackerImage from '../images/hacker.png';

export const Masthead = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			backgroundColor: 'transparent',
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
			borderLeft: `1px solid #666`,
			'&:nth-of-type(1)': {
				paddingLeft: 0,
				borderLeft: 'none',
			},
			'&:last-of-type': {
				paddingRight: 0,
			},
		},
		link: {
			textDecoration: 'none',
			userSelect: 'none',
			color: '#aaa',
			'&:hover': {
				color: '#ccc',
			},
		},
		currentPath: {
			textDecoration: 'none',
			userSelect: 'none',
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
			userSelect: 'none',
			filter: 'drop-shadow(0 4px 4px #000)',
		},
		appTitle1: {
			position: 'relative',
			width: 75,
			left: 35,
			fontFamily: 'Macondo, Play, sans-serif',
			userSelect: 'none',
		},
		appTitle2: {
			position: 'relative',
			width: 75,
			left: -35,
			fontFamily: 'Macondo, Play, sans-serif',
			userSelect: 'none',
		},
		rightPart: {},
	}));
	const classes = useStyles();

	const leftLinks = [
		{ text: 'Home', to: '/' },
		{ text: 'About', to: '/about' },
	];

	const rightLinks = [
		{ text: 'Setup', to: '/setup' },
		{ text: 'Login', to: '/login' },
	];

	const myLocation = useLocation();

	const history = useHistory();

	const handleClickHomeIcon = () => {
		history.push('/');
	};

	return (
		<Box id="Masthead" className={classes.root}>
			<Box className={classes.content}>
				<Box className={classes.leftPart}>
					<Box className={classes.navLinks}>
						<List className={classes.list}>
							{leftLinks.map((link, index) => (
								<ListItem key={index} className={classes.listItem}>
									<Link to={link.to} className={link.to === myLocation.pathname ? classes.currentPath : classes.link}>
										<ListItemText primary={link.text} />
									</Link>
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
				<Box onClick={handleClickHomeIcon} className={classes.centerPart}>
					<Typography variant="h4" className={classes.appTitle1}>{`code`}</Typography>
					<img src={hackerImage} alt="logo" className={classes.appLogo} />
					<Typography variant="h4" className={classes.appTitle2}>{`grid`}</Typography>
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
				</Box>
			</Box>
		</Box>
	);
});

import React, { memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Box from '@material-ui/core/Box/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import hackerImage from '../images/hacker.png';

export const Masthead = memo(() => {
	const useStyles = makeStyles((theme) => ({
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
			borderLeft: `1px solid ${theme.palette.divider}`,
			'&:nth-of-type(1)': {
				paddingLeft: 0,
				borderLeft: 'none',
			},
			'&:last-of-type': {
				paddingRight: 0,
			},
		},
		currentPath: {
			textDecoration: 'none',
			userSelect: 'none',
			color: `${blueGrey[100]}`,
			'&:hover': {
				color: `${blueGrey[100]}`,
			},
			pointerEvents: 'none',
		},
		link: {
			textDecoration: 'none',
			userSelect: 'none',
			color: `${blueGrey[400]}`,
			'&:hover': {
				color: `${blueGrey[300]}`,
			},
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
			// filter: 'hue-rotate(-10deg)',
			// animation: 'app-logo-color-animation 30s linear infinite alternate',
		},
		appTitle1: {
			position: 'relative',
			left: 35,
			fontFamily: 'Macondo, Play, sans-serif',
			userSelect: 'none',
		},
		appTitle2: {
			position: 'relative',
			left: -35,
			fontFamily: 'Macondo, Play, sans-serif',
			userSelect: 'none',
		},
		rightPart: {},
	}));
	const classes = useStyles();

	const pageLinks = [
		{ text: 'Home', to: '/' },
		{ text: 'Games', to: '/games' },
		{ text: 'About', to: '/about' },
	];

	const myLocation = useLocation();

	const history = useHistory();

	const handleClickHomeIcon = () => {
		history.push('/');
	};

	return (
		<Box id="Masthead" position="static" className={classes.root}>
			<Box className={classes.content}>
				<Box className={classes.leftPart}>
					<Box className={classes.navLinks}>
						<List className={classes.list}>
							{pageLinks.map((link, index) => (
								<ListItem key={index} className={classes.listItem}>
									<Link
										to={link.to}
										className={link.to === myLocation.pathname ? classes.currentPath : classes.link}
									>
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
					<Typography variant="h4" className={classes.appTitle2}>{`race`}</Typography>
				</Box>
				<Box className={classes.rightPart}>
					<Typography className={classes.link}>{`Login`}</Typography>
				</Box>
			</Box>
		</Box>
	);
});

import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { HomePage } from '../home/HomePage';
import { GridSelectionPage } from '../grid/GridSelectionPage';
import { GridPage } from '../grid/GridPage';
import { AboutPage } from '../about/AboutPage';
import { LoginPage } from '../login/LoginPage';
import { Masthead } from './Masthead';
import { VideoLoop } from './VideoLoop';

export const MainPage = memo(() => {
	const useStyles = makeStyles((theme) => ({
		root: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			overflow: 'hidden',
			backgroundColor: theme.palette.background.default,
			color: theme.palette.text.primary,
			fontFamily: theme.typography.fontFamily,
			animation: 'fade-in-animation 3s ease-in-out',
		},
		videoShade1: {
			position: 'relative',
			height: 100,
			backgroundColor: '#000',
			opacity: 0.4,
		},
		// '@keyframes video-loop-color-animation': {
		// 	'0%': {
		// 		backgroundColor: 'hsl(0, 25%, 50%)',
		// 	},
		// 	'50%': {
		// 		backgroundColor: 'hsl(180, 75%, 50%)',
		// 	},
		// 	'100%': {
		// 		backgroundColor: 'hsl(360, 25%, 50%)',
		// 	},
		// },
		videoShade2: {
			position: 'relative',
			height: 'calc(100% - 100px)',
			opacity: 0.4,
			backgroundColor: '#588',
			//animation: '$video-loop-color-animation 10s linear infinite',
		},
		content: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			color: theme.palette.text.primary,
		},
		mastheadContainer: {
			position: 'relative',
			height: 100,
			maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '0 16px',
			zIndex: 1,
		},
		pageContainer: {
			height: 'calc(100% - 100px)',
			left: 0,
			top: 80,
			maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '16px',
			color: theme.palette.text.primary,
		},
	}));
	const classes = useStyles();

	return (
		<Box id="MainPage" className={classes.root}>
			{<VideoLoop videoName="binary-matrix" playbackSpeed={1} blurPixels={0} grayscale={false} />}
			{/*{<VideoLoop videoName="purple-bokeh" playbackSpeed={1} blurPixels={0} grayscale={false} />}*/}
			<Box className={classes.videoShade1} />
			<Box className={classes.videoShade2} />
			<Box className={classes.content}>
				<Box className={classes.mastheadContainer}>
					<Masthead />
				</Box>
				<Box className={classes.pageContainer}>
					<Switch>
						<Route path="/home" exact component={HomePage} />
						<Route path="/grid" exact component={GridSelectionPage} />
						<Route path="/grid/:id" exact component={GridPage} />
						<Route path="/about" exact component={AboutPage} />
						<Route path="/login" exact component={LoginPage} />
						<Route component={HomePage} />
					</Switch>
				</Box>
			</Box>
		</Box>
	);
});

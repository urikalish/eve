import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AboutPage } from './AboutPage';
import { GamesPage } from './GamesPage';
import { HomePage } from './HomePage';
import { Masthead } from '../components/Masthead';
import { VideoLoop } from '../components/VideoLoop';

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
			opacity: 0.5,
		},
		videoShade2: {
			position: 'relative',
			height: 'calc(100% - 100px)',
			opacity: 0.25,
			backgroundColor: '#000',
			animation: 'video-loop-color-animation 20s linear infinite',
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
			height: 100,
			maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '0 32px',
		},
		pageContainer: {
			height: 'calc(100% - 100px)',
			left: 0,
			top: 80,
			maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '32px',
			color: theme.palette.text.primary,
		},
	}));
	const classes = useStyles();

	return (
		<Box id="MainPage" className={classes.root}>
			{<VideoLoop videoName="binary-matrix" playbackSpeed={1.0} blurPixels={0} />}
			<Box className={classes.videoShade1} />
			<Box className={classes.videoShade2} />
			<Box className={classes.content}>
				<Box className={classes.mastheadContainer}>
					<Masthead />
				</Box>
				<Box className={classes.pageContainer}>
					<Switch>
						<Route path="/home" exact component={HomePage} />
						<Route path="/games" exact component={GamesPage} />
						<Route path="/about" exact component={AboutPage} />
						<Route component={HomePage} />
					</Switch>
				</Box>
			</Box>
		</Box>
	);
});

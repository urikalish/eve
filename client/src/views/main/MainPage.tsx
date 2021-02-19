import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { HomePage } from '../home/HomePage';
import { GridListPage } from '../grid/GridListPage';
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
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
			fontFamily: theme.typography.fontFamily,
			animation: 'fade-in-animation 3s ease-in-out',
		},
		cover1: {
			position: 'relative',
			height: 100,
			backgroundColor: '#000',
			opacity: 0.4,
		},
		cover2: {
			position: 'relative',
			height: 'calc(100% - 100px)',
			//backgroundColor: '#588',
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
			padding: '40px 16px',
			color: theme.palette.text.primary,
		},
	}));
	const classes = useStyles();

	return (
		<Box id="MainPage" className={classes.root}>
			{/*{<VideoLoop videoName="purple-bokeh" playbackSpeed={1} blurPixels={0} grayscale={true} />}*/}
			{/*{<VideoLoop videoName="purple-bokeh" height="100px" playbackSpeed={1} blurPixels={0} grayscale={false} />}*/}
			{<VideoLoop videoName="binary-matrix" height="100px" playbackSpeed={1} blurPixels={0} grayscale={false} />}
			<Box className={classes.cover1} />
			<Box className={classes.cover2} />
			<Box className={classes.content}>
				<Box className={classes.mastheadContainer}>
					<Masthead />
				</Box>
				<Box className={classes.pageContainer}>
					<Switch>
						<Route path="/home" exact component={HomePage} />
						<Route path="/grid" exact component={GridListPage} />
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

import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Masthead } from './Masthead';
import { VideoLoop } from './VideoLoop';
import { HomePage } from '../home/HomePage';
import { GridPage } from '../grid/GridPage';
import { GridListPage } from '../grid/GridListPage';
import { AboutPage } from '../about/AboutPage';
import { LoginPage } from '../login/LoginPage';

export const MainPage = memo(() => {
	const useStyles = makeStyles((theme) => ({
		root: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			overflow: 'hidden',
			backgroundColor: '#444',
			backgroundImage: 'url("/img/gray.jpg")',
			backgroundSize: 'cover',
			color: theme.palette.text.primary,
			fontFamily: theme.typography.fontFamily,
			opacity: 0,
			animation: 'fade-in-animation 2s 1s ease-in-out forwards',
		},
		cover1: {
			position: 'relative',
			height: 100,
			backgroundColor: '#a60',
			backgroundImage: 'linear-gradient(135deg, #c90 25%, #a60 25%, #a60 50%, #c90 50%, #c90 75%, #a60 75%, #a60 100%)',
			backgroundSize: '8px 8px',
			opacity: 0.25,
		},
		cover2: {
			position: 'relative',
			height: 'calc(100% - 100px)',
			borderTop: '1px solid #111',
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
			//maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: '0 32px',
		},
		pageContainer: {
			height: 'calc(100% - 100px)',
			//maxWidth: 1280,
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: 32,
			color: theme.palette.text.primary,
		},
	}));
	const classes = useStyles();

	return (
		<Box id="MainPage" className={classes.root}>
			{/*{<VideoLoop videoName="purple-bokeh" playbackSpeed={1} blurPixels={0} grayscale={true} />}*/}
			{<VideoLoop videoName="purple-bokeh" height="100px" playbackSpeed={1} blurPixels={0} grayscale={false} />}
			{/*{<VideoLoop videoName="binary-matrix" height="100px" playbackSpeed={1} blurPixels={0} grayscale={false} />}*/}
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

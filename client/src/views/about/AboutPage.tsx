import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

export const AboutPage = memo(() => {
	const useStyles = makeStyles((theme) => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			gridTemplateColumns: 'auto',
			userSelect: 'none',
		},
		text: {
			fontFamily: '"Share Tech Mono", Consolas, monospace',
		},
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Typography variant="h5" className={classes.text}>{`App....................c0de_gr1d`}</Typography>
			<Typography variant="h5" className={classes.text}>{`Version....................1.0.0`}</Typography>
			<Typography variant="h5" className={classes.text}>{`UI_framework...............React`}</Typography>
			<Typography variant="h5" className={classes.text}>{`UI_components...........Material`}</Typography>
			<Typography variant="h5" className={classes.text}>{`Code_frames..............CodePen`}</Typography>
			<Typography variant="h5" className={classes.text}>{`Developed_by..........Uri_Kalish`}</Typography>
		</Box>
	);
});

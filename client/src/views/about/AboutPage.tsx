import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

export const AboutPage = memo(() => {
	const useStyles = makeStyles(() => ({
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

	const textLines = [
		'App....................c0de_gr1d',
		'Version....................1.0.0',
		'UI_framework...............React',
		'UI_components...........Material',
		'Code_frames..............CodePen',
		'Developed_by..........Uri_Kalish',
	];

	return (
		<Box id="AboutPage" className={classes.root}>
			{textLines.map((txt, i) => (
				<Typography key={i} variant="h5" className={`${classes.text} mono`}>
					{txt}
				</Typography>
			))}
		</Box>
	);
});

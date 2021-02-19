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
			borderRadius: 8,
			color: theme.palette.text.primary,
			userSelect: 'none',
		},
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Typography variant="subtitle1">by Uri Kalish</Typography>
		</Box>
	);
});

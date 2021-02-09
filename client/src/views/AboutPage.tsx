import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

export const AboutPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			fontSize: 16,
			textAlign: 'center',
		},
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Typography>by Uri Kalish</Typography>
			<Typography>@2021</Typography>
		</Box>
	);
});

import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const GamesPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
		},
		content: {},
	}));
	const classes = useStyles();

	return (
		<Box id="GamesPage" className={classes.root}>
			<Box className={classes.content}>This is the GAMES page</Box>
		</Box>
	);
});

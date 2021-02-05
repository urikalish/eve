import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const AboutPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
		},
		content: {},
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Box className={classes.content}>This is the ABOUT page</Box>
		</Box>
	);
});

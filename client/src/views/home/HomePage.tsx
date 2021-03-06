import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { UnderConstruction } from '../../components/UnderConstruction';

export const HomePage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			userSelect: 'none',
		},
	}));
	const classes = useStyles();

	return (
		<Box id="HomePage" className={classes.root}>
			<UnderConstruction />
		</Box>
	);
});

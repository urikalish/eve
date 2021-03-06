import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { Typography } from '@material-ui/core';

export const UnderConstruction = memo(() => {
	const useStyles = makeStyles((theme) => ({
		root: {
			height: '100%',
			backgroundImage: 'linear-gradient(135deg, #aa0 25%, #333 25%, #333 50%, #aa0 50%, #aa0 75%, #333 75%, #333 100%)',
			backgroundSize: '56px 56px',
			userSelect: 'none',
		},
		grid: {
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			color: theme.palette.text.primary,
		},
	}));
	const classes = useStyles();

	return (
		<Box id="UnderConstruction" className={classes.root}>
			<Box className={classes.grid}>
				<Typography variant="h4">Under Construction...</Typography>
			</Box>
		</Box>
	);
});

import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { Typography } from '@material-ui/core';
import { UnderConstruction } from '../components/UnderConstruction';

export const SetupPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			height: '100%',
			backgroundImage: 'linear-gradient(135deg, #333 25%, #aa0 25%, #aa0 50%, #333 50%, #333 75%, #aa0 75%, #aa0 100%)',
			backgroundSize: '40px 40px',
			opacity: '0.8',
		},
		grid: {
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			color: '#fff',
			userSelect: 'none',
		},
	}));
	const classes = useStyles();

	return <UnderConstruction />;
});

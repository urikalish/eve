import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

export const AboutPage = memo(() => {
	const useStyles = makeStyles(() => ({
		'@keyframes breath-animation': {
			'0%': {
				transform: 'rotateZ(-5deg)',
				borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
			},
			'100%': {
				transform: 'rotateZ(5deg)',
				borderRadius: '70% 30% 30% 70% / 30% 30% 70% 70%',
			},
		},
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			fontSize: 16,
			textAlign: 'center',
			color: '#3fc',
		},
		background: {
			backgroundColor: '#111',
			backgroundImage: 'linear-gradient(135deg, #000 25%, #222 25%, #222 50%, #000 50%, #000 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			padding: 60,
			opacity: '0.9',
			animation: '$breath-animation 2.5s ease-in-out infinite alternate',
			boxShadow: '8px 8px 16px #3fc',
		}
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Box className={classes.background}>
				<Typography>by Uri Kalish</Typography>
				<Typography>@2021</Typography>
			</Box>
		</Box>
	);
});

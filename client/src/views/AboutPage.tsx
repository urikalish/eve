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
			color: '#3fc',
		},
		// '@keyframes breath-animation': {
		// 	'0%': {
		// 		transform: 'rotateZ(-5deg)',
		// 		boxShadow: '8px 8px 16px #3fc',
		// 		borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
		// 	},
		// 	'100%': {
		// 		transform: 'rotateZ(5deg)',
		// 		boxShadow: '8px 8px 16px #f3c',
		// 		borderRadius: '70% 30% 30% 70% / 30% 30% 70% 70%',
		// 	},
		// },
		background: {
			backgroundColor: '#111',
			//backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			padding: 40,
			opacity: '0.9',
			transform: 'rotateZ(-10deg)',
			boxShadow: '8px 8px 16px #3fc',
			borderRadius: '50%',
			userSelect: 'none',
			//animation: '$breath-animation 5s ease-in-out infinite alternate',
		},
	}));
	const classes = useStyles();

	return (
		<Box id="AboutPage" className={classes.root}>
			<Box className={classes.background}>
				<Typography>by Uri Kalish</Typography>
			</Box>
		</Box>
	);
});

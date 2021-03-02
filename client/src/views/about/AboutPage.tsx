import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { AppDataHelper } from '../../services/appDataHelper';

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
		propLine: {
			marginLeft: 32,
		},
	}));
	const classes = useStyles();

	const propLines = [
		['appName', `'${AppDataHelper.appName}'`],
		['appVersion', `'${AppDataHelper.appVersion}'`],
		['uiLibs', `['React.js', 'Material-UI']`],
		['codeFrames', `'https://codepen.io'`],
		['developedBy', `'Uri Kalish'`],
	];

	return (
		<Box id="AboutPage" className={`${classes.root} mono`}>
			<Typography variant="h6">{'{'}</Typography>
			{propLines.map((txt, i) => (
				<Typography key={i} variant="h6" className={`${classes.propLine} mono`}>
					{`${txt[0]}: ${txt[1]}`},
				</Typography>
			))}
			<Typography variant="h6" className="mono">
				{'}'}
			</Typography>
		</Box>
	);
});

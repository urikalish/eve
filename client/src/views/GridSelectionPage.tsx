import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const GridSelectionPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			textAlign: 'center',
			color: '#fff',
			userSelect: 'none',
		},
		actionButton: {
			textTransform: 'none',
		},
	}));
	const classes = useStyles();

	const history = useHistory();

	const handleClickLaunchGrid = () => {
		history.push('/grid/123');
	};

	return (
		<Box id="GridSelectionPage" className={classes.root}>
			<Button onClick={handleClickLaunchGrid} variant="contained" size="small" color="secondary" className={classes.actionButton}>
				Launch grid 123
			</Button>
		</Box>
	);
});

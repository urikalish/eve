import React, { memo } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

export const GridListPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			gridTemplateColumns: 'auto 300px',
			gridTemplateRows: 30,
			gridRowGap: 16,
			gridColumnGap: 40,
			opacity: 0.9,
			color: '#fff',
			borderRadius: 16,
			userSelect: 'none',
		},
		text: {
			lineHeight: '30px',
		},
		actionButtons: {},
		actionButton: {
			minWidth: 100,
			marginLeft: 16,
			textTransform: 'none',
		},
	}));
	const classes = useStyles();

	const history = useHistory();

	const handleClickLaunchGrid = () => {
		history.push('/grid/123');
	};

	return (
		<Paper elevation={1} id="GridListPage" className={classes.root}>
			<Typography className={classes.text}>New grid</Typography>
			<Box className={classes.actionButtons}>
				<Button variant="contained" size="small" startIcon={<AddCircleOutlineOutlinedIcon />} className={classes.actionButton}>
					Create
				</Button>
			</Box>
			<Typography className={classes.text}>Grid 123</Typography>
			<Box className={classes.actionButtons}>
				<Button onClick={handleClickLaunchGrid} variant="contained" size="small" startIcon={<PlayCircleOutlineIcon />} className={classes.actionButton}>
					Launch
				</Button>
				<Button variant="contained" size="small" startIcon={<DeleteForeverOutlinedIcon />} color="secondary" className={classes.actionButton}>
					Delete
				</Button>
			</Box>
		</Paper>
	);
});

import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';

interface GridToolbarProps {
	onClickRefresh: () => void;
	onClickCode: () => void;
}

export const GridToolbar = memo(({ onClickRefresh, onClickCode }: GridToolbarProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			opacity: 0.9,
		},
		actionButton: {
			minWidth: 110,
			marginRight: 16,
		},
	}));
	const classes = useStyles();

	const handleClickRefresh = useCallback(() => {
		onClickRefresh();
	}, []);

	const handleClickCode = useCallback(() => {
		onClickCode();
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<Button
				disabled={false}
				onClick={handleClickRefresh}
				variant="contained"
				size="small"
				color="secondary"
				startIcon={<RefreshIcon />}
				className={classes.actionButton}
			>
				Refresh
			</Button>
			<Button
				disabled={false}
				onClick={handleClickCode}
				variant="contained"
				size="small"
				color="secondary"
				startIcon={<CodeIcon />}
				className={classes.actionButton}
			>
				Code
			</Button>
		</Box>
	);
});

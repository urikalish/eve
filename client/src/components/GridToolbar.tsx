import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';

interface GridToolbarProps {
	options: {
		canIncWidth: boolean;
		canDecWidth: boolean;
		canIncHeight: boolean;
		canDecHeight: boolean;
	};
	onClickRefresh: () => void;
	onClickCode: () => void;
	onChangeColumnNumber: (inc: boolean) => void;
	onChangeAspectRatio: (inc: boolean) => void;
}

export const GridToolbar = memo(({ options, onClickRefresh, onClickCode, onChangeColumnNumber, onChangeAspectRatio }: GridToolbarProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			height: '100%',
			padding: '8px 0',
			opacity: '0.8',
		},
		panel: {
			display: 'flex',
			alignItems: 'center',
			height: 24,
			borderRadius: 12,
			backgroundColor: '#111',
			padding: '0 4px',
			marginRight: 24,
		},
		panelText: {
			lineHeight: '24px',
			color: '#666',
		},
		actionButton: {
			width: 24,
			height: 24,
			textAlign: 'center',
			margin: '0 4px',
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			color: '#ccc',
			'&:hover': {
				color: '#fff',
			},
		},
		actionButtonDisabled: {
			pointerEvents: 'none',
			color: '#666',
		},
	}));
	const classes = useStyles();

	const handleClickRefresh = useCallback(() => {
		onClickRefresh();
	}, []);

	const handleClickCode = useCallback(() => {
		onClickCode();
	}, []);

	const handleClickIncColumnNumber = useCallback(() => {
		onChangeColumnNumber(true);
	}, []);

	const handleClickDecColumnNumber = useCallback(() => {
		onChangeColumnNumber(false);
	}, []);

	const handleClickIncAspectRatio = useCallback(() => {
		onChangeAspectRatio(true);
	}, []);

	const handleClickDecAspectRatio = useCallback(() => {
		onChangeAspectRatio(false);
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<Box className={`${classes.panel}`}>
				<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} />
				<CodeIcon onClick={handleClickCode} className={`${classes.actionButton}`} />
			</Box>
			<Box className={`${classes.panel}`}>
				<RemoveIcon
					onClick={handleClickDecColumnNumber}
					className={`${classes.actionButton} ${options.canDecWidth ? '' : classes.actionButtonDisabled} `}
				/>
				<Typography className={classes.panelText}>Size</Typography>
				<AddIcon
					onClick={handleClickIncColumnNumber}
					className={`${classes.actionButton} ${options.canIncWidth ? '' : classes.actionButtonDisabled} `}
				/>
			</Box>
			<Box className={`${classes.panel}`}>
				<RemoveIcon
					onClick={handleClickDecAspectRatio}
					className={`${classes.actionButton} ${options.canDecHeight ? '' : classes.actionButtonDisabled} `}
				/>
				<Typography className={classes.panelText}>Height</Typography>
				<AddIcon
					onClick={handleClickIncAspectRatio}
					className={`${classes.actionButton} ${options.canIncHeight ? '' : classes.actionButtonDisabled}`}
				/>
			</Box>
		</Box>
	);
});

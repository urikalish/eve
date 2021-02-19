import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';

interface GridToolbarProps {
	options: {
		canShowCode: boolean;
		canIncWidth: boolean;
		canDecWidth: boolean;
		canIncHeight: boolean;
		canDecHeight: boolean;
	};
	onClickRefresh: () => void;
	onToggleCode: () => void;
	onChangeColumnNumber: (inc: boolean) => void;
	onChangeAspectRatio: (inc: boolean) => void;
}

export const GridToolbar = memo(({ options, onClickRefresh, onToggleCode, onChangeColumnNumber, onChangeAspectRatio }: GridToolbarProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			height: '100%',
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

	const handleToggleCode = useCallback(() => {
		onToggleCode();
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
				<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} titleAccess="Refresh all" />
				{!options.canShowCode && <WebAssetIcon onClick={handleToggleCode} className={classes.actionButton} titleAccess="Switch to result view" />}
				{options.canShowCode && <CodeIcon onClick={handleToggleCode} className={`${classes.actionButton}`} titleAccess="Switch to code view" />}
			</Box>
			<Box className={`${classes.panel}`}>
				<RemoveIcon
					onClick={handleClickDecColumnNumber}
					className={`${classes.actionButton} ${options.canDecWidth ? '' : classes.actionButtonDisabled}`}
					titleAccess="Decrease size"
				/>
				<Typography className={classes.panelText}>Size</Typography>
				<AddIcon
					onClick={handleClickIncColumnNumber}
					className={`${classes.actionButton} ${options.canIncWidth ? '' : classes.actionButtonDisabled} `}
					titleAccess="Increase size"
				/>
			</Box>
			<Box className={`${classes.panel}`}>
				<RemoveIcon
					onClick={handleClickDecAspectRatio}
					className={`${classes.actionButton} ${options.canDecHeight ? '' : classes.actionButtonDisabled} `}
					titleAccess="Decrease height"
				/>
				<Typography className={classes.panelText}>Height</Typography>
				<AddIcon
					onClick={handleClickIncAspectRatio}
					className={`${classes.actionButton} ${options.canIncHeight ? '' : classes.actionButtonDisabled}`}
					titleAccess="Increase height"
				/>
			</Box>
		</Box>
	);
});
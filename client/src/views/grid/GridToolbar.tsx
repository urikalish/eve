import React, { memo, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import { Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

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
			justifyContent: 'space-between',
			alignItems: 'center',
			position: 'relative',
			height: '100%',
		},
		groupLeft: {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
		},
		groupRight: {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
			'& > div': {
				marginRight: 0,
			},
		},
		panel: {
			display: 'flex',
			alignItems: 'center',
			marginRight: 24,
			height: 32,
			opacity: 0.7,
			border: '1px solid #666',
			borderRadius: 16,
			backgroundColor: '#222',
			padding: '0 4px',
		},
		panelText: {
			lineHeight: '24px',
			color: '#999',
		},
		actionButton: {
			margin: '0 4px',
			width: 24,
			height: 24,
			textAlign: 'center',
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

	const history = useHistory();

	const handleClickExit = useCallback(() => {
		history.push('/config');
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<Box className={classes.groupLeft}>
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
			<Box className={classes.groupRight}>
				<Box className={`${classes.panel}`}>
					<CloseIcon onClick={handleClickExit} className={classes.actionButton} titleAccess="Exit grid" />
				</Box>
			</Box>
		</Box>
	);
});

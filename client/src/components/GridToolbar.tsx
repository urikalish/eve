import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';

interface GridToolbarProps {
	options: {
		canIncWidth: boolean;
		canDecWidth: boolean;
		canIncHeight: boolean;
		canDecHeight: boolean;
	};
	onClickRefresh: () => void;
	onClickCode: () => void;
	onChangeWidth: (inc: boolean) => void;
	onChangeHeight: (inc: boolean) => void;
}

export const GridToolbar = memo(({ options, onClickRefresh, onClickCode, onChangeWidth, onChangeHeight }: GridToolbarProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			height: '100%',
			padding: '8px 0',
			opacity: 0.5,
		},
		actionButton: {
			backgroundColor: '#000',
			width: 36,
			height: 24,
			borderRadius: 4,
			textAlign: 'center',
			lineHeight: '24px',
			marginRight: 4,
			cursor: 'pointer',
			userSelect: 'none',
		},
		actionButtonDisabled: {
			pointerEvents: 'none',
			opacity: 0.4,
		},
		extraSpace: {
			marginLeft: 24,
		},
	}));
	const classes = useStyles();

	const handleClickRefresh = useCallback(() => {
		onClickRefresh();
	}, []);

	const handleClickCode = useCallback(() => {
		onClickCode();
	}, []);

	const handleClickIncWidth = useCallback(() => {
		onChangeWidth(true);
	}, []);

	const handleClickDecWidth = useCallback(() => {
		onChangeWidth(false);
	}, []);

	const handleClickIncHeight = useCallback(() => {
		onChangeHeight(true);
	}, []);

	const handleClickDecHeight = useCallback(() => {
		onChangeHeight(false);
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} />
			<CodeIcon onClick={handleClickCode} className={`${classes.actionButton} ${classes.extraSpace}`} />
			<Box
				onClick={handleClickIncWidth}
				className={`${classes.actionButton} ${options.canIncWidth ? '' : classes.actionButtonDisabled} ${classes.extraSpace}`}
			>
				W+
			</Box>
			<Box onClick={handleClickDecWidth} className={`${classes.actionButton} ${options.canDecWidth ? '' : classes.actionButtonDisabled}`}>
				W-
			</Box>
			<Box
				onClick={handleClickIncHeight}
				className={`${classes.actionButton} ${options.canIncHeight ? '' : classes.actionButtonDisabled} ${classes.extraSpace}`}
			>
				H+
			</Box>
			<Box onClick={handleClickDecHeight} className={`${classes.actionButton} ${options.canDecHeight ? '' : classes.actionButtonDisabled}`}>
				H-
			</Box>
		</Box>
	);
});

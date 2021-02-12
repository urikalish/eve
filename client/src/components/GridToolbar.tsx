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
			opacity: 0.25,
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
			<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} />
			<CodeIcon onClick={handleClickCode} className={`${classes.actionButton} ${classes.extraSpace}`} />
			<Box
				onClick={handleClickIncColumnNumber}
				className={`${classes.actionButton} ${options.canIncWidth ? '' : classes.actionButtonDisabled} ${classes.extraSpace}`}
			>
				S+
			</Box>
			<Box onClick={handleClickDecColumnNumber} className={`${classes.actionButton} ${options.canDecWidth ? '' : classes.actionButtonDisabled}`}>
				S-
			</Box>
			<Box
				onClick={handleClickIncAspectRatio}
				className={`${classes.actionButton} ${options.canIncHeight ? '' : classes.actionButtonDisabled} ${classes.extraSpace}`}
			>
				H+
			</Box>
			<Box onClick={handleClickDecAspectRatio} className={`${classes.actionButton} ${options.canDecHeight ? '' : classes.actionButtonDisabled}`}>
				H-
			</Box>
		</Box>
	);
});

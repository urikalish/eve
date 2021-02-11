import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';

interface GridToolbarProps {
	onClickRefresh: () => void;
	onClickCode: () => void;
	onClickColumns: (numberOfColumns: number) => void;
}

export const GridToolbar = memo(({ onClickRefresh, onClickCode, onClickColumns }: GridToolbarProps) => {
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
			width: 40,
			height: 24,
			borderRadius: 4,
			textAlign: 'center',
			lineHeight: '24px',
			marginRight: 8,
			cursor: 'pointer',
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

	const handleClickColumns = useCallback((event: React.MouseEvent<HTMLElement>) => {
		if (event.currentTarget.dataset && event.currentTarget.dataset.columns) {
			const numberOfColumns = parseInt(event.currentTarget.dataset.columns);
			onClickColumns(numberOfColumns);
		}
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} />
			<CodeIcon onClick={handleClickCode} className={`${classes.actionButton} ${classes.extraSpace}`} />
			<Box data-columns={1} onClick={handleClickColumns} className={`${classes.actionButton} ${classes.extraSpace}`}>
				1
			</Box>
			<Box data-columns={2} onClick={handleClickColumns} className={classes.actionButton}>
				2
			</Box>
			<Box data-columns={3} onClick={handleClickColumns} className={classes.actionButton}>
				3
			</Box>
			<Box data-columns={4} onClick={handleClickColumns} className={classes.actionButton}>
				4
			</Box>
			<Box data-columns={5} onClick={handleClickColumns} className={classes.actionButton}>
				5
			</Box>
		</Box>
	);
});

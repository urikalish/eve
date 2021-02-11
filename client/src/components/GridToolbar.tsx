import React, { memo, useCallback } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CodeIcon from '@material-ui/icons/Code';

interface GridToolbarProps {
	onClickRefresh: () => void;
	onClickCode: () => void;
	onClickColumns: (numberOfColumns: number) => void;
	onClickRatio: (aspectRatio: number) => void;
}

export const GridToolbar = memo(({ onClickRefresh, onClickCode, onClickColumns, onClickRatio }: GridToolbarProps) => {
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

	const handleClickRatio = useCallback((event: React.MouseEvent<HTMLElement>) => {
		if (event.currentTarget.dataset && event.currentTarget.dataset.ratio) {
			const aspectRatio = parseFloat(event.currentTarget.dataset.ratio);
			onClickRatio(aspectRatio);
		}
	}, []);

	return (
		<Box id="GridToolbar" className={classes.root}>
			<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} />
			<CodeIcon onClick={handleClickCode} className={`${classes.actionButton} ${classes.extraSpace}`} />
			{[1, 2, 3, 4, 5, 6].map((colNum, index) => (
				<Box data-columns={colNum} onClick={handleClickColumns} className={`${classes.actionButton} ${index === 0 ? classes.extraSpace : ''}`}>
					{colNum}
				</Box>
			))}
			{[
				['1:4', 1/4],
				['1:3', 1/3],
				['1:2', 1/2],
				['2:3', 2/3],
				['3:4', 3/4],
				['1:1', 1],
				['4:3', 4/3],
				['3:2', 3/2],
				['2:1', 2],
				['3:1', 3],
				['4:1', 4],
			].map((aspectRatio, index) => (
				<Box data-ratio={aspectRatio[1]} onClick={handleClickRatio} className={`${classes.actionButton} ${index === 0 ? classes.extraSpace : ''}`}>
					{aspectRatio[0]}
				</Box>
			))}
		</Box>
	);
});

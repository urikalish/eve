import React, { memo, useRef, useEffect, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CodePenInfo } from '../services/codePenInfo';

interface GridItemProps {
	index: number;
	cpi: CodePenInfo;
	height: number;
	showCode: boolean;
}

export const GridItem = memo(({ index, cpi, height, showCode }: GridItemProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			border: '1px solid #ccc',
			opacity: 0.95,
			zIndex: 1,
		},
		jsContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			filter: 'blur(3px)',
		},
		resultContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		gridItemHeader: {
			position: 'absolute',
			left: 2,
			right: 2,
			top: 2,
			height: 48,
			display: 'flex',
			alignItems: 'center',
			backgroundColor: '#222',
			backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			padding: '0 16px',
			zIndex: 3,
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 14,
			fontWeight: 700,
			color: '#fff',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			userSelect: 'none',
		},
		codeIcon: {
			flex: '0 0 24px',
			cursor: 'pointer',
		},
		visibilityIcon: {
			flex: '0 0 24px',
			marginLeft: 8,
			cursor: 'pointer',
		},
		refreshIcon: {
			flex: '0 0 24px',
			marginLeft: 8,
			cursor: 'pointer',
		},
		gridItemFooter: {
			position: 'absolute',
			left: 2,
			right: 2,
			bottom: 2,
			height: 28,
			backgroundColor: '#222',
			backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			zIndex: 3,
		},
	}));
	const classes = useStyles();

	const itemRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!itemRef.current) {
			return;
		}
		const iFrames = itemRef.current.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('height', height.toString());
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, [height]);

	const handleClickVisibility = useCallback(() => {
		alert('yo');
	}, []);

	const handleClickRefresh = useCallback(() => {
		if (!itemRef.current) {
			return;
		}
		const iFrames = itemRef.current.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, []);

	return (
		<div id="GridItem" ref={itemRef} className={`${classes.root} grid-item-${index}`} style={{ height: height + 2 }}>
			<Box className={classes.gridItemHeader}>
				<Box className={classes.codePenTitle} style={{ color: cpi.color }} title={cpi.title}>
					{cpi.title}
				</Box>
				<VisibilityOutlinedIcon className={classes.visibilityIcon} onClick={handleClickVisibility} />
				<RefreshIcon className={classes.refreshIcon} onClick={handleClickRefresh} />
			</Box>
			<Box id="result-container" className={classes.resultContainer} style={{ display: showCode ? 'none' : 'block' }}>
				<Box
					className="codepen"
					data-height={height}
					data-theme-id="dark"
					data-default-tab="result"
					data-pen-title={cpi.cpId}
					data-user={cpi.cpUser}
					data-slug-hash={cpi.cpId}
				/>
			</Box>
			<Box id="js-container" className={classes.jsContainer} style={{ display: showCode ? 'block' : 'none' }}>
				<Box
					className="codepen"
					data-height={height}
					data-theme-id="dark"
					data-default-tab="js"
					data-pen-title={cpi.cpId}
					data-user={cpi.cpUser}
					data-slug-hash={cpi.cpId}
				/>
			</Box>
			<Box className={classes.gridItemFooter} />
		</div>
	);
});

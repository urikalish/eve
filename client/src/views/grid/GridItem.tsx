import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CodePenInfo, CodePenInfoHelper } from './codePenInfo';

interface GridItemProps {
	index: number;
	cpi: CodePenInfo;
	height: number;
	showCode: boolean;
}

export const GridItem = memo(({ index, cpi, height, showCode }: GridItemProps) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			position: 'relative',
			//opacity: 0.95,
			zIndex: 1,
		},
		jsContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		blurCode: {
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
			height: 49,
			display: 'flex',
			alignItems: 'center',
			//backgroundColor: theme.palette.background.default,
			//backgroundImage: 'linear-gradient(135deg, #263238 25%, #37474f 25%, #37474f 50%, #263238 50%, #263238 75%, #37474f 75%, #37474f 100%)',
			backgroundColor: '#222',
			//backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			padding: '0 8px 0 16px',
			zIndex: 3,
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 13,
			fontWeight: 700,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			color: '#bbb',
		},
		actionButton: {
			flex: '0 0 24px',
			marginLeft: 4,
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			color: '#bbb',
			'&:hover': {
				color: '#fff',
			},
		},
		gridItemFooter: {
			position: 'absolute',
			left: 2,
			right: 2,
			bottom: 4,
			height: 29,
			//backgroundColor: theme.palette.background.default,
			//backgroundImage: 'linear-gradient(135deg, #263238 25%, #37474f 25%, #37474f 50%, #263238 50%, #263238 75%, #37474f 75%, #37474f 100%)',
			backgroundColor: '#222',
			//backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			backgroundSize: '24px 24px',
			zIndex: 3,
		},
	}));
	const classes = useStyles();

	const [blurCode, setBlurCode] = useState<boolean>(true);
	const itemRef = useRef<HTMLDivElement>(null);
	const cpUser = useMemo<string>(() => CodePenInfoHelper.getCodePenUser(cpi), [cpi]);
	const cpId = useMemo<string>(() => CodePenInfoHelper.getCodePenId(cpi), [cpi]);
	const cpTitle = useMemo<string>(() => CodePenInfoHelper.getCodePenTitle(cpi), [cpi]);
	const cpColor = useMemo<string>(() => CodePenInfoHelper.getCodePenColor(cpi), [cpi]);

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

	const handleClickBlur = useCallback(() => {
		setBlurCode((val) => !val);
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

	const handleNavigateToCodePen = useCallback(() => {
		window.open(cpi.url, '_blank');
	}, []);

	return (
		<div id="GridItem" ref={itemRef} className={`${classes.root} grid-item-${index}`} style={{ height: height + 2 }}>
			<Box className={classes.gridItemHeader}>
				<Box className={classes.codePenTitle} style={{ color: cpColor }} title={cpTitle}>
					{cpTitle}
				</Box>
				{showCode && blurCode && <VisibilityOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Reveal code" />}
				{showCode && !blurCode && <VisibilityOffOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Blur code" />}
				<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} titleAccess="Refresh" />
				<OpenInNewIcon onClick={handleNavigateToCodePen} className={classes.actionButton} titleAccess="Open in CodePen" />
			</Box>
			<Box id="result-container" className={classes.resultContainer} style={{ display: showCode ? 'none' : 'block' }}>
				<p
					className="codepen"
					data-height={height}
					data-theme-id="dark"
					data-default-tab="result"
					data-user={cpUser}
					data-pen-title={cpId}
					data-slug-hash={cpId}
				/>
			</Box>
			<Box id="js-container" className={`${classes.jsContainer} ${blurCode ? classes.blurCode : ''}`} style={{ display: showCode ? 'block' : 'none' }}>
				<Box
					className="codepen"
					data-height={height}
					data-theme-id="dark"
					data-default-tab="js"
					data-user={cpUser}
					data-pen-title={cpId}
					data-slug-hash={cpId}
				/>
			</Box>
			<Box className={classes.gridItemFooter} />
		</div>
	);
});

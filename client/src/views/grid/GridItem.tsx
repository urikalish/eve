import React, { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CodePenInfo, CodePenInfoHelper } from './codePenInfo';
import { AvatarHelper } from '../../services/avatarHelper';

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
		},
		userAvatar: {
			position: 'absolute',
			left: 2,
			top: 2,
			width: 49,
			height: 49,
			border: '1px solid #333',
			borderRadius: '0 50% 50% 0',
			cursor: 'pointer',
			zIndex: 1,
			transition: 'all 0.4s ease-in-out',
			'&:hover': {
				width: 160,
				height: 160,
				borderRadius: '0 50% 50% 50%',
			},
		},
		opacityWrapper: {
			height: '100%',
			opacity: 0.7,
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
			backgroundColor: '#222',
			//backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			//backgroundSize: '24px 24px',
			padding: '0 8px 0 0',
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 13,
			fontWeight: 700,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			marginLeft: 60,
			color: '#ccc',
		},
		actionButton: {
			flex: '0 0 24px',
			marginLeft: 4,
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			color: '#ccc',
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
			backgroundColor: '#222',
			//backgroundImage: 'linear-gradient(135deg, #111 25%, #222 25%, #222 50%, #111 50%, #111 75%, #222 75%, #222 100%)',
			//backgroundSize: '24px 24px',
		},
	}));
	const classes = useStyles();

	const [blurCode, setBlurCode] = useState<boolean>(true);
	const [avatar, setAvatar] = useState<string>(() => CodePenInfoHelper.getCodePenAvatar(cpi));
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

	const handleClickAvatar = useCallback(() => {
		setAvatar(AvatarHelper.getRandomAvatar());
	}, []);

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
			<img src={`/img/avatars/${avatar}.jpg`} onClick={handleClickAvatar} className={classes.userAvatar} />
			<Box className={classes.opacityWrapper}>
				<Box
					id="js-container"
					className={`${classes.jsContainer} ${blurCode ? classes.blurCode : ''}`}
					style={{ display: showCode ? 'block' : 'none' }}
				>
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
				<Box className={classes.gridItemHeader}>
					<Box className={classes.codePenTitle} style={{ color: cpColor }} title={cpTitle}>
						{cpTitle}
					</Box>
					{showCode && blurCode && <VisibilityOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Reveal code" />}
					{showCode && !blurCode && <VisibilityOffOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Blur code" />}
					<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} titleAccess="Refresh" />
					<OpenInNewIcon onClick={handleNavigateToCodePen} className={classes.actionButton} titleAccess="Open in CodePen" />
				</Box>
				<Box className={classes.gridItemFooter} />
			</Box>
		</div>
	);
});

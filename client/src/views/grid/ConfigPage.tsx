import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { TextField } from '@material-ui/core';
import { LocalStorageHelper } from '../../services/localStorageHelper';
import { GridInfo } from '../../services/gridInfo';

function checkJson(jsonStr: string) {
	try {
		JSON.parse(jsonStr);
		return true;
	} catch (e) {
		return false;
	}
}

function getDemoConfig(): GridInfo {
	return {
		id: '',
		name: 'myGrid',
		codePens: [
			{
				title: 'gr33n_hack3r',
				avatar: 23,
				url: 'https://codepen.io/urikalish/pen/zYoapox',
			},
			{
				title: 'r3d_hack3r',
				avatar: 15,
				url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
			},
		],
	};
}

export const ConfigPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			gridTemplateColumns: 'auto',
			gridTemplateRows: 'auto 30px',
			gridRowGap: 16,
			userSelect: 'none',
		},
		form: {},
		textField: {
			width: 700,
			'& .MuiInputBase-root': {
				fontFamily: '"Share Tech Mono", Consolas, monospace',
				fontSize: 14,
			},
			'& label.Mui-focused': {
				color: '#fff',
			},
			'& .MuiFilledInput-underline:after': {
				borderBottomColor: '#fff',
			},
		},
		actionButtons: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		actionButton: {
			marginLeft: 16,
			width: 100,
			textTransform: 'none',
		},
	}));
	const classes = useStyles();

	const configFieldRef = useRef(null);
	const [configStr, setConfigStr] = useState<string>(() => {
		const configObj = LocalStorageHelper.load() || getDemoConfig();
		return JSON.stringify(configObj, null, 2);
	});
	const [configOK, setConfigOK] = useState<boolean>(true);
	const history = useHistory();

	useEffect(() => {
		setConfigOK(checkJson(configStr));
	}, [configStr]);

	const handleChangeText = useCallback((e) => {
		setConfigStr(e.currentTarget.value);
	}, []);

	const handleClickSave = useCallback(() => {
		const configObj = JSON.parse(configStr);
		LocalStorageHelper.save(configObj);
		setConfigStr(JSON.stringify(configObj, null, 2));
	}, [configStr]);

	const handleClickLaunch = useCallback(() => {
		const configObj = JSON.parse(configStr);
		LocalStorageHelper.save(configObj);
		history.push(`/grid/${configObj.id}`);
	}, [configStr]);

	return (
		<Box id="ConfigPage" className={classes.root}>
			<form className={classes.form} noValidate autoComplete="off">
				<TextField
					id="config-field"
					ref={configFieldRef}
					value={configStr}
					onChange={handleChangeText}
					label=""
					multiline
					rows={30}
					variant="filled"
					color="secondary"
					className={`${classes.textField} no-scrollbar ${configOK ? '' : 'error-color'}`}
				/>
			</form>
			<Box className={classes.actionButtons}>
				<Button
					disabled={!configOK}
					onClick={handleClickSave}
					variant="contained"
					size="small"
					startIcon={<SaveIcon />}
					className={classes.actionButton}
				>
					Save
				</Button>
				<Button
					disabled={!configOK}
					onClick={handleClickLaunch}
					variant="contained"
					size="small"
					startIcon={<PlayCircleOutlineIcon />}
					color="secondary"
					className={classes.actionButton}
				>
					Launch
				</Button>
			</Box>
		</Box>
	);
});

import React, { ChangeEvent, FunctionComponent } from 'react'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, TextField } from '@material-ui/core'
import { Clear, NoteAdd, Search } from '@material-ui/icons'

import { Function0, Function1 } from '../../../../utils'
import { RootState } from '../../../../reducers'
import {  addList } from '../../../../actions/localData'
import { changeFilter } from '../../../../actions/settings'

import './Header.css';
import logo from './logo.svg';

type StateProps = {
  filter: string
}

type DispatchProps = {
  changeFilter: Function1<string, void>
  addList: Function0<void>
}

type HeaderProps = StateProps & DispatchProps

const useStyles = makeStyles(() => ({
  input: {
    color: '#FFF',
  },
}));

export const HeaderComponent: FunctionComponent<HeaderProps> = (props) => {
  const changeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    props.changeFilter(event.target.value)
  }

  const classes = useStyles();

  return (
    <div className="header">
      <img
        src={logo}
        className="header__logo"
        alt="logo"
      />
      <h2 className='header__title'>
        Your own google-keep copy 2
      </h2>

      <div className='header__search'>
        <Button
          variant="contained"
          style={{ margin: '0 40px' }}
          startIcon={<NoteAdd color='primary'/>}
          onClick={props.addList}
        >
          Add list
        </Button>

        <div className="search__wrap">
          <TextField
            helperText="Search"
            color='secondary'
            onChange={changeFilter}
            value={props.filter}
            InputProps={{
              className: classes.input
            }}
          />
          <div className="search__button-wrap">
            {props.filter
              ? <IconButton
                onClick={() => props.changeFilter('')}
                aria-label="Clear"
                style={{ width: '24px', height: '24px', padding: 0 }}
              >
                <Clear color='primary'/>
              </IconButton>
              : <Search color='primary' />
            }
          </div>
        </div>


      </div>

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filter: state.settings.filter
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addList: () => {
    dispatch(addList());
  },
  changeFilter: (v: string) => {
    dispatch(changeFilter(v));
  },
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)
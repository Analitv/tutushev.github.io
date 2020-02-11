import React, { Component, ReactElement, MouseEvent } from 'react';
// import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import './ListFooter.css';
import { Dialog, Popover } from '@material-ui/core'
import { Function1, Function2 } from '../../../../utils'


const colors = [
  '#ffffff',
  '#FFD180',
  '#FF8A80',
  '#CFD8DC',
  '#FFFF8D',
  '#80D8FF',
  '#A7FFEB',
  '#CCFF90',
]

type ListFooterProps = {
  listId: string
  deleteList: Function1<string, void>
  changeColorList: Function2<string, string, void>
}

type ListFooterState = {
  colorPanelVisible: boolean
  colorPanelAnchor: HTMLButtonElement | undefined
  listDeleteDialog: boolean
}

export class ListFooter extends Component<ListFooterProps, ListFooterState> {
  constructor(props: ListFooterProps) {
    super(props);
    this.state = {
      colorPanelVisible: false,
      colorPanelAnchor: undefined,
      listDeleteDialog: false,
    }
  }


  private readonly _deleteList = (): void => {
    this.props.deleteList(this.props.listId);
  }

  private readonly _changeVisible = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    this.setState({
      colorPanelAnchor: e.currentTarget,
    }, () => {
      this.setState({
        colorPanelVisible: !this.state.colorPanelVisible,
      })
    })
  }

  private readonly _getColorPopover = (): ReactElement => {
    return (
      <Popover
        open={this.state.colorPanelVisible}
        anchorEl={this.state.colorPanelAnchor}
        anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
        // onRequestClose={() => this.setState({ colorPanelVisible: false })}
        // useLayerForClickAway={false}
        // zDepth={5}
      >
        <div className='color-panel'>
          {colors.map((color) => (
            <button
              className='color-panel__btn'
              style={{ backgroundColor: color }}
              key={color}
              onClick={() => {
                this.setState({ colorPanelVisible: false });
                this.props.changeColorList(this.props.listId, color);
              }}
            >
            </button>))}
        </div>
      </Popover>
    )
  }

  private readonly _getDeleteListDialog = (): ReactElement => {
    // const actions = [
    //   <Button
    //     variant='outlined'
    //     // label="Cancel"
    //     // primary={true}
    //     // onClick={() => this.setState({ listDeleteDialog: false })}
    //   />,
    //   <Button
    //     label="Delete list"
    //     primary={true}
    //     onClick={this.deleteList}
    //   />,
    // ];

    return (<Dialog
      title="Delete list"
      // actions={actions}
      // modal={false}
      open={this.state.listDeleteDialog}
      // onRequestClose={() => this.setState({ listDeleteDialog: false })}
    >
      Sure? Really?
    </Dialog>)
  }

  render() {
    return (
      <div className='list__footer'>
        <button 
          className='btn btn-color'
          title='Custom background'
          onClick={this._changeVisible}
        />
        <button 
          className='btn btn-delete'
          title='Delete list'
          onClick={() => this.setState({ listDeleteDialog: true})}
        />
        {this._getColorPopover()}
        {this._getDeleteListDialog()}
      </div>
    )
  }
}
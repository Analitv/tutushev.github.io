import React, { Component, ChangeEvent, KeyboardEvent } from 'react'
import { Function2 } from '../../../../utils'

import "./ItemNew.css"

type ItemNewProps = {
  listId: string
  addItem: Function2<string, string, void>
}

type ItemNewState = {
  contentValue: string
}

export class ItemNew extends Component<ItemNewProps, ItemNewState> {
  constructor(props: ItemNewProps) {
		super(props)
    this.state = {
      contentValue: ''
    }
  }

  private readonly _changeContentValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.setState({ contentValue: e.target.value})
  }

  private readonly _addItem = () => {
    let listId = this.props.listId
    let value = this.state.contentValue
    this.props.addItem(listId, value)
    this.setState({ contentValue: '' })
  }

  private readonly _keydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault()
      this._addItem()
    }
  }

  render() {
    return(
      <div className='itemNew' id='itemNew'>
        <button 
          className='itemNew__add'
          onClick={this._addItem}
        >
        </button>
        <input
          type="text"
          className='itemNew__content'
          value={this.state.contentValue}
          onChange={this._changeContentValue}
          onKeyDown={this._keydown}
        />
      </div>
    )
  }
}
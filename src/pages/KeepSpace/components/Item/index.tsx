import React, { ChangeEvent, PureComponent, KeyboardEvent } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import { Function2, Function3 } from '../../../../utils'

import "./Item.css"
import { SettingsState } from '../../../../model/settings'
import { TodoListItem  } from '../../../../model/localData'

type ItemProps = {
  index: number
  itemData: TodoListItem
  listId: string
  deleteItem: Function2<string, string, void>
  itemToggle: Function2<string, string, void>
  changeItem: Function3<string, string, string, void>
  globalSettings: SettingsState
  textColor: string
}

export class Item extends PureComponent<ItemProps> {
	constructor(props: ItemProps) {
		super(props)
		this.state =  {
			// hover: false
		}
  }
  
	private readonly _toggleAreItDid = () => {
		let listId = this.props.listId
		let itemId = this.props.itemData.itemId
		this.props.itemToggle(listId, itemId)
	}

  private readonly _deleteItem = () => {
		let listId = this.props.listId
		let itemId = this.props.itemData.itemId
    this.props.deleteItem(listId, itemId)
	}

  private readonly _changeItem = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault()
		let listId = this.props.listId
		let itemId = this.props.itemData.itemId
		let value = e.target.value
    this.props.changeItem(listId, itemId, value)
	}

  private readonly _keydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
			e.preventDefault()
		}
	}

	render() {
    const { itemData, textColor, index, globalSettings } = this.props
    
		let cntLength = Math.ceil(( +itemData.content.length )/33)
    let itemContentHeight = +(cntLength*24) + 'px'
    
    if (globalSettings.filter) {
      const regV = new RegExp(globalSettings.filter, 'gi')
      const result = itemData.content.search(regV) 
      if (!(result+1) ) {
        return null
      }
    }

		return (
		  // // TODO type='ITEM' was below
      <Draggable draggableId={this.props.itemData.itemId} index={index}>
				{(provided, snapshot) => (
					<div>
						<div
              className='item'
							style={provided.draggableProps.style}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
						>
							<div 
                className='item__dnd'
								{...provided.dragHandleProps}
							>
							</div>
              <div
                className={classNames('item__check', {
                  'check': itemData.isFinished
                })}
                onClick={this._toggleAreItDid}
              />
							<textarea
                className={itemData.isFinished ? 'item__content check' : 'item__content'} // TODO make classNames
                onChange={this._changeItem}
								style={{ color: textColor, height: itemContentHeight}}
                value={itemData.content}
								onKeyDown={this._keydown}
							/>
              <button className='item__delete' onClick={this._deleteItem}/>
						</div>
					</div>
				)}
			</Draggable>
		)
	}
}
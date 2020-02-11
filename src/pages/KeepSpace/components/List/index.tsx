import React, { ChangeEvent, PureComponent } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Item } from '../Item'
import { ListFooter } from '../ListFooter'
import { ItemNew } from '../ItemNew'
import { CSSTransition,TransitionGroup, } from 'react-transition-group'
import './List.css'
import { Function1, Function2, Function3 } from '../../../../utils'
import { SettingsState } from '../../../../model/settings'
import { TodoList } from '../../../../model/localData'

type ListProps = {
  listData: TodoList
  // listId: string
  globalSettings: SettingsState

  changeListTitle: Function2<string, string, void>
  addItem: Function2<string, string, void>
  deleteList: Function1<string, void>
  changeColorList: Function2<string, string, void>
  deleteItem: Function2<string, string, void>
  itemToggle: Function2<string, string, void>
  changeItem: Function3<string, string, string, void>
}

export class List extends PureComponent<ListProps> {
  private readonly _changeListTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.changeListTitle(this.props.listData.listId, e.target.value)
  }

  private readonly _getItems = () => {
    const { listData } = this.props

    return listData.listItems.map((item, i) => {
      return (
        <CSSTransition
          key={item.itemId}
          classNames='item-transition'
          timeout={ { enter: 200, exit: 200 } }
        >
          <Item
            key={item.itemId}
            listId={listData.listId}
            itemData={item}
            textColor={listData.textColor}
            index={i}
            globalSettings={this.props.globalSettings}
            deleteItem={this.props.deleteItem}
            changeItem={this.props.changeItem}
            itemToggle={this.props.itemToggle}
          />
        </CSSTransition>
      )
    })
  }

  render() {
    const { listData: { backgroundColor, textColor, title, listId } } = this.props

      return (
        <div className='list' style={{ background: backgroundColor, color: textColor }}>
          <input 
            className='list__title' 
            type='text' 
            value={title}
            onChange={this._changeListTitle}
            style={{ color: textColor }} 
          />

          <Droppable droppableId={`list--=--${listId}`} type='ITEM'>
            {(provided, snapshot) => (
              <ul
                className='list__items'
                ref={provided.innerRef}
              >
                <TransitionGroup>
                  {this._getItems()}
                </TransitionGroup>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

          <ItemNew
            listId={listId}
            addItem={this.props.addItem}
          />
          <ListFooter
            listId={listId}
            deleteList={this.props.deleteList}
            changeColorList={this.props.changeColorList}
          />
        </div>
      )
  }
}
import React, { PureComponent, ReactElement } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup, } from 'react-transition-group'

import { List } from './components/List'
import './KeepSpace.css'
import { KeepSpaceComponentProps } from './index'

export class KeepSpaceComponent extends PureComponent<KeepSpaceComponentProps> {
  private readonly _onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId} = result;
    
    // dropped outside the list
    if (!destination) {
      return;
    }
    
    const s_listId = source.droppableId.split('--=--')[1];
    const d_listId = destination.droppableId.split('--=--')[1];

    // inside one list
    if (s_listId === d_listId) {
      this.props.reorderItemsInOneList(s_listId, source.index, destination.index, draggableId);
    }
    
    // from other lists
    if (s_listId !== d_listId) {
      this.props.reorderItemsInOtherList(s_listId, d_listId, source.index, destination.index, draggableId);
    }
  }

  private readonly _getLists = (): ReactElement[] => {
    return this.props.localData.map((list) => (
        <CSSTransition
          key={list.listId}
          classNames="list-transition"
          timeout={{ enter: 200, exit: 200 }}
        >
          <List
            key={list.listId}
            listData={list}

            globalSettings={this.props.globalSettings}
            changeListTitle={this.props.changeListTitle}
            addItem={this.props.addItem}
            deleteList={this.props.deleteList}
            changeColorList={this.props.changeColorList}
            deleteItem={this.props.deleteItem}
            itemToggle={this.props.itemToggle}
            changeItem={this.props.changeItem}
          />
        </CSSTransition>
      ))
  }

  render() {
    return (
      <div className="container">
        <DragDropContext onDragEnd={this._onDragEnd}>
          <TransitionGroup>
            {this._getLists()}
          </TransitionGroup>
        </DragDropContext>
      </div>
    );
  }
}
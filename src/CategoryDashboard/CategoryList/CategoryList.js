import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import { red700, cyan700 } from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

const styles = {
  header: {
    backgroundColor: '#00BCD4',
    color: '#FFF',
    margin: '-1.75rem 0 1rem',
    padding: '1rem'
  },
  title: {
    display: 'block',
    fontSize: '1.25rem',
    marginBottom: '5px',
  },
};

class CategoryList extends Component {
  handleMove = ({ treeData, node, nextParentNode, nextPath }) => {
    const category = { ...node, parent_id: nextParentNode.id };
    const children = nextParentNode.children;
    
    if (children.length > 1) {
      const nodeIndex = children.findIndex(child => child.id === category.id);
      const nextChild = children[nodeIndex + 1];
      const prevChild = children[nodeIndex - 1];

      category.ordering = prevChild === undefined
        ? (nextChild.ordering - 1 < 0 ? 0 : nextChild.ordering - 1)
        : prevChild.ordering + 1;
    } else {
      category.ordering = 0;
    }

    this.props.onMove(category);
  };

  getNodeKey = ({ treeIndex }) => treeIndex;

  handleRemoveNode = (node) => {
    this.props.onRemove(node);
  };

  handleEditNode = (node) => {
    this.props.onEdit(node);
  };

  handleActiveToggle = (node, e, toggle) => {
    const category = { ...node, is_visible: toggle };
    this.props.onActivateToggle(category);
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='CategoryList'>
        <div className='tree-wrap'>
          <Paper style={styles.header}>
            <span style={styles.title}>Categories</span>
          </Paper>
          <SortableTree
            treeData={categories}
            onChange={this.props.onTreeChange}
            onMoveNode={this.handleMove}
            canDrag={({ node }) => !node.noDragging}
            canDrop={({ nextParent }) => !!nextParent}
            generateNodeProps={({ node, path }) => ({
              title: (
                <span style={{ fontWeight: 'normal' }}>{node.name}</span>
              ),
              buttons: [
                <Toggle
                  style={{ padding: '12px' }}
                  toggled={node.is_visible}
                  onToggle={this.handleActiveToggle.bind(this, node)}
                />,
                <IconButton onClick={this.handleEditNode.bind(this, node)} tooltip='Edit'>
                  <Edit color={cyan700} />
                </IconButton>,
                <IconButton onClick={this.handleRemoveNode.bind(this, node)} tooltip='Delete'>
                  <Delete color={red700} />
                </IconButton>,
              ],
            })} />
        </div>
      </div>
    );
  }
};

export default CategoryList;
import React, { Component } from 'react';
import DashboardPaper from '../DashboardPaper/DashboardPaper';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

class CategoryList extends Component {
  makeCategoryItem = (category) => {
    const { id, name, subcategories } = category;
    const nestedItems = subcategories
      ? subcategories.map(subCat => this.makeCategoryItem(subCat))
      : [];

    return (
      <ListItem
        key={id}
        nestedItems={nestedItems}
        primaryText={name} />
    );
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='CategoryList'>
        <DashboardPaper title='Category list'>
          <List>
            {categories.map(category => this.makeCategoryItem(category))}
          </List>
        </DashboardPaper>
      </div>
    );
  }
};

export default CategoryList;
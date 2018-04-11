import React, { Component } from 'react';
import http from '../Http';
import { toast } from 'react-toastify';
import LoadingBar from './LoadingBar';
import { FlatButton } from 'material-ui';
import AddNewCategory from './AddNewCategory/AddNewCategory';
import CategoryList from './CategoryList/CategoryList';

class CategoryDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true
    };
  }

  componentDidMount() {
    http.get('/categories')
      .then(res => {
        const categories = this.mapCategories(res.data.data.categories);
        console.log(categories);
        this.setState({
          categories,
          loading: false
        });
      }, err => {
        this.setState({ loading: false });
        toast.error('Failed loading data')
      });
  }

  mapCategories(allCats, parentID) {
    if (parentID === undefined) parentID = 1;
    const filteredCats = allCats.filter(category => category.parent_id === parentID);
    filteredCats.forEach(fCat => fCat.children = this.mapCategories(allCats, fCat.id));

    return filteredCats;
  }

  render() {
    return (
      <div>
        <LoadingBar loading={this.state.loading} />
        <header>
          <FlatButton
            href="/"
            label="i-sklep Categories"
            primary={true}
          />
        </header>
        <section>
          <AddNewCategory />
          <CategoryList categories={this.state.categories} />
        </section>
      </div>
    );
  }
}

export default CategoryDashboard;

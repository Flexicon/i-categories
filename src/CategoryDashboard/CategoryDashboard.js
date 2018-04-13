import React, { Component } from 'react';
import http from '../Http';
import { toast } from 'react-toastify';
import LoadingBar from './LoadingBar';
import AddNewCategory from './AddNewCategory/AddNewCategory';
import CategoryList from './CategoryList/CategoryList';
import Header from './Header/Header';

class CategoryDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      flatCategories: [],
      currentCategory: this.makeEmptyCategory(),
      editing: false,
      loading: false
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories() {
    this.setState({ loading: true });
    return http.get('/categories')
      .then(res => {
        if (res.data.success) {
          const flatCategories = res.data.data.categories.slice().sort((a, b) => a.name < b.name || a.id === 1 ? -1 : 1);
          const categories = this.mapCategories(res.data.data.categories);
          this.setState({
            categories,
            flatCategories,
            loading: false
          });
          return true;
        } else {
          this.setState({ loading: false });
          return false;
        }
      }, err => {
        this.setState({
          categories: [],
          loading: false
        });
        toast.error('Failed loading data');
        return err;
      });
  }

  updateCategory = (category) => {
    const params = {
      category: {
        parent_id: category.parent_id,
        is_visible: category.is_visible,
        name: category.name,
        description: category.description || '',
        picture_filename: category.picture_filename,
        ordering: category.ordering || 0,
      }
    };

    this.setState({ loading: true });

    return http.put(`/categories/${category.id}`, params)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      }, err => {
        this.setState({
          loading: false
        });
        return err;
      });
  };

  addCategory = (category) => {
    const params = {
      category: {
        parent_id: category.parent_id,
        is_visible: category.is_visible,
        name: category.name,
        description: category.description || '',
        picture_filename: category.picture_filename,
        ordering: category.ordering || 0,
      }
    };
    this.setState({ loading: true });

    return http.post(`/categories`, params)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      }, err => {
        this.setState({
          loading: false
        });
        return err;
      });
  };

  removeCategory = (category) => {
    this.setState({ loading: true });

    return http.delete(`/categories/${category.id}`)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      }, err => {
        this.setState({
          loading: false
        });
        return err;
      });
  };

  // Prepare a default category object
  makeEmptyCategory() {
    return {
      parent_id: 1,
      is_visible: false,
      name: '',
      description: '',
      picture_filename: '',
      ordering: 0,
    };
  }

  // Recursively map categories into a tree structure
  mapCategories(allCats, parentID = null) {
    const filteredCats = allCats.filter(category => category.parent_id === parentID);
    filteredCats.forEach(fCat => fCat.children = this.mapCategories(allCats, fCat.id));

    if (parentID === null) {
      filteredCats[0] = { ...filteredCats[0], expanded: true, noDragging: true };
    }

    return filteredCats;
  };

  // Recursively look for category by a given ID, and change it's visibility state
  changeActiveStateForID(current, lookingForID, toggleState) {
    if (current.id === lookingForID) {
      current.is_visible = toggleState;
    } else if (current.children.length > 0) {
      current.children.forEach(child => this.changeActiveStateForID(child, lookingForID, toggleState));
    }
  }

  handleTreeChange = (categories) => {
    this.setState({ categories });
  }

  handleActivateToggle = (category) => {
    const categories = this.state.categories.slice();
    const copy = categories.slice();
    categories.forEach(cat => this.changeActiveStateForID(cat, category.id, category.is_visible));

    this.setState({ categories });
    this.updateCategory(category)
      .then(status => {
        if (status) {
          toast.success('Category updated!');
        } else {
          toast.error('Failed to update category. Bummer.');
          this.setState({ categories: copy });
        }
      }, err => {
        toast.error('Something went wrong, request failed.');
        this.setState({ categories: copy });
      });
  }

  handleFormChange = (name, value) => {
    const currentCategory = { ...this.state.currentCategory };
    currentCategory[name] = value;
    this.setState({ currentCategory });
  };

  handleFormCancel = () => {
    this.setState({ currentCategory: this.makeEmptyCategory(), editing: false });
  };

  handleFormSave = () => {
    const category = { ...this.state.currentCategory };

    if (this.state.editing) {
      this.updateCategory(category)
        .then(status => {
          if (status) {
            this.loadCategories()
              .then(res => {
                toast.success(`Category "${category.name}" updated!`);
                this.setState({ currentCategory: this.makeEmptyCategory(), editing: false });
              });
          } else {
            toast.error('Something went wrong, failed to update category. :(');
          }
        }, err => {
          toast.error('Something went wrong, request failed.');
        });
    } else {
      this.addCategory(category)
        .then(status => {
          if (status) {
            this.loadCategories()
              .then(res => {
                toast.success(`Category "${category.name}" added!`);
                this.setState({ currentCategory: this.makeEmptyCategory() });
              });
          } else {
            toast.error('Something went wrong, failed to add category. :(');
          }
        }, err => {
          toast.error('Something went wrong, request failed.');
        });
    }
  };

  handleRemove = (category) => {
    this.removeCategory(category)
      .then(status => {
        if (status) {
          toast.success(`Category "${category.name}" removed!`);
          this.loadCategories();
        } else {
          toast.error('Something went wrong, failed to remove category.');
        }
      }, err => {
        toast.error('Something went wrong, request failed.');
      });
  };

  handleChooseEdit = (category) => {
    this.setState({ currentCategory: { ...category }, editing: true });
  };

  handleMove = (category) => {
    this.updateCategory(category)
      .then(status => {
        if (status) {
          toast.success('Category updated!');
        } else {
          toast.error('Failed to update category. Bummer.');
        }
      }, err => {
        toast.error('Something went wrong, request failed.');
      });
  };

  render() {
    return (
      <div className='h-100'>
        <LoadingBar loading={this.state.loading} />
        <Header />
        <section>
          <AddNewCategory
            selectCategories={this.state.flatCategories}
            category={this.state.currentCategory}
            editing={this.state.editing}
            onChange={this.handleFormChange}
            onCancel={this.handleFormCancel}
            onSave={this.handleFormSave} />
          <CategoryList
            onTreeChange={this.handleTreeChange}
            onActivateToggle={this.handleActivateToggle}
            onRemove={this.handleRemove}
            onEdit={this.handleChooseEdit}
            onMove={this.handleMove}
            categories={this.state.categories} />
        </section>
      </div>
    );
  }
}

export default CategoryDashboard;

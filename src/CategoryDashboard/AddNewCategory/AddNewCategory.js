import React from 'react';
import DashboardPaper from '../DashboardPaper/DashboardPaper';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

const AddNewCategory = (props) => {
  return (
    <div className='AddNewCategory'>
      <DashboardPaper title='Add a new category'>
        <form>
          <TextField
            hintText='Choose a creative name...'
            floatingLabelText='Category Name'
            name='category_name'
          />
          <TextField
            hintText='Describe this category...'
            floatingLabelText='Description'
            name='description'
          />
          <TextField
            floatingLabelText='Ordering'
            type='number'
            name='ordering'
          />
          <div style={{ marginTop: '1rem' }}>
            <RaisedButton style={{ marginRight: '.5rem' }}
              label='Save'
              primary={true} />
            <RaisedButton
              label='Cancel'
              secondary={true} />
          </div>
        </form>
      </DashboardPaper>
    </div>
  );
};

export default AddNewCategory;
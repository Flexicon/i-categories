import React from 'react';
import DashboardPaper from '../DashboardPaper/DashboardPaper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const handleInputChange = (handler, event, value) => {
  if (event.target.name === 'ordering' && value < 0) return false;
  handler(event.target.name, value);
}

const handleItemSelected = (handler, name, event, index, value) => {
  handler(name, value);
}

const AddNewCategory = (props) => {
  const { name, description, ordering, is_visible, parent_id } = props.category;
  const formTitle = props.editing ? 'Edit category' : 'Add a new category';

  return (
    <div className='AddNewCategory'>
      <DashboardPaper title={formTitle}>
        <form>
          <TextField
            hintText='Choose a creative name...'
            floatingLabelText='Category Name'
            name='name'
            value={name}
            onChange={handleInputChange.bind(null, props.onChange)}
          />

          <TextField
            hintText='Describe this category...'
            floatingLabelText='Description'
            name='description'
            value={description}
            onChange={handleInputChange.bind(null, props.onChange)}
          />

          <TextField
            floatingLabelText='Ordering'
            type='number'
            name='ordering'
            value={ordering}
            onChange={handleInputChange.bind(null, props.onChange)}
          />

          <Toggle
            style={{ padding: '1rem 0' }}
            toggled={is_visible}
            name='is_visible'
            onToggle={handleInputChange.bind(null, props.onChange)}
            label='Visibility'
            labelPosition='right' />

          <SelectField
            floatingLabelText="Parent category"
            value={parent_id}
            name='parent_id'
            onChange={handleItemSelected.bind(null, props.onChange, 'parent_id')}
          >
            {props.selectCategories.map(category => (
              <MenuItem key={category.id} value={category.id} primaryText={category.name} />
            ))}
          </SelectField>

          <div style={{ marginTop: '1rem' }}>
            <RaisedButton style={{ marginRight: '.5rem' }}
              label='Save'
              disabled={!name}
              onClick={props.onSave}
              primary={true} />
            <RaisedButton
              label='Cancel'
              secondary={true}
              onClick={props.onCancel} />
          </div>
        </form>
      </DashboardPaper>
    </div>
  );
};

export default AddNewCategory;
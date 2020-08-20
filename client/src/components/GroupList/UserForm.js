/*eslint-disable*/
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AsyncSelect from 'react-select/async';
import { useStyles } from './styles';

const ValidationSchema = Yup.object({
  user: Yup.string().required('User is required'),
});

const UserForm = ({submit, closeForm, submitTitle, usersLikeOptions}) => {
  return (
      <TableRow>
        <TableCell colSpan={3}>
          <Formik
              initialValues={{ user: {} }}
              validationSchema={ValidationSchema}
              onSubmit={(values) => submit(values)}
          >
            {/* eslint-disable-next-line */}
            {(props) => <AddUserToGroupForm cancel={closeForm} usersLikeOptions={usersLikeOptions} submitTitle={submitTitle}  {...props}/>}
          </Formik>
        </TableCell>
      </TableRow>
  );
};



const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
  }),
}

const AddUserToGroupForm = ({ handleSubmit, resetForm, isValid, dirty, cancel, submitTitle, setFieldValue, usersLikeOptions, values }) => {
  const classes = useStyles();
  const filterColors = (inputValue) => {
    return usersLikeOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  return (
      <Form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.select}>
          <AsyncSelect value={values.user} cacheOptions defaultOptions onChange={(e)=>setFieldValue('user', e)} placeholder='Julie McMemberson' styles={customStyles}
                                                         components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
                                                         loadOptions={promiseOptions}/>

        </div>
        <div>
          <Button onClick={cancel(resetForm)} style={{ textTransform: 'none', fontSize: 12, color: '#3ca1de' }}>
            Cancel
          </Button>
          <Button
              type="submit"
              variant="outlined"
              disabled={!(isValid && dirty)}
              style={{ textTransform: 'none', fontSize: 12 }}
          >
            {submitTitle}
          </Button>
        </div>
      </Form>
  );
};

UserForm.propTypes = {
  submit: PropTypes.func,
  closeForm: PropTypes.func,
  submitTitle: PropTypes.string,
  usersLikeOptions: PropTypes.array,
};

AddUserToGroupForm.propTypes = {
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  cancel: PropTypes.func,
  submitTitle: PropTypes.string,
  setFieldValue: PropTypes.func,
  usersLikeOptions: PropTypes.array,
  values: PropTypes.object,
};

export default UserForm;
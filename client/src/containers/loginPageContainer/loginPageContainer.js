import React from 'react';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import './loginPageStyles.css';
import Modal from '../../components/ModalComponent/ModalComponent';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Sign in to DaLi</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="email-wrapper">
                <label htmlFor="email">Email address</label>
                <Field
                  type="email"
                  name="email"
                  className="textInput"
                  placeholder="youlooknicetoday@email.com"
                  style={getStyles(errors, 'email')}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="password-wrapper">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="textInput"
                  placeholder="Shhh..."
                  style={getStyles(errors, 'password')}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="checkbox-wrapper">
                <label htmlFor="remember">Remember me</label>
                <Field type="checkbox" name="remember" className="checkbox" />
              </div>
              <div className="btn-wrapper">
                <button type="submit" className="btn btn-submit">
                  Sign in
                </button>
                <button className="forgot-pswd" onClick={() => setIsModalVisible(true)}>
                  I seem to have forgotten my password
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {isModalVisible && (
          <Modal onModalClose={() => setIsModalVisible(false)}>
            <Modal.Body>
              Please contact an administrator to reset your password
            </Modal.Body>
            <Modal.Footer>
              <Modal.Footer.CloseBtn>Back to login</Modal.Footer.CloseBtn>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

function getStyles(errors, fieldName) {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red'
      // backgroundColor: 'pink'
    };
  }
}

export default LoginPage;

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';

import Form from 'components/Common/styled-components/Form';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import NavigationLink from 'components/Common/styled-components/NavigationLink';
import RegistrationField from 'components/RegistrationField';

import authSelectors from 'redux/auth/auth-selectors';

const RegistrationForm = ({ authOperation, initialVals, validationSchema }) => {
  const isItLogin = useLocation().pathname.slice(1) === 'login';
  const isLoading = useSelector(authSelectors.isLoadingAuth);

  const regDefect = {
    reversePath: isItLogin ? `/register` : '/login',
    linkMessage: isItLogin
      ? `Don't you have an account yet? Sign up right now!`
      : 'Alreade have an account? Log in.',
    buttonText: isItLogin ? 'log in' : 'sign up',
  };

  const dispatch = useDispatch();
  const fields = Object.keys(initialVals);

  const formik = useFormik({
    initialValues: { ...initialVals },

    validationSchema,

    onSubmit: values => {
      dispatch(authOperation(values));

      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Form onSubmit={formik.handleSubmit}>
        <Typography variant="h1">
          Please sign up to start saving your contacts
        </Typography>

        {fields.map(field => {
          const isName = field === 'name' ? true : false;
          return (
            <RegistrationField
              key={field}
              type={isName ? 'text' : field}
              name={isName && 'name'}
              formik={formik}
            />
          );
        })}

        <Typography
          mb="8px"
          variant="mainLink"
          component={NavigationLink}
          to={regDefect.reversePath}
        >
          {regDefect.linkMessage}
        </Typography>

        <LoadingButton
          disabled={!(formik.dirty && formik.isValid)}
          loading={isLoading}
          type="submit"
          variant="contained"
        >
          {regDefect.buttonText}
        </LoadingButton>
      </Form>
    </Container>
  );
};

export default RegistrationForm;

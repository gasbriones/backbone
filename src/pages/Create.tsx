import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Layout from '../layout/Layout';
import { useGet, usePost } from '../hooks/useRequest';
import { DataContactsPost } from '../types/types';

function Create(): JSX.Element {
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();
  const { execute, error: errorResponse } = usePost<DataContactsPost>();
  const { revalidate } = useGet('/contacts');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: unknown) => {
    if (isEmpty(errors)) {
      await execute('/contacts', data).then(() => {
        reset();
        setErrorMessage(null);
      });
      await revalidate();
    }
  };

  useEffect(() => {
    if (errorResponse) {
      // @ts-ignore
      setErrorMessage(errorResponse?.response?.data?.message);
    }
  }, [errorResponse]);

  return (
    <Layout>
      <Box
        sx={{
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <ImportContactsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Contact
        </Typography>
        <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} display="flex" flexDirection="column">
          <TextField
            {...register('firstName', { required: true, maxLength: 80 })}
            margin="normal"
            fullWidth
            id="firstName"
            label="First name"
            autoFocus

          />
          <TextField
            {...register('lastName', { required: true, maxLength: 100 })}
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            autoFocus

          />
          <TextField
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoFocus

          />
          <TextField
            {...register('phone', { required: true })}
            margin="normal"
            fullWidth
            id="phone"
            label="Phone"
            autoFocus
            type="tel"
            inputProps={{ maxLength: 10 }}
          />

          {errorMessage && (
          <Alert
            severity="error"
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setErrorMessage(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              )}
          >
            {errorMessage}
          </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
export default Create;

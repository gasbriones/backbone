import React from 'react';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListIcon from '@mui/icons-material/List';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import DataTable from '../components/DataTable';
import { useGet } from '../hooks/useRequest';
import { DataContacts } from '../types/types';
import Layout from '../layout/Layout';

const useStyles = makeStyles(() => ({
  contactsContainer: {
    height: '400px',
    width: '100%',
    marginTop: 8,
  },
}));

function Contacts(): JSX.Element {
  const { data } = useGet<DataContacts>('/contacts?perPage=0&_sort=id:DESC');
  const classes = useStyles();

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
          <ListIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact List
        </Typography>
        <Box className={classes.contactsContainer}>
          <DataTable contacts={data?.results || []} />
        </Box>
      </Box>
    </Layout>
  );
}

export default Contacts;

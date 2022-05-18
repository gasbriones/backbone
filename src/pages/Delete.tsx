import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ListIcon from '@mui/icons-material/List';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Contact, DataContacts } from '../types/types';
import { useDelete, useGet } from '../hooks/useRequest';
import Layout from '../layout/Layout';

function Delete(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data, error: errorGet } = useGet<Contact>(`/contacts/${id}`);
  const { revalidate } = useGet<DataContacts>('/contacts');
  const navigate = useNavigate();
  const { execute } = useDelete();

  const handleDelete = useCallback(async () => {
    await execute(`/contacts/${id}`).then(() => {
      navigate('/contacts');
    });
    await revalidate();
  }, [execute, id, navigate, revalidate]);

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
          Delete Contact
        </Typography>
        <Box mt={5} width="400px">
          <Card variant="outlined" sx={{ m: 1, bgcolor: 'lightgray' }}>
            {!errorGet ? (
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {data?.email}
                </Typography>
                <Typography variant="h5" component="div">
                  {data?.firstName}
                  {' '}
                  {data?.lastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data?.phone}
                </Typography>
              </CardContent>
            ) : (
              <Alert
                severity="error"
              >
                User does not exist!
              </Alert>
            ) }

            <CardActions>
              <Button size="small">
                <Link to="/contacts">Cancel</Link>
              </Button>
              {!errorGet && (
              <Button size="small" onClick={handleDelete}>Delete</Button>
              ) }
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
}
export default Delete;

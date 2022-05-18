import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  {
    field: 'firstName', headerName: 'First name', width: 150, align: 'center',
  },
  {
    field: 'lastName', headerName: 'Last name', width: 150, align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 200,
    sortable: false,
    align: 'center',
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    align: 'center',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    align: 'center',
    renderCell: (params) => <Link to={`/contacts/delete/${params?.row.id}`}>delete</Link>,
  },
];

type Props = {
  contacts: any[]
};

const DataTable: React.FC<Props> = function ({ contacts }) {
  return (
    <DataGrid
      autoHeight
      disableColumnFilter
      disableColumnMenu
      rows={contacts}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection={false}
    />
  );
};

export default DataTable;

import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";


const DataTable = ({ rows, columns }) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box></Box>
        <Box display="flex" gap={1}>
          <GridToolbarFilterButton />
          <GridToolbarExport />
          <Button variant="contained"><Typography sx={{fontSize: '13px'}}>Add User</Typography></Button>
        </Box>
      </GridToolbarContainer>
    );
  }
  return (
    <Box
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: "#94e2cd",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgb(248, 249, 250)",
          borderBottom: "none",
          color: "#000",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#fff",
          // height: '420px'
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: "#fff",
        },
        "& .MuiCheckbox-root": {
          color: `"#b7ebde" !important`,
        },
        "& .MuiDataGrid-cellContent": {
          color: "#000",
        },
        "& .MuiButton-textPrimary": {
          color: "#000",
        },
        "& .MuiDataGrid-toolbarContainer": {
          marginBottom: "10px",
          justifyContent: "space-between",
        },
        // "& .MuiButtonBase-root ": {
        //   bgcolor: "#fff",
        //   color: '#000'
        // },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "700",
        },
      }}
    >
      <DataGrid 
      sx={{overflowX: 'scroll'}}
        disableRowSelectionOnClick
        autoHeight  
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        slots={{ toolbar: CustomToolbar }}
      />
    </Box>
  );
};

export default DataTable;
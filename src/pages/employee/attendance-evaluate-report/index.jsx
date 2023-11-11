import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

const EvaluateReport = () => {
 
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <>
            <Paper style={{ padding: '20px' }} >
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Typography>Account</Typography>
                        <TextField
                            sx={{ width: '100%', backgroundColor: '#f0f0f0' }}
                            InputProps={{ readOnly: true }}
                            value="Your Account Value"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Hire Date</Typography>
                        <TextField
                            sx={{ width: '100%', backgroundColor: '#f0f0f0' }}
                            InputProps={{ readOnly: true }}
                            value="Your Hire Date Value"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Department</Typography>
                        <TextField
                            sx={{ width: '100%', backgroundColor: '#f0f0f0' }}
                            InputProps={{ readOnly: true }}
                            value="Your Department Value"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Typography fontWeight="500">Month-Year</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['year', 'month']}
                                openTo="year"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Working day(day):</TableCell>
                                <TableCell>Total attendence(h):</TableCell>
                                <TableCell>Total Late(h):</TableCell>
                                <TableCell>Total permitted leave:</TableCell>
                                <TableCell>Total non-permitted leave:</TableCell>
                                <TableCell>Overtime (h):</TableCell>
                                <TableCell>Violate (times):</TableCell>
                                <TableCell>Paid day(day):</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow >
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>


                </TableContainer>
                <Typography style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    Evaluate of Manager: 
                </Typography>

                <Typography>
                    Note
                </Typography>
                <TextField
                    sx={{ width: '100%', backgroundColor: '#f0f0f0' }}
                    InputProps={{ readOnly: true }}
                    multiline
                    rows={8}
                    value="Note Data"
                />
            </Paper>
        </>
    );
};

export default EvaluateReport;

import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import userApi from '../../../services/userApi';
import logApi from '../../../services/logApi';
import DataTableListChangeLog from './component/DataTable';
import formatDate from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';


const EmpLogManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [listLog, setListLog] = useState([]);
    const [listEmployees, setListEmployees] = useState([]);

    const navigate = useNavigate()
    const userInfo = useAuth();

    useEffect(() => {
        const getListEmpByDepartment = async () => {
            try {
                if (!userInfo || !userInfo.departmentId) {
                    console.error('User information or departmentId is missing.');
                    return;
                }
                const response = await userApi.getAllEmployeeByDepartmentId(userInfo.departmentId);
                setListEmployees(response || []);
            } catch (error) {
                console.error('Error fetching employee list:', error);
            }

        };

        getListEmpByDepartment();
    }, [userInfo?.departmentId]);

    const handleSearchLog = async () => {
        setIsLoading(true);
        try {
            if (!userInfo || !userInfo.departmentId) {
                console.error('User information or departmentId is missing.');
                return;
            }

            const data = {
                departmentId: userInfo.departmentId,
                month: format(month, 'MM'),
                year: format(month, 'yyyy'),
            };
            const response = await logApi.getEvaluateOfDepartment(data.departmentId, data.month, data.year);
            console.log('API Response:', response)
            setListLog(response);
            console.log(response);
            console.log(data.departmentId);
            console.log(data.month);
            console.log(data.year);
        } catch (error) {
            console.error('Error fetching department evaluation:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        console.log('Is Loading:', isLoading);
        console.log('List Log:', listLog);
    }, [isLoading, listLog]);



    const columns = [
        {
            field: 'employeeUserName',
            headerName: 'Account',
            width: 150,
        },
        {
            field: '',
            headerName: 'Name',
            width: 180,
            renderCell: (params) => {
                return (
                    <Box
                        margin="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="4px"
                    >
                        <Typography>
                            {params.row.firstNameEmp} {params.row.lastNameEmp} 
                        </Typography>
                    </Box>
                )
            }
        },
        {
            field: 'totalAttendance',
            headerName: 'Attendance(h)',
            width: 150,
        },
        {
            field: 'workingDay',
            headerName: 'Working Day(day)',
            width: 180,
        },
        {
            field: 'permittedLeave',
            headerName: 'Leave(h)',
            width: 150,
        },
        {
            field: 'lateCheckin',
            headerName: 'Late(h)',
            width: 150,
        },
        {
            field: 'overTime',
            headerName: 'Overtime(h)',
            width: 150,

        },
        {
            field: 'violate',
            headerName: 'Violate(s)',
            width: 150,
        },
        {
            field: 'evaluateEnum',
            headerName: 'Rate',
            width: 150,
            renderCell: (params) => {
                const evaluateEnum = params.row.evaluateEnum;
                let textColor = '';
                let displayText = '';

                switch (evaluateEnum) {
                    case 'BAD':
                        textColor = 'red';
                        displayText = 'BAD';
                        break;
                    case 'GOOD':
                        textColor = 'green';
                        displayText = 'GOOD';
                        break;
                    case 'NORMAL':
                        textColor = 'black';
                        displayText = 'NORMAL';
                        break;
                    default:
                        textColor = 'black';
                        displayText = 'N/A';
                }

                return (
                    <Typography style={{ color: textColor }}>
                        {displayText}
                    </Typography>
                );
            },
        },
        {
            field: 'approvedDate',
            headerName: 'Approve Date',
            width: 180,
            renderCell: (params) => {
                return <Box>{formatDate(params.row.approvedDate)}</Box>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            sortable: false,
            filterable: false,

            renderCell: (params) => {
                return (
                    <Box
                        gap={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderRadius="4px"
                        width="100%"
                    >
                        <Box
                            gap={2}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="4px"
                            width="100%"
                        >
                            <Button variant="contained" onClick={() =>
                                navigate(`/log-attendance-emp/${params.row.employeeId}`)
                            }>
                                Detail
                            </Button>
                        </Box>
                    </Box>
                );
            },
        }

    ];

    return (
        <>
            <Box display="flex" alignItems="center" gap={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        maxDate={new Date()}
                        value={month}
                        views={['month', 'year']}
                        onChange={(newDate) => setMonth(newDate.toDate())}
                        renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
                    />
                </LocalizationProvider>
                <Box>
                    <Button variant="outlined" onClick={handleSearchLog}>
                        Search
                    </Button>
                </Box>
            </Box>
            <Box mt={3}>
                <Typography variant="h6">Employee List</Typography>
                {listEmployees.map((employee) => (
                    <div key={employee.accountId}>
                        <Typography>{employee.departmentName}</Typography>
                    </div>
                ))}
            </Box>
            {listLog && listLog.length !== 0 ? (
                <>
                    <Box mt={3}>
                        <DataTableListChangeLog rows={listLog} columns={columns} isLoading={isLoading} />
                    </Box>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default EmpLogManagement;

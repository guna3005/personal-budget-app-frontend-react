import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BudgetTable = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Month</TableCell>
                        <TableCell align="right">Colour</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                            <TableCell align="right">{row.month}</TableCell>
                            <TableCell align="right" style={{ color: row.colour }}>
                                <strong style={{ color: row.colour }}>{row.colour}</strong>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BudgetTable;

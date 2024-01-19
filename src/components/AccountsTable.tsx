import React, { useState } from 'react';
import { Table, Dropdown, Form, Card } from 'react-bootstrap';
import useTable from '../hooks/useTable';
import { useNavigate } from 'react-router-dom';

interface Account {
    accountId: number;
    email: string;
    authToken: string;
    creationDate: string;
    [key: string]: number | string;
}

const AccountsTable: React.FC = () => {
    //data AccountData
    const initialData: Account[] = [
        { accountId: 1, email: 'example1@example.com', authToken: 'token1', creationDate: '2022-01-01' },
        { accountId: 2, email: 'example2@example.com', authToken: 'token2', creationDate: '2022-02-01' },
        { accountId: 3, email: 'example3@example.com', authToken: 'token3', creationDate: '2022-03-02' },
        { accountId: 4, email: 'example4@example.com', authToken: 'token4', creationDate: '2022-04-02' },
        { accountId: 5, email: 'example5@example.com', authToken: 'token5', creationDate: '2022-05-02' },
        { accountId: 6, email: 'example6@example.com', authToken: 'token6', creationDate: '2022-06-03' },
        { accountId: 7, email: 'example7@example.com', authToken: 'token7', creationDate: '2022-07-03' },
        { accountId: 8, email: 'example8@example.com', authToken: 'token8', creationDate: '2022-08-03' },
    ];
    const navigate = useNavigate();
    const [data, setData] = useState(initialData);
    const filterFunction = (data: Account[], value: string) => {
        return data.filter((account) =>
            account.email.toLowerCase().includes(value.toLowerCase())
        );
    };
    const {
        tableState,
        handleSort,
        handlePagination,
        handleItemsPerPageChange,
        sortedData,
        handleFilter
    } = useTable({
        initialData,
        data,
        setData,
        initialSortField: 'accountId',
        initialItemsPerPage: 2,
        filterFunction

    });

    return (
        <Card>
            <Card.Header >
                <Card.Title>Accounts Table</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form className="mb-3">
                    <Form.Group controlId="filter">
                        <Form.Control
                            type="text"
                            placeholder="Filter by email"
                            value={tableState.filterTerm}
                            onChange={(e) => { handleFilter(e.target.value); }}
                        />
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('accountId')}>Account ID</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>Email</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('authToken')}>Auth Token</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('creationDate')}>Creation Date</th>
                        </tr >
                    </thead >
                    <tbody>
                        {sortedData.map((account) => (
                            <tr style={{ cursor: 'pointer' }} key={account.accountId} onClick={() => navigate(`/profiles/${account.accountId}`)}>
                                <td> {account.accountId}</td>
                                <td>{account.email}</td>
                                <td>{account.authToken}</td>
                                <td>{account.creationDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table >
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handlePagination(tableState.currentPage - 1)}
                            disabled={tableState.currentPage === 1}
                        >
                            Previous
                        </button>
                        <div className="mx-2 text-primary">Page {tableState.currentPage}</div>
                        <button
                            type="button"
                            className="btn btn-light "
                            onClick={() => handlePagination(tableState.currentPage + 1)}
                            disabled={tableState.currentPage * tableState.itemsPerPage >= data.length}
                        >
                            Next
                        </button>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant=" success" id="dropdown-items-per-page">
                            Items on page: {tableState.itemsPerPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(2)}>2</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(4)}>4</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleItemsPerPageChange(8)}>8</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Card.Body >
        </Card >
    );
};

export default AccountsTable;

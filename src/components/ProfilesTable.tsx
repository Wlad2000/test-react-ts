import React, { useState } from 'react';
import { Table, Dropdown, Form, Card } from 'react-bootstrap';
import useTable from '../hooks/useTable';
import { useNavigate, useParams } from 'react-router-dom';

interface Profile {
    profileId: number;
    country: string;
    marketplace: string;
}

const ProfilesTable: React.FC = () => {
    //ALLdata ProfilesData
    const initialData: Profile[] = [
        { profileId: 1, country: 'UK', marketplace: 'Amazon' },
        { profileId: 1, country: 'UK', marketplace: 'Walmart' },
        { profileId: 1, country: 'UK', marketplace: 'Amazon' },
        { profileId: 2, country: 'EN', marketplace: 'Amazon' },
        { profileId: 2, country: 'EN', marketplace: 'Walmart' },
        { profileId: 3, country: 'EN', marketplace: 'Walmart' },
        { profileId: 4, country: 'DE', marketplace: 'Amazon' },
        { profileId: 4, country: 'DE', marketplace: 'Amazon' },
        { profileId: 5, country: 'EN', marketplace: 'Walmart' },
        { profileId: 5, country: 'UK', marketplace: 'Amazon' },
        { profileId: 6, country: 'UK', marketplace: 'Walmart' },
        { profileId: 6, country: 'DE', marketplace: 'Amazon' },
        { profileId: 7, country: 'DE', marketplace: 'Walmart' },
        { profileId: 8, country: 'UK', marketplace: 'Amazon' },

    ];
    const { accountId } = useParams<{ accountId: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState(initialData.filter(profile => profile.profileId === Number(accountId)));
    const filterFunction = (data: Profile[], value: string) => {
        return data.filter((profile) =>
            profile.country.toLowerCase().includes(value.toLowerCase())
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
        initialData: initialData.filter(profile => profile.profileId === Number(accountId)),
        data,
        setData,
        initialSortField: 'profileId',
        initialItemsPerPage: 2,
        filterFunction
    });

    return (
        <Card className='border-primary'>
            <Card.Header className="bg-primary">
                <Card.Title> Profiles Table</Card.Title>
            </Card.Header>
            <Card.Body className={data.length === 0 && tableState.filterTerm.length === 0 ? 'invisible' : 'visible'}>
                <Form className="mb-3">
                    <Form.Group controlId="filter">
                        <Form.Control
                            type="text"
                            placeholder="Filter by country"
                            value={tableState.filterTerm}
                            onChange={(e) => { handleFilter(e.target.value); }}
                        />
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('profileId')}>Profile ID</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('country')}>Country</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('marketplace')}>Marketplace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((profile, index) => (
                            <tr style={{ cursor: 'pointer' }} key={index} onClick={() => navigate(`/campaigns/${profile.profileId}`)}>
                                <td> {profile.profileId}</td>
                                <td>{profile.country}</td>
                                <td>{profile.marketplace}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
            <button
                type="button"
                className=" w-25 btn btn-warning"
                onClick={() => navigate(`/`)}
            >
                Back
            </button>
        </Card >
    );
};

export default ProfilesTable;

import React, { useState } from 'react';
import { Table, Dropdown, Form, Card } from 'react-bootstrap';
import useTable from '../hooks/useTable';
import { useNavigate, useParams } from 'react-router-dom';

interface Campaigns {
    campaignId: number;
    clicks: number;
    cost: number;
    date: string;
}

const CampaignsTable: React.FC = () => {
    //ALLdata ACampaignsData
    const initialData: Campaigns[] = [
        { campaignId: 1, clicks: 2, cost: 10, date: '2022-01-01' },
        { campaignId: 2, clicks: 10, cost: 10, date: '2022-02-01' },
        { campaignId: 3, clicks: 4, cost: 10, date: '2022-03-02' },
        { campaignId: 4, clicks: 43, cost: 10, date: '2022-04-02' },
        { campaignId: 5, clicks: 4, cost: 12, date: '2022-05-02' },
        { campaignId: 6, clicks: 5, cost: 12, date: '2022-06-03' },
        { campaignId: 7, clicks: 43, cost: 12, date: '2022-07-03' },
        { campaignId: 8, clicks: 34, cost: 12, date: '2022-08-03' },

    ];

    const { profileId } = useParams<{ profileId: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState(initialData.filter(campaign => campaign.campaignId === Number(profileId)));
    const filterFunction = (data: Campaigns[], value: string) => {
        return data.filter((campaign) =>
            campaign.date.toLowerCase().includes(value.toLowerCase())
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
        initialData: initialData.filter(campaign => campaign.campaignId === Number(profileId)),
        data,
        setData,
        initialSortField: 'campaignId',
        initialItemsPerPage: 2,
        filterFunction

    });

    return (
        <Card className='border-info'>
            <Card.Header className="bg-info">
                <Card.Title> Campaigns Table</Card.Title>
            </Card.Header>
            <Card.Body className={data.length === 0 && tableState.filterTerm.length === 0 ? 'invisible' : 'visible'}>
                <Form className="mb-3">
                    <Form.Group controlId="filter">
                        <Form.Control
                            type="text"
                            placeholder="Filter by data"
                            value={tableState.filterTerm}
                            onChange={(e) => { handleFilter(e.target.value); }}
                        />
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('campaignId')}>Campaign ID</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('clicks')}>Clicks</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('cost')}>Cost</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('date')}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((campaign, index) => (
                            <tr key={index}>
                                <td> {campaign.campaignId}</td>
                                <td>{campaign.clicks}</td>
                                <td>{campaign.cost}</td>
                                <td>{campaign.date}</td>
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
            </Card.Body>
            <div className="d-flex align-items-center">
                <button
                    type="button"
                    className={` w-25 btn btn-warning ${data.length === 0 ? 'invisible' : 'visible'}`}
                    onClick={() => navigate(`/profiles/${profileId}`)}
                >
                    Back
                </button>
                <button
                    type="button"
                    style={{ marginLeft: '20px' }}
                    className="ml-20 w-25 btn btn-warning"
                    onClick={() => navigate(`/`)}
                >
                    All Back
                </button>
            </div>
        </Card >
    );
};

export default CampaignsTable;

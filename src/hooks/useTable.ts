import { useState, useEffect } from 'react';

interface TableState<T> {
    sortField: keyof T;
    sortOrder: string;
    currentPage: number;
    itemsPerPage: number;
    filterTerm: string;
}

interface UseTableProps<T> {
    initialData: T[];
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    initialSortField: keyof T;
    initialItemsPerPage: number;
    filterFunction: (data: T[], filterTerm: string) => T[];
}

const useTable = <T>({
    initialData,
    data,
    setData,
    initialSortField,
    initialItemsPerPage,
    filterFunction,
}: UseTableProps<T>) => {
    const initialTableState: TableState<T> = {
        sortField: initialSortField,
        sortOrder: 'asc',
        currentPage: 1,
        filterTerm: '',
        itemsPerPage: initialItemsPerPage,
    };

    const [tableState, setTableState] = useState<TableState<T>>(initialTableState);
    const [sortedData, setSortedData] = useState<T[]>(data);

    useEffect(() => {
        const startIndex = (tableState.currentPage - 1) * tableState.itemsPerPage;
        const endIndex = startIndex + tableState.itemsPerPage;
        const slicedData = data.slice(startIndex, endIndex);

        const sorted = [...slicedData].sort((a, b) => {
            const aValue = String(a[tableState.sortField]);
            const bValue = String(b[tableState.sortField]);

            if (aValue && bValue) {
                return tableState.sortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return 0;
            }
        });

        setSortedData(sorted);
    }, [data, tableState.sortField, tableState.sortOrder, tableState.currentPage, tableState.itemsPerPage]);

    const handleSort = (field: keyof T) => {
        setTableState((prevState) => ({
            ...prevState,
            sortField: field,
            sortOrder: field === prevState.sortField && prevState.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handlePagination = (page: number) => {
        setTableState((prevState) => ({ ...prevState, currentPage: page }));
    };

    const handleItemsPerPageChange = (value: number) => {
        setTableState((prevState) => ({ ...prevState, itemsPerPage: value, currentPage: 1 }));
    };

    const handleFilter = (value: string) => {
        setTableState((prevState) => ({ ...prevState, filterTerm: value }));

        const filteredData = filterFunction(initialData, value);

        setData(filteredData);
    };


    return {
        tableState,
        handleSort,
        handlePagination,
        handleItemsPerPageChange,
        sortedData,
        handleFilter,
    };
};

export default useTable;

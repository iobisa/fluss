import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import {
  TableSortLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePaginationProps,
} from "@material-ui/core";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  Column,
  usePagination,
  useSortBy,
} from "react-table";
import DataTableColumn from "./DataTableColumn";
import DataTableContext from "./DataTableContext";
import DataTablePagination from "./DataTablePagination";

interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data?: T[];
  paginated?: boolean;
  pageSize?: number;
  toolbar?: JSX.Element;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  TablePaginationProps?: TablePaginationProps;
}

function DataTable<T extends object>(props: DataTableProps<T>) {
  const classes = useStyles();
  const table = useTableInitialization(props);
  const rows = props.paginated ? table.page : table.rows;
  const sortBy = table.state.sortBy;
  const sortingColumnId = sortBy?.length > 0 ? sortBy[0].id : "";

  return (
    <DataTableContext.Provider value={{ table }}>
      {props.toolbar && (
        <Paper>
          <div className={classes.toolbar}>{props.toolbar}</div>
        </Paper>
      )}
      <Paper style={{ width: "100%" }}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              {table.headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <>
                      <TableCell
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={classes.tableHeader}
                        align="left"
                        padding="default"
                        sortDirection={props.sortDirection}
                      >
                        <TableSortLabel
                          active={sortingColumnId === column.id}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        >
                          {column.render("Header")}
                        </TableSortLabel>
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.map((row) => {
                table.prepareRow(row);
                return (
                  <StyledTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()} style={{ width: "5%" }}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DataTablePagination />
      </Paper>
    </DataTableContext.Provider>
  );
}

const useStyles = makeStyles((theme) => ({
  table: {},
  tableHeader: {
    fontWeight: "bold",
  },
  toolbar: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    marginBottom: theme.spacing(2),
  },
}));

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

(DataTable as FC<DataTableProps<any>>).defaultProps = {
  pageSize: 5,
  paginated: true,
  sortBy: "",
  sortDirection: "asc",
};

function useTableInitialization<T extends object>(props: DataTableProps<T>) {
  const { columns, paginated, pageSize, data, sortBy, sortDirection } = props;

  const table = useTable(
    {
      columns: columns as Column<object>[],
      data,
      initialState: {
        pageIndex: 0,
        pageSize: paginated ? pageSize : data.length || 0,
        sortBy: [
          {
            id: sortBy as string,
            desc: sortDirection === "desc" ? true : false,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return table;
}

export default DataTable;


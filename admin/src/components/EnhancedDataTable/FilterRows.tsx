import { makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import React from "react";
import { ColumnInstance, TableInstance } from "react-table";

import PopoverIcon from "../PopoverIcon";

interface FilterRowsProps<T extends object> {
  table: TableInstance<T>;
}

function FilterRows<T extends object>({ table }: FilterRowsProps<T>) {
  const classes = useStyles();

  function renderFilter(column: ColumnInstance<T>) {
    if (!(column.canFilter && column.Filter)) return null;

    return (
      <div key={column.id} className={classes.item}>
        {column.render("Filter")}
      </div>
    );
  }

  return (
    <PopoverIcon title="Filtros" icon={FilterList}>
      <div className={classes.container}>{table.allColumns.map(renderFilter)}</div>
    </PopoverIcon>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {
    width: "100%",
  },
}));

export default FilterRows;

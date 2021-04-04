import FormSelect from "@bit/mikhael1729.fluss.components.form-select";
import { MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ReactNode } from "react";

interface ReportSettingProps {
  title: string;
  settings: string[];
  value: string;
}

const ReportSetting: FC<ReportSettingProps> = ({ title, settings, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.handler}>
      <Typography variant="caption">{title}</Typography>
      <FormSelect noneValue="" className={classes.select} value={value}>
        {settings.map((setting, i) => (
          <MenuItem key={i} value={setting}>
            {setting}
          </MenuItem>
        ))}
      </FormSelect>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  handler: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(theme.spacing(0.5)),
    },
  },
  select: {
    height: `calc(${theme.mixins.toolbar.minHeight}px - 20px)`,
  },
}));

export default ReportSetting;

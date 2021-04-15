import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

const AboutUs: FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container>
        <Grid item md={5} className={classes.startSide}>
          <Typography variant="h4" style={{ fontWeight: "bold", lineHeight: theme.spacing(0.18) }}>
            ¿Quiénes somos?
          </Typography>

          <Typography variant="h5" style={{ lineHeight: theme.spacing(0.18) }}>
            Somos una organización sin fines de lucro que busca proveer información de elementos
            fisocoquímicos de la República Dominicana y hacer accesible estos datos a todo
            interesado en conocer de ellos.
          </Typography>
        </Grid>
        <Grid item md={7} className={classes.endSide}>
          <div className={classes.imageBox}>
            <Image src="/images/reports.png" alt="Gráficos" layout="fill" objectFit="contain" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  startSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
  },
  endSide: {
    display: "flex",
    alignItems: "center",
  },
  imageBox: {
    position: "relative",
    width: "100%",
    minHeight: 300,
    "& > div > div:first-child": {
      borderRadius: 30,
    },
  },
}));

export default AboutUs;

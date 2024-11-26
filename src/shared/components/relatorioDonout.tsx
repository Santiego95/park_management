import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';

const RelatorioDonut: React.FC = () => {
  const theme = useTheme();

  const totalMensalista = 44;
  const totalDiario = 55;
  const total = totalMensalista + totalDiario;

  const donutOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Mensalista', 'Diário', 'Total'],
    colors: ['#FF4560', '#008FFB', '#00E396'],
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const seriesIndex = opts.seriesIndex;
        const seriesValue = opts.w.globals.series[seriesIndex];
        return `R$ ${seriesValue}`;
      },
      dropShadow: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'right',
      labels: {
        colors: theme.palette.text.primary,
      },
    },
  };

  const donutSeries = [totalMensalista, totalDiario, total];

  return (
    <Box
      sx={{
        width: '70%',
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h3" sx={{ marginBottom: 2 }}>
        Distribuição por Categoria
      </Typography>
      <ApexCharts options={donutOptions} series={donutSeries} type="donut" height={450} />
    </Box>
  );
};

export default RelatorioDonut;

import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';

const RelatorioMes: React.FC = () => {
  const theme = useTheme();

  const lineOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
    },
    title: {
      text: 'Média Mensal',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
    colors: ['#00E396'],
    tooltip: {
      theme: 'dark', // Tema do tooltip para melhor visualização
    },
  };

  const lineSeries = [
    {
      name: 'Vendas',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 160, 180], // Dados fictícios para os meses
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        margin: '20px auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h3" sx={{ marginBottom: 2 }}>
        Vendas por Mês
      </Typography>
      <ApexCharts options={lineOptions} series={lineSeries} type="line" height={350} />
    </Box>
  );
};

export default RelatorioMes;

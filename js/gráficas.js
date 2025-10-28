const ctx = document.getElementById('graficaCiber');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Cibercrimen (2025)', 'EE. UU.', 'China', 'Alemania', 'México'],
    datasets: [{
      label: 'Valor (billones USD)',
      data: [10.5, 30.6, 19.4, 5.0, 1.46],
      backgroundColor: [
        'rgba(200, 0, 0, 0.8)',   // rojo para cibercrimen
        'rgba(26, 161, 194, 0.7)',  // azul para países
        'rgba(26, 161, 194, 0.7)',   
        'rgba(26, 161, 194, 0.7)',
        'rgba(26, 161, 194, 0.7)'
      ],
      borderColor: [
        'rgba(200, 0, 0, 0.8)',
        'rgba(26, 161, 194, 0.7)',
        'rgba(26, 161, 194, 0.7)',
        'rgba(26, 161, 194, 0.7)',
        'rgba(26, 161, 194, 0.7)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Billones de USD' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.formattedValue} billones USD`
        }
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutCubic'
    }
  }
});

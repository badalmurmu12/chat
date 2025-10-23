import React from 'react';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend,

  PointElement,
  LineElement,

} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, ArcElement,
  LineElement, Title, Tooltip, Legend);

const ChartUi = ({ message }) => {

  const parseMessage = (msg) => {
    try {
      return typeof msg === 'string' ? JSON.parse(msg) : msg;
    } catch (error) {

      return null;
    }
    // if (typeof msg === 'string') {
    //   try {
    //     debugger
    //     JSON.parse(msg);
    //     return JSON.parse(msg); // If valid JSON string
    //   } catch (error) {
    //     return msg; // If invalid JSON string, return original string
    //   }
    // }
    // return msg; 
  };

  function extractDataObject(chartConfigString) {
    try {
      // Convert the string to a JavaScript object
      const chartConfig = eval('(' + chartConfigString + ')');

      if (chartConfig && chartConfig.data) {
        return chartConfig.data;
      } else {
        throw new Error("Invalid chart configuration: 'data' property not found");
      }
    } catch (error) {
      throw new Error("Failed to parse chart configuration: " + error.message);
    }
  }

  // try {
  //   const dataObject = extractDataObject(message);
  //   console.log(JSON.stringify(dataObject, null, 2));
  //   return <Bar data={dataObject}  />;
  // } catch (error) {
  //   console.error(error.message);
  // }

  const parsedMessage = parseMessage(message);

  if (!parsedMessage) {
    return <div>{message ? message : 'Invalid data format'}</div>
    // return <div>Invalid data format</div>;
  }

  const { type, data, options } = parsedMessage;

  let optionsnew = {
    ...options,
    "scales": {
      ...options?.scales,
      y: {
        ...options?.scales?.y,
        ticks: {
          callback: (val) => {
            if (val === 0) return '0';

            const absVal = Math.abs(val);
            const sign = val < 0 ? '-' : '';
            const units = ['', 'K', 'M', 'B'];
            const k = 1000;

            // Handle numbers less than 1
            if (absVal < 1) {
              return sign + absVal.toFixed(2);
            }

            let magnitude = Math.floor(Math.log(absVal) / Math.log(k));

            // Ensure magnitude is within the range of our units array
            magnitude = Math.min(magnitude, units.length - 1);

            const scaledVal = absVal / Math.pow(k, magnitude);
            const formattedVal = scaledVal.toFixed(1).replace(/\.0$/, '');

            return `${sign}${formattedVal}${units[magnitude]}`;
          },
        },
      },
    },
    "plugins": {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${value}`;
          }
        }
      }
    }
  }
  // if (type !== 'pie') {
  //   return <div>Unsupported chart type</div>;
  // }

  try {

    if (type == 'bar') {

      return <Box sx={{ maxHeight: "60vh", width: "100%" }}> <Bar data={data} options={optionsnew} /></Box>;
    }
    else if (type == 'line') {

      return <Box sx={{ maxHeight: "60vh", width: "100%" }}><Line data={data} options={optionsnew} /></Box>;
    }
    else if (type == 'pie') {

      return <Box sx={{ maxHeight: "60vh" }}><Pie data={data} />
      </Box>
    }
  } catch (error) {
    return <div>Unsupported chart type</div>;
    console.error(error.message);
  }


};

export default ChartUi;
import React, { useState } from 'react'
import { Box } from "@chakra-ui/react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { useStock } from '../Context/Stock_Context';
import Canvas_JSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
var CanvasJSChart = Canvas_JSReact.CanvasJSChart;
const StockResult = () => {
    const[stock_price,setstock_price,StockCode,setStockCode,history_loss,history_val,sethistory_loss,sethistory_val]=useStock();
    const options1 = {
        title: {
            text: "Stock_Price_Prediction"
        },
        theme: "dark2",
        subtitles: [{
            text: StockCode+"/USD"
        }],
        charts: [{
            axisX: {
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "MMM DD YYYY"
                }
            },
            axisY: {
                title: "Stock Price",
                prefix: "$",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    valueFormatString: "$#,###.##"
                }
            },
            toolTip: {
                shared: true
            },
            data: [{
                name: "Price (in USD)",
                type: "splineArea",
                color: "#3576a8",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: stock_price
            }]
        }],
        navigator: {
            slider: {
                minimum: new Date("2023-03-27"),
                maximum: new Date("2023-11-27")
            }
        }
    };
    const options = {
        theme: "dark2",
        animationEnabled: true,
        title:{
            text: "Epoch VS Loss"
        },
        subtitles: [{
            text: "Click Legend to Hide or Unhide Data Series"
        }],
        axisX: {
            title: "States"
        },
        axisY: {
            title: "Training_Loss",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            labelFontColor: "#6D78AD",
            tickColor: "#6D78AD"
        },
        axisY2: {
            title: "Validation_loss",
            titleFontColor: "#51CDA0",
            lineColor: "#51CDA0",
            labelFontColor: "#51CDA0",
            tickColor: "#51CDA0"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            
        },
        data: [{
            type: "spline",
            name: "Training_Loss",
            showInLegend: true,
            xValueFormatString: "##",
            yValueFormatString: "#.###",
            dataPoints: history_loss
        },
        {
            type: "spline",
            name: "Validation_Loss",
            axisYType: "secondary",
            showInLegend: true,
            xValueFormatString: "##",
            yValueFormatString: "#.###",
            dataPoints: history_val
        }]
    }
    const containerProps = {
        width: "80%",
        height: "250px",
        margin: "auto"
      };
    return (
        <Box
            display={{ base: "flex", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="#141417"
            w={"60%"}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="dark-lg"
        >
            <CanvasJSStockChart containerProps={containerProps} options = {options1}
            />
            <CanvasJSChart options = {options} containerProps={containerProps}
			/>
        </Box>
    )
}

export default StockResult

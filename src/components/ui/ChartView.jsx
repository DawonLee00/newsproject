import React from "react";
import { useEffect, useState, useRef } from "react"
import {
    Chart,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
  
const WeatherChart = (props) => {
    const chartRef = useRef(null);
    let chartInstance = null;
  
    useEffect(() => {
      const ctx = chartRef.current.getContext("2d");
  
      const createChart = () => {
        Chart.register(
          LineController,
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement
        );
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [
              {
                label: "Data 1",
                data: ["-10", "-9", "-5", "-4", "-1", "0"],
                borderColor: "rgba(109, 35, 249, 1)",
                backgroundColor: "rgba(109, 35, 249, 0.2)",
                pointRadius: 5, // 포인트 크기
                pointBackgroundColor: "rgba(109, 35, 249, 1)", // 포인트 배경색
                pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
                pointHoverRadius: 7, // 호버 시 포인트 크기
                pointHoverBackgroundColor: "rgba(109, 35, 249, 1)", // 호버 시 포인트 배경색
                pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
                fill: false, // 라인 그래프에서 영역 채우기 비활성화
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
              },
              y: {
                beginAtZero: true,
                max: 10, // 최대값 설정
              },
            },
          },
        });
      };
  
      const destroyChart = () => {
        if (chartInstance) {
          chartInstance.destroy();
          chartInstance = null;
        }
      };
  
      const initializeChart = () => {
        destroyChart(); // 이전 차트 파괴
        createChart(); // 새로운 차트 생성
      };
  
      // 컴포넌트가 처음 렌더링될 때 차트 초기화
      initializeChart();
  
      // 컴포넌트가 unmount될 때 차트 파괴
      return () => {
        destroyChart();
      };
    }, []);
  
    return <canvas ref={chartRef} />;
}

export default WeatherChart;
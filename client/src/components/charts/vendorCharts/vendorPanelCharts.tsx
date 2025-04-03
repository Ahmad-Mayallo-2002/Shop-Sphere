import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { GridItem, Heading, SimpleGrid } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const salesData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sales",
      data: [400, 600, 800, 700, 1100, 900, 1200],
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.2)",
      tension: 0.4,
    },
  ],
};

const ordersData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Orders",
      data: [20, 35, 50, 45, 80, 65, 90],
      backgroundColor: "#82ca9d",
    },
  ],
};

const activityData = {
  labels: ["Pending", "Shipped", "Delivered", "Canceled"],
  datasets: [
    {
      data: [10, 25, 50, 15],
      backgroundColor: ["#FFBB28", "#00C49F", "#0088FE", "#FF8042"],
    },
  ],
};

export default function VendorPanelCharts() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {/* Sales Overview */}
      <GridItem>
        <Heading mb={4}>Sales Overview</Heading>
        <Line data={salesData} />
      </GridItem>

      {/* Orders Overview */}
      <GridItem>
        <Heading mb={4}>Orders Overview</Heading>
        <Bar data={ordersData} />
      </GridItem>

      {/* Activity Overview */}
      <GridItem>
        <Heading mb={4}>Activity Overview</Heading>
        <Pie data={activityData} />
      </GridItem>
    </SimpleGrid>
  );
}

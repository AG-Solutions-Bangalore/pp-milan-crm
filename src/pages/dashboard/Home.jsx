import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import CountUp from "react-countup";
import { Chart, ArcElement, registerables } from "chart.js";
import { Users, RefreshCcw } from "lucide-react";
import married from "/src/assets/dashboard/w.png";
import man from "/src/assets/dashboard/man.png";
import women from "/src/assets/dashboard/woman.png";
import bachelor from "/src/assets/dashboard/bachelor.png";
import add from "/src/assets/dashboard/add.png";

import { Center, Loader, Text } from "@mantine/core";

Chart.register(ArcElement, ...registerables);
const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">
            <CountUp end={value} separator="," />
          </h3>
        </div>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}
        >
          {typeof Icon === "string" ? (
            <img src={Icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <Icon className="w-6 h-6 text-white" />
          )}
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [result, setResult] = useState([]);
  const [loadingDashboardData, setLoadingDashboardData] = useState(true);

  const isLoading = loadingDashboardData;

  const fetchResult = async () => {
    setLoadingDashboardData(true);

    try {
      const response = await axios.get(`${BASE_URL}/panel-fetch-dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status == "200") {
        setResult(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingDashboardData(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  const cardConfig = [
    {
      title: "New Register",
      value: result.user_new_registration_count,
      icon: add,
      color: "bg-green-600",
    },
    {
      title: "Married",
      value: result.user_married_count,
      icon: married,
      color: "bg-pink-600",
    },
    {
      title: "UnMarried",
      value: result.user_unmarried_count,
      icon: bachelor,
      color: "bg-red-600",
    },
    {
      title: "Male",
      value: result.user_male_count,
      icon: man,
      color: "bg-amber-600",
    },
    {
      title: "Female",
      value: result.user_female_count,
      icon: women,
      color: "bg-blue-600",
    },
  ];

  return (
    <Layout>
      <div className=" bg-gray-100 ">
        {isLoading ? (
          <Center style={{ height: "70vh", flexDirection: "column" }}>
            <Loader size="lg" variant="dots" color="blue" />
            <Text mt="md" color="gray" size="lg">
              Loading, please wait...
            </Text>
          </Center>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cardConfig.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}

            <button
              onClick={() => {
                fetchResult();
              }}
              className="fixed bottom-8 right-8 p-4 bg-white hover:bg-gray-50 rounded-full shadow-lg transition-colors"
            >
              <RefreshCcw className="h-6 w-6 text-blue-600" />
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;

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
import { useNavigate } from "react-router-dom";
import { IconClockX, IconMan, IconWoman } from "@tabler/icons-react";
import moment from "moment";

Chart.register(ArcElement, ...registerables);
const DashboardCard = ({ title, value, icon: Icon, color, onClick }) => (
  <div
    className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
    onClick={onClick}
  >
    {" "}
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1 hover:border-dashed hover:border-b-2 hover:border-black">
            {title}
          </p>
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
  const navigate = useNavigate();
  const [newregister, setNewRegister] = useState([]);
  const [feedback, setFeedback] = useState([]);

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
        setNewRegister(response.data.user_new_registration);
        setFeedback(response.data.feedbacks);
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
      onClick: () => navigate("/newregister"),
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
      onClick: () => navigate("/male"),
    },
    {
      title: "Female",
      value: result.user_female_count,
      icon: women,
      color: "bg-blue-600",
      onClick: () => navigate("/female"),
    },
  ];
  const cardConfig1 = [
    {
      title: "Validity",
      value: result.user_validity_expire_count,
      icon: IconClockX,
      color: "bg-pink-600",
      onClick: () => navigate("/validity"),
    },
    {
      title: "Married",
      value: result.user_married_count,
      icon: married,
      color: "bg-pink-600",
      onClick: () => navigate("/married"),
    },
  ];
  return (
    <Layout>
      <div className=" bg-gray-100 ">
        {isLoading ? (
          <Center style={{ height: "70vh", flexDirection: "column" }}>
            <Loader size="lg" variant="dots" color="pink" />
            <Text mt="md" color="gray" size="lg">
              Loading, please wait...
            </Text>
          </Center>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cardConfig.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                  onClick={card.onClick}
                />
              ))}
            </div>

            <div className="grid space-x-reverse md:grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-5 order-last lg:order-first">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 ">
                    <span className="border-b-2 border-dashed border-red-200">
                      NewRegister Overview
                    </span>
                  </h3>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="text-left p-2 text-sm font-medium text-gray-700">
                          DOB
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newregister.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-sm text-gray-800">
                            <div className="flex items-center">
                              {item.profile_gender === "Male" ? (
                                <IconMan className="mr-2" />
                              ) : (
                                <IconWoman className="mr-2" />
                              )}
                              {item.name}
                            </div>
                          </td>
                          <td className="p-2 text-sm text-gray-800">
                            {moment(item.profile_date_of_birth).format(
                              "DD-MMM-YYYY"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 order-last lg:order-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    <span className="border-b-2 border-dashed border-red-200">
                      Feedback Overview
                    </span>
                  </h3>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="text-left p-2 text-sm font-medium text-gray-700">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedback.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-sm text-gray-800">
                            {item.from_name}
                          </td>
                          <td className="p-2 text-sm text-gray-800">
                            {item.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-3 order-first lg:order-3">
                <div className="flex flex-col">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {cardConfig1.map((card, index) => (
                      <DashboardCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                        onClick={card.onClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
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

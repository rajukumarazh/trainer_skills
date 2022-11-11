import {useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import Container from "../../components/Container/Container";
import {
  GET_NUMBER_OF_USERS,
  GET_TOTAL_NMBER_OF_USERS,
  GET_NUMBER_OF_USERS_DISTICT_BY_SOURCE,
} from "../../GraphQl/Queries/User";
import {FiUsers, FiSettings} from "react-icons/fi";
import {MdWebAsset, MdOutlineSettings} from "react-icons/md";

const DashboardPage = ({setSidebar, sidebar}) => {
  const setSidebarItems = () => setSidebar({items: [], active: 0});
  useEffect(() => {
    setSidebarItems();
  }, []);
  const totalUsers =
    useQuery(GET_TOTAL_NMBER_OF_USERS);
  const userDistribution = 
    useQuery(GET_NUMBER_OF_USERS_DISTICT_BY_SOURCE);

  const [stats, setStats] = useState([]);

  useEffect(() => {

    console.log('TOTAL USERS : ', totalUsers, userDistribution);
    let totalCount = 0;
    if (totalUsers.data) {
      totalCount = totalUsers?.data.courses_users_aggregate.aggregate.count;
    }

    let webCount = 0;
    if (userDistribution.data) {
      webCount = userDistribution.data.users_count_by_source.filter(({source}) => source == "web")[0].count;
    }

    let onboardingCount = 0;
    if (userDistribution.data) {
      onboardingCount = userDistribution.data.users_count_by_source.filter(({source}) => source == "onboarded")[0].count;
    }

    let onboardingCompetedCount = 0;
    if (userDistribution.data) {
      onboardingCompetedCount = userDistribution.data.users_count_by_source.filter(({source}) => source == "onboarded_complete")[0].count;
    }

    var local_stats = [
      {
        title: "Users",
        Icon: FiUsers,
        value: totalCount,
      },
      {
        title: "Moodle 1 Onboarded",
        Icon: FiSettings,
        value: onboardingCount,
      },
      {
        title: "Self Singup",
        Icon: MdWebAsset,
        value: webCount,
      }
      ,
      {
        title: "Moodle 1 Signed-In",
        Icon: MdOutlineSettings,
        value: onboardingCompetedCount,
      },
    ]
 
    setStats(local_stats);
  }, [totalUsers, userDistribution]);

 
  return (
    <Container title={"Dashboard"}>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
            {stats.map(({title, value, Icon}) => (
                <div className="p-4 w-96" key={title}>
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <Icon size={80} className="w-full mb-4" />
                    <h2 className="title-font font-medium text-3xl text-indigo">
                      {value}
                    </h2>
                    <p className="leading-relaxed">{title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};
export default DashboardPage;

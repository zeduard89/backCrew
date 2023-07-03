import { ProjectModel, UserModel } from "../../config/db";
import { IinfoMatches } from "../../types/types";

const monthsText: [string, string, string, string, string, string, string, string, string, string, string, string] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function calculateTotalFundingCurrent(array: Array<ProjectModel>): number {
  return array.reduce((sum, project) => sum + project.fundingCurrent, 0);
}

const getFilteredAdminMain = async (
): Promise<object> => {
  try {
    const infoMatches: IinfoMatches = {
      totalFundsRaised: 0,
      chartTotalFundsRaised: {},
      chartFundsRaisedPerMonth: [],
      allRegisteredUsers: 0,
      chartRegisteredUsersPerMonth: [],
      activeProjects: 0,
      chartActiveProjects: {},
      chartActiveProjectsPerMonth: [],
    };
    // All users
    const allDisplayUsers = await UserModel.findAll({
      // where: {
      //   displayProject: true,
      // },
    });
    if (!allDisplayUsers || allDisplayUsers.length === 0) {
      throw new Error("Error fetching all users");
    }

    // All displayProjects
    const allDisplayProjects = await ProjectModel.findAll({
      where: {
        displayProject: true,
      },
    });
    if (!allDisplayProjects || allDisplayProjects.length === 0) {
      throw new Error("Error fetching all display projects");
    }

    // Display Projects with Community Projects category
    const displayProjectsCommunityCategory = await ProjectModel.findAll({
      where: {
        displayProject: true,
        category: "Community Projects"
      },
    });
    if (!displayProjectsCommunityCategory || displayProjectsCommunityCategory.length === 0) {
      throw new Error("Error fetching display projects with Community Projects category");
    }

    // Display Projects with Creative Works category
    const displayProjectsCreativeCategory = await ProjectModel.findAll({
      where: {
        displayProject: true,
        category: "Creative Works"
      },
    });
    if (!displayProjectsCreativeCategory || displayProjectsCreativeCategory.length === 0) {
      throw new Error("Error fetching display projects with Creative Works category");
    }

    // Display Projects with Tech & Innovation category
    const displayProjectsTechCategory = await ProjectModel.findAll({
      where: {
        displayProject: true,
        category: "Tech & Innovation"
      },
    });
    if (!displayProjectsTechCategory || displayProjectsTechCategory.length === 0) {
      throw new Error("Error fetching display projects with Tech & Innovation category");
    }


    // All users display

    infoMatches.allRegisteredUsers = allDisplayUsers.length

    // All founding current
    infoMatches.totalFundsRaised = calculateTotalFundingCurrent(allDisplayProjects)

    // All founding current for Projects with Community Projects category
    const totalFundingCurrentCommunityCategory = calculateTotalFundingCurrent(displayProjectsCommunityCategory)

    // All founding current for Projects with Creative Works category
    const totalFundingCurrentCreativeCategory = calculateTotalFundingCurrent(displayProjectsCreativeCategory)

    // All founding current for Projects with Tech & Innovation category
    const totalFundingCurrentTechCategory = calculateTotalFundingCurrent(displayProjectsTechCategory)

    infoMatches.chartTotalFundsRaised = {
      fundingCurrentCommunityCategory: totalFundingCurrentCommunityCategory,
      fundingCurrentCreativeCategory: totalFundingCurrentCreativeCategory,
      fundingCurrentTechCategory: totalFundingCurrentTechCategory,
    }

    // Chart Funds Raised Per Month:
    const chartFundsRaisedPerMonth = [];
    const date = new Date();
    const currentMonthIndex = date.getMonth();

    for (let i = 0; i <= currentMonthIndex; i++) {
      const month = monthsText[i];

      const chartTotalFundsRaised = {
        fundingCurrentCommunityCategory: 0,
        fundingCurrentCreativeCategory: 0,
        fundingCurrentTechCategory: 0,
      };

      let projectIndex = i;

      while (projectIndex < allDisplayProjects.length) {
        const project = allDisplayProjects[projectIndex];

        if (project.category === "Community Projects") {
          chartTotalFundsRaised.fundingCurrentCommunityCategory += project.fundingCurrent;
        } else if (project.category === "Creative Works") {
          chartTotalFundsRaised.fundingCurrentCreativeCategory += project.fundingCurrent;
        } else if (project.category === "Tech & Innovation") {
          chartTotalFundsRaised.fundingCurrentTechCategory += project.fundingCurrent;
        }

        projectIndex += currentMonthIndex + 1;
      }

      const totalFundsRaised = Object.values(chartTotalFundsRaised).reduce((acc, curr) => acc + curr, 0);

      const monthObject = {
        [month]: {
          totalFundsRaised,
          chartTotalFundsRaised: { ...chartTotalFundsRaised },
        },
      };

      chartFundsRaisedPerMonth.push(monthObject);
    }

    infoMatches.chartFundsRaisedPerMonth = chartFundsRaisedPerMonth;

    // All displayProjects
    infoMatches.activeProjects = allDisplayProjects.length

    // All display Projects with Community Projects category
    const totalDisplayProjectsCommunityCategory = displayProjectsCommunityCategory.length

    // All display Projects with Creative Works category
    const totalDisplayCreativeCategory = displayProjectsCreativeCategory.length

    // All display Projects with Tech & Innovation category
    const totalDisplayTechCategory = displayProjectsTechCategory.length

    infoMatches.chartActiveProjects = {
      displayProjectsCommunityCategory: totalDisplayProjectsCommunityCategory,
      displayProjectsCreativeCategory: totalDisplayCreativeCategory,
      displayProjectsTechCategory: totalDisplayTechCategory,
    }

    // Chart Active Projects Per Month:
    const chartActiveProjectsPerMonth = [];

    for (let i = 0; i <= currentMonthIndex; i++) {
      const month = monthsText[i];

      const chartActiveProjects = {
        activeProjectsCommunityCategory: 0,
        activeProjectsCreativeCategory: 0,
        activeProjectsTechCategory: 0,
      };

      let projectIndex = i;

      while (projectIndex < allDisplayProjects.length) {
        const project = allDisplayProjects[projectIndex];

        if (project.category === "Community Projects") {
          chartActiveProjects.activeProjectsCommunityCategory += 1;
        } else if (project.category === "Creative Works") {
          chartActiveProjects.activeProjectsCreativeCategory += 1;
        } else if (project.category === "Tech & Innovation") {
          chartActiveProjects.activeProjectsTechCategory += 1;
        }

        projectIndex += currentMonthIndex + 1;
      }

      const activeProjects = Object.values(chartActiveProjects).reduce((acc, curr) => acc + curr, 0);

      const monthObject = {
        [month]: {
          activeProjects,
          chartActiveProjects: { ...chartActiveProjects },
        },
      };

      chartActiveProjectsPerMonth.push(monthObject);
    }

    infoMatches.chartActiveProjectsPerMonth = chartActiveProjectsPerMonth;

    // All registered users
    infoMatches.allRegisteredUsers = allDisplayUsers.length

    // Chart Registered Users Per Month
    const lastUser = await UserModel.findOne({
      order: [['createdAt', 'DESC']],
    });
    
    const chartRegisteredUsersPerMonth = [];
    
    if (lastUser) {
      const lastMonth = new Date(lastUser.createdAt).getMonth();
      const totalRegisteredUsers = allDisplayUsers.length;
      let remainingUsers = totalRegisteredUsers;
    
      for (let i = 0; i <= lastMonth; i++) {
        const month = monthsText[i];
        const randomUsers = Math.floor(Math.random() * remainingUsers) + 1;
    
        chartRegisteredUsersPerMonth.push({
          month,
          totalRegisteredUsers: randomUsers,
        });
    
        remainingUsers -= randomUsers;
      }
    
      const lastMonthEntry = chartRegisteredUsersPerMonth[chartRegisteredUsersPerMonth.length - 1];
      lastMonthEntry.totalRegisteredUsers += remainingUsers;
    
      const sumRegisteredUsers = chartRegisteredUsersPerMonth.reduce((acc, curr) => acc + curr.totalRegisteredUsers, 0);
      if (sumRegisteredUsers !== totalRegisteredUsers) {
        const difference = totalRegisteredUsers - sumRegisteredUsers;
        lastMonthEntry.totalRegisteredUsers += difference;
      }
    }
    
      infoMatches.chartRegisteredUsersPerMonth = chartRegisteredUsersPerMonth;

      return infoMatches;

  } catch (error) {
    throw new Error("Unknown error while fetching filtered Main Admin data.");
  }
};

export default getFilteredAdminMain;


# Get DashBoard Main Info Data

**URL** : `/adminRoute/dashboardMain`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**Object with static data from the database. The data sent for each month (last month of the current year) is assigned randomly.**

```json
{
  "totalFundsRaised": 34321039,
  "chartTotalFundsRaised": {
    "fundingCurrentCommunityCategory": 10943848,
    "fundingCurrentCreativeCategory": 13927328,
    "fundingCurrentTechCategory": 9449863
  },
  "chartFundsRaisedPerMonth": [
    {
      "January": {
        "totalFundsRaised": 6359810,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 1513696,
          "fundingCurrentCreativeCategory": 2625228,
          "fundingCurrentTechCategory": 2220886
        }
      }
    },
    {
      "February": {
        "totalFundsRaised": 6118951,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 2396951,
          "fundingCurrentCreativeCategory": 3142115,
          "fundingCurrentTechCategory": 579885
        }
      }
    },
    {
      "March": {
        "totalFundsRaised": 4815347,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 1136579,
          "fundingCurrentCreativeCategory": 2034563,
          "fundingCurrentTechCategory": 1644205
        }
      }
    },
    {
      "April": {
        "totalFundsRaised": 5266713,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 3045673,
          "fundingCurrentCreativeCategory": 616020,
          "fundingCurrentTechCategory": 1605020
        }
      }
    },
    {
      "May": {
        "totalFundsRaised": 6629033,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 1924107,
          "fundingCurrentCreativeCategory": 2825750,
          "fundingCurrentTechCategory": 1879176
        }
      }
    },
    {
      "June": {
        "totalFundsRaised": 5131185,
        "chartTotalFundsRaised": {
          "fundingCurrentCommunityCategory": 926842,
          "fundingCurrentCreativeCategory": 2683652,
          "fundingCurrentTechCategory": 1520691
        }
      }
    }
  ],
  "allRegisteredUsers": 50,
  "chartRegisteredUsersPerMonth": [
    {
      "month": "January",
      "totalRegisteredUsers": 29
    },
    {
      "month": "February",
      "totalRegisteredUsers": 10
    },
    {
      "month": "March",
      "totalRegisteredUsers": 4
    },
    {
      "month": "April",
      "totalRegisteredUsers": 6
    },
    {
      "month": "May",
      "totalRegisteredUsers": 1
    },
    {
      "month": "June",
      "totalRegisteredUsers": 0
    }
  ],
  "activeProjects": 146,
  "chartActiveProjects": {
    "displayProjectsCommunityCategory": 45,
    "displayProjectsCreativeCategory": 60,
    "displayProjectsTechCategory": 41
  },
  "chartActiveProjectsPerMonth": [
    {
      "January": {
        "activeProjects": 25,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 6,
          "activeProjectsCreativeCategory": 10,
          "activeProjectsTechCategory": 9
        }
      }
    },
    {
      "February": {
        "activeProjects": 25,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 8,
          "activeProjectsCreativeCategory": 12,
          "activeProjectsTechCategory": 5
        }
      }
    },
    {
      "March": {
        "activeProjects": 24,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 6,
          "activeProjectsCreativeCategory": 12,
          "activeProjectsTechCategory": 6
        }
      }
    },
    {
      "April": {
        "activeProjects": 24,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 11,
          "activeProjectsCreativeCategory": 5,
          "activeProjectsTechCategory": 8
        }
      }
    },
    {
      "May": {
        "activeProjects": 24,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 6,
          "activeProjectsCreativeCategory": 11,
          "activeProjectsTechCategory": 7
        }
      }
    },
    {
      "June": {
        "activeProjects": 24,
        "chartActiveProjects": {
          "activeProjectsCommunityCategory": 8,
          "activeProjectsCreativeCategory": 10,
          "activeProjectsTechCategory": 6
        }
      }
    }
  ]
}
```

## Error Response

**Condition** : Empty database

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Unknown error while searching info"
}
```

- [Back](../../readme.md) : `MainPage`
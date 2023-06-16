import { Op } from "sequelize"
import { ProjectModel } from "../../config/db"

// sort
const sortByTrending = (a: ProjectModel, b: ProjectModel) => a.likes - b.likes
const orderByMostFunding = (a: ProjectModel, b: ProjectModel) =>
  a.fundingCurrent - b.fundingCurrent

// function to slice array existingProjects
function divideArray(array: Array<object>, size: number) {
  if (array.length <= size) {
    return [array]
  }

  const result = []
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size)
    result.push(chunk)
  }

  return result
}

// Controller
const getFilteredProjects = async (
  validatedCategory: string,
  validatedSort: string,
  validatedQ: string | undefined,
  validatedP: string,
  validatedS: string
): Promise<object> => {
  try {
    let whereClause = {} // Objet to record the filter orders

    // Category Filter
    if (validatedCategory !== "all") {
      whereClause = {
        ...whereClause,
        categories: {
          [Op.contains]: [validatedCategory]
        }
      }
    }

    // Query search
    if (validatedQ) {
      const words = validatedQ.split("_")
      const titleClauses = words.map((word) => ({
        title: {
          [Op.substring]: word
        }
      }))

      whereClause = {
        ...whereClause,
        [Op.and]: titleClauses
      }
    }

    let existingProjects = await ProjectModel.findAll({ where: whereClause })

    if (existingProjects.length === 0) {
      throw new Error("There are no projects that meet the search criteria")
    }

    // Trending sort & Most funded sort
    validatedSort === "trending"
      ? (existingProjects = existingProjects.sort(sortByTrending))
      : (existingProjects = existingProjects.sort(orderByMostFunding))

    // Slice existingProjects for deliver to Front by infiniteScroll
    const size = parseInt(validatedS)
    const dividedArrayProjects = divideArray(existingProjects, size)
    const validatedPIndex = parseInt(validatedP)

    if (validatedPIndex >= dividedArrayProjects.length) {
      throw new Error("There are no more projects to display")
    }

    if (validatedPIndex === dividedArrayProjects.length - 1) {
      return {
        projects: dividedArrayProjects[validatedPIndex],
        limit: "No more to display"
      }
    }

    return {
      projects: dividedArrayProjects[validatedPIndex]
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while retrieving filtered projects"
    return { errorMessage }
  }
}

export default getFilteredProjects

import { Op } from "sequelize"
import { ProjectModel } from "../../config/db"

// sort
const sortByTrending = (a: ProjectModel, b: ProjectModel) => b.likes - a.likes
const orderByMostFunding = (a: ProjectModel, b: ProjectModel) =>
  b.fundingCurrent - a.fundingCurrent

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
  validatedQ: string | null,
  validatedP: string,
  validatedS: string
  // validatedCountry: string | undefined,
): Promise<object> => {
  try {
    let whereClause = {} // Object to record the filter orders

    // Category Filter
    const decodedCategory = decodeURIComponent(validatedCategory)
    console.log("Esto es la category", decodedCategory)
    if (validatedCategory !== "all") {
      whereClause = {
        ...whereClause,
        category: decodedCategory
      }
    }

    //  //  Country Filter
    //   if (validatedCountry !== "all") {
    //     whereClause = {
    //       ...whereClause,
    //       location: validatedCountry,
    //     };
    //   }

    // Query search
    if (validatedQ) {
      const decodedQ = decodeURIComponent(validatedQ)
      const words = decodedQ.split(" ")
      const titleClauses = words.map((word) => ({
        title: {
          [Op.iLike]: `%${word}%`
        }
      }))

      whereClause = {
        ...whereClause,
        [Op.or]: titleClauses
      }
    }

    let existingProjects = await ProjectModel.findAll({ where: whereClause })

    if (existingProjects.length === 0) {
      throw new Error("There are no projects with this parameters")
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
      throw new Error("There are no more projects to display.")
    }

    // if (validatedPIndex === dividedArrayProjects.length - 1) {
    //   return {
    //     projects: dividedArrayProjects[validatedPIndex],
    //     limit: "There is nothing else to show."
    //   }
    // }

    return dividedArrayProjects[validatedPIndex]
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while fetching filtered projects."
    return { errorMessage }
  }
}

export default getFilteredProjects

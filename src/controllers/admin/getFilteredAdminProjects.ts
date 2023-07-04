import { Op } from "sequelize"
import { ProjectModel,  ImagesModel  } from "../../config/db"

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
const getFilteredAdminProjects = async (
  validatedCategory: string,
  validatedSort: string,
  validatedQ: string | null,
  validatedP: string,
  validatedS: string,
  validatedCountry: string
): Promise<object> => {
  try {
    let whereClause = {} // Object to record the filter orders

    // Category Filter
    const decodedCategory = decodeURIComponent(validatedCategory)
    if (validatedCategory !== "all") {
      whereClause = {
        ...whereClause,
        category: decodedCategory
      }
    }

    //  Country Filter
    if (validatedCountry !== "all") {
      whereClause = {
        ...whereClause,
        location: validatedCountry
      }
    }
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
    console.log(whereClause)

    let existingProjects = await ProjectModel.findAll({
      where: whereClause,
      include: [ImagesModel]
    })
    console.log(existingProjects)

    if (existingProjects.length === 0) {
      throw new Error("There are no projects with this parameters")
    }
    console.log(validatedSort)
    // Trending sort & Most funded sort
    validatedSort === "Trending"
      ? (existingProjects = existingProjects.sort(sortByTrending))
      : (existingProjects = existingProjects.sort(orderByMostFunding))

    //       const sortByTrending = (a: ProjectModel, b: ProjectModel) => b.likes - a.likes
    //   const orderByMostFunding = (a: ProjectModel, b: ProjectModel) =>
    //      b.fundingCurrent - a.fundingCurrent

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

export default getFilteredAdminProjects

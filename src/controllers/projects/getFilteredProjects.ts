import { Op } from "sequelize";
import { ProjectModel } from "../../config/db";

// sort
const sortByTrending = (a: ProjectModel, b:ProjectModel) => a.likes - b.likes;
const orderByMostFunding = (a: ProjectModel , b: ProjectModel) => a.fundingCurrent - b.fundingCurrent;

// function to slice array existingProjects
function divideArray(array: Array<object>, size: number) {
    if (array.length <= size) {
        return [array];
      }
    
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push(chunk);
      }
      
      return result;
    } 
      
        
// Controller   
const getFilteredProjects = async (
  validatedCategory: string,
  validatedSort: string,
  validatedQ: string | undefined,
  validatedP: string,
  validatedS: string,
): Promise<object> => {
  try {
    let whereClause = {}; // Objet to record the filter orders

    // Category Filter
    if (validatedCategory !== "all") {
        whereClause = {
          ...whereClause,
          categories: {
            [Op.contains]: [validatedCategory],
          },
        };
      }

    // Query search
    if (validatedQ) {
      whereClause = {
        ...whereClause,
        title: {
          [Op.like]: `%${validatedQ}%`,
        },
      };
    }


    let existingProjects = await ProjectModel.findAll({ where: whereClause });

    if (existingProjects.length === 0) {
      throw new Error("No hay proyectos que cumplan los criterios de búsqueda");
    }

    // Trending sort & Most funded sort
    validatedSort === "trending"
    ? existingProjects = existingProjects.sort(sortByTrending) 
    : existingProjects = existingProjects.sort(orderByMostFunding)

    // Slice existingProjects for deliver to Front by infiniteScroll
    const size = parseInt(validatedS);
    const dividedArrayProjects = divideArray(existingProjects, size);
    const validatedPIndex = parseInt(validatedP);

    if (validatedPIndex >= dividedArrayProjects.length) {
      throw new Error("No hay más projectos que mostrar");
    }

    if (validatedPIndex === dividedArrayProjects.length - 1) {
      return {
        projects: dividedArrayProjects[validatedPIndex],
        limit: "No hay más que mostrar",
      };
    }

  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al obtener proyectos filtrados";
    return { errorMessage };
  }
};

export default getFilteredProjects;

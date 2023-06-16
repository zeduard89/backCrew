import { ProjectModel } from "../../config/db";

// sort
const sortByTrending = (a: ProjectModel, b: ProjectModel) => b.likes - a.likes;
              
// Controller   
const getTwentyMostTrending = async (
): Promise<object> => {
  try {
    
    let existingProjects = await ProjectModel.findAll();

    if (existingProjects.length === 0) {
      throw new Error("No hay proyectos que cumplan los criterios de búsqueda");
    }

    //  Most trending sort
    existingProjects = existingProjects.sort(sortByTrending)

    // Slice existingProjects for deliver to Front by most treding
    
    const TwentyMostTrending = existingProjects.slice(0,20)
    return TwentyMostTrending

  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al obtener proyectos mas fondeados";
    return { errorMessage };
  }
};

export default getTwentyMostTrending
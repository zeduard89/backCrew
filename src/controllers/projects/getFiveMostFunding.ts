import { ProjectModel } from "../../config/db";

// sort
const orderByMostFunding = (a: ProjectModel , b: ProjectModel) => b.fundingCurrent - a.fundingCurrent;
              
// Controller   
const getFiveMostFunding = async (
): Promise<object> => {
  try {
    
    let existingProjects = await ProjectModel.findAll();

    if (existingProjects.length === 0) {
      throw new Error("There are no projects with this parameters");
    }

    //  Most funded sort
    existingProjects = existingProjects.sort(orderByMostFunding)

    // Slice existingProjects for deliver to Front by most funded
    
    const fiveMostFunding = existingProjects.slice(0,5)
    return fiveMostFunding

  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while fetching most funded projects.";
    return { errorMessage };
  }
};

export default getFiveMostFunding 

import { ProjectModel } from "../../config/db"


const deleteProyectByNameController = async (
  validatedID: string,
  // validatedDisplayProject: string,
): Promise<string> => {
  try {
    // const validatedDisplayProjectToBoolean = !!JSON.parse(validatedDisplayProject);
    const projectDB = await ProjectModel.findOne({ where: { 
      id: validatedID,
      // displayProject: !validatedDisplayProjectToBoolean
    } });
    if (!projectDB) throw new Error("Project not found")
    //* Si la condicion es FALSE la retorno a TRUE
    projectDB.displayProject = !projectDB.displayProject;
    await projectDB.save();

    if (projectDB.displayProject === false) {
      return "Project Was Deleted Successfully"
    } else {
      return "Project Was Restored Successfully" 
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error in deleting Project"
    return errorMessage
  }
}

export default deleteProyectByNameController

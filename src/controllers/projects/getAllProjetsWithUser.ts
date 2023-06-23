// import { UserModel } from "../../config/db"

// const getAllProjetsWithUser = async (): Promise<object> => {
//   try {
//     const allUsers = await UserModel.findAll()
//     if (!allUsers) {
//       throw new Error("User not found")
//     }

//     const promises = allUsers.map((user) => user.$get("favoriteProjects"))
//     const favoriteProjects = await Promise.all(promises)

//     return favoriteProjects
//   } catch (error) {
//     return { message: `${error}` }
//   }
// }

// export default getAllProjetsWithUser

import { UserModel } from "../../config/db"

const getAllProjetsWithUser = async (): Promise<object> => {
  try {
    const allUsers = await UserModel.findAll({
      include: "favoriteProjects" // Incluir la relación "favoriteProjects"
    })
    if (!allUsers) {
      throw new Error("User not found")
    }

    const projectsMap = new Map<string, any>() // Usar un Map para almacenar los proyectos sin repetir

    allUsers.forEach((user) => {
      user.favoriteProjects.forEach((favoriteProject: any) => {
        const projectId = favoriteProject.id
        if (!projectsMap.has(projectId)) {
          // Si el proyecto no existe en el Map, agregarlo con un array vacío de userIds
          projectsMap.set(projectId, {
            ...favoriteProject.toJSON(),
            UserFavorite: {
              userIds: []
            }
          })
        }

        const project = projectsMap.get(projectId)
        // Agregar el userId al array de userIds del proyecto
        project.UserFavorite.userIds.push(user.id)
      })
    })

    // Convertir los valores del Map en un arreglo
    const favoriteProjects = Array.from(projectsMap.values())

    return favoriteProjects
  } catch (error) {
    return { message: `${error}` }
  }
}

export default getAllProjetsWithUser

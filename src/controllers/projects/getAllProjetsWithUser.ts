import { UserModel, ProjectModel, ImagesModel } from "../../config/db"

const getAllProjetsWithUser = async (): Promise<object> => {
  try {
    const allUsers = await UserModel.findAll({
      include: [
        {
          model: ProjectModel,
          as: "favoriteProjects", // Nombre de la relación en el modelo de usuario
          where: { displayProject: true },
          include: [
            {
              model: ImagesModel, // Incluir el modelo de imágenes relacionadas al proyecto
              attributes: ["url"] // Seleccionar solo la propiedad 'url'
            }
          ]
        }
      ]
    })
    console.log(allUsers)

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
            userFavorites: [] // Cambiar el nombre a 'userFavorites' para reflejar que es un array de usuarios favoritos
          })
        }

        const project = projectsMap.get(projectId)
        // Agregar el usuario favorito al array de 'userFavorites' del proyecto
        project.userFavorites.push(user.toJSON())
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

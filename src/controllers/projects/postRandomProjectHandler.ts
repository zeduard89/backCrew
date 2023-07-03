import { ProjectModel, UserModel } from "../../config/db"
import { faker } from "@faker-js/faker"

const categorias = ["Tech & Innovation", "Creative Works", "Community Projects"]
const location = ["Argentina", "Mexico", "Colombia", "Peru", "Venezuela"]

// CREO USUARIOS
let count = 0
const createRandomUsers = () => {
  count++
  const newName = faker.person.firstName() + count
  const newLastname = faker.person.lastName()

  const user = {
    id: "ac8ec82d-fc39-450b-bcab-bc2cc4b539b" + count.toString(), // generateRandomUUID().toString() + count.toString(),
    name: newName,
    lastName: newLastname,
    email: faker.internet.email({
      firstName: newName,
      lastName: newLastname
    }),
    avatar: faker.image.avatar(),
    date: faker.git.commitDate(),
    country: faker.location.country(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    shortDescription: "Lorem ipsum dolor sit amet consect.",
    aboutMe:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus cras rhoncus consequat tempor, id condimentum lacus taciti porttitor ac scelerisque sem."
  }

  return user
}

const createRandomProject = (id: string) => {
  count++
  const categoriaActual =
    categorias[Math.floor(Math.random() * categorias.length)]
  const locationActual = location[Math.floor(Math.random() * location.length)]
  const mathR1 = +faker.commerce.price({ min: 0, max: 500000, dec: 0 })
  const mathR2 = +faker.commerce.price({ min: 0, max: 500000, dec: 0 })

  const proyecto = {
    title: faker.commerce.product() + count,
    description: faker.commerce.productDescription(),
    shortDescription: faker.lorem.sentence({ min: 5, max: 15 }),
    fundingCurrent: mathR1,
    fundingGoal: mathR2,
    fundingGoalReached: false,
    fundingPercentage: Math.floor((mathR1 / mathR2) * 100),
    fundingDayLeft: faker.helpers.rangeToNumber({ min: 30, max: 360 }),
    likes: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    disLikes: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    category: categoriaActual,
    // bank: faker.finance.creditCardIssuer(),
    // account: faker.finance.accountNumber,
    location: locationActual,
    // projectFase: Math.floor(Math.random() * 4),
    displayProject: true,
    creatorId: id
  }
  return proyecto
}

const createRandomProjectController = async (usuarios: number) => {
  try {
    const numUsuarios = usuarios
    for (let i = 0; i < numUsuarios; i++) {
      const user = createRandomUsers()

      await UserModel.create(user)

      // Crear entre 1 y 5 proyectos para el usuario
      const numProyectosUsuario = Math.floor(Math.random() * 5) + 1
      for (let j = 0; j < numProyectosUsuario; j++) {
        const id = user.id
        const proyecto = createRandomProject(id)
        await ProjectModel.create(proyecto)
      }
    }
    return "Creacion con exito"
  } catch (error) {
    return error
  }
}

export default createRandomProjectController

/* 



faker.image.avatar(): string
faker.image.avatar()
 'https://avatars.githubusercontent.com/u/97165289'

faker.image.avatarGitHub(): string
faker.image.avatarGitHub()
 'https://avatars.githubusercontent.com/u/97165289'


Returns: string

ts
faker.image.url(options: {
  height: number,
  width: number
} = {}): string
faker.image.url() // 'https://loremflickr.com/640/480?lock=1234'


faker.company.catchPhrase(): string
faker.company.catchPhrase() // 'Upgradable systematic flexibility'

const hello = faker.helpers.fake(
    "Hi, my name is {{person.firstName}} {{person.lastName}}!"
)
const message = faker.helpers.fake(
  "You can call me at {{phone.number(+!# !## #### #####!)}}."
)

*/

import { ProjectModel, UserModel } from "../../config/db"
import { faker } from "@faker-js/faker"

const createRandomProjectController = (projectos: number, usuarios: number) => {
  // Creo Projectos

  const categorias = [
    "Tech & Innovation",
    "Creative Works",
    "Community Projects"
  ]

  let count = 0

  const createRandomProject = () => {
    count++
    const categoriaActual =
      categorias[Math.floor(Math.random() * categorias.length)]
    const mathR1 = +faker.commerce.price({ min: 0, max: 500000, dec: 0 })
    const mathR2 = +faker.commerce.price({ min: 0, max: 500000, dec: 0 })

    const proyecto = {
      title: faker.commerce.product() + count,
      description: faker.commerce.productDescription(),
      shortDescription: faker.lorem.sentence({ min: 5, max: 15 }),
      fundingCurrent: mathR1,
      fundingGoal: mathR2,
      fundingGoalReached: false,
      fundingPercentage: (mathR1 / mathR2) * 100,
      fundingDayLeft: faker.helpers.rangeToNumber({ min: 30, max: 360 }),
      likes: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
      disLikes: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
      category: categoriaActual,
      // bank: faker.finance.creditCardIssuer(),
      // account: faker.finance.accountNumber,
      // location: "argentina",
      // projectFase: Math.floor(Math.random() * 4),
      displayProject: true,
      creatorId: faker.string.uuid()
    }

    return proyecto
  }
  const numProyectos = projectos
  for (let i = 0; i < numProyectos; i++) {
    const proyecto = createRandomProject()

    ProjectModel.create(proyecto)
  }

  // CREO USUARIOS
  count = 0
  const createRandomUsers = () => {
    count++
    const newName = faker.person.firstName() + count
    const newLastname = faker.person.lastName()

    const user = {
      id: faker.string.uuid().toString(),
      name: newName,
      lastName: newLastname,
      email: faker.internet.email({
        firstName: newName,
        lastName: newLastname
      }),
      avatar: faker.image.avatar(),
      date: faker.git.commitDate()
    }

    return user
  }

  const numUsuarios = usuarios
  for (let i = 0; i < numUsuarios; i++) {
    const user = createRandomUsers()

    UserModel.create(user)
  }
  return "Creacion con exito"
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

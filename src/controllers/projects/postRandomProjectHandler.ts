import { ProjectModel } from "../../config/db"

const createRandomProjectController = (auxNum: number) => {
  const categorias = [
    "Tech & Innovation",
    "Creative Works",
    "Community Projects"
  ]
  // const bancos = ["Galicia", "Frances", "Nacion", "Vacio", "Colchon"]
  // const cuentas = ["Cuenta 1", "Cuenta 2", "Cuenta 3", "Cuenta 4", "Cuenta 5"]
  let count = 0

  const createRandom = () => {
    count++
    const categoriaActual =
      categorias[Math.floor(Math.random() * categorias.length)]
    const mathR1 = Math.floor(Math.random() * 10000)
    const mathR2 = Math.floor(Math.random() * 10000)
    // const randomBanco = bancos[Math.floor(Math.random() * bancos.length)]
    // const randomCuenta = cuentas[Math.floor(Math.random() * cuentas.length)]

    const proyecto = {
      title: `Project ${count}`,
      description: `Dive into a vibrant and surprising universe, where imagination runs wild and dreams come true. Discover new horizons, challenge your limits, and find passion in every adventure. Become the protagonist of your story and live each moment with intensity. Welcome to a world where possibilities are endless and magic is within your reach.

Please note that this is just a fictional description and you can adjust or customize it according to your specific needs or context. ${Math.floor(
        Math.random() * 100
      )}`,
      shortDescription: `Discover the thrill at every step. 
Please note that this is a fictional description and may not have a specific meaning. You can adjust or customize it according to your needs or context. ${Math.floor(
        Math.random() * 100
      )}`,
      fundingCurrent: mathR1,
      fundingGoal: mathR2,
      fundingGoalReached: false,
      fundingPercentage: (mathR1 / mathR2) * 100,
      fundingDayLeft: Math.floor(Math.random() * 30),
      likes: Math.floor(Math.random() * 10000),
      disLikes: Math.floor(Math.random() * 10000),
      category: categoriaActual,
      // bank: randomBanco,
      // account: randomCuenta,
      // location: "argentina",
      // projectFase: Math.floor(Math.random() * 4),
      displayProject: true
    }
    console.log("esto es el proyecto",proyecto)
    return proyecto
  }
  const numProyectos = auxNum
  for (let i = 0; i < numProyectos; i++) {
    const proyecto = createRandom()

    ProjectModel.create(proyecto)
  }
}

export default createRandomProjectController

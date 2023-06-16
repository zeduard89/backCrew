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
      title: `Proyecto ${count}`,
      description: `"Sumérgete en un universo vibrante y lleno de sorpresas, donde la imaginación se desata y los sueños se hacen realidad. Descubre nuevos horizontes, desafía tus límites y encuentra la pasión en cada aventura. Conviértete en protagonista de tu historia y vive cada momento con intensidad. Bienvenido a un mundo donde las posibilidades son infinitas y la magia está a tu alcance."

      Recuerda que esta es solo una descripción ficticia y puedes ajustarla o personalizarla según tus necesidades o contexto específico. ${Math.floor(
        Math.random() * 100
      )}`,
      shortDescription: `"Descubre la emoción en cada paso."
      Ten en cuenta que esta es una descripción ficticia y puede no tener un
      significado específico. Puedes ajustarla o personalizarla según tus necesidades
      o contexto. ${Math.floor(Math.random() * 100)}`,
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

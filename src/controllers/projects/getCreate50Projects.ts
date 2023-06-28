// import { ProjectModel } from "../../config/db"

// const projectNames = [
//   "Energia renovable",
//   "Pilas reutilizables",
//   "Automatizacion del hogar",
//   "Reciclaje inteligente",
//   "Transporte sostenible",
//   "Realidad virtual inmersiva",
//   "Robotica educativa",
//   "Ciudades inteligentes",
//   "Agricultura vertical",
//   "Impresion 3D accesible",
//   "Inteligencia artificial aplicada a la medicina",
//   "Realidad aumentada para turismo",
//   "Drones de entrega",
//   "Educacion en linea interactiva",
//   "Aplicaciones de fitness personalizadas",
//   "Desalinizacion del agua",
//   "Blockchain para transacciones seguras",
//   "Gestion de residuos inteligente",
//   "Alimentacion sostenible",
//   "Tecnologia wearable para salud",
//   "Asistentes virtuales para el hogar",
//   "Internet de las cosas en el transporte",
//   "Economia colaborativa",
//   "Gestion energetica inteligente",
//   "Plataformas de crowdfunding",
//   "Realidad virtual para terapia",
//   "Sensores de calidad del aire",
//   "Baterias de larga duracion",
//   "Monitorizacion de la salud remota",
//   "Sistemas de navegacion autonoma",
//   "Inteligencia artificial en el arte",
//   "Realidad aumentada para educacion",
//   "Plataformas de aprendizaje en linea",
//   "Tecnologia de reconocimiento facial",
//   "Control de dispositivos por voz",
//   "Redes electricas inteligentes",
//   "Soluciones de almacenamiento de energia",
//   "Aplicaciones de musica personalizadas",
//   "Tecnologia para la tercera edad",
//   "Control de robots a distancia",
//   "Diseno sostenible",
//   "Comunicacion por satelite",
//   "Software de seguridad cibernetica",
//   "Monitorizacion del sueno",
//   "Plataformas de trabajo remoto",
//   "Simulacion de realidad virtual",
//   "Tecnologia para el cuidado de mascotas",
//   "Sistemas de purificacion de agua",
//   "Dispositivos de realidad mixta",
//   "Impresion 3D de organos humanos"
// ]

// // const projectImages = [
// //   "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_a_Project.jpg",
// //   "https://crehana-blog.imgix.net/media/filer_public/0e/8d/0e8daf29-5923-4a22-96bd-495cc49abca0/dibujo-tecnico-para-arquitectura.jpg?auto=format&q=50",
// //   "https://media.licdn.com/dms/image/C5612AQFMQ2qWHw_L2A/article-cover_image-shrink_720_1280/0/1619541231522?e=2147483647&v=beta&t=XLCNAEFfkT5r0q4TiRKhxMjuxMFMMhnXq4yrhIm2Yzo",
// //   "https://res.cloudinary.com/dyw8mv3b0/image/upload/c_fill,g_face,q_85,w_710,h_355,f_auto/v1/news/2023_01/AdobeStock_200024314_s22cmn.jpg",
// //   "https://energia.roams.es/images/post/es_ES_energy/energia-renovable-energia-solar-innovaciones-energia-solar.jpg",
// //   "https://cdn-3.expansion.mx/dims4/default/d4c2bb4/2147483647/strip/true/crop/9000x4725+0+169/resize/1200x630!/format/jpg/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F41%2F35%2F7916850a4694a00a9475c0b2c5b2%2Fistock-1223521808.jpg"
// // ];

// const categoriesExample = [
//   "Tech & Innovation",
//   "Creative Works",
//   "Creative Works"
// ]

// const getCreate50Projects = async (): Promise<object> => {
//   try {
//     const generatedProjects = []
//     for (let i = 0; i < 50; i++) {
//       const createdProject = await ProjectModel.create({
//         title: projectNames[i],
//         description:
//           "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus cras rhoncus consequat tempor, id condimentum lacus taciti porttitor ac scelerisque sem.",
//         shortDescription:
//           "Est augue gravida morbi purus facilisis fermentum feugiat penatibus molestie, tortor vulputate in metus blandit convallis parturient cum consequat.",
//         fundingCurrent: Math.floor(Math.random() * 1000000000),
//         fundingGoal: Math.floor(Math.random() * 1000000000),
//         fundingGoalReached: false,
//         fundingPercentage: Math.floor(Math.random() * 100),
//         fundingDayLeft: Math.floor(Math.random() * 30),
//         likes: Math.floor(Math.random() * 1500),
//         disLikes: Math.floor(Math.random() * 1500),
//         category:
//           categoriesExample[
//             Math.floor(Math.random() * categoriesExample.length)
//           ],
//         displayProject: true,
//         // bank: "MercadoLibre",
//         // account: "mercadopago@mercadopago.com",
//         // location: "argentina",
//         // projectFase: Math.floor(Math.random() * 4)
//         creatorId: "Admin"
//       })

//       generatedProjects.push(createdProject)
//     }

//     return generatedProjects
//   } catch (error) {
//     const errorMessage =
//       (error as Error).message || "Unknown error while saving Azure Image"
//     return { errorMessage }
//   }
// }

// export default getCreate50Projects

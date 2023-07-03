// import request from "supertest"
import {
  sequelize,
  UserModel,
  ProjectModel,
  //   CommentModel,
  //   AdminModel,
  //   UserFavoritesModel,
  PaymentsModel
} from "../config/db"

describe("Database configuration", () => {
  beforeAll(() => {
    // Conectar a la base de datos antes de ejecutar las pruebas
    return sequelize.authenticate()
  })

  afterAll(() => {
    // Cerrar la conexión con la base de datos después de ejecutar las pruebas
    return sequelize.close()
  })
  test("should connect to the database", () => {
    // Verificar que la conexión a la base de datos se haya establecido correctamente
    return expect(sequelize.authenticate()).resolves.not.toThrow()
  })
})

//! Expect PERSONALIDADO
//! association.accessors se refiere a los métodos de acceso generados automáticamente para una asociación en Sequelize
//! association.foreignKey se refiere a la clave externa (foreign key) que se utiliza para establecer la relación entre los modelos
// Función personalizada de aserción para verificar las asociaciones sin generar un error de referencia circular
const expectAssociation = (association: any) => {
  // Verificar si la asociación está definida correctamente
  const isDefined = typeof association !== "undefined" && association !== null

  // Verificar si la asociación tiene los métodos esperados
  const hasMethods =
    typeof association.accessors !== "undefined" &&
    typeof association.foreignKey !== "undefined"

  // Retornar verdadero si se cumplen ambas condiciones
  return isDefined && hasMethods
}

describe("Model Relationships", () => {
  test("should define the correct associations", () => {
    // Ejemplo: Verificar que el modelo UserModel tiene una asociación hasMany con el modelo ProjectModel
    expect(expectAssociation(UserModel.hasMany(ProjectModel))).toBe(true)
    expect(expectAssociation(ProjectModel.belongsTo(UserModel))).toBe(true)
    expect(expectAssociation(UserModel.hasMany(PaymentsModel))).toBe(true)
    expect(expectAssociation(PaymentsModel.belongsTo(PaymentsModel))).toBe(true)
    expect(expectAssociation(PaymentsModel.hasMany(ProjectModel))).toBe(true)
    expect(expectAssociation(ProjectModel.belongsTo(PaymentsModel))).toBe(true)
  })
})

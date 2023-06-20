"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const faker_1 = require("@faker-js/faker");
const categorias = ["Tech & Innovation", "Creative Works", "Community Projects"];
// CREO USUARIOS
let count = 0;
const createRandomUsers = () => {
    count++;
    const newName = faker_1.faker.person.firstName() + count;
    const newLastname = faker_1.faker.person.lastName();
    const user = {
        id: "ac8ec82d-fc39-450b-bcab-bc2cc4b539b" + count.toString(),
        name: newName,
        lastName: newLastname,
        email: faker_1.faker.internet.email({
            firstName: newName,
            lastName: newLastname
        }),
        avatar: faker_1.faker.image.avatar(),
        date: faker_1.faker.git.commitDate()
    };
    return user;
};
const createRandomProject = (id) => {
    count++;
    const categoriaActual = categorias[Math.floor(Math.random() * categorias.length)];
    const mathR1 = +faker_1.faker.commerce.price({ min: 0, max: 500000, dec: 0 });
    const mathR2 = +faker_1.faker.commerce.price({ min: 0, max: 500000, dec: 0 });
    const proyecto = {
        title: faker_1.faker.commerce.product() + count,
        description: faker_1.faker.commerce.productDescription(),
        shortDescription: faker_1.faker.lorem.sentence({ min: 5, max: 15 }),
        fundingCurrent: mathR1,
        fundingGoal: mathR2,
        fundingGoalReached: false,
        fundingPercentage: Math.floor((mathR1 / mathR2) * 100),
        fundingDayLeft: faker_1.faker.helpers.rangeToNumber({ min: 30, max: 360 }),
        likes: faker_1.faker.helpers.rangeToNumber({ min: 1, max: 10 }),
        disLikes: faker_1.faker.helpers.rangeToNumber({ min: 1, max: 10 }),
        category: categoriaActual,
        // bank: faker.finance.creditCardIssuer(),
        // account: faker.finance.accountNumber,
        // location: "argentina",
        // projectFase: Math.floor(Math.random() * 4),
        displayProject: true,
        creatorId: id
    };
    return proyecto;
};
const createRandomProjectController = (usuarios) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numUsuarios = usuarios;
        for (let i = 0; i < numUsuarios; i++) {
            const user = createRandomUsers();
            yield db_1.UserModel.create(user);
            // Crear entre 1 y 5 proyectos para el usuario
            const numProyectosUsuario = Math.floor(Math.random() * 5) + 1;
            for (let j = 0; j < numProyectosUsuario; j++) {
                const id = user.id;
                const proyecto = createRandomProject(id);
                yield db_1.ProjectModel.create(proyecto);
            }
        }
        return "Creacion con exito";
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.default = createRandomProjectController;
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
//# sourceMappingURL=postRandomProjectHandler.js.map
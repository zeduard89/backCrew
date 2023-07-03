import { Op } from "sequelize";
import { UserModel, PaymentsModel } from "../../config/db";

const getFilteredSortUsers = async (
  validatedName: string | null,
  validatedAdmin: string | null,
  validatedFunding: string | null,
): Promise<object[]> => {
  try {
    let whereClause = {};

    if (validatedAdmin === "admin") {
      whereClause = {
        admin: true
      };
    }

    if (validatedAdmin === "user") {
      whereClause = {
        admin: false
      };
    }

    if (validatedName) {
      const decodedName = decodeURIComponent(validatedName);
      const words = decodedName.split(" ");
      const NameClauses = words.map((word) => ({
        [Op.or]: [
          { name: { [Op.iLike]: `%${word}%` } },
          { lastName: { [Op.iLike]: `%${word}%` } }
        ]
      }));

      whereClause = {
        ...whereClause,
        [Op.or]: NameClauses,
      };
    }

    const users = await UserModel.findAll({
      where: whereClause
    });
    
    if (users.length === 0) {
      throw new Error("There are no users with this parameters in the database");
    }
    
    const payments = await PaymentsModel.findAll();
    
    if (payments.length === 0) {
      throw new Error("There are no payments in the database");
    }
    const userPaymentsMap = new Map();

    payments.forEach(payment => {
      const { userId, transactionAmount } = payment;
      if (userPaymentsMap.has(userId)) {
        userPaymentsMap.set(userId, userPaymentsMap.get(userId) + transactionAmount);
      } else {
        userPaymentsMap.set(userId, transactionAmount);
      }
    });

    const result = users.map(user => {
      const { id, name, lastName, email } = user;
      const totalPayments = userPaymentsMap.get(id) || 0;
      return { id, name, lastName, email, totalPayments };
    });

    if (validatedFunding !== null) {
      result.sort((a, b) => b.totalPayments - a.totalPayments);
    }

    if (payments.length === 0) {
      const usersWithZeroPayments = users.map(user => ({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        totalPayments: 0
      }));
      return usersWithZeroPayments;
    }

    return result;
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while fetching filtered users";
    throw new Error(errorMessage);
  }
};

export default getFilteredSortUsers;

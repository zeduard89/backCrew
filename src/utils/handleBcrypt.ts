import bcryptjs from 'bcryptjs'

export const encrypt = async (textPlain: string): Promise<typeof hash> => {
    const hash: string = await bcryptjs.hash(textPlain, 10)
    return hash
}

export const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}
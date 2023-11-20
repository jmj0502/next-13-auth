import * as bcrypt from 'bcryptjs';

export class PasswordHandler {
    public async hashPassword(plainPassword: string): Promise<string> {
        const hashSalt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(plainPassword, hashSalt);
        return hashedPassword
    }

    public async comparePasswords(
        plainPassword: string, 
        hashedPassword: string
    ): Promise<boolean> {
        const isValidPassword = await bcrypt.compare(plainPassword, hashedPassword);
        return isValidPassword;
    }
}
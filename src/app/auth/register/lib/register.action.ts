'use server';
import { PasswordHandler } from '@/lib/password.handler';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z, ZodError } from 'zod';
import { revalidatePath } from 'next/cache';

const userSchema = z.object({
    name: z.string().min(5, { message: 'Name must be at least 5 chars long!' }),
    email: z.string().email({ 
            message: 'Invalid email address' 
        }).
        min(10, { 
            message: 'email must be at least 10 chars long!' 
        }),
    password: z.string().min(4, { message: 'Password should be at least 4 chars long!' }),
})

export async function create(formData: FormData) {
    'use server';
    let validationResult;
    try {
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }
        validationResult = userSchema.parse(userData)
    } catch (err) {
        console.log(err)
        if (err instanceof ZodError) {
            console.log(err.flatten());
            return err.flatten();
        }
    }
    const passwordHandler = new PasswordHandler();
    const user = await prisma.user.create({
        data: { 
            ...validationResult, 
            password: await passwordHandler.hashPassword(validationResult.password) 
        },
        
    })
    console.log(JSON.stringify({ createdUser: user }));
    revalidatePath("/")
    redirect("/")
}
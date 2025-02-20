import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import { useAuthStore } from '@/store/authStore';

// ShadCN
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {LogIn} from "lucide-react";

export default function SignUser (){
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const LoginSchema = z.object({
        email: z.string().email("El formato del correo es inválido"),
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    });

    const formLogin = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
        login(values);
        navigate('/dashboard');
    };
    return (
        <>
            <Card className={"w-96 h-66"}>
                <CardHeader>
                    <CardTitle>Login your account</CardTitle>
                    <CardDescription>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...formLogin}>
                        <form onSubmit={formLogin.handleSubmit(handleLogin)}>
                            <FormField control={formLogin.control} name={"email"} render={({field}) => (
                                <FormItem>
                                    <Label>Email</Label>
                                    <FormControl>
                                        <Input type={"email"} {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <FormField control={formLogin.control} name={"password"} render={({field}) => (
                                <FormItem>
                                    <Label>Password</Label>
                                    <FormControl>
                                        <Input type={"password"} {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div className={"flex justify-center mt-3"}>
                                <Button variant={"default"} className={"dark:text-white"}>
                                    <LogIn color={"#fff"}/>Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}
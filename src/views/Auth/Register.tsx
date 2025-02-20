import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";

//shadcn
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarDays, LogIn} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {apiexpress} from "@/client/api.ts";

export default function Register() {
    const navigate = useNavigate();

    const registerSchema = z.object({
        name: z.string().min(6, "El nombre debe tener al menos 6 caracteres"),
        email: z.string().email("El formato del correo es inválido"),
        phone: z.string().min(10, "El número de teléfono debe tener al menos 10 caracteres"),
        gender: z.string().min(4, "El género debe tener al menos 4 caracteres"),
        role: z.string().min(4, "El rol debe tener al menos 4 caracteres"),
        birthdate: z.date().refine((date) => !isNaN(date.getTime()), {
            message: "La fecha de nacimiento no es válida",
        }),
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    });

    const formRegister = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            gender: "",
            role: "",
            birthdate: new Date(),
            password: "",
        }
    });

    const handleRegister = async (values: z.infer<typeof registerSchema>) => {
        const success = await apiexpress.post('users/register', values);
        if (success) navigate('/dashboard');
        else alert('Invalid credentials');
    };

    return (
        <>
            <div className="grid justify-center">
                <Link to={"/"} className={"flex justify-center p-5"}>Home</Link>
                <Card className={"w-96 h-66"}>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...formRegister}>
                            <form onSubmit={formRegister.handleSubmit(handleRegister)}>
                                <div className={"grid grid-cols-2 grid-rows-4 gap-2"}>
                                    <FormField control={formRegister.control} name={"name"} render={({field}) => (
                                        <FormItem>
                                            <Label>Name</Label>
                                            <FormControl>
                                                <Input type={"name"} {...field}/>
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                    <FormField control={formRegister.control} name={"email"} render={({field}) => (
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
                                    <FormField control={formRegister.control} name={"phone"} render={({field}) => (
                                        <FormItem>
                                            <Label>Phone</Label>
                                            <FormControl>
                                                <Input type={"phone"} {...field}/>
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                    <FormField control={formRegister.control} name={"gender"} render={({field}) => (
                                        <FormItem>
                                            <Label>Gender</Label>
                                            <FormControl>
                                                <Input type={"gender"} {...field}/>
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                    <FormField control={formRegister.control} name={"role"} render={({field}) => (
                                        <FormItem>
                                            <Label>Role</Label>
                                            <FormControl>
                                                <Input type={"role"} {...field}/>
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                    <FormField control={formRegister.control} name={"birthdate"} render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Birthdate</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl className={"w-full"}>
                                                        <Button variant={"outline"}>
                                                            {format(field.value, "yyyy-MM-dd")}
                                                            <CalendarDays/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" className="rounded-md border" selected={field.value} onSelect={field.onChange} {...field} />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                    <FormField control={formRegister.control} name={"password"} render={({field}) => (
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
                                </div>
                                <div className={"flex justify-center mt-3"}>
                                    <Button variant={"default"} className={"dark:text-white"}>
                                        <LogIn color={"#fff"}/>Register
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
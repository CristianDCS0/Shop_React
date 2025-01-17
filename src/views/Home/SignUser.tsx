import {useAppDispatch} from "@/store/app/hooks";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {format} from "date-fns";
import {createUser, loginUser} from "@/store/features/users/thunkUser.ts";
import {useNavigate} from "react-router-dom";

// Shadcn
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CalendarDays, LogIn, Save} from "lucide-react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

export default function SignUser (){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const UserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        birthdate: z.date().refine((date) => !isNaN(date.getTime()), {
            message: "La fecha de nacimiento no es válida",
        }),
        gender: z.string(),
        phone: z.string(),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    const LoginSchema = z.object({
        email: z.string().email("El formato del correo es inválido"),
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    });

    const formUser = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: "",
            email: "",
            birthdate: new Date(),
            gender: "",
            phone: "",
            password: "",
            confirmPassword: "",
        }
    });

    const formLogin = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit(values: z.infer<typeof UserSchema>){
        try{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {confirmPassword, ...sinPassword} = values;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(createUser(sinPassword));
            navigate('/dashboard');
        }catch (e){
            console.error("Error al crear la cuenta:", e);
        }

    }

    function onSubmitLogin(values: z.infer<typeof LoginSchema>){
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(loginUser(values));
            navigate('/dashboard');
        }catch (err) {
            console.error("Error al iniciar sesión:", err);
        }
    }

    return (
        <Tabs defaultValue="singin">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="singin">Sing in</TabsTrigger>
                <TabsTrigger value="singup">Sing up</TabsTrigger>
            </TabsList>
            <TabsContent value="singin">
                <Card className={"w-96 h-66"}>
                    <CardHeader>
                        <CardTitle>Login your account</CardTitle>
                        <CardDescription>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...formLogin}>
                            <form onSubmit={formLogin.handleSubmit(onSubmitLogin)}>
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
            </TabsContent>
            <TabsContent value="singup">
                <Card>
                    <CardHeader>
                        {/*<CardTitle></CardTitle>
                        <CardDescription>
                        </CardDescription>*/}
                    </CardHeader>
                    <CardContent>
                        <div className={"w-full h-full"}>
                            <Form {...formUser}>
                                <form onSubmit={formUser.handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-2 grid-rows-2">
                                        <div className="row-span-2 content-end mr-2">
                                            <FormField control={formUser.control} name={"name"} render={({field}) => (
                                                <FormItem>
                                                    <Label>Full name</Label>
                                                    <FormControl>
                                                        <Input type={"text"} {...field} placeholder={"username"}/>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>

                                            <FormField control={formUser.control} name={"birthdate"} render={({field}) => (
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

                                            <FormField control={formUser.control} name={"phone"} render={({field}) => (
                                                <FormItem>
                                                    <Label>Phone number</Label>
                                                    <FormControl>
                                                        <Input type={"tel"} {...field} placeholder={"phone"}/>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>

                                            <FormField control={formUser.control} name={"password"} render={({field}) => (
                                                           <FormItem>
                                                               <Label>Password</Label>
                                                               <FormControl>
                                                                   <Input type={"password"} {...field}
                                                                          placeholder={"password"}/>
                                                               </FormControl>
                                                               <FormDescription>
                                                               </FormDescription>
                                                               <FormMessage/>
                                                           </FormItem>
                                                       )}/>
                                        </div>

                                        <div className={"content-end"}>
                                            <FormField control={formUser.control} name={"email"} render={({field}) => (
                                                <FormItem>
                                                    <Label>Email</Label>
                                                    <FormControl>
                                                        <Input type={"email"} {...field} placeholder={"@email.com"}/>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>

                                            <FormField control={formUser.control} name={"gender"} render={({field}) => (
                                                <FormItem>
                                                    <Label>Gender</Label>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="select gender"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="male">male</SelectItem>
                                                                <SelectItem value="female">female</SelectItem>
                                                                <SelectItem value="other">other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>

                                        <div className={"content-end"}>
                                            <FormField control={formUser.control} name={"confirmPassword"} render={({field}) => (
                                                           <FormItem>
                                                               <Label>Confirm Password</Label>
                                                               <FormControl>
                                                                   <Input type={"password"} {...field}
                                                                          placeholder={"confirm password"}/>
                                                               </FormControl>
                                                               <FormDescription>
                                                               </FormDescription>
                                                               <FormMessage/>
                                                           </FormItem>
                                                       )}
                                            />
                                        </div>
                                    </div>
                                    <div className={"flex justify-center mt-3"}>
                                        <Button type={"submit"} variant={"default"} className={"dark:text-white"}>
                                            <Save color={"#fff"}/>Save
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                    {/*<CardFooter>
                    </CardFooter>*/}
                </Card>
            </TabsContent>
        </Tabs>
    );
}
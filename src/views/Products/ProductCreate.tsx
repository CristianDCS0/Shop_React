import {useAppDispatch} from "@/store/app/hooks.ts";
import {TypeProduct} from "@/types/TypeProduct.ts";
import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

//Shadcn
import {Save, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogTrigger, DialogContent, DialogClose, DialogFooter, DialogTitle, DialogHeader, DialogDescription} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input.tsx"
import {createProduct} from "@/store/features/products/thunkProduct.ts";

export default function ProductCreate() {

    const dispatch = useAppDispatch();
    const desc:number = 10;
    const num:number = 4;
    const formSchema = z.object({
        name: z.string().min(num, { message: `Name must be at least ${num} characters long` }),
        description: z.string().min(desc, { message: `Description must be at least ${desc} characters long` }),
        category: z.string().min(num, { message: `Category must be at least ${num} characters long` }),
        price: z.number({ message: 'Price must be positive' }),
        stock: z.preprocess((val) => Number(val), z.number().nonnegative({ message: 'Stock must be non-negative' })),
        img: z.string({ message: 'Invalid image URL' }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: 0,
            stock: 0,
            img: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const product: Omit<TypeProduct, 'id' | 'created_at' | 'updated_at' | 'count'> = { ...values };
        dispatch(createProduct(product as TypeProduct)).unwrap()
    }

    return (
        <>
            <div className={"m-2.5"}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"default"}>Add new product
                            <Plus/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={"w-[800px] h-[480px]"}>
                        <DialogHeader>
                            <DialogTitle>Create Product</DialogTitle>
                            <DialogDescription>
                                Create a new product here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-6 sm:grid-cols-2 gap-2">
                                        <div className={"mr-2.5"}>
                                            <FormField control={form.control} name="name" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Name Product</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="description" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Description Product</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="category" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>
                                        <div className={"mr-2.5"}>
                                            <FormField control={form.control} name="price" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Price Product</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} value={field.value as number} onChange={(e) => field.onChange(+e.target.value)}/>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="stock" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Stock Product</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} value={field.value as number} onChange={(e) => field.onChange(+e.target.value)}/>
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="img" render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Image of product</FormLabel>
                                                    <FormControl>
                                                        <Input type={"text"} {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}/>
                                        </div>
                                    </div>
                                    <DialogClose asChild>
                                        <Button type={"submit"} variant={"default"}>
                                            <Save/> Save product
                                        </Button>
                                    </DialogClose>
                                </form>
                            </Form>
                        <DialogFooter>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};
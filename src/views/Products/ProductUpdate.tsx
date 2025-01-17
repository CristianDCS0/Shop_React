import {useAppDispatch, useAppSelector} from "@/store/app/hooks.ts";
import {Link, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {TypeProduct} from "@/types/TypeProduct.ts";
import {updateProduct} from "@/store/features/products/thunkProduct.ts";

//Shadcn
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ArrowLeft, Save} from "lucide-react";

export default function ProductUpdate() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { product = [] } = useAppSelector((state) => state.products);

    if (!id){
        return <p>No product ID provided.</p>;
    }

    const existingProduct = product.find((p) => p.id === id);

    if (!existingProduct){
        return <p>Product not found.</p>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formEdit = useForm({
        defaultValues: {
            name: existingProduct.name,
            description: existingProduct.description,
            category: existingProduct.category,
            price: existingProduct.price,
            stock: existingProduct.stock,
            img: existingProduct.img,
        },
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    function onSubmit(id: string, values: Omit<TypeProduct, "id" | "created_at" | "updated_at" | "count">) {
        dispatch(updateProduct({ id, product: values }))
            .unwrap()
            .then(() => {
                console.log("Producto actualizado exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
            });
    }
    return (
        <>
            <div className={""}>
                <div className="flex items-center px-4 py-2">
                    <Button variant={"default"}>
                        <Link to="/dashboard/products">
                            <ArrowLeft/> Back
                        </Link>
                    </Button>
                </div>
                <Form {...formEdit}>
                    <form onSubmit={formEdit.handleSubmit((values) => onSubmit(existingProduct.id, values))}>
                        <FormField control={formEdit.control} name="name" render={({field}) => (
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
                        <FormField control={formEdit.control} name="description" render={({field}) => (
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
                        <FormField control={formEdit.control} name="category" render={({field}) => (
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
                        <FormField control={formEdit.control} name="price" render={({field}) => (
                            <FormItem>
                                <FormLabel>Price Product</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value as number}
                                           onChange={(e) => field.onChange(+e.target.value)}/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={formEdit.control} name="stock" render={({field}) => (
                            <FormItem>
                                <FormLabel>Stock Product</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value as number}
                                           onChange={(e) => field.onChange(+e.target.value)}/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={formEdit.control} name="img" render={({field}) => (
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
                        <Button type={"submit"} variant={"default"}>
                            <Save/> Update product
                        </Button>
                    </form>
                </Form>
            </div>

        </>
    );
}
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';
import {getProducts, deleteProduct} from '@/store/features/products/thunkProduct';
import ProductCreate from "@/views/Products/ProductCreate"

// Shadcn
import {Button} from "@/components/ui/button.tsx";
import {Trash, Eye, ShoppingCart, Pencil} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Drawer,DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer.tsx";
import {Input} from "@/components/ui/input.tsx";
import {TypeProduct} from "@/types/TypeProduct.ts";
import {Link} from "react-router-dom";
export default function ProductsList() {
    const dispatch = useAppDispatch();
    const {product=[]} = useAppSelector((state) => state.products);
    const loading = useAppSelector((state) => state.products.loading);
    const user = useAppSelector((state) => state.users.user);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, user]);

    const handleDeleteProduct = (id: string) => {
        dispatch(deleteProduct(id));
    };

    return (
        <>
            <div className={"text-center font-black "}>
                <h1 className={"text-3xl"}>Productos</h1>
                {
                    loading && <p className={"text-2xl"}>Cargando productos...</p>
                }
            </div>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                user && user.role === 'admin' && (
                    <ProductCreate />
                )
            }

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                {Array.isArray(product) && product.length > 0 ? (
                    product.map((p: TypeProduct, index:number) => (
                    <Card key={index} className={"w-[220px] mr-2.5"}>
                        <CardHeader>
                            <CardTitle>{p.name}</CardTitle>
                            <CardDescription>{p.description}</CardDescription>
                        </CardHeader>
                        <CardContent >
                            <img src={p.img} alt={`Imagen de ${p.name}`}/>
                        </CardContent>

                            <CardFooter>
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    user && user.role === 'admin' && (
                                        <>
                                            <Button variant={"default"} size={"icon"} className={"mr-2.5"} onClick={() => console.log(p)}>
                                                <Eye/>
                                            </Button>
                                            <Button variant={"secondary"} className={"mr-2.5"} size={"icon"}>
                                                <Link to={`/dashboard/products/${p.id}`}>
                                                    <Pencil/>
                                                </Link>
                                            </Button>
                                            <Button variant={"destructive"} size={"icon"} className={"mr-2.5"}  onClick={() => handleDeleteProduct(p.id)}>
                                                <Trash/>
                                            </Button>
                                        </>
                                    )
                                }

                                <Drawer key={p.id}>
                                    <DrawerTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <ShoppingCart />
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="mx-auto w-full max-w-sm">
                                            <DrawerHeader>
                                                <DrawerTitle>Agregar al carro</DrawerTitle>
                                                <DrawerDescription>Stock: {p.stock}</DrawerDescription>
                                            </DrawerHeader>
                                            <div className="p-4 pb-0">
                                                <div className="flex items-center justify-center space-x-2">
                                                    {/* input */}
                                                    <Input type={"number"} min={0} max={p.stock} onChange={(e) => Number(e.target.value)}/>
                                                </div>
                                            </div>
                                            <DrawerFooter>
                                                <Button>Submit</Button>
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </div>
                                    </DrawerContent>
                                </Drawer>

                            </CardFooter>
                    </Card>
                    ))
                ) : (
                    <p className={"font-black text-3xl"}>No hay productos disponibles.</p>
                )}
            </div>
        </>
    );
}

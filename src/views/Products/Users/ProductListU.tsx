import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useProductStore} from "@/store/productStore.ts";

export default function Products() {
    const getProducts = useProductStore((state) => state.getProducts);
    getProducts().then(() => console.log('loading'));
    const products = useProductStore((state) => state.products);
    return (
        <>
            <h1 className="text-xl font-bold text-center mb-3">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((p) => (
                        <Card key={p.id}>
                            <CardHeader>
                                <CardTitle>{p.name}</CardTitle>
                                <CardDescription>Unidad: {p.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Price: ${p.price}</p>
                                <p>Stock: {p.stock}</p>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
        </>
    );
}

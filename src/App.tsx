import {Route, Routes} from "react-router-dom"

// Importar las vistas a utilizar
import Home from "@/views/Home/Home"
// import PostList from "@/views/Posts/PostList.tsx";
import HomeIndex from "@/views/Home/Homeindex.tsx";
import HomeDash from "@/views/Home/homeDash.tsx"
import ProductsList from "@/views/Products/ProductsList.tsx";
import ProductUpdate from "@/views/Products/ProductUpdate.tsx";
import LogoutUser from "@/views/Home/LogoutUser.tsx";

function App() {
    return (
        <Routes>
            {/* Ruta pública: Login */}
            <Route path="/" element={<Home />} />

            {/* Ruta protegida: Dashboard */}
            <Route path="/dashboard" element={ <HomeDash /> }>
                {/* Rutas hijas del Dashboard */}
                <Route index element={<HomeIndex />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="products/:id" element={<ProductUpdate />} />
                <Route path="logout" element={<LogoutUser />} />
            </Route>

            {/* Otras rutas */}
        </Routes>
    )
}

export default App;
# ProductsApp

Aplicacion mobile construida con React Native CLI que lista productos desde una API publica, permite ver detalle y gestionar favoritos con Redux.

## Requisitos previos

- Node.js >= 18
- React Native CLI
- Android Studio (para Android) / Xcode (para iOS)
- Seguir la guia oficial de [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd App-de-productos

# Instalar dependencias
npm install

# Para iOS (requiere macOS)
cd ios && pod install && cd ..
```

## Como correr la app

```bash
# Iniciar Metro bundler
npm start

# En otra terminal, correr en Android
npm run android

# O correr en iOS
npm run ios
```

## Estructura del proyecto

```
src/
├── api/
│   ├── axiosInstance.ts       # Instancia de axios con baseURL configurada
│   └── productsApi.ts         # Funciones para consumir DummyJSON API
├── components/
│   ├── ProductCard.tsx        # Card reutilizable de producto
│   └── SearchBar.tsx          # Input de busqueda con debounce 300ms
├── hooks/
│   └── useAppDispatch.ts      # Hooks tipados para Redux
├── navigation/
│   ├── AppNavigator.tsx       # Stack navigator + Bottom tabs
│   └── types.ts               # Tipos de navegacion
├── screens/
│   ├── HomeScreen.tsx         # Listado con paginacion, loading, error, pull to refresh
│   ├── DetailScreen.tsx       # Detalle del producto con boton de favoritos
│   └── FavoritesScreen.tsx    # Lista de productos favoritos
├── store/
│   ├── index.ts               # Configuracion del store
│   └── slices/
│       ├── productsSlice.ts   # Estado de productos (items, status, error, page, hasMore)
│       └── favoritesSlice.ts  # Favoritos normalizados (ids + entities)
└── types/
    └── Product.ts             # Interfaces de Product y ProductsResponse
```

## Decisiones tecnicas

### Stack
- **React Native 0.74.5** con TypeScript
- **React Navigation v6** (compatible con RN 0.74.5 y Android Gradle Plugin 8.2.1)
- **Redux Toolkit** con `createSlice` y `createAsyncThunk` para manejo de estado
- **Axios** con instancia configurada (baseURL, timeout)
- **React Native Paper** (MD3) para componentes UI con tema azul personalizado
- **React Native Vector Icons** (MaterialCommunityIcons) para iconografia

### API
- Se consume **DummyJSON** (`https://dummyjson.com/products`) que soporta paginacion real (`limit` y `skip`) y busqueda por query (`/products/search?q=`)

### Manejo de estado
- **Productos**: estado en Redux con `items`, `status` (idle/loading/succeeded/failed), `error`, `page` y `hasMore` para paginacion infinita
- **Favoritos**: estructura normalizada (`ids[]` + `entities{}`) persistida con **AsyncStorage**. Se cargan al iniciar la app y se guardan automaticamente al agregar/quitar

### Busqueda
- Componente `SearchBar` (Paper `Searchbar`) con debounce de 300ms implementado con `useRef` y `setTimeout`
- Se ignora el primer render para evitar busquedas innecesarias al montar
- El SearchBar permanece siempre montado para preservar el texto durante la busqueda
- Se usa un thunk separado (`searchByQuery`) que recibe el query directamente, evitando problemas de timing con el state de Redux

### Navegacion
- **Bottom Tabs**: Productos (Home) y Favoritos
- **Stack Navigator**: envuelve los tabs y la pantalla de Detalle

## Funcionalidades

- Listado de productos con imagen, titulo y precio
- Paginacion infinita (infinite scroll)
- Pull to refresh
- Estados de loading (spinner) y error (mensaje + boton reintentar)
- Busqueda por titulo con debounce 300ms
- Pantalla de detalle con imagen grande, titulo, precio y descripcion
- Agregar/quitar favoritos desde el detalle
- Pantalla de favoritos
- Persistencia de favoritos con AsyncStorage

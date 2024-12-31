/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProductsProductIdImport } from './routes/products/$productId'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const OrdersLazyImport = createFileRoute('/orders')()
const LoginLazyImport = createFileRoute('/login')()
const CartLazyImport = createFileRoute('/cart')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const OrdersLazyRoute = OrdersLazyImport.update({
  id: '/orders',
  path: '/orders',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/orders.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const CartLazyRoute = CartLazyImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cart.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProductsProductIdRoute = ProductsProductIdImport.update({
  id: '/products/$productId',
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/orders': {
      id: '/orders'
      path: '/orders'
      fullPath: '/orders'
      preLoaderRoute: typeof OrdersLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId': {
      id: '/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/cart': typeof CartLazyRoute
  '/login': typeof LoginLazyRoute
  '/orders': typeof OrdersLazyRoute
  '/register': typeof RegisterLazyRoute
  '/products/$productId': typeof ProductsProductIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/cart': typeof CartLazyRoute
  '/login': typeof LoginLazyRoute
  '/orders': typeof OrdersLazyRoute
  '/register': typeof RegisterLazyRoute
  '/products/$productId': typeof ProductsProductIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/cart': typeof CartLazyRoute
  '/login': typeof LoginLazyRoute
  '/orders': typeof OrdersLazyRoute
  '/register': typeof RegisterLazyRoute
  '/products/$productId': typeof ProductsProductIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/cart'
    | '/login'
    | '/orders'
    | '/register'
    | '/products/$productId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/cart'
    | '/login'
    | '/orders'
    | '/register'
    | '/products/$productId'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/cart'
    | '/login'
    | '/orders'
    | '/register'
    | '/products/$productId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  CartLazyRoute: typeof CartLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  OrdersLazyRoute: typeof OrdersLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ProductsProductIdRoute: typeof ProductsProductIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  CartLazyRoute: CartLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  OrdersLazyRoute: OrdersLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ProductsProductIdRoute: ProductsProductIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/cart",
        "/login",
        "/orders",
        "/register",
        "/products/$productId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/cart": {
      "filePath": "cart.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/orders": {
      "filePath": "orders.lazy.tsx"
    },
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

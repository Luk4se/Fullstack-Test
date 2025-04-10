import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Context/ShopContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <ShopContextProvider>
    <CartContextProvider>    
    <App />
    </CartContextProvider>
    </ShopContextProvider>    
    </ApolloProvider>
  </StrictMode>,
)

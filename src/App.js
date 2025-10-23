import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store";
import ErrorPage from "./pages/error/ErrorPage";
import { BrowserRouter } from "react-router-dom";
import BasicRoutes from "./routes/index";
import firebase from "./firebase";
import { ThemeProvider } from "@mui/material/styles";
import theme  from './theme';
const { persistor, store } = configureStore();


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ErrorPage>
              <BasicRoutes />
            </ErrorPage>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

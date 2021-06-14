import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import ItemDetails from "./components/itemDetails";
//import Login from "./components/login";
import NavBar from "./components/navBar";
import StoreFront from "./components/storeFront";
import Checkout from "./components/checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Category } from "./store/interfaces";

const store = configureStore();

class App extends Component {
  state = {
    columns: 6,
    selectedCategory: {} as Category,
    pageSize: 12,
    currentPage: 1,
    searchQuery: "",
  };

  onGroupItemHandler = (cat: Category) => {
    this.setState({ selectedCategory: cat, searchQuery: "", currentPage: 1 });
  };

  onPageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, selectedCategory: {}, currentPage: 1 });
  };

  render() {
    return (
      <Provider store={store}>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route
              path="/home"
              component={(props: any) => (
                <StoreFront
                  onGroupItemHandler={this.onGroupItemHandler}
                  selectedCategory={this.state.selectedCategory}
                  columns={this.state.columns}
                  currentPage={this.state.currentPage}
                  pageSize={this.state.pageSize}
                  onPageChange={this.onPageChange}
                  searchQuery={this.state.searchQuery}
                  handleSearch={this.handleSearch}
                  {...props}
                />
              )}
            />
            <Route path="/checkout" component={Checkout} />
            <Route
              path="/item/:id"
              component={(props: any) => (
                <ItemDetails onPageChange={this.onPageChange} {...props} />
              )}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </Provider>
    );
  }
}

export default App;

import React, { Component, Dispatch } from "react";
import DisplayItems from "./displayItems";
import Categories from "./categories";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { fetchCategories } from "../store/categories";
import Spinner from "./spinner";
import {
  Category,
  ProductItem,
  AddToCartItem,
  StateType,
} from "../store/interfaces";

interface OwnProps {
  onGroupItemHandler: (cat: Category) => void;
  selectedCategory: Category;
  columns: number;
  addToCartHandler: (addToCartItem: AddToCartItem) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  handleSearch: (query: string) => void;
  searchQuery: string;
}
interface Prop {
  products: ProductItem[];
  productsLoading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  fetchProducts: () => void;
  fetchCategories: () => void;
}

class StoreFront extends Component<Prop & OwnProps> {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render() {
    const {
      categories,
      productsLoading,
      categoriesLoading,
      products: items,
      columns,
      currentPage,
      pageSize,
      onPageChange,
      handleSearch,
      searchQuery,
      onGroupItemHandler,
      selectedCategory,
    } = this.props;

    if (productsLoading === true || categoriesLoading === true) {
      return <Spinner />;
    }

    return (
      <div className="row">
        <div className="col-2 m-2">
          <Categories
            categories={categories}
            onGroupItemClick={onGroupItemHandler}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="col m-2">
          <DisplayItems
            items={items}
            displayColumns={columns}
            currentPage={currentPage}
            pageSize={pageSize}
            selectedCategory={selectedCategory}
            onPageChange={onPageChange}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            displaySearch={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType, ownProps: OwnProps) => ({
  //...ownProps,
  products: state.entities.products.list,
  productsLoading: state.entities.products.loading,
  categories: [
    { catId: 0, name: "All Categories" },
    ...state.entities.categories.list,
  ],
  categoriesLoading: state.entities.categories.loading,
});

const mapDispatchingProps = (dispatch: Dispatch<any>) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchingProps)(StoreFront);

//export default StoreFront;

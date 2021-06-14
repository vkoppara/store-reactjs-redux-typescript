import React, { Component, Dispatch } from "react";
import ItemCards from "./itemCards";
import Pagination from "./pagination";
import { paginate } from "../util/paginate";
import SearchBox from "./searchBox";
import { addToCart, getCountForItem } from "../store/cart";
import { connect } from "react-redux";
import {
  CartItem,
  AddToCartItem,
  ProductItem,
  Category,
} from "../store/interfaces";
import { StateType } from "../store/interfaces";

class DisplayItems extends Component<{
  addToCartAction: (addToCartItem: AddToCartItem) => void;
  items: ProductItem[];
  displayColumns: number;
  selectedCategory: Category;
  currentPage: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  handleSearch: (query: string) => void;
  searchQuery: string;
  displaySearch: boolean;
  cartCount: (id: number) => number;
}> {
  state = {
    searchQuery: "",
  };

  addToCartHandler = (item: CartItem) => {
    this.props.addToCartAction({
      itemId: item.itemId,
      item: {
        itemId: item.itemId,
        cardTitle: item.cardTitle,
        price: item.price,
        cartCount: 1,
      },
    });
  };

  render() {
    const {
      items,
      displayColumns,
      selectedCategory,
      currentPage,
      pageSize,
      onPageChange,
      handleSearch,
      searchQuery,
      displaySearch,
      cartCount,
    } = this.props;
    const columnClass = "row row-cols-" + displayColumns;
    let fileteredItems = items;
    if (searchQuery !== "") {
      fileteredItems = items.filter((item) =>
        item.cardTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory.catId) {
      fileteredItems = items.filter(
        (item) => item.catId === selectedCategory.catId
      );
    }
    const pageItems = paginate(fileteredItems, currentPage, pageSize);
    console.log(this.props);
    console.log(pageItems);
    return (
      <React.Fragment>
        <div className="container">
          {displaySearch && (
            <SearchBox value={searchQuery} onChange={handleSearch} />
          )}
          <div className={columnClass}>
            {pageItems.map((row) => (
              <div key={row.itemId} className="col col-lg-2">
                <ItemCards
                  itemId={row.itemId}
                  cardTitle={row.cardTitle}
                  imgLink={row.imgLink}
                  price={row.price}
                  cartCount={cartCount(row.itemId)}
                  onAddToCart={() => this.addToCartHandler(row)}
                />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            itemsCount={fileteredItems.length}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  cartCount: (itemId: number) => getCountForItem(itemId)(state),
});

const mapDispatchingProps = (dispatch: Dispatch<any>) => ({
  addToCartAction: (item: AddToCartItem) => dispatch(addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchingProps)(DisplayItems);

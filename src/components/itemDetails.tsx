import React, { Component, Dispatch } from "react";
import DisplayItems from "./displayItems";
import { paginate } from "../util/paginate";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ProductItem, Category, StateType } from "../store/interfaces";

interface IReactRouterParams {
  id: string;
}

class ItemDetails extends Component<
  {
    products: ProductItem[];
    onPageChange: (pageNumber: number) => void;
  } & RouteComponentProps<IReactRouterParams>
> {
  getPrimaryItem = (items: ProductItem[], itemId: number) => {
    const tempItems = [...items];
    return tempItems.filter((item) => item.itemId === itemId);
  };

  getSimilarItems = (
    items: ProductItem[],
    categoryId: number,
    itemId: number
  ) => {
    let tempItems = [...items];
    tempItems = tempItems.filter(
      (item) => item.catId === categoryId && item.itemId !== itemId
    );
    return paginate(tempItems, 1, 6);
  };

  render() {
    const { products: items, onPageChange } = this.props;
    const itemId = +this.props.match.params.id;
    const displayItem = this.getPrimaryItem(items, itemId);
    let catId = 0;
    displayItem.map((item) => (catId = item.catId));
    const similarItems = this.getSimilarItems(items, catId, itemId);
    console.log(similarItems);
    return (
      <React.Fragment>
        <h1> Item Details</h1>
        <DisplayItems
          items={displayItem}
          displayColumns={1}
          currentPage={1}
          pageSize={1}
          selectedCategory={{} as Category}
          onPageChange={() => {}}
          handleSearch={() => {}}
          searchQuery=""
          displaySearch={false}
        />
        <br />

        {similarItems.length === 0 ? <h1></h1> : <h1> Similar Items</h1>}
        <DisplayItems
          items={similarItems}
          displayColumns={6}
          currentPage={1}
          pageSize={6}
          selectedCategory={{} as Category}
          onPageChange={onPageChange}
          handleSearch={() => {}}
          searchQuery=""
          displaySearch={false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  products: state.entities.products.list,
});

const mapDispatchingProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchingProps)(ItemDetails);

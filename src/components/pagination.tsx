import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component<{
  currentPage: number;
  itemsCount: number;
  pageSize: number;
  onPageChange: (pgNumber: number) => void;
}> {
  state = {};
  render() {
    const { currentPage, itemsCount, pageSize, onPageChange } = this.props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    if (pagesCount === 1) return null;
    return (
      <nav>
        <ul className="pagination">
          {pages.map((pgNumber) => (
            <li
              key={pgNumber}
              className={
                pgNumber === currentPage
                  ? "page-item active"
                  : "clickable page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(pgNumber)}>
                {pgNumber}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;

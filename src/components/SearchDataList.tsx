import React, { Component } from "react";

interface ISearchDataListProps {
  list: string[];
}

export default class SearchDataList extends Component<ISearchDataListProps, {}> {
  public render() {
    const optionsList = this.props.list.map((item, index) => (
      <option key={index}>{item}</option>
    ));

    return (
      <datalist id="searchHistory">{optionsList}</datalist>
    );
  }
}

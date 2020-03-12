import React from 'react';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

export type DataFilterProps<T = {}> = {
  children: (data: T[]) => void;
  type: string;
  data: ElasticSearchViewQueryResponse<T>['hits']['hits'];
};

export type DataFilterState<T = {}> = {
  data: T[];
  error: boolean;
};

/**
 * Give an ES result:
 * - it filters out the results that don't match the given @type
 * - returns an array of sources matching the given @type
 */
export default class DataFilter<T> extends React.Component<
  DataFilterProps<T>,
  DataFilterState<T>
> {
  constructor(props) {
    super(props);
    const matchingTypes = this.props.data
      .filter(hit => hit._source['@type'].includes(this.props.type))
      .map(hit => hit._source);

    this.state = {
      error: false,
      data: matchingTypes,
    };
  }

  // componentDidUpdate() {
  //   const matchingTypes = this.props.data
  //     .filter(hit => hit._source['@type'].includes(this.props.type))
  //     .map(hit => hit._source);

  //   this.setState({
  //     error: false,
  //     data: matchingTypes,
  //   });
  // }

  componentDidCatch() {
    this.setState({
      error: true,
      data: [],
    });
  }

  render() {
    if (this.state.error) {
      return <p>Error!!!!!</p>;
    }

    console.log(this.state.data);
    return <>{this.props.children(this.state.data)}</>;
  }
}

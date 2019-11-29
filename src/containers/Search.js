import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchQuery, resetSearchResultsSetUrl, queryChange } from '../actions'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import PropTypes from 'prop-types'
import SearchDataList from "../components/SearchDataList";



const Search = ({ fetchQuery, resetSearchResultsSetUrl, selectedVideo, query, queryChange }) => {
  const [searchOptions, setSearchOptions] = useState([]);

  function handleQueryChange(event) {
    event.preventDefault();
    queryChange(event.target.value)
  }
  
    if (!selectedVideo.video) {
    // let input

    return (
      <Form
      // onSubmit={e => {
      //   e.preventDefault()
      //   if (!input.value.trim()) {
      //     return
      //   }
      //   fetchQuery(input.value)
      // }}
      >
        <FormGroup>
          <div className="input-group">
            <Input type="search"
              name="query"
              onChange={handleQueryChange}
              value={query}
              placeholder="Search in YouTube"
              aria-describedby="button-addon4"
              list="searchHistory"
              autocomplete="off" />
              <SearchDataList list={searchOptions} />
            {/* <input ref={node => input = node} className="form-control" aria-describedby="button-addon4" /> */}
            <div className="input-group-append" id="button-addon4">
              <Button onClick={() => fetchQuery(query)} color="primary" outline>Search</Button>
              <Button onClick={() => resetSearchResultsSetUrl()} outline>Reset</Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    )
  } else {
    return null
  }
}

Search.propTypes = {
  fetchQuery: PropTypes.func.isRequired,
  resetSearchResultsSetUrl: PropTypes.func.isRequired,
  selectedVideo: {
    snippet: {
      title: PropTypes.string.isRequired
    }
  },
  query: PropTypes.string.isRequired,
  queryChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  selectedVideo: state.selectedVideo,
  query: state.query
})

const mapDispatchToProps = dispatch => ({
  fetchQuery: (query) => dispatch(fetchQuery(query)),
  resetSearchResultsSetUrl: () => dispatch(resetSearchResultsSetUrl()),
  queryChange: (event) => dispatch(queryChange(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)

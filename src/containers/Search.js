import React from 'react'
import { connect } from 'react-redux'
import { query } from '../actions'

const Search = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(query(input.value))
        // input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default connect()(Search)

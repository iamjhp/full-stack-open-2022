import { useState } from 'react'

const ViewToggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <span>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </span>
      <span style={showWhenVisible} className="viewToggleBlog">
        <button onClick={toggleVisibility}>cancel</button>
        <div>
          {props.children}
        </div>
        <button style={{ background: 'orange' }} onClick={props.handleDelete}>delete</button>
      </span>
    </span>


  )
}

export default ViewToggleable
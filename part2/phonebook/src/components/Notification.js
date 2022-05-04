const Notification = ({message}) => {
  if (message === '') return ''

  if (message.includes("Added") || message.includes("Updated")) {
    return (
      <div className='confirm'>
        {message}
      </div>
    )
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification
import React from 'react'
import { Link } from 'react-router-dom'

const Button = ( { mode, href, action, text, clase, type } ) => {

  if(action === 'link'){
    return (
      <Link
        className={`btn shadow text-center f-light btn--${mode} ${clase}`}
        to={href}
      >
        { text }
      </Link>
    )
  } else {
    return (
      <button
        className={`btn shadow text-center f-light btn--${mode} ${clase}`}
        onClick={action}
        type={type}
      >
        { text }
      </button>
    )
  }

}

export default Button
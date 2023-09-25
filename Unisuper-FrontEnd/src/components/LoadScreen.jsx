import React from 'react'

export const LoadScreen = () => {
  return (
    <div className='d-flex flex-column bg-white justify-content-center align-items-center vh-100'>
        <img src="LOGO black.png" alt="logouni"/>
        <div>
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

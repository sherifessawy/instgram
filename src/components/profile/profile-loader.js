import React from 'react'
import { Facebook } from 'react-content-loader';
import 'react-loading-skeleton/dist/skeleton.css'

export function HeaderLoader() {
    return (
          <div className='p-4'>
              <Facebook />
          </div> 
    )
}

   
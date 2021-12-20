
import React from 'react'
import ContentLoader from 'react-content-loader'

const ListingWithThumbnail = props => {
  return (
    <ContentLoader
      height={300}
      backgroundColor={'#d9d9d9'}
      foregroundColor={'#999'}
      {...props}
    >
      <rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
      <rect x="102" y="172" rx="3" ry="3" width="171" height="6" />
      <circle cx="44" cy="42" r="34" />
      <circle cx="44" cy="170" r="24" />
      <circle cx="44" cy="275" r="24" />
      <rect x="105" y="152" rx="3" ry="3" width="123" height="6" />
      <rect x="104" y="260" rx="3" ry="3" width="123" height="6" />
      <rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
      <rect x="104" y="280" rx="3" ry="3" width="171" height="6" />
    </ContentLoader>
  )
}

ListingWithThumbnail.metadata = {
  name: 'Rituraj ratan',
  github: 'riturajratan',
  description: 'Listing with thumbnail',
  filename: 'ListingWithThumbnail',
}

export default ListingWithThumbnail
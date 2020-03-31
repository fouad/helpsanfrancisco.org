import React, { useState, useCallback } from 'react'
import { getRecords } from '../utils/airtable'
import { SearchTextInput } from '../components/form'
import {
  CardList,
  Page,
  PageContent,
  CTAHeader,
  AnchorButton
} from '../components/layout'
import Link from 'next/link'

const IndexPage = ({ donateOptions = defaultDonateOptions }) => {
  const [state, setState] = useState({
    confirmedLocationPermission: false,
    sortedByLocation: false,
    donateOptions
  })

  const onSortByLocation = useCallback(() => {
    if (state.sortedByLocation) {
      setState({
        donateOptions,
        sortedByLocation: false,
        confirmedLocationPermission: false
      })

      return
    }

    if (navigator.geolocation) {
      setState(state => ({ ...state, requestingLocation: true }))
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(state => {
            const donateOptions = state.donateOptions
              .map(value => {
                let coords = value.location || {}
                let distance = getDistance(
                  position?.coords?.latitude,
                  position?.coords?.longitude,
                  coords.lat,
                  coords.lng
                )

                // If no distance is found, put at bottom of the list
                if (isNaN(distance)) {
                  distance = 1000
                }

                return {
                  sort: distance,
                  value: { ...value, distance }
                }
              })
              // Sort by ascending distance
              .sort((a, b) => a.sort - b.sort)
              .map(a => a.value)

            return {
              ...state,
              donateOptions,
              sortedByLocation: true,
              requestingLocation: false,
              confirmedLocationPermission: true
            }
          })
        },
        error => {
          console.error(error)

          setState(state => ({ ...state, requestingLocation: false }))

          window.alert(
            'This feature requires browser geolocation, learn more at https://support.google.com/chrome/answer/142065?hl=en'
          )
        },
        {
          enableHighAccuracy: true
        }
      )
    }
  }, [state.sortedByLocation])

  return (
    <Page title="Help San Francisco 🧡">
      <CTAHeader activeTab="still-open" />
      <PageContent>
        <Link href="/suggest" passHref>
          <AnchorButton className="mb-4">
            Suggest a business &rarr;
          </AnchorButton>
        </Link>

        <SearchTextInput
          value={state.filter || ''}
          onChange={e => setState({ ...state, filter: e.target.value })}
          confirmedLocationPermission={state.confirmedLocationPermission}
          requestingLocation={state.requestingLocation}
          onSortByLocation={onSortByLocation}
          placeholder="Search businesses"
        />

        <CardList filter={state.filter} options={state.donateOptions} />
      </PageContent>
    </Page>
  )
}

function getDistance(lat1, lon1, lat2, lon2) {
  let p = 0.017453292519943295 // Math.PI / 180
  let c = Math.cos
  let a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

  return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
}

export async function getStaticProps() {
  let donateOptions = await getRecords({
    baseName: 'appP4wqAvfriNeXHW',
    tableName: 'Still Open Options'
  })

  return { revalidate: 1, props: { donateOptions } }
}

const defaultDonateOptions = [
  {
    name: 'Masks for Doctors',
    href: 'https://google.com',
    tags: ['Healthcare', 'Restaurant', 'Donation']
  }
]

export default IndexPage

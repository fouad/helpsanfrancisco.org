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
    donateOptions
  })

  const onSortByLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position?.coords?.latitude
        const userLng = position?.coords?.longitude

        setState(state => {
          console.log({ state })
          // TODO Sort these
          const donateOptions = state.donateOptions
          return {
            ...state,
            donateOptions,
            confirmedLocationPermission: true
          }
        })
      });
    }
  }, [])

  return (
    <Page title="Help San Francisco · COVID-19">
      <CTAHeader activeTab="donate" />
      <PageContent>
        <Link href="/suggest" passHref>
          <AnchorButton className="mb-4">
            Suggest a business &rarr;
          </AnchorButton>
        </Link>

        <SearchTextInput
          value={state.filter || ''}
          onChange={e => setState({ ...state, filter: e.target.value })}
          onSortByLocation={onSortByLocation}
          confirmedLocationPermission={state.confirmedLocationPermission}
          placeholder="Search businesses"
        />

        <CardList filter={state.filter} options={state.donateOptions} />
      </PageContent>
    </Page>
  )
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export async function getStaticProps() {
  let donateOptions = await getRecords({
    baseName: 'appP4wqAvfriNeXHW',
    tableName: 'Donate Options'
  })

  return { props: { donateOptions } }
}

const defaultDonateOptions = [
  {
    name: 'Masks for Doctors',
    href: 'https://google.com',
    tags: ['Healthcare', 'Restaurant', 'Donation']
  }
]

export default IndexPage

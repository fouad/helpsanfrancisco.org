import React, { useState } from 'react'
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

const VolunteerPage = ({ volunteerOptions = defaultVolunteerOptions }) => {
  const [state, setState] = useState({})

  return (
    <Page title="Volunteer · Help San Francisco">
      <CTAHeader activeTab="volunteer" />
      <PageContent>
        <Link href="/suggest" passHref>
          <AnchorButton className="mb-4">
            Suggest an organization &rarr;
          </AnchorButton>
        </Link>

        <SearchTextInput
          value={state.filter || ''}
          onChange={e => setState({ ...state, filter: e.target.value })}
          placeholder="Search organizations"
        />

        <CardList filter={state.filter} options={volunteerOptions} />
      </PageContent>
    </Page>
  )
}

export async function getStaticProps() {
  let volunteerOptions = await getRecords({
    baseName: 'appP4wqAvfriNeXHW',
    tableName: 'Volunteer Options'
  })

  return { props: { volunteerOptions } }
}

const defaultVolunteerOptions = [
  {
    name: 'Masks for Doctors',
    href: 'https://google.com',
    tags: ['Healthcare', 'Restaurant', 'Donation']
  }
]

export default VolunteerPage

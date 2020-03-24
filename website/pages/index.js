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

const IndexPage = ({ donateOptions = defaultDonateOptions }) => {
  const [state, setState] = useState({})

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
          placeholder="Search businesses"
        />

        <CardList filter={state.filter} options={donateOptions} />
      </PageContent>
    </Page>
  )
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

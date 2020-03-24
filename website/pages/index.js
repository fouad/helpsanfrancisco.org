import React, { useState } from 'react'
import { getRecords } from '../utils/airtable'
import { SearchTextInput } from '../components/form'
import { CardList, Page, PageContent, CTAHeader } from '../components/layout'

const IndexPage = ({ helpOptions = defaultHelpOptions }) => {
  const [state, setState] = useState({})

  return (
    <Page title="Help San Francisco · COVID-19">
      <CTAHeader activeTab="have" />
      <PageContent>
        <SearchTextInput
          value={state.filter || ''}
          onChange={e => setState({ ...state, filter: e.target.value })}
          placeholder="Search businesses"
        />

        <CardList filter={state.filter} options={helpOptions} />
      </PageContent>
    </Page>
  )
}

export async function getStaticProps() {
  let helpOptions = await getRecords({
    baseName: 'appP4wqAvfriNeXHW',
    tableName: 'Help Options'
  })

  return {
    props: {
      helpOptions
    }
  }
}

const defaultHelpOptions = [
  {
    name: 'Masks for Doctors',
    href: 'https://google.com',
    tags: ['Healthcare', 'Restaurant', 'Donation']
  }
]

export default IndexPage

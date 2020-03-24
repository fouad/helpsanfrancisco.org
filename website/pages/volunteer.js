import React, { useState } from 'react'
import { getRecords } from '../utils/airtable'
import { Label, SelectInput } from '../components/form'
import { CardList, Page, PageContent, CTAHeader } from '../components/layout'

const VolunteerPage = ({ volunteerOptions = defaultVolunteerOptions }) => {
  const [state, setState] = useState({})

  return (
    <Page title="Volunteer · Help San Francisco">
      <CTAHeader activeTab="volunteer" />
      <PageContent>
        <Label>What would you like to volunteer?</Label>
        <SelectInput
          value={state.filter || ''}
          onChange={e => setState({ ...state, filter: e.target.value })}
        >
          <option value="">Anything</option>
          <option value="tech-work">Tech Work</option>
          <option value="supplies">Supplies</option>
        </SelectInput>

        <CardList options={volunteerOptions} />
      </PageContent>
    </Page>
  )
}

export async function getStaticProps() {
  let volunteerOptions = await getRecords({
    baseName: 'appP4wqAvfriNeXHW',
    tableName: 'Volunteer Options'
  })

  return {
    props: {
      volunteerOptions
    }
  }
}

const defaultVolunteerOptions = [
  {
    name: 'Give2SF',
    href: 'https://sf.gov/give-city-respond-covid-19'
  }
]

export default VolunteerPage

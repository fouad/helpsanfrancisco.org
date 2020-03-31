import React from 'react'
import {
  Page,
  CTAHeader,
  PageContent,
  AnchorButton
} from '../components/layout'

const RequestPage = () => (
  <Page title="Suggest Form · Help San Francisco">
    <CTAHeader />
    <PageContent className="block md:hidden text-center">
      <AnchorButton href="https://airtable.com/embed/shrPPQV2l3N7Vu6kQ?backgroundColor=orange">
        Open the Suggest Form &rarr;
      </AnchorButton>
    </PageContent>
    <iframe
      width="100%"
      height="1850"
      frameBorder="0"
      onmousewheel=""
      className="airtable-embed hidden md:block"
      src="https://airtable.com/embed/shrPPQV2l3N7Vu6kQ?backgroundColor=orange"
      style={{ background: 'transparent', border: '1px solid #ccc' }}
    />
  </Page>
)

export default RequestPage

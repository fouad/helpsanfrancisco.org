import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Link from 'next/link'
import Head from 'next/head'

export const AnchorButton = styled.a`
  ${tw`inline-block bg-white border-2 border-gray-500 text-black cursor-pointer font-bold py-2 px-4 rounded`}
    :hover {
    ${tw`bg-gray-200`}
  }
  :focus {
    ${tw`shadow-outline outline-none`}
  }

  ${props => props.active && tw`text-orange-500 border-orange-500`}
`

const CardStyle = css`
  ${tw`p-4 border-solid border border-gray-300 rounded-md p-4 shadow-sm`}
`

export const Card = styled.div`
  ${CardStyle}
  ${tw`hover:shadow-md active:shadow-sm`}
`

export const GlobalStyles = styled.div`
  -webkit-font-smoothing: antialiased;
`

const defaultDescription =
  'As SARS-CoV-2 (also known as COVID-19) continues to affect daily life, many people are in financial distress. If it’s possible for you, please Stay Home. Let’s do whatever we can to help those who can’t.'
const defaultOGURL = 'https://helpsanfrancisco.org'
const defaultOGImage = 'https://helpsanfrancisco.org/static/og-image.png'

export const Page = ({ url, title, ogImage, description, children }) => (
  <GlobalStyles>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta property="og:url" content={url || defaultOGURL} />
      <meta property="og:title" content={title || ''} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
    {children}
  </GlobalStyles>
)

export const PageContent = styled.div`
  ${tw`px-8 max-w-2xl mx-auto py-12`}
`

export const Logo = styled.h1`
  ${tw`inline-block leading-none text-base text-left text-3s text-5xl font-black uppercase`}
`

const InfoHeader = styled.div`
  ${tw`bg-gray-100 pt-10 pb-16 text-center`}

  border-bottom: 2px solid #cbd5e0;
`

const InfoTitle = styled.h2`
  ${tw`mx-auto px-8 max-w-2xl text-2xl-lg text-xl font-normal`}
`

const ButtonRow = styled.div`
  ${tw`mx-auto px-8`}
`

const Tag = styled.span`
  ${tw`inline-block rounded-md font-medium leading-none py-1 text-xs px-2 mr-2`}
  ${props => {
    switch (props.children) {
      case 'Restaurant':
        return tw`bg-indigo-100 text-indigo-700`
      case 'Coffee':
        return tw`bg-brown-100 text-brown-700`
      case 'GoFundMe':
        return tw`bg-green-100 text-green-700`
      case 'Healthcare':
        return tw`bg-blue-100 text-blue-700`
      case 'Subscription':
        return tw`bg-green-100 text-green-700`
      case 'Donation':
        return tw`bg-red-100 text-red-700`
    }

    return tw`bg-gray-100 text-gray-700`
  }}
`

export const CardList = ({ options, filter }) => (
  <div className="mt-4 border-t border-gray-300">
    {options.filter(o => !filter || new RegExp(filter, 'i').test(o.name))
      .length === 0 && (
      <div className="text-gray-400 py-8 px-10">No Results</div>
    )}
    {options
      .filter(o => !filter || new RegExp(filter, 'i').test(o.name))
      .map((option, cardKey) => (
        <a
          key={cardKey}
          href={option.href}
          className="block no-underline focus:outline-none focus:shadow-outline"
        >
          <Card className="mt-4">
            <h5 className="font-semibold">{option.name}</h5>
            {option.tags && (
              <div className="mt-2">
                {option.tags.map((tag, key) => (
                  <Tag key={key}>{tag}</Tag>
                ))}
              </div>
            )}
          </Card>
        </a>
      ))}
  </div>
)

export const CTAHeader = ({ activeTab = 'need' }) => (
  <InfoHeader>
    <Link passHref href="/">
      <a className="no-underline">
        <Logo className="mt-10 lh-">
          Help
          <br />
          SF 🧡
        </Logo>
      </a>
    </Link>
    <InfoTitle className="my-8">
      As SARS-CoV-2 (also known as COVID-19) continues to affect daily life,
      many people are in financial distress.
    </InfoTitle>
    <InfoTitle className="my-8">
      If it&rsquo;s possible for you, please <strong>Stay Home</strong>.
      Let&rsquo;s do whatever we can to help those who can&rsquo;t. Here are
      some options:
    </InfoTitle>
    <ButtonRow>
      <Link passHref href="/">
        <AnchorButton active={activeTab === 'have'} className="mb-2 mr-2">
          💰 I have money
        </AnchorButton>
      </Link>
      <Link passHref href="/request">
        <AnchorButton active={activeTab === 'need'} className="mb-2 mr-2">
          ☀️ I need money
        </AnchorButton>
      </Link>

      <Link passHref href="/volunteer">
        <AnchorButton active={activeTab === 'volunteer'} className="mb-2 mr-2">
          ⛑ Volunteer
        </AnchorButton>
      </Link>
      {/* <AnchorButton
        href="https://www.google.com/search?q=do+the+five"
        className="mb-2"
        target="_blank"
      >
        🤚 Do the Five
      </AnchorButton> */}
    </ButtonRow>
  </InfoHeader>
)

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import Link from 'next/link'
import Head from 'next/head'

export const SegmentedButton = styled.a`
  ${tw`relative inline-block items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700`}
    :focus {
    ${tw`shadow-outline outline-none`}
  }

  ${props => (props.active ? tw`bg-gray-200` : tw`hover:bg-gray-100`)}
`

export const SegmentedButtonIcon = styled.span`
  ${tw`block text-center w-full mb-1`}
`

export const ButtonGroup = styled.span`
  ${tw`relative z-0 inline-flex shadow-sm`}
`

export const AnchorButton = styled.a`
  ${tw`inline-block rounded-full text-sm font-medium leading-none py-2 px-3 border shadow-sm`}
    :focus {
    ${tw`shadow-outline outline-none`}
  }
  ${props => {
      switch (props.color) {
        case undefined:
        case 'blue':
          return tw`bg-blue-100 text-blue-700`
        case 'gray':
          return tw`bg-gray-100 text-gray-700`
        default:
          return ''
      }
    }}
    :hover {
    ${tw`bg-blue-200`}
  }
  :active {
    ${tw`bg-blue-300`}
  }
`

const CardStyle = css`
  ${tw`p-4 border-solid border border-gray-300 rounded-md p-4 shadow-sm`}
`

export const Card = styled.div`
  ${CardStyle}
  ${tw`hover:shadow-md active:shadow-sm`}
`

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
  ${tw`mx-auto px-10 max-w-2xl text-2xl-lg text-xl font-normal`}
`

const InfoSmall = styled.span`
  ${tw`pr-4 text-sm font-normal`}
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
      case 'Venue':
        return tw`bg-orange-100 text-orange-700`
      case 'Retail':
        return tw`bg-teal-100 text-teal-700`
      case 'Government':
      case 'Service':
        return tw`bg-purple-100 text-purple-700`
      case 'Non-profit':
        return tw`bg-green-100 text-green-700`
      case 'Tech Workers':
        return tw`bg-yellow-100 text-yellow-700`
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

export const CardList = ({ options, filter }) => {
  let filteredOptions = options.filter(
    o =>
      o.name &&
      (!filter ||
        new RegExp(filter, 'i').test([o.name, ...(o.tags || [])].join('')))
  )

  return (
    <div className="mt-4 border-t border-gray-300">
      {filteredOptions.length === 0 && (
        <div className="text-gray-400 py-8 px-10">No Results</div>
      )}
      {filteredOptions.map((option, cardKey) => (
        <a
          key={cardKey}
          href={option.href}
          className="block no-underline focus:outline-none focus:shadow-outline rounded-md"
          target="_blank"
        >
          <Card className="relative mt-4">
            <h5 className="font-semibold">{option.name}</h5>
            {option.address && (
              <span className="text-gray-500 text-sm">{option.address}</span>
            )}
            {option.tags && (
              <div className="mt-2">
                {option.tags.map((tag, key) => (
                  <Tag key={key}>{tag}</Tag>
                ))}
              </div>
            )}
            <img
              className={`absolute h-7 mb-4 mr-4 right-0	bottom-0`}
              src={getLogo(option.href)}
            />
          </Card>
        </a>
      ))}
    </div>
  )
}

function getLogo(href) {
  if (/gofundme/.test(href)) {
    return '/static/images/gofundme.png'
  } else if (/doordash/.test(href)) {
    return '/static/images/doordash.png'
  } else if (/ubereats/.test(href)) {
    return '/static/images/uber.png'
  } else if (/caviar/.test(href)) {
    return '/static/images/caviar.png'
  } else if (/instagram/.test(href)) {
    return '/static/images/instagram.png'
  } else {
    return '/static/images/website.svg'
  }
}

export const CTAHeader = ({ activeTab = '' }) => (
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
      <ButtonGroup>
        <Link passHref href="/">
          <SegmentedButton
            active={activeTab === 'donate'}
            className="transition ease-in-out duration-150 rounded-l-md"
          >
            <SegmentedButtonIcon>🧡</SegmentedButtonIcon> Donate
          </SegmentedButton>
        </Link>
        <Link passHref href="/still-open">
          <SegmentedButton
            active={activeTab === 'still-open'}
            className="transition ease-in-out duration-150 -ml-px"
          >
            <SegmentedButtonIcon>👋</SegmentedButtonIcon> Still Open
          </SegmentedButton>
        </Link>
        <Link passHref href="/volunteer">
          <SegmentedButton
            active={activeTab === 'volunteer'}
            className="-ml-px transition ease-in-out duration-150 rounded-r-md"
          >
            <SegmentedButtonIcon>⛑</SegmentedButtonIcon> Volunteer
          </SegmentedButton>
        </Link>
      </ButtonGroup>
    </ButtonRow>
    <ButtonRow>
      <AnchorButton
        target="_blank"
        className="text-lg mt-6 border mr-3"
        href="https://twitter.com/HelpSForg"
      >
        @HelpSForg
      </AnchorButton>
      <AnchorButton
        target="_blank"
        className="text-lg mt-6 border"
        href={`https://twitter.com/intent/tweet?url=https://helpsanfrancisco.org&text=${encodeURIComponent(
          'Help San Francisco businesses and workers by making a donation or volunteering at'
        )}`}
      >
        Tweet this page
      </AnchorButton>
    </ButtonRow>
    <InfoSmall>Looking for gift cards?</InfoSmall>
    <AnchorButton
      color="gray"
      target="_blank"
      className="text-lg mt-6 border mr-3"
      href="https://saveourfaves.org/?ref=helpsf"
    >
      Save our Faves
    </AnchorButton>
  </InfoHeader>
)

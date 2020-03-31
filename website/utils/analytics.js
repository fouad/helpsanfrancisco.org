import ReactGA from 'react-ga'

export const init = () => ReactGA.initialize('UA-161811863-1')

export const pageview = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const outbound = url => {
  ReactGA.outboundLink({ label: url }, () => {})
}

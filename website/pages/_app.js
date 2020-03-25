import App from 'next/app'
import Router from 'next/router'
import 'tailwindcss/dist/base.css'
import 'tailwindcss/dist/utilities.css'
import 'tailwindcss/dist/components.css'
import '@tailwindcss/ui/dist/tailwind-ui.css'
import { init, pageview } from '../utils/analytics'

export default class HSFApp extends App {
  componentDidMount() {
    init()
    pageview()
    Router.events.on('routeChangeComplete', pageview)
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

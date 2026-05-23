import { Paths } from 'constants/paths'
import { Route, NotFoundRoute } from '@tanstack/react-router'
import CurrencyPage from 'components/pages/CurrencyPage'
import Main from 'components/pages/Main'
import NotFound from 'components/pages/NotFound'
import Suspense from 'components/wrappers/Suspense/Suspense'
import { rootRoute } from './router'

const mainRoute = new Route({
  getParentRoute: () => rootRoute,
  path: Paths.MAIN,
  component: () => (
    <Suspense>
      <Main />
    </Suspense>
  )
})

const currencyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/currency/$symbol',
  component: () => (
    <Suspense>
      <CurrencyPage />
    </Suspense>
  )
})

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense>
      <NotFound />
    </Suspense>
  )
})

export const routes = [mainRoute, currencyRoute]

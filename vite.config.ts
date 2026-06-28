import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge'

// https://vite.dev/config/
export default defineConfig(() => {
  const isTest = Boolean(process.env.VITEST)
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const base =
    isGithubActions && repositoryName ? `/${repositoryName}/` : '/'

  return {
    base,
    build: {
      sourcemap: 'hidden',
    },
    plugins: [
      react({
        babel: {
          plugins: isTest ? [] : ['react-dev-locator'],
        },
      }),
      ...(isTest
        ? []
        : [
            traeBadgePlugin({
              variant: 'dark',
              position: 'bottom-right',
              prodOnly: true,
              clickable: true,
              clickUrl: 'https://www.trae.ai/solo?showJoin=1',
              autoTheme: true,
              autoThemeTarget: '#root',
            }),
          ]),
      tsconfigPaths(),
    ],
  }
})

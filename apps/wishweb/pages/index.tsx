import useConfig from '../lib/client/useConfig'
import styles from './index.module.scss'

export const Index = () => {
  const config = useConfig()
  return (
    <div className={styles.page}>
      <h2>Authenticate</h2>
      { config && <a href={config.googleAuthUrl}>Login with Google</a> }
    </div>
  )
}

export default Index

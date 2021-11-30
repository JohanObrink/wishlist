import RNConfig from 'react-native-config'

interface ConfigProps {
  API_HOST: string
  GOOGLE_CLIENT_ID_IOS: string
  GOOGLE_CLIENT_ID_WEB: string
}

export const Config: ConfigProps = {
  ...RNConfig as unknown as ConfigProps,
}

export default Config

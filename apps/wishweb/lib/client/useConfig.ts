import { useEffect, useState } from 'react'
import { ClientConfig } from '../types'

export const useConfig = () => {
  const [config, setConfig] = useState<ClientConfig>()
  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    const response = await fetch('/api/config')
    const json = await response.json()
    setConfig(json)
  }

  return config
}

export default useConfig

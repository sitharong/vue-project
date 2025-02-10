class EnvironmentService {
  readonly env = import.meta.env as unknown as EnvironmentKey
}

export const envService = new EnvironmentService()

interface EnvironmentKey {
  VITE_APP_API_ENDPOINT: string
}

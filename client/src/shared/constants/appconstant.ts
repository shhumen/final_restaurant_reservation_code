const AppConsts = {
  appBaseUrl: import.meta.env.VITE_APP_BASE_URL,
  remoteServiceBaseUrl: import.meta.env.VITE_APP_REMOTE_SERVICE_BASE_URL,
  remoteSocketServiceBaseUrl: import.meta.env
    .VITE_APP_REMOTE_SOCKET_SERVICE_BASE_URL,
  reactAppSecureSecret: import.meta.env.VITE_APP_SECURE_SECRET,
  reactAppSecureLsSecret: import.meta.env.VITE_APP_SECURE_LS_SECRET,
}

export default AppConsts

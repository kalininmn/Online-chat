interface Env {
  HOST: string,
  BACKEND_HOST: string,
  WS_HOST: string,
}

const env: Env = {
  HOST: 'http://localhost:8080',
  BACKEND_HOST: 'http://localhost:8081',
  WS_HOST: 'ws://localhost:8080',
};

export default env;

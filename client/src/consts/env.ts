interface Env {
  HOST: string,
  BACKEND_HOST: string,
}

const env: Env = {
  HOST: 'http://localhost:8080',
  BACKEND_HOST: 'http://localhost:8081',
};

export default env;

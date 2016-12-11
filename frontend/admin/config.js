import node from 'detect-node';

let env, dev;
if (node) {
  env = process.env.NODE_ENV || 'development'
  dev = env !== 'development';
}

export default {
  lister_port: 8081,
  api_url: node ? 'http://localhost:33333' : '/admin-api',
  spa: false,
  redux_logger: true,
  env, dev, node,
};

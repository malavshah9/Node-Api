const routes = [
    {
      method: 'GET',
      path: '/',
      handler() {
        return 'foo';
      },
      options:{
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/42',
      handler() {
        return '42';
      },
      options:{
        tags: ['api']
      }
    }
  ];
  module.exports=routes
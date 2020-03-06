var environments = {};
 
// Development (default) environment
environments.development = {
  'httpsPort' : process.env.PORT || 3001,
  'envName' : 'development',
  'hashingSecret' : 'thisIsASecret',
  'aws':{
    'accessKeyId': 'AKIAIINYQAIKFMAJ7JKQ',
    'secretAccessKey': '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' 
  },
  'pg': {
    'host': 'ec2-107-22-238-186.compute-1.amazonaws.com',
    'user':'xdkshnqldipeoz',
    'password':'e0a6e1c1f0c472b29b5bc60a4450b20c712670aeb84f7c9d4b183cb9330056be',
    'database':'d5umvfq8h64ncf',
    'ssl': true,

  },
 'REDIS_URL': 'redis://h:p748085ca034c8270ce0516ad1c12d1d21de670dc2e643ea977878bb472c37229@ec2-3-222-100-96.compute-1.amazonaws.com:21769'
}
// Production environment
environments.production = {
  'httpsPort' : process.env.PORT || 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'aws':{
    'accessKeyId': 'AKIAIINYQAIKFMAJ7JKQ',
    'secretAccessKey': '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' 
  },
  'pgMedia': {
    'host': 'ec2-107-22-238-186.compute-1.amazonaws.com',
    'user':'xdkshnqldipeoz',
    'password':'e0a6e1c1f0c472b29b5bc60a4450b20c712670aeb84f7c9d4b183cb9330056be',
    'database':'d5umvfq8h64ncf',
    'ssl': true,
    'url':'postgres://xdkshnqldipeoz:e0a6e1c1f0c472b29b5bc60a4450b20c712670aeb84f7c9d4b183cb9330056be@ec2-107-22-238-186.compute-1.amazonaws.com:5432/d5umvfq8h64ncf'
  },
  'pgMain': {
    'host': 'ec2-54-225-89-195.compute-1.amazonaws.com',
    'user':'vklykmetlqlebo',
    'password':'3e10600ef5c44081647137b63f847a4fa844c8c3a3d4206c3c406beed7c232c6',
    'database':'d95rgfalju8116',
    'ssl': true,
    'url': 'postgres://vklykmetlqlebo:3e10600ef5c44081647137b63f847a4fa844c8c3a3d4206c3c406beed7c232c6@ec2-54-225-89-195.compute-1.amazonaws.com:5432/d95rgfalju8116'
  },
  'REDIS_URL':'redis://h:p748085ca034c8270ce0516ad1c12d1d21de670dc2e643ea977878bb472c37229@ec2-3-222-100-96.compute-1.amazonaws.com:21769'

  
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
module.exports = environmentToExport;

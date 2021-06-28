function setConfig(config) {
  
  config.newInfo()
    .setId('instructions')
    .setText('Enter API key to fetch account data.');
  
  config.newTextInput()
    .setId('key')
    .setName('Enter an API key')
    .setHelpText('https://pipedrive.readme.io/docs/how-to-find-the-api-token')
    .setPlaceholder('API token');

  config.newTextInput()
    .setId('domain')
    .setName('Enter domain name')
    .setHelpText('https://pipedrive.readme.io/docs/how-to-get-the-company-domain')
    .setPlaceholder('Domain name');
  
  return config;
}

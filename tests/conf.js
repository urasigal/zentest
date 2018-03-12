exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  specs: ['login_spec.js'],
  capabilities: {
    browserName: 'firefox'
  },
  onPrepare: function(){
			browser.manage().window().maximize();
		}
};

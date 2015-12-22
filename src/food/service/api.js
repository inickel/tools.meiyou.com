const HOST = 'tools.seeyouyima.com';
const DEFAULTS={};
const API = {
	category: {
		base: {
			uri: `http://${HOST}/taboo/category`,
			method:'GET'
		},
		params: {
			must: ['authorization'],
			web: [],
			ios: [],
			android: []
		}
	}
}

Object.keys(API).forEach(key => {
	const params = API[key].params;
	params.all = params.must.contact(params.ios).reduce((o, k) => {
		o[k] = '';
		return o;
	}, {});
	Object.assign(API[key].base,DEFAULTS);
});
module.exports=API;
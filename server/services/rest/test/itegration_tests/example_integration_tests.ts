import axios from 'axios'

axios.get('http://localhost:3000/example').then(r=>console.log({getResponse: r.data}));
axios.post('http://localhost:3000/example', [{id:"123"}]).then(r=>console.log({postResponse: r.data}));
axios.put('http://localhost:3000/example/123', {hello:"123", obj:{some:"where"}}).then(r=>console.log({putResponse: r.data}));
axios.delete('http://localhost:3000/example/123').then(r=>console.log({deleteResponse: r.data}));
axios.get('http://localhost:3000/example/no-docs?a=5&b=c').then(r=>console.log({"getResponse-no-docs": r.data}));
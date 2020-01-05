import { PrefixProxy } from 'src/helper/proxy/prefix';
import { environment } from 'src/environments/environment';
import { JsonProxy } from 'src/helper/proxy/json';
import { StorageProxy } from 'src/helper/proxy/storage';

let storage = localStorage;

storage = StorageProxy(storage, true);
storage = JsonProxy(storage, null, null, environment.storage.space);
storage = PrefixProxy(storage, environment.storage.prefix);

export { storage };

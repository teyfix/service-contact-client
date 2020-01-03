import { PrefixProxy } from './proxy/prefix';
import { environment } from '../../environments/environment';
import { JsonProxy } from './proxy/json';
import { StorageProxy } from './proxy/storage';

let storage = localStorage;

storage = StorageProxy(storage, true);
storage = JsonProxy(storage, null, null, environment.storage.space);
storage = PrefixProxy(storage, environment.storage.prefix);

export { storage };

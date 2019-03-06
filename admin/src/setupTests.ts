import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

declare var global;

class LocalStorageMock {
    store: any;
    constructor() {
        this.store = {}
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value
    }

    removeItem(key) {
        delete this.store[key]
    }
}

global.localstorage = new LocalStorageMock();
global.sessionStorage = new LocalStorageMock();
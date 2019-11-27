import PagesCache from '../../components/Utils/PagesCache';

test('PagesCache.getInstance:returns the same class instance', () => {
    const cache = PagesCache.getInstance();
    expect(PagesCache.getInstance()).toEqual(cache);
});

test('PagesCache.getInstance:returns null', () => {
    const cache = PagesCache.getInstance();
    cache.set('key', null);
    expect(cache.get('key')).toBeNull();
});

test('PagesCache.get:return undefined if key not exists', () => {
    expect(PagesCache.getInstance().get('keyNotExist')).toBeUndefined();
});


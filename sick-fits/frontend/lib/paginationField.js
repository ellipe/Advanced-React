import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const pageItems = existing.slice(skip, skip + first).filter(Boolean);

      // If the number of items in the cache are less than expected, then refetch.
      // if (pageItems.length && pageItems.length !== first) {
      //   return false;
      // }

      // if there are items in the cache, return them
      if (pageItems.length) {
        console.log(
          `There are ${pageItems.length} items in ${page} page in the cache`
        );
        return pageItems;
      }

      // Fallback: refetch.
      return false;
    },
    merge(existing = [], incoming = [], { args }) {
      const { skip } = args;

      console.log('Merging incoming items from the network...', incoming);
      const merged = existing ? existing.slice(0) : [];

      for (let i = 0; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}

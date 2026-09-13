type QueryKey<T extends string = string> = {
  [SubKey in T]: Readonly<[string, SubKey]>
}

function createQueryKey<T extends string>(baseKey: string, subKeys: readonly T[]) {
  const map = subKeys.map(subKey => [subKey, [baseKey, subKey]]);
  return Object.fromEntries(map) as QueryKey<T>;
}

const queryKeys = {
  auth: createQueryKey('auth', ['ME']),
  cart: createQueryKey('cart', ['READ', 'LIST', 'LOG']),
  preferences: createQueryKey('preferences', ['READ', 'UPDATE']),
  expenses: createQueryKey('expenses', ['READ'])
}

export default queryKeys;
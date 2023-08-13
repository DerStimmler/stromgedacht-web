export function addOrSet<TKey, TData>(map: Map<TKey, TData[]>, key: TKey, data: TData): void {
	if (map.has(key)) {
		map.get(key)?.push(data);
	} else {
		map.set(key, [data]);
	}
}

/*
 * @Author: zhouran
 * @Date: 2022-07-19 15:38:50
 * @LastEditors: zhouran
 * @LastEditTime: 2022-07-19 15:40:58
 * @Description:
 */
export function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
  if (cache.has(id)) {
    return !!cache.get(id);
  }
  if (importStack.includes(id)) {
    cache.set(id, false);
    return false;
  }
  const mod = getModuleInfo(id);
  if (!mod) {
    cache.set(id, false);
    return false;
  }
  if (mod.isEntry) {
    cache.set(id, true);
    return true;
  }
  const someImporterIs = mod.importers.some((importer) => staticImportedByEntry(importer, getModuleInfo, cache, importStack.concat(id)));
  cache.set(id, someImporterIs);
  return someImporterIs;
}

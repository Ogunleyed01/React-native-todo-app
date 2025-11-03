import { api } from '../convex/_generated/api';

/**
 * Helper to get Convex function references
 * Works around the anyApi issue where api object appears empty
 * anyApi is a Proxy, so property access should work even if it logs as {}
 */
export function getConvexFunction(module: string, functionName: string) {
  try {
    // Try accessing via proxy
    const moduleApi = (api as any)[module];
    if (moduleApi) {
      const func = moduleApi[functionName];
      if (func) {
        console.log(`✓ Found Convex function: ${module}.${functionName}`);
        return func;
      }
    }
    
    // Log what we can see
    console.warn(`⚠ Could not find Convex function: ${module}.${functionName}`);
    console.warn(`  - Module exists:`, !!moduleApi);
    console.warn(`  - Module keys:`, moduleApi ? Object.keys(moduleApi) : 'N/A');
    
    return undefined;
  } catch (error) {
    console.error(`✗ Error accessing Convex function ${module}.${functionName}:`, error);
    return undefined;
  }
}

// Initialize functions
const _getAll = getConvexFunction('todos', 'getAll');
const _create = getConvexFunction('todos', 'create');
const _update = getConvexFunction('todos', 'update');
const _remove = getConvexFunction('todos', 'remove');
const _clearCompleted = getConvexFunction('todos', 'clearCompleted');
const _reorder = getConvexFunction('todos', 'reorder');

export const convexFunctions = {
  todos: {
    getAll: _getAll,
    create: _create,
    update: _update,
    remove: _remove,
    clearCompleted: _clearCompleted,
    reorder: _reorder,
  },
};

// Debug: Verify all functions are loaded
const allLoaded = Object.values(convexFunctions.todos).every(f => f !== undefined);
if (!allLoaded) {
  console.error('❌ Some Convex functions are missing! Make sure `npx convex dev` is running in watch mode.');
  console.error('  Missing functions:', Object.entries(convexFunctions.todos)
    .filter(([_, fn]) => fn === undefined)
    .map(([name, _]) => name)
    .join(', '));
} else {
  console.log('✅ All Convex functions loaded successfully');
}


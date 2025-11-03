import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    return todos.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const existingTodos = await ctx.db.query("todos").collect();
    const nextOrder = existingTodos.length > 0 
      ? Math.max(...existingTodos.map(t => t.order)) + 1 
      : 0;
    
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
      createdAt: Date.now(),
      order: nextOrder,
    });
    return todoId;
  },
});

export const update = mutation({
  args: { 
    id: v.id("todos"),
    title: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();
    
    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }
  },
});

export const reorder = mutation({
  args: { 
    id: v.id("todos"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { order: args.newOrder });
  },
});


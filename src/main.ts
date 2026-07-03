import { TemporalEngine } from "./lib/engine/TemporalEngine";

console.log("🚀 Starting the test TemporalEngine...");

// 1. Testing primitives(without cloning)
const numberEngine = new TemporalEngine<number>(10, false);
numberEngine.set(20);
numberEngine.set(30);

console.log("--- Primitives test ---");
console.log("Current (is expected 30):", numberEngine.getPresent()); // 30
numberEngine.undo();
console.log("After Undo (is expected 20):", numberEngine.getPresent()); // 20
numberEngine.redo();
console.log("After Redo (is expected 30):", numberEngine.getPresent()); // 30
numberEngine.undo();
numberEngine.undo();
console.log("After double Redo (is expected 10):", numberEngine.getPresent()); // 10

// 2. Testing complex objects (with cloning)
interface IState {
  user: { name: string };
  score: number;
}

const initialObj: IState = { user: { name: "Ilya" }, score: 100 };
const objectEngine = new TemporalEngine<IState>(initialObj, true); // Enable clone

// We are macking changes
const state2 = { user: { name: "Alex" }, score: 200 };
objectEngine.set(state2);

// We simulate a dangerous mutation of an external object.
state2.user.name = "MUTATED_NAME";
state2.score = 999;

console.log("\n--- Object cloning test ---");
console.log("Current (is expected  MUTATED_NAME/999 due to a mutation):", objectEngine.getPresent());
objectEngine.undo();
console.log("After Undo (is expected Ilya/100 - history must not suffer!):", objectEngine.getPresent());
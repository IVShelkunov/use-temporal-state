import { useRef, useState } from "react";
import { TemporalEngine } from "../engine/TemporalEngine";

export function useTemporal<T>(initialValue: T, options?: { clone?: boolean }) {
    const engineRef = useRef(new TemporalEngine(initialValue, options?.clone));
    const [state, setState] = useState<T>(engineRef.current.getPresent());
    const [, setTick] = useState(0);
    const forceUpdate = () => setTick((t) => t + 1);
    const set = (newValue: T) => {
        engineRef.current.set(newValue);
        setState(engineRef.current.getPresent());
    }
    const undo = () => {
        engineRef.current.undo();
        setState(engineRef.current.getPresent());
    }
    const redo = () => {
        engineRef.current.redo();
        setState(engineRef.current.getPresent());
    }
    const clear = () => {
        engineRef.current.clear();
        forceUpdate();
    }
    const canUndo = engineRef.current.canUndo();
    const canRedo = engineRef.current.canRedo();
    const history = engineRef.current.getPast();
    return [
        state,
        set,
        {
            undo,
            redo,
            clear,
            canUndo,
            canRedo,
            history
        }
    ] as const;
}
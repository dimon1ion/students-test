import {useLayoutEffect, useMemo, useState} from "react";
import useStore from "./use-store";
import { StoreInitStates } from "@src/services/store/types";
import shallowEqual from "shallowequal";

type TSelectorFunc<T> = (state: StoreInitStates) => T;

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selectorFunc {Function}
 * @return {*}
 */
export default function useSelector<SelectedProps>(selectorFunc: TSelectorFunc<SelectedProps>): SelectedProps {
  const store = useStore();

  const [state, setState] = useState(() => selectorFunc(store.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = selectorFunc(store.getState());
      setState(prevState => shallowEqual(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}

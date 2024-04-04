import Services from "src/services";
import Store from ".";
import StoreModule from "../module";

/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
class TaskModule<InitState extends object, Config extends object = object> extends StoreModule<InitState, Config> {

}

export default TaskModule;

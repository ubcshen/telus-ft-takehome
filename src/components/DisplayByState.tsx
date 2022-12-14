import styles from "./DisplayByState.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  hasStates: string[];
  states: string;
  setStates: Dispatch<SetStateAction<string>>;
}

export const DisplayByState = (props: Props) => {
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    props.setStates(e.target.value);
  };

  /* if select first option then return all state data */
  return (
    <div className={styles.displayByStates}>
      <select onChange={handleChange} value={props.states ? props.states : ""}>
        <option key="PlaceHolder" value="">
          State
        </option>
        {props.hasStates.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

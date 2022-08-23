import styles from "./Search.module.css";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
  addressInfo: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const Search = (props: Props) => {
  const handleChange = ({ target }: FormEvent<HTMLInputElement>) => {
    const { value } = target as HTMLInputElement;
    props.setSearch(value.toLowerCase());
  };

  return (
    <div className={styles.sortAndSearch}>
      <input
        className={styles.cityandNameSearch}
        value={props.addressInfo}
        placeholder="Name, City"
        onChange={handleChange}
      />
    </div>
  );
};

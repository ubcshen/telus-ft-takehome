import { useEffect, useState } from "react";
import { FarmerInfoType } from "../types/farmer.types";
import { FarmerInfo } from "./FarmerInfo";
import styles from "./FarmerTable.module.css";
import cx from "classnames"; // using this module,  we can have multiple classname for one element
import { Search } from "./Search";
import { DisplayByState } from "./DisplayByState";
import { Checkbox } from "./CheckBox";

export const FarmerTable = () => {
  const FARMER_INFO_PATH = "data/farmers.json";
  const [data, setData] = useState<FarmerInfoType[]>([]);
  const [farmerOrder, setFarmerOrder] = useState(false);
  const [states, setStates] = useState("");
  const [search, setSearch] = useState("");
  const [filterData, setfilterData] = useState<FarmerInfoType[]>([]);
  const [crop, setCrop] = useState(false);
  const [seed, setSeed] = useState(false);

  const getData = () => {
    fetch(FARMER_INFO_PATH)
      .then((e) => {
        return e.json();
      })
      .then((data) => {
        setData(data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const sortByName = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    setFarmerOrder(!farmerOrder);
    setData(
      data.sort((a, b) =>
        farmerOrder
          ? a.farmer_name.localeCompare(b.farmer_name)
          : b.farmer_name.localeCompare(a.farmer_name)
      )
    );
  };

  const stateInfo = data
    .map((item) => item.state)
    .filter((item, index, self) => {
      return self.indexOf(item) == index;
    });

  const firstSearchItem = search.trim().split(",")[0]
    ? search.trim().split(",")[0]
    : "";
  const secondSearchItem = search.trim().split(",")[1]
    ? search.trim().split(",")[1]
    : "";

  const nameSearch = (array: FarmerInfoType[]) => {
    return array.filter((item) => {
      return item.farmer_name.trim().toLowerCase().includes(firstSearchItem);
    });
  };

  const citySearch = (array: FarmerInfoType[]) => {
    return array.filter((item) => {
      return item.city.trim().toLowerCase().includes(secondSearchItem);
    });
  };

  const statesSearch = (array: FarmerInfoType[]) => {
    return array.filter((item) => {
      return item.state.toLowerCase().includes(states.toLowerCase());
    });
  };

  const cropSearch = (array: FarmerInfoType[]) => {
    return array.filter((item) => {
      return item.cp_spend > 0;
    });
  };

  const seedSearch = (array: FarmerInfoType[]) => {
    return array.filter((item) => {
      return item.seed_purchases > 0;
    });
  };

  const handleCrop = () => {
    setCrop(!crop);
  };

  const handleSeed = () => {
    setSeed(!seed);
  };

  useEffect(() => {
    let result = data;
    if (firstSearchItem.length > 0) result = nameSearch(result);
    if (secondSearchItem.length > 0) result = citySearch(result);
    if (states.length > 0) result = statesSearch(result);
    if (crop) result = cropSearch(result);
    if (seed) result = seedSearch(result);
    setfilterData(result);
  }, [search, states, seed, crop, data]);

  return (
    <>
      <div className={styles.sortAndSearch}>
        {stateInfo && (
          <DisplayByState
            hasStates={stateInfo}
            setStates={setStates}
            states={states}
          />
        )}
        {<Search addressInfo={search} setSearch={setSearch} />}
        <Checkbox
          label="Has Crop Protection Purchases"
          value={crop}
          onChange={handleCrop}
        />
        <Checkbox
          label="Has Seed Purchases"
          value={seed}
          onChange={handleSeed}
        />
      </div>
      <div className={styles.farmerTableResults}>
        Results: {filterData.length}
      </div>
      <div className={styles.farmerTable}>
        <div className={styles.farmerTableTH}>
          <span
            className={cx(styles.farmerTableHeader, styles.sortable)}
            onClick={sortByName}
          >
            Farmer Name <i className={styles.arrowDown}></i>
          </span>
          <span className={styles.farmerTableHeader}>City</span>
          <span className={styles.farmerTableHeader}>State</span>
          <span className={cx(styles.farmerTableHeader, styles.alignRight)}>
            Crop Protection Spend
          </span>
          <span className={styles.farmerTableHeader}>Seed(Bags)</span>
        </div>
        {filterData.map((item) => {
          return (
            <FarmerInfo {...item} key={item.cp_spend + item.farmer_name} />
          );
        })}
      </div>
    </>
  );
};

const FarmetTableUI = () => {}
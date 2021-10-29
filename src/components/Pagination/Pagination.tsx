import React from 'react';
import {IPaginationType, ITruck} from "../../types/interfaces";
import styles from "./Pagination.scss";
import {composeClasses} from "../../utils/generic";
import {ReactComponent as LeftArrow} from "../../assets/icons/leftarrow.svg";
import {ReactComponent as RightArrow} from "../../assets/icons/rightarrow.svg";

interface IPaginationProp {
  trucks: ITruck[];
  page: number;
  paginationInfo: IPaginationType;
  navigate: Function;
}
const Pagnation: React.SFC<IPaginationProp> = ({
   trucks,
   page,
   paginationInfo,
   navigate
}) => {

  return (
    <>
      {/** Pagination */}
      <div className={styles.pagination}>
        <div className={styles.paginationWrapper}>
          <p>
            <span
              className={(Number(page) <= 1) ? composeClasses(styles.arrows, styles.opacify) : styles.arrows}
              onClick={ () => {
                if(paginationInfo?.page)
                  navigate(paginationInfo && (paginationInfo?.page - 1));
              }}>
              <LeftArrow /> Prev
            </span>

            <span
              className={(trucks.length < 6) ? composeClasses(styles.arrows, styles.opacify) : styles.arrows}
              onClick={ () => {
                if(paginationInfo?.page)
                  navigate(paginationInfo && paginationInfo?.page + 1);
              }}>
              Next <RightArrow />
            </span>
          </p>
        </div>
      </div>
    </>
  )
};

export default Pagnation;

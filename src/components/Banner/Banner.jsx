import React from "react";
import styles from "./style.module.scss";
import Input from "@components/Input/Input";
import { SiTicktick } from "react-icons/si";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.banner__title}>
        Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu
      </h1>
      <div className={styles.box__search}>
        <Input placeholder="Tìm kiếm..." />
      </div>
      <div className={styles.box__endow}>
        <div className={styles.box__endow__item}>
          <SiTicktick />
          <p>
            Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
          </p>
        </div>
        <div className={styles.box__endow__item}>
          <SiTicktick />
          <p>
            Đặt khám theo giờ - Đặt càng sớm để có thể có số thứ tự thấp nhất
          </p>
        </div>
        <div className={styles.box__endow__item}>
          <SiTicktick />
          <p>Được hoàn tiền khi hủy khám - Có cơ hội nhận ưu đãi hoàn tiền</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

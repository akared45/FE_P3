import React from "react";
import Carousel from "@components/Carousel/Carousel";
import Introduction from "../../../components/Introduction/Introduction";
import Bs1 from "@images/blog-bs1.png";
import Bs2 from "@images/bs2.png";
import Bs3 from "@images/khamtainha.png";
import Bs4 from "@images/bs4.png";
import Bs5 from "@images/bs5.png";
import Subimg from "@images/partern.png";
import Subimg2 from "@images/Vector123.png";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Introduction
        title={"Đội ngũ bác sĩ"}
        description={
          "Đội ngũ bác sĩ tâm huyết, có trình độ chuyên môn cao và nhiều năm kinh nghiệm đang công tác tại các bệnh viện lớn Trung ương & Hà Nội."
        }
        img={Bs1}
      />
      <Introduction
        title={"Tư vấn trực tuyến"}
        description={
          "Bạn bận rộn và không sắp xếp được thời gian tới khám trong khi cần tư vấn với bác sỹ chuyên khoa? Doctor4U giúp bạn kết nối với bác sỹ dù bạn đang ở đâu với khung giờ linh hoạt."
        }
        img={Bs2}
        flexDirection={true}
        subimg={Subimg}
      />
      <Introduction
        title={"Khám bệnh tại nhà"}
        description={
          "Khám bệnh tại nhà hay còn gọi là bác sĩ gia đình là dịch vụ thăm khám, chăm sóc và quản lý sức khỏe của từng thành viên trong gia đình. Với đội ngũ bác sĩ được đào tạo bài bản, có nhiều năm kinh nghiệm, sự tận tâm, trách nhiệm và luôn hết lòng vì người bệnh, Doctor4U giúp mỗi gia đình an tâm theo dõi và chăm sóc sức khỏe cho từng cá nhân."
        }
        img={Bs3}
        flexDirection={false}
      />
      <Introduction
        title={"Chăm sóc bệnh mãn tính"}
        description={
          "Bạn cần bác sỹ chuyên khoa tư vấn khi gặp các vấn đề sức khỏe? Doctor4U là bác sỹ gia đình của bạn, cùng bạn theo dõi, chăm sóc bệnh mãn tính với đội ngũ bác sỹ chuyên khoa giàu kinh nghiệm."
        }
        img={Bs4}
        flexDirection={true}
        subimg={Subimg2}
      />
      <Introduction
        title={"Chăm sóc doanh nghiệp"}
        description={
          "Với đội ngũ bác sỹ và nhân viên y tế chuyên môn cao, tận tình và thấu hiểu, Doctor4U giúp chăm sóc sức khỏe của lực lượng nòng cốt của quý doanh nghiệp để họ có thể yên tâm công tác và cống hiến."
        }
        img={Bs5}
        flexDirection={false}
        subimg={Subimg}
      />
    </div>
  );
};

export default HomePage;

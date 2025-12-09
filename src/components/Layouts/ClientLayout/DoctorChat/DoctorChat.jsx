import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { IoChatbubblesOutline } from "react-icons/io5";
import { patients } from "@components/mock/patients.js";

export default function DoctorChat({ onOpen, onClose }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [activePatient, setActivePatient] = useState(0);
  const [message, setMessage] = useState("");

  // DANH SÁCH TIN NHẮN THEO TỪNG BỆNH NHÂN
  const [messages, setMessages] = useState(() => patients.map(() => []));

  // GHI CHÚ THEO MỖI BỆNH NHÂN
  const [notes, setNotes] = useState(() => patients.map(() => ""));

  const messagesEndRef = useRef(null);

  // thông báo ra ngoài để cha ẩn Chat khác
  useEffect(() => {
    if (open && !minimized) {
      onOpen?.("doctor"); // 🔥 BÁO RA NGOÀI
    }
    if (!open) {
      onClose?.("doctor"); // 🔥 BÁO RA NGOÀI
    }
  }, [open, minimized]);

  // auto scroll khi có tin nhắn mới
  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activePatient, open, minimized]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const copy = [...messages];
    copy[activePatient].push({
      from: "doctor",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/avatars/doctor.png",
    });

    setMessages(copy);
    setMessage("");

    // mô phỏng bệnh nhân trả lời
    setTimeout(() => {
      const reply = [...copy];
      reply[activePatient].push({
        from: "patient",
        text: "Dạ bác sĩ, em hiểu ạ!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: patients[activePatient].avatar,
      });
      setMessages(reply);
    }, 900);
  };

  return (
    <>
      {/* ICON NỔI */}
      {(!open || minimized) && (
        <button
          className={styles.floatingBtn}
          onClick={() => {
            setOpen(true);
            setMinimized(false);
            onOpen?.("doctor"); // báo mở popup
          }}
        >
          <IoChatbubblesOutline className={styles.floatingIcon} />
        </button>
      )}

      {/* POPUP */}
      {open && !minimized && (
        <div className={styles.chatPopup}>
          <div className={styles.chatBox}>
            {/* HEADER */}
            <header className={styles.header}>
              <div>
                <div className={styles.headerTitle}>
                  Phòng tư vấn #{activePatient + 1}
                </div>
                <div className={styles.headerSubtitle}>
                  {patients[activePatient].name} — {patients[activePatient].symptom}
                </div>
              </div>

              <div className={styles.headerRight}>
                <button
                  className={styles.minimizeBtn}
                  onClick={() => setMinimized(true)}
                >
                  ─
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
            </header>

            {/* BODY 3 CỘT */}
            <div className={styles.body3col}>
              {/* LEFT SIDEBAR */}
              <aside className={styles.roomSidebar}>
                <div className={styles.roomHeader}>Danh sách phòng</div>

                <button className={styles.joinBtn}>+ Tham gia</button>

                <div className={styles.roomList}>
                  {patients.map((p, i) => (
                    <div
                      key={i}
                      className={styles.roomItem}
                      onClick={() => setActivePatient(i)}
                    >
                      Phòng tư vấn #{i + 1}
                    </div>
                  ))}
                </div>
              </aside>

              {/* CHAT CENTER */}
              <section className={styles.chatPanel}>
                <div className={styles.messages}>
                  {messages[activePatient].length === 0 && (
                    <div className={styles.welcome}>
                      Xin chào {patients[activePatient].name}, bác sĩ có thể hỗ trợ gì cho bạn?
                    </div>
                  )}

                  {messages[activePatient].map((m, i) => (
                    <div
                      key={i}
                      className={`${styles.messageRow} ${
                        m.from === "doctor" ? styles.msgMe : styles.msgDoctor
                      }`}
                    >
                      {m.from !== "doctor" && (
                        <img src={m.avatar} className={styles.msgAvatar} />
                      )}

                      <div>
                        <div className={styles.msgBubble}>{m.text}</div>
                        <div className={styles.msgTime}>{m.time}</div>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef} />
                </div>

                {/* FOOTER INPUT */}
                <div className={styles.footer}>
                  <button className={styles.attachBtn}>📎</button>

                  <input
                    className={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />

                  <button className={styles.sendBtn} onClick={sendMessage}>
                    Gửi
                  </button>
                </div>
              </section>

              {/* RIGHT SIDEBAR */}
              <aside className={styles.infoSidebar}>
                <div className={styles.infoHeader}>Thông tin bệnh nhân</div>

                <div className={styles.patientCard}>
                  <img
                    src={patients[activePatient].avatar}
                    className={styles.infoAvatar}
                  />
                  <div className={styles.infoName}>
                    {patients[activePatient].name}
                  </div>
                  <div className={styles.infoSymptom}>
                    {patients[activePatient].symptom}
                  </div>
                </div>

                <div className={styles.infoTabs}>
                  <button className={styles.infoTab}>Hồ sơ khám</button>
                  <button className={styles.infoTab}>Kê đơn</button>
                  <button className={styles.infoTab}>Tiền sử</button>
                  <button className={styles.infoTab}>Chỉ định</button>
                </div>

                {/* NOTES */}
                <div className={styles.notesBox}>
                  <div className={styles.notesHeader}>Ghi chú của bác sĩ</div>

                  <textarea
                    className={styles.notesInput}
                    placeholder="Nhập ghi chú lâm sàng..."
                    value={notes[activePatient]}
                    onChange={(e) => {
                      const copy = [...notes];
                      copy[activePatient] = e.target.value;
                      setNotes(copy);
                    }}
                  />
                </div>

                <div className={styles.infoContent}>
                  <p>— Chọn mục để xem chi tiết —</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

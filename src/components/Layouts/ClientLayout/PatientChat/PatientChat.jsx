import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { IoChatbubblesOutline } from "react-icons/io5";

// Mock danh sách phòng
const rooms = [
  { id: 1, name: "Phòng tư vấn 1" },
  { id: 2, name: "Phòng tư vấn 2" },
  { id: 3, name: "Phòng tư vấn 3" },
];

export default function PatientChat({ onOpen, onClose }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");

  // Tin nhắn theo từng phòng
  const [messages, setMessages] = useState(() => rooms.map(() => []));

  const messagesEndRef = useRef(null);

  // Báo cho Layout biết để ẩn chat còn lại
  useEffect(() => {
    if (open && !minimized) onOpen?.("patient");
    if (!open) onClose?.("patient");
  }, [open, minimized]);

  // Auto scroll
  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeRoom, open, minimized]);

  const joinRoom = () => {
    if (activeRoom === null) setActiveRoom(0);
  };

  const sendMessage = () => {
    if (!message.trim() || activeRoom === null) return;

    const copy = [...messages];
    copy[activeRoom].push({
      from: "patient",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "/avatars/patient.png",
    });

    setMessages(copy);
    setMessage("");

    // Auto reply mô phỏng
    setTimeout(() => {
      const reply = [...copy];
      reply[activeRoom].push({
        from: "doctor",
        text: "Bác sĩ đã nhận được tin nhắn của bạn!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "/avatars/doctor.png",
      });
      setMessages(reply);
    }, 800);
  };

  return (
    <>
      {/* NÚT NỔI */}
      {(!open || minimized) && (
        <button
          className={styles.floatingBtn}
          onClick={() => {
            setOpen(true);
            setMinimized(false);
            onOpen?.("patient");
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
              <div className={styles.headerTitle}>
                {activeRoom !== null ? rooms[activeRoom].name : "Chat với bác sĩ"}
              </div>

              <div className={styles.headerRight}>
                <button className={styles.minimizeBtn} onClick={() => setMinimized(true)}>
                  ─
                </button>
                <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                  ✕
                </button>
              </div>
            </header>

            <div className={styles.body3col}>

              {/* SIDEBAR TRÁI */}
              <aside className={styles.roomSidebar}>
                <div className={styles.roomHeader}>Danh sách phòng</div>

                <button className={styles.joinBtn} onClick={joinRoom}>
                  + Tham gia phòng
                </button>

                <div className={styles.roomList}>
                  {rooms.map((r, i) => (
                    <div
                      key={i}
                      className={`${styles.roomItem} ${
                        activeRoom === i ? styles.activeRoom : ""
                      }`}
                      onClick={() => setActiveRoom(i)}
                    >
                      {r.name}
                    </div>
                  ))}
                </div>
              </aside>

              {/* KHU VỰC CHAT */}
              <section className={styles.chatPanel}>
                <div className={styles.messages}>
                  {activeRoom === null ? (
                    <div className={styles.welcome}>
                      Vui lòng chọn hoặc tham gia phòng để chat.
                    </div>
                  ) : (
                    <>
                      {messages[activeRoom].map((m, i) => (
                        <div
                          key={i}
                          className={`${styles.messageRow} ${
                            m.from === "patient" ? styles.msgMe : styles.msgDoctor
                          }`}
                        >
                          {m.from !== "patient" && (
                            <img src={m.avatar} className={styles.msgAvatar} />
                          )}

                          <div>
                            <div className={styles.msgBubble}>{m.text}</div>
                            <div className={styles.msgTime}>{m.time}</div>
                          </div>
                        </div>
                      ))}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* INPUT */}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

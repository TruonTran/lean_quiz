import { CONTACT } from "../config/contact";
import PageShell from "../components/PageShell";
import { panel } from "../components/adminStyles";
import { Link } from "react-router-dom";

const UPDATED = "09/11/2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={`${panel} space-y-2`}>
      <h2 className="text-lg font-bold text-yellow-300">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-zinc-300">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Quyền riêng tư"
      title="Chính sách quyền riêng tư"
      subtitle={`Quiz Cùng Cua · cập nhật ${UPDATED}`}
      backTo="/"
      backLabel="← Trang chủ"
    >
      <div className="mx-auto max-w-3xl space-y-5">
        <Section title="Quiz Cùng Cua là gì?">
          <p>
            Quiz Cùng Cua là trang web ôn tập cá nhân gồm làm trắc nghiệm, luyện thi viết và theo dõi
            thành tích học. Trang này giải thích mình thu thập dữ liệu gì và dùng vào việc gì.
          </p>
        </Section>

        <Section title="Dữ liệu mình thu thập">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <b>Email</b> của bạn, để tạo và đăng nhập tài khoản (kể cả khi bạn đăng nhập bằng Google).
            </li>
            <li>
              <b>Tên hiển thị</b> do bạn đặt (nếu chưa đặt, hệ thống tạo tên trung tính dạng “Người dùng
              AB12”). Bạn có thể đổi tên bất cứ lúc nào ở trang Thành tích.
            </li>
            <li>
              <b>Thành tích học:</b> mỗi ngày bạn làm bao nhiêu câu và đúng bao nhiêu câu. Mình không lưu
              nội dung từng câu bạn đã chọn trên máy chủ.
            </li>
            <li>
              <b>Số liệu truy cập</b> (trang bạn xem, thiết bị, trình duyệt, khu vực ước tính) do{" "}
              <b>Google Analytics</b> thu thập qua cookie, để mình biết web có người dùng và cải thiện nội dung.
            </li>
            <li>
              <b>Bài viết thi viết, ghi chú và đáp án</b> bạn làm được lưu <b>ngay trên trình duyệt của bạn</b>
              (localStorage), không gửi lên máy chủ của mình.
            </li>
          </ul>
        </Section>

        <Section title="Khi bạn đăng nhập bằng Google">
          <p>
            Mình chỉ nhận thông tin cơ bản từ Google để đăng nhập (địa chỉ email, và các thông tin hồ sơ
            cơ bản mà Google trả về trong quá trình đăng nhập). Mình chỉ dùng email để tạo tài khoản.
            Tên và ảnh Google <b>không</b> được hiển thị công khai. Mình không đọc Gmail, Drive,
            danh bạ hay bất kỳ dữ liệu nào khác trong tài khoản Google của bạn.
          </p>
        </Section>

        <Section title="Mình dùng dữ liệu để làm gì">
          <ul className="list-disc space-y-1 pl-5">
            <li>Cho bạn đăng nhập và làm quiz.</li>
            <li>Tính và hiển thị thành tích theo tuần, tháng, năm.</li>
            <li>
              Hiển thị <b>tên hiển thị</b>, số câu và tỉ lệ đúng của bạn trên bảng xếp hạng, cho những
              người dùng đã đăng nhập khác xem. Email của bạn không bao giờ hiện trên bảng xếp hạng.
            </li>
          </ul>
          <p>Mình không bán dữ liệu, không chạy quảng cáo và không chia sẻ dữ liệu của bạn cho bên thứ ba vì mục đích thương mại. Các dịch vụ vận hành web được nêu ở phần bên dưới.</p>
        </Section>

        <Section title="Lưu trữ và bên cung cấp dịch vụ">
          <p>
            Tài khoản và thành tích được lưu trên <b>Supabase</b> (dịch vụ cơ sở dữ liệu và xác thực);
            trang web được phát hành qua nền tảng hosting của bên thứ ba; số liệu truy cập do
            <b> Google Analytics</b> xử lý. Các bên này xử lý dữ liệu để vận hành dịch vụ theo chính sách của
            họ. Bạn có thể tắt cookie hoặc dùng tiện ích chặn Google Analytics trên trình duyệt nếu không muốn
            bị tính vào thống kê.
          </p>
        </Section>

        <Section title="Quyền của bạn">
          <ul className="list-disc space-y-1 pl-5">
            <li>Đổi tên hiển thị bất cứ lúc nào ở trang Thành tích.</li>
            <li>
              Yêu cầu <b>xoá tài khoản</b> và toàn bộ thành tích của bạn bằng cách liên hệ mình, mình sẽ
              xoá khi nhận được yêu cầu.
            </li>
            <li>Xoá bài viết, ghi chú lưu trên trình duyệt bằng cách xoá dữ liệu trang web trong cài đặt trình duyệt.</li>
          </ul>
        </Section>

        <Section title="Liên hệ">
          <p>
            Có thắc mắc hoặc muốn xoá dữ liệu, hãy xem trang{" "}
            <Link to="/contact" className="text-yellow-200 underline">
              Liên hệ
            </Link>
            {CONTACT.email ? (
              <>
                {" "}hoặc gửi email tới <b className="text-yellow-200">{CONTACT.email}</b>
              </>
            ) : null}
            .
          </p>
          <p className="text-xs text-zinc-500">
            Khi chính sách thay đổi, mình sẽ cập nhật trang này và ngày cập nhật ở đầu trang.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}

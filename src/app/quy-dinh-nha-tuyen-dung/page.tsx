import { getMetadataToScreen } from "@/module/helper/api-generate-metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch dữ liệu từ server hoặc API (nếu cần thiết)

  const data = await getMetadataToScreen("ruleHumanPage");

  return {
    title: data?.metaTitle || "Default Title",
    description: data?.metaDes || "Default Description",
    keywords: [data?.metaKeyWord],
    authors: [{ name: data?.metaAuthor }],
    openGraph: {
      title: data?.metaTitle,
      description: data?.metaDes,
      images: data?.metaImage ? [{ url: data?.metaImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.metaTitle,
      description: data?.metaDes,
      images: data?.coverFullLink
        ? [{ url: data?.metaImage, alt: data?.metaTitle }]
        : undefined,
    },
  };
}

export default function Regulation() {
  return (
    <div className="bg-white max-1280:mx-2">
      <div className="mx-auto container">
        <div className="uppercase text-base font-bold text-default">
          QUY ĐỊNH DÀNH CHO NHÀ TUYỂN DỤNG
        </div>
        <div>
          <div className="font-bold mb-4">I. Quy định chung:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Chính sách bảo mật và quy định sử dụng này được áp dụng cho mọi
              hoạt động truy cập và sử dụng dịch vụ trên website tuyển dụng
              <span className="font-medium">Topmass.vn</span> (gọi tắt là
              “Website Topmass”) thuộc sở hữu của{" "}
              <span className="font-medium">
                Công ty Cổ phần Nguồn Nhân Lực Topmass Việt Nam
              </span>{" "}
              (sau đây gọi là &quot;Công ty&quot;). Bằng việc truy cập và sử
              dụng Website Topmass, bạn, với tư cách là &quot;Người dùng&quot;
              hoặc &quot;Khách hàng&quot; (trừ khi ngữ cảnh yêu cầu khác), mặc
              nhiên chấp thuận tuân thủ các điều khoản và điều kiện sử dụng được
              quy định dưới đây.
            </li>
            <li>
              Nếu bạn không đồng ý với bất kỳ điều khoản nào trong Chính sách
              này, bạn sẽ không được phép tiếp tục truy cập hoặc sử dụng các
              dịch vụ của chúng tôi. Trong trường hợp chúng tôi có sự thay đổi
              hay cập nhật chính sách, thông báo sẽ được đưa ra, và việc tiếp
              tục sử dụng dịch vụ sau thông báo sẽ đồng nghĩa với việc bạn chấp
              thuận các điều khoản đã sửa đổi.
            </li>
            <li>
              Để đảm bảo sự minh bạch, nếu bạn có bất kỳ thắc mắc hoặc câu hỏi
              nào liên quan đến bản Chính sách này, xin vui lòng liên hệ với
              chúng tôi qua email{" "}
              <span className="font-medium">support@topmass.vn</span>.
            </li>
            <li>
              Công ty cam kết bảo mật thông tin cá nhân của bạn một cách tuyệt
              đối và chỉ thu thập, lưu trữ và xử lý các thông tin cần thiết để
              cung cấp dịch vụ. Mọi thông tin được cung cấp bởi khách hàng sẽ
              được sử dụng đúng mục đích, không tiết lộ cho bên thứ ba ngoại trừ
              trường hợp bắt buộc theo quy định của pháp luật
            </li>
          </ul>
          <p>
            Xin vui lòng đọc kỹ và hiểu rõ các quy định dưới đây trước khi sử
            dụng dịch vụ.
          </p>
        </div>
        <div className="mt-4">
          <div className="font-bold mb-4">II. Định nghĩa:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              <span className="font-medium">Cơ sở dữ liệu Topmass.vn</span>: Bao
              gồm toàn bộ các thông tin liên quan đến việc làm, bao gồm các bài
              đăng tuyển dụng, thông tin của người tìm việc, nhà tuyển dụng và
              bất kỳ dữ liệu nào khác được lưu trữ hoặc xuất bản trên hệ thống
              của Topmass. Điều này áp dụng cho tất cả các trang con của
              Topmass.vn.
            </li>
            <li>
              <span className="font-medium">Dịch vụ Topmass</span>: Bao gồm tất
              cả các dịch vụ mà Topmass cung cấp cho người dùng, nhà tuyển dụng
              và người tìm việc, từ việc đăng tải thông tin tuyển dụng, tạo hồ
              sơ tìm việc đến các dịch vụ hỗ trợ khác liên quan.
            </li>
            <li>
              <span className="font-medium">Hồ sơ cá nhân</span>: Là các thông
              tin chi tiết về cá nhân, bao gồm tên, địa chỉ, kinh nghiệm làm
              việc, học vấn, kỹ năng chuyên môn và các thông tin liên quan khác,
              được người dùng tạo và lưu trữ trên hệ thống của Topmass.
            </li>
            <li>
              <span className="font-medium">Văn bản</span>: Bao gồm toàn bộ các
              văn bản, tài liệu, thông tin và nội dung hiển thị trên các trang
              của Topmass, không phân biệt nội dung đó là tài liệu có xác định
              tác giả hay là các hướng dẫn tìm kiếm được cung cấp cho người
              dùng.
            </li>
            <li>
              <span className="font-medium">Người dùng</span>: Là bất kỳ cá nhân
              hoặc tổ chức nào truy cập vào trang web Topmass.vn và sử dụng bất
              kỳ dịch vụ nào do Topmass cung cấp. Người dùng có thể là người tìm
              việc, nhà tuyển dụng, hoặc bất kỳ bên nào tham gia vào hệ sinh
              thái của Topmass.
            </li>
            <li>
              <span className="font-medium">Người tìm việc</span>: Đề cập đến
              những cá nhân có nhu cầu tìm kiếm cơ hội việc làm và đã tạo hồ sơ
              hoặc CV trên Topmass.vn, hoặc có hành vi tìm kiếm và ứng tuyển vào
              các vị trí công việc đăng tải trên nền tảng này.
            </li>
            <li>
              <span className="font-medium">Nhà tuyển dụng</span>:Là các cá
              nhân, tổ chức hoặc doanh nghiệp đăng ký sử dụng dịch vụ của
              Topmass để đăng tin tuyển dụng, tìm kiếm ứng viên và thực hiện các
              hoạt động tuyển dụng trên website tuyển dụng Topmass.vn.
            </li>
          </ul>
          <p>
            Các định nghĩa này nhằm đảm bảo rằng người dùng hiểu rõ các thuật
            ngữ và phạm vi dịch vụ mà Topmass cung cấp, đồng thời tạo ra sự rõ
            ràng trong quá trình sử dụng nền tảng
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">III. Dịch vụ và Đăng ký:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              <span className="font-medium">Topmass.vn</span> là một nền tảng
              trực tuyến được phát triển nhằm hỗ trợ người dùng trong việc đăng
              tin tuyển dụng, tìm kiếm công việc hoặc tương tác với nhau.
              Website này được sở hữu và vận hành bởi Công ty Cổ phần Vietstar
              Group. Topmass.vn chứa nhiều loại nội dung như thông tin, tin tức,
              văn bản, hình ảnh, âm thanh, video, và nhiều nội dung khác (gọi
              chung là &quot;nội dung&quot;). Người dùng có thể truy cập và sử
              dụng các khu vực tương tác của trang web như đăng tin tuyển dụng,
              tải lên các tệp phương tiện, và tạo hồ sơ cá nhân.
            </li>
            <li>
              Để sử dụng đầy đủ các tính năng và dịch vụ của Topmass.vn, người
              dùng cần đăng ký tài khoản và cung cấp một số thông tin cá nhân
              như địa chỉ email để hỗ trợ việc liên lạc. Khi đăng ký tài khoản,
              bạn đồng ý nhận thông báo qua email, tin nhắn hoặc các hình thức
              truyền thông khác liên quan đến sản phẩm và dịch vụ của Topmass.
              Bạn có quyền từ chối nhận các thông báo này bất cứ lúc nào bằng
              cách hủy đăng ký qua các tùy chọn có sẵn trên website hoặc liên
              kết ở cuối mỗi email. Các thông tin cá nhân của bạn sẽ được xử lý
              và bảo mật theo Chính sách Bảo mật của Topmass.
            </li>
            <li>
              Người dùng có thể mua các dịch vụ hoặc sản phẩm với mức giá đã
              niêm yết trên trang web. Giao dịch mua bán chỉ hoàn tất sau khi
              việc thanh toán được xác nhận. Công ty bảo lưu quyền thay đổi các
              dịch vụ, sản phẩm, giá cả và phương thức thanh toán bất kỳ lúc nào
              mà không cần thông báo trước.
            </li>
            <li>
              Khi tạo tài khoản trên Topmass.vn, bạn sẽ được yêu cầu đặt một mật
              khẩu. Để đảm bảo an toàn, bạn phải giữ mật khẩu của mình bảo mật
              và không chia sẻ với bất kỳ ai. Nếu phát hiện hoặc nghi ngờ mật
              khẩu bị tiết lộ, bạn cần thông báo ngay cho Topmass qua email{" "}
              <span className="font-medium">support@topmass.vn</span>.
            </li>
            <li>
              Trong trường hợp Topmass phát hiện hành vi vi phạm bảo mật hoặc sử
              dụng trang web sai mục đích, chúng tôi có thể yêu cầu bạn thay đổi
              mật khẩu hoặc tạm ngưng tài khoản của bạn để đảm bảo an toàn.
            </li>
            <li>
              Nếu bạn mất mật khẩu hoặc sử dụng tài khoản không đúng mục đích,
              bạn sẽ phải chịu trách nhiệm cho mọi tổn thất phát sinh và bồi
              thường đầy đủ cho Topmass nếu có thiệt hại xảy ra.
            </li>
          </ul>
          <p>
            Những điều khoản này được thiết lập nhằm đảm bảo người dùng hiểu rõ
            trách nhiệm của mình khi sử dụng dịch vụ, đồng thời đảm bảo tính bảo
            mật và an toàn cho cả hệ thống và người dùng.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">
            IV. Quyền và Nghĩa vụ của Nhà tuyển dụng
          </div>
          <div className="font-bold mb-2">Quyền của Nhà tuyển dụng:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Khi đăng ký trở thành Nhà tuyển dụng trên nền tảng tuyển dụng
              Topmass (tuyendung.Topmass.vn) và được chấp thuận, Nhà tuyển dụng
              sẽ được cấp một tài khoản đăng nhập gồm tên đăng ký và mật khẩu cá
              nhân. Thông qua tài khoản này, Nhà tuyển dụng có thể quản lý các
              hồ sơ đăng tuyển và thông tin liên quan đến vị trí công việc trên
              trang tuyendung.Topmass.vn.
            </li>
            <li>
              Nhà tuyển dụng có thể được hưởng các chính sách ưu đãi, khuyến mãi
              từ Topmass hoặc các đối tác liên kết. Những thông tin ưu đãi này
              sẽ được công bố trực tiếp trên website hoặc gửi qua email đến Nhà
              tuyển dụng.
            </li>
            <li>
              Nhà tuyển dụng có quyền tiếp cận dữ liệu cá nhân của Người tìm
              việc một cách hợp pháp sau khi được sự đồng ý từ Người tìm việc -
              chủ sở hữu dữ liệu. Người tìm việc có quyền yêu cầu chỉnh sửa, xóa
              hoặc ngừng sử dụng dữ liệu của họ bất cứ lúc nào.
            </li>
            <li>
              Nhà tuyển dụng có quyền đóng góp ý kiến, kiến nghị cho Topmass
              trong quá trình sử dụng dịch vụ. Các góp ý có thể được gửi qua
              email: <span className="font-medium">support@topmass.vn</span>.
            </li>
          </ul>
          <div className="font-bold mb-2">Nghĩa vụ của Nhà tuyển dụng:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Nhà tuyển dụng có trách nhiệm tuân thủ các quy định của pháp luật
              về sử dụng, bảo mật và xử lý dữ liệu cá nhân của Người tìm việc,
              đồng thời cam kết sử dụng dữ liệu này đúng theo thỏa thuận đã được
              ký kết giữa các bên. Nhà tuyển dụng hoàn toàn chịu trách nhiệm
              trước pháp luật nếu có bất kỳ vi phạm nào liên quan đến việc sử
              dụng, kiểm soát và xử lý dữ liệu cá nhân.
            </li>
            <li>
              Nếu có bất kỳ yêu cầu nào từ Người tìm việc về việc xóa, chỉnh sửa
              hoặc ngừng sử dụng dữ liệu cá nhân, Nhà tuyển dụng phải thực hiện
              đầy đủ và kịp thời theo quy định pháp luật.
            </li>
            <li>
              Nhà tuyển dụng cần thực hiện các biện pháp bảo mật kỹ thuật và tổ
              chức phù hợp để đảm bảo rằng dữ liệu cá nhân của Người tìm việc
              được xử lý an toàn, đúng quy định.
            </li>
            <li>
              Nhà tuyển dụng phải tự bảo vệ tài khoản, mật khẩu và các thông tin
              liên quan của mình, chịu trách nhiệm về mọi hoạt động xảy ra dưới
              tên đăng ký và mật khẩu của mình. Trong trường hợp phát hiện hành
              vi gian lận, vi phạm bảo mật hoặc lạm dụng tài khoản, Nhà tuyển
              dụng phải thông báo ngay cho Topmass để có biện pháp xử lý kịp
              thời.
            </li>
            <li>
              Nhà tuyển dụng cam kết các thông tin cung cấp cho Topmass là chính
              xác, đầy đủ và luôn được cập nhật. Trong trường hợp thay đổi thông
              tin, Nhà tuyển dụng phải đảm bảo rằng thông tin trên hệ thống
              Topmass là đúng và đầy đủ.
            </li>
            <li>
              Nhà tuyển dụng có trách nhiệm với mọi nội dung đăng tải lên
              Topmass và phải tuân thủ các quy định pháp luật về bản quyền,
              quyền sở hữu trí tuệ, bảo mật, và các quy định khác có liên quan.
              Các hành vi như đăng nội dung vi phạm bản quyền, bí mật thương
              mại, xúc phạm người khác hoặc đăng tải nội dung không phù hợp sẽ
              bị nghiêm cấm.
            </li>
            <li>
              Nhà tuyển dụng cam kết không sử dụng dữ liệu của Người tìm việc
              cho bất kỳ mục đích nào khác ngoài việc tuyển dụng. Việc tiếp cận,
              sử dụng dữ liệu phải nhằm mục đích đánh giá và quản lý ứng viên,
              liên lạc với Người tìm việc về công việc, đánh giá hồ sơ và các
              hoạt động tuyển dụng khác đã được thỏa thuận trong hợp đồng với
              Topmass.
            </li>
            <li>
              Nhà tuyển dụng không được phép chia sẻ hoặc phát tán thông tin hồ
              sơ cá nhân của Người tìm việc cho bên thứ ba nếu chưa có sự đồng ý
              từ cả Topmass và Người tìm việc. Mọi hành vi gửi thư rác, quảng
              cáo sản phẩm, dịch vụ cho Người tìm việc hoặc các Nhà tuyển dụng
              khác mà không có sự cho phép đều bị nghiêm cấm.
            </li>
            <li>
              Nhà tuyển dụng chịu trách nhiệm về tính chính xác và nội dung của
              bất kỳ hồ sơ, thông tin nào được đăng tải trên Topmass.
            </li>
          </ul>
          <p>
            Những điều khoản này giúp bảo vệ quyền lợi của cả Nhà tuyển dụng và
            Người tìm việc, đồng thời đảm bảo rằng mọi hoạt động đều tuân thủ
            quy định pháp luật và quy chế sử dụng của Topmass.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">V. Quyền và Nghĩa vụ của Topmass</div>
          <div className="font-bold mb-2">1. Quyền của Topmass:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Topmass sẽ cung cấp dịch vụ cho Nhà tuyển dụng sau khi hoàn tất
              các thủ tục và điều kiện cần thiết, bao gồm (nhưng không giới hạn)
              việc xác nhận thông tin mà Nhà tuyển dụng dự định đăng tải trên
              nền tảng tuyendung.Topmass.vn.
            </li>
            <li>
              <p>
                Topmass có quyền từ chối cung cấp dịch vụ cho những cá nhân, tổ
                chức thuộc các trường hợp sau đây, theo quy định pháp luật hoặc
                căn cứ vào đánh giá nội bộ:
              </p>
              <ul className="list-disc pl-10 space-y-2 mb-4">
                <li>
                  Hoạt động trong các lĩnh vực như đánh bạc, casino, bao gồm
                  nhưng không giới hạn bởi các hình thức như: xóc đĩa, sàn giao
                  dịch nhị phân, poker, bầu cua, cá cược, đá gà, đua xe, và các
                  hình thức tương tự.
                </li>
                <li>
                  Cạnh tranh trực tiếp với các hoạt động kinh doanh của Topmass
                  trong lĩnh vực tuyển dụng và cung cấp nhân sự.
                </li>
                <li>
                  Điều hành các website hoặc ứng dụng có liên quan đến tuyển
                  dụng, nhằm thu lợi nhuận từ các dịch vụ tương tự của Topmass.
                </li>
                <li>
                  Sử dụng thông tin từ dịch vụ của Topmass không nhằm mục đích
                  tuyển dụng thực tế cho tổ chức hay cá nhân.
                </li>
                <li>
                  Thực hiện các hành vi gian lận, gây ảnh hưởng đến quyền lợi
                  của ứng viên hoặc Nhà tuyển dụng khác
                </li>
              </ul>
            </li>
            <li>
              <p>
                Nếu sau khi cung cấp dịch vụ, Topmass phát hiện Nhà tuyển dụng
                thuộc một trong các trường hợp nêu trên, Topmass có quyền thực
                hiện:
              </p>
              <ul className="list-disc pl-10 space-y-2 mb-4">
                <li>
                  Chấm dứt cung cấp dịch vụ và thông báo cho Nhà tuyển dụng
                </li>
                <li>Gỡ bỏ toàn bộ tin đăng tuyển (nếu có)</li>
                <li>Vô hiệu hóa tài khoản của Nhà tuyển dụng trên nền tảng</li>
                <li>
                  Sử dụng thông tin từ dịch vụ của Topmass không nhằm mục đích
                  tuyển dụng thực tế cho tổ chức hay cá nhân.
                </li>
                <li>
                  Không hoàn trả bất kỳ khoản phí dịch vụ đã thanh toán nhưng
                  chưa sử dụng
                </li>
              </ul>
            </li>
            <li>
              <p>
                Nếu phát hiện Nhà tuyển dụng vi phạm quy định về xử lý dữ liệu
                cá nhân, Topmass có quyền tạm khóa tài khoản để điều tra. Nếu
                Nhà tuyển dụng không chứng minh được việc tuân thủ pháp luật,
                Topmass có thể thực hiện các biện pháp xử lý như:
              </p>
              <ul className="list-disc pl-10 space-y-2 mb-4">
                <li>
                  Khóa hoặc hủy tài khoản của Nhà tuyển dụng mà không hoàn trả
                  khoản phí chưa sử dụng;
                </li>
                <li>
                  Nhà tuyển dụng phải chịu trách nhiệm và bị xử lý theo quy định
                  pháp luật về việc vi phạm.
                </li>
              </ul>
            </li>
            <li>
              Topmass có quyền từ chối cung cấp dịch vụ nếu phát hiện Nhà tuyển
              dụng chia sẻ tài khoản hoặc sử dụng tài khoản không đúng mục đích
              tuyển dụng đã đăng ký.
            </li>
            <li>
              Trong trường hợp phát hiện các dấu hiệu bất thường như lưu lượng
              truy cập cao (giống như hệ thống quét dữ liệu tự động), Topmass có
              quyền khóa tài khoản để bảo vệ hệ thống và dữ liệu người dùng.
              Quyết định của Topmass về vấn đề này sẽ là quyết định cuối cùng.
            </li>
          </ul>
          <div className="font-bold mb-2">2.Nghĩa vụ của Topmass:</div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Topmass chỉ đóng vai trò là nền tảng đăng tải cơ hội việc làm từ
              Nhà tuyển dụng và đơn xin việc từ Người tìm việc. Topmass không
              can thiệp vào quá trình giao dịch giữa hai bên, không kiểm soát
              chất lượng, tính hợp pháp hay độ an toàn của các công việc hoặc hồ
              sơ đăng tải.
            </li>
            <li>
              Topmass không chịu trách nhiệm về các nguy cơ phát sinh từ việc
              tương tác giữa các thành viên trên nền tảng, như việc liên hệ với
              người lạ, quốc tịch nước ngoài hoặc các hành vi không hợp pháp.
            </li>
            <li>
              Mọi quyết định tuyển dụng từ phía Nhà tuyển dụng hay từ chối từ
              phía Người tìm việc là trách nhiệm của các bên liên quan. Topmass
              không chịu trách nhiệm pháp lý đối với các quyết định này.
            </li>
          </ul>
          <div className="font-bold mb-2">
            3.Trách nhiệm pháp lý của Topmass:
          </div>
          <ul className="list-disc pl-10 space-y-2 mb-4">
            <li>
              Topmass không chịu trách nhiệm về nội dung thông tin được cung cấp
              bởi người dùng, cũng như không kiểm soát các thông tin do thành
              viên đăng tải lên nền tảng.
            </li>
          </ul>
          <p>
            Trong trường hợp phát hiện hành vi vi phạm, Topmass có quyền xóa,
            khóa tài khoản của người vi phạm mà không cần báo trước.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">VI. Điều khoản sử dụng dịch vụ</div>
          <p>
            <span className="font-medium">
              1. Quy định về thanh toán và hủy dịch vụ
            </span>
            : Sau khi bạn đã thanh toán phí dịch vụ và kích hoạt các dịch vụ đã
            đăng ký, Topmass không chấp nhận các yêu cầu tạm dừng, hủy bỏ dịch
            vụ hoặc hoàn phí. Việc thay đổi dịch vụ sau khi đã thanh toán cũng
            không được chấp nhận.
          </p>
          <p>
            <span className="font-medium">2. Tạo tài khoản</span>: Bạn có trách
            nhiệm tự tạo tài khoản và đặt mật khẩu để sử dụng các dịch vụ trên
            website Topmass. Tài khoản này phải được bảo mật và tuân thủ các quy
            định hiện hành của nền tảng
          </p>
          <p>
            <span className="font-medium">3. Đăng tải nội dung tuyển dụng</span>
            : Bạn có quyền đăng tải thông tin tuyển dụng của mình hoặc liên kết
            trang web tuyển dụng riêng trên Topmass. Bạn phải chịu trách nhiệm
            hoàn toàn về tính chính xác, hợp pháp của thông tin đăng tải và
            không được phép đưa các phương thức liên lạc trực tiếp như địa chỉ
            email, số điện thoại, số fax vào thông tin tuyển dụng.
          </p>
          <p>
            <span className="font-medium">4. Kích hoạt dịch vụ</span>: Bạn phải
            kích hoạt các dịch vụ đã mua trong khoảng thời gian quy định. Nếu
            hết hạn mà chưa kích hoạt, dịch vụ đó sẽ không còn giá trị.
          </p>
          <div className="font-bold mb-2">
            Quyền và trách nhiệm của người sử dụng:
          </div>
          <p>
            <span className="font-medium">
              Đăng ký tài khoản hàng loạt hoặc tự động
            </span>
            : Việc đăng ký tài khoản hàng loạt hoặc tự động được xem là hành vi
            vi phạm nếu không được sự cho phép của Topmass. Những tài khoản này
            sẽ bị xử lý theo các quy định tại Điều khoản và Điều kiện của chúng
            tôi.
          </p>
          <p>
            <span className="font-medium">Sử dụng sai mục đích</span>: Mọi hành
            vi lạm dụng hoặc sử dụng dịch vụ không đúng với mục đích tuyển dụng
            sẽ bị xem là vi phạm. Topmass có quyền tạm ngừng cung cấp dịch vụ
            nếu phát hiện vi phạm này.
          </p>
          <p>
            <span className="font-medium">Quấy rối người dùng khác</span>:
            Topmass mong muốn tạo ra môi trường lành mạnh cho mọi hoạt động
            tuyển dụng. Bạn cần cân nhắc khi đăng nội dung lên vùng tương tác,
            tránh các hành vi quấy rối, gửi thư rác hoặc làm phiền người dùng
            khác. Nếu nhận được phản ánh về hành vi không phù hợp, Topmass có
            quyền tạm dừng dịch vụ mà không cần thông báo trước.
          </p>
          <p>
            <span className="font-medium">
              Yêu cầu người ứng tuyển nộp tiền
            </span>
            : Topmass không cho phép Nhà tuyển dụng yêu cầu ứng viên nộp tiền
            dưới bất kỳ hình thức nào, trừ các trường hợp đặc biệt liên quan đến
            chi phí hợp pháp như giấy phép lao động, chi phí đào tạo. Nếu vi
            phạm, Topmass có quyền tạm dừng hoặc hủy bỏ dịch vụ của Nhà tuyển
            dụng mà không cần báo trước.
          </p>
          <p>
            <span className="font-medium">
              Tự chịu trách nhiệm khi tương tác với người dùng khác
            </span>
            : Trong trường hợp bạn bị yêu cầu chi trả bất kỳ khoản tiền nào, bạn
            cần tự đánh giá và thận trọng trong việc quyết định. Topmass sẽ
            không chịu trách nhiệm cho bất kỳ rủi ro hay thiệt hại nào mà bạn có
            thể gặp phải trong quá trình tương tác với các người dùng khác trên
            nền tảng.
          </p>

          <p>
            <span className="font-medium">Báo cáo vi phạm</span>: Nếu bạn cho
            rằng người dùng khác có hành vi không phù hợp, bạn có thể thông báo
            với chúng tôi để được xử lý.
          </p>
          <p>
            <span className="font-medium">
              Vùng tương tác và quản lý nội dung
            </span>
            : Topmass cung cấp các khu vực tương tác như diễn đàn, bình luận
            hoặc phản hồi thời gian thực giữa người dùng. Bạn cần hiểu rằng
            chúng tôi không thể kiểm soát hết mọi thông tin được chia sẻ tại các
            khu vực này và không chịu trách nhiệm về nội dung do người dùng khác
            cung cấp. Tuy nhiên, Topmass có quyền giám sát và can thiệp khi cần
            thiết, như khi phát hiện nội dung vi phạm luật pháp hoặc chính sách
            của chúng tôi.
          </p>
          <p>
            <span className="font-medium">
              Quản lý nội dung tại vùng tương tác
            </span>
            : Bạn đồng ý rằng việc sử dụng các vùng tương tác sẽ tuân theo quy
            định của Thỏa thuận này và các quy định bổ sung khác. Topmass có
            quyền loại bỏ hoặc cấm các nội dung vi phạm và giữ quyền từ chối
            đăng tải nội dung mà chúng tôi cho rằng vi phạm quy định hoặc ảnh
            hưởng đến quyền lợi của người dùng khác.
          </p>
          <p>
            <span className="font-medium">
              Quyền giám sát và xử lý nội dung
            </span>
            : Topmass có quyền giám sát các vùng tương tác và tiết lộ thông tin
            nếu cần thiết theo yêu cầu của cơ quan có thẩm quyền. Chúng tôi sẽ
            loại bỏ hoặc yêu cầu loại bỏ nội dung vi phạm khi phát hiện.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">VII. Quyền Sở Hữu Trí Tuệ</div>
          <p>
            <span className="font-medium">
              1. Nội dung trên Website Topmass
            </span>
            : Khi sử dụng Website Topmass, bạn hiểu và đồng ý rằng mọi nội dung
            trên trang web này, bao gồm các quyền sở hữu trí tuệ như bản quyền,
            thương hiệu và các quyền sở hữu khác, đều được bảo vệ theo quy định
            pháp luật. Những quyền này áp dụng cho tất cả các phương tiện truyền
            thông hiện tại và tương lai. Trừ khi có điều khoản cụ thể khác, mọi
            việc sử dụng nội dung trên Website Topmass phải tuân theo luật bản
            quyền và sở hữu trí tuệ hiện hành.
          </p>
          <p>
            <span className="font-medium">
              2. Quyền và trách nhiệm khi sử dụng nội dung
            </span>
            : Bạn xác nhận rằng toàn bộ nội dung trên Website Topmass, bao gồm
            nhưng không giới hạn ở các hồ sơ ứng viên, thuộc quyền sở hữu độc
            quyền của Topmass và Navigos Group. Bạn không được phép sao chép,
            thay đổi, phân phối, công khai hoặc sử dụng nội dung cho mục đích
            thương mại mà không có sự cho phép bằng văn bản. Tuy nhiên, bạn có
            thể:
          </p>
          <ul className="list-upper-roman pl-10 space-y-2 mb-4">
            <li>
              Tạo một bản sao nội dung để sử dụng trên thiết bị cá nhân của mình
              dưới dạng kỹ thuật số hoặc giấy tờ.
            </li>
            <li>
              In các bản sao của một phần hoặc toàn bộ nội dung phục vụ cho mục
              đích cá nhân.
            </li>
            <li>
              Phân phối một số lượng hợp lý các bản sao của nội dung cho mục
              đích sử dụng nội bộ, nhưng không nhằm mục đích thương mại.
            </li>
          </ul>
          <p>
            <span className="font-medium">
              3. Điều kiện sao chép và sử dụng nội dung
            </span>
            : Mọi bản sao được phép của nội dung đều phải giữ nguyên thông tin
            về quyền sở hữu trí tuệ, bao gồm thông báo về bản quyền và nguồn gốc
            nội dung từ Website Topmass (kèm URL gốc). Việc tải xuống hoặc in
            nội dung không đồng nghĩa với việc bạn có quyền sở hữu trí tuệ đối
            với nội dung đó. Bất kỳ hành vi sao chép hoặc sử dụng nội dung cho
            mục đích thương mại mà không có sự chấp thuận trước đều sẽ bị coi là
            vi phạm và sẽ bị xử lý theo quy định pháp luật cũng như các điều
            khoản của thỏa thuận này.
          </p>
          <p>
            <span className="font-medium">
              4. Nội dung do người dùng cung cấp
            </span>
            : Khi bạn tải lên hoặc chia sẻ bất kỳ nội dung nào trên Website
            Topmass, bạn đảm bảo rằng bạn có quyền sở hữu trí tuệ với nội dung
            đó, hoặc đã được người sở hữu quyền sở hữu trí tuệ ủy quyền rõ ràng
            cho phép đăng tải nội dung trên Internet và Website Topmass mà không
            có bất kỳ hạn chế nào. Nếu bạn sử dụng nội dung thuộc quyền sở hữu
            của bên thứ ba, bạn phải ghi rõ nguồn và bản quyền, chẳng hạn như
            &quot;Bản quyền thuộc về [tên chủ sở hữu]; sử dụng theo ủy
            quyền.&quot;
          </p>
          <p>
            Bằng việc đăng tải nội dung lên các khu vực tương tác của Website
            Topmass, bạn đồng ý và đảm bảo rằng bạn hoặc chủ sở hữu nội dung đã
            cấp cho Topmass quyền sử dụng nội dung đó mà không phải trả bất kỳ
            khoản phí bản quyền nào. Quyền này bao gồm việc Topmass có thể sử
            dụng, sao chép, thay đổi, công bố, dịch thuật và phân phối nội dung
            đó trên phạm vi toàn cầu. Ngoài ra, Topmass có quyền cấp lại giấy
            phép cho bên thứ ba để thực hiện các quyền trên.
          </p>
          <p>
            <span className="font-medium">5. Sử dụng tên và logo</span>: Bạn
            đồng ý rằng Topmass có quyền sử dụng tên và logo của công ty bạn cho
            các mục đích tiếp thị và quảng cáo, nhằm thúc đẩy hoạt động của
            trang web và các dịch vụ liên quan.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">VIII. Tuyên bố và Cam kết</div>
          <div>
            <span className="font-bold mb-2">
              Tuyên bố và cam kết của người dùng
            </span>{" "}
            ( Bạn cam kết rằng):
          </div>

          <ul className="list-upper-roman pl-10 space-y-2 mb-4">
            <li>
              Bạn là chủ sở hữu hợp pháp của nội dung mà bạn đăng tải hoặc chia
              sẻ trên Topmass, hoặc bạn có đủ quyền và thẩm quyền để cấp phép
              theo các điều khoản sử dụng này;
            </li>
            <li>
              Việc đăng tải và sử dụng nội dung của bạn trên Topmass không vi
              phạm bất kỳ quyền nào của bên thứ ba, bao gồm nhưng không giới hạn
              ở quyền riêng tư, quyền công khai, bản quyền, nhãn hiệu thương
              mại, và các quyền sở hữu trí tuệ khác;
            </li>
            <li>
              Bạn chịu trách nhiệm thanh toán các khoản phí liên quan đến bản
              quyền, phí sử dụng hoặc các khoản chi phí khác phát sinh từ nội
              dung mà bạn đăng tải hoặc chia sẻ trên Dịch vụ;
            </li>
            <li>
              Bạn có đầy đủ quyền và tư cách pháp lý để tham gia và tuân thủ các
              điều khoản sử dụng này.
            </li>
          </ul>
          <p>
            <span className="font-medium">2. Quyền sở hữu của Topmass</span>:
            Mọi nội dung trên Dịch vụ, bao gồm các tài liệu thuộc sở hữu của
            Topmass hoặc được Topmass cấp phép, đều được bảo vệ bởi các luật về
            bản quyền, nhãn hiệu, bằng sáng chế và bí mật thương mại. Topmass
            giữ quyền sở hữu và kiểm soát toàn bộ nội dung này. Bạn không được
            phép chỉnh sửa, sao chép, phân phối, phát hành hoặc khai thác nội
            dung của Topmass dưới bất kỳ hình thức nào mà không có sự đồng ý
            trước bằng văn bản từ Topmass. Ngoài ra, bất kỳ nỗ lực thay đổi hoặc
            xóa bỏ các thông báo về quyền sở hữu trí tuệ từ nội dung của Topmass
            đều bị nghiêm cấm.
          </p>
          <p>
            <span className="font-medium">
              3. Sử dụng logo và nhãn hiệu Topmass
            </span>
            : Logo và tên của Topmass là tài sản trí tuệ thuộc về Topmass và
            không được sử dụng, sao chép hay giả mạo mà không có sự cho phép
            trước bằng văn bản. Các yếu tố như tiêu đề trang, biểu tượng đồ họa,
            nút chức năng và các thành phần khác của giao diện trang web cũng là
            tài sản trí tuệ của Topmass và được bảo vệ theo luật pháp.
          </p>
          <p>
            <span className="font-medium">4. Gián đoạn dịch vụ</span>: Mặc dù
            Topmass luôn nỗ lực cung cấp dịch vụ ổn định, nhưng có thể sẽ xảy ra
            các gián đoạn do việc bảo trì, nâng cấp, hoặc sự cố kỹ thuật.
            Topmass có quyền tạm ngừng hoặc xóa bất kỳ nội dung nào vi phạm các
            điều khoản sử dụng, quy định pháp luật, hoặc ảnh hưởng xấu đến trải
            nghiệm người dùng. Nếu nội dung vi phạm gây nguy hại đến thương hiệu
            hoặc hình ảnh của Topmass, công ty có quyền thực hiện các biện pháp
            cần thiết, bao gồm xóa nội dung và hạn chế quyền truy cập của người
            dùng. Nội dung bị xóa có thể được lưu trữ với mục đích tuân thủ quy
            định pháp lý, nhưng không đảm bảo sẽ được khôi phục nếu không có
            lệnh từ tòa án.
          </p>
          <p>
            <span className="font-medium">
              5. Không đảm bảo và giới hạn trách nhiệm
            </span>
            : : Topmass không đảm bảo tính chính xác, trung thực hoặc đáng tin
            cậy của bất kỳ nội dung nào do người dùng đăng tải, và không chịu
            trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc tin tưởng vào
            nội dung đó. Bạn chịu trách nhiệm về các rủi ro khi sử dụng thông
            tin từ người dùng khác.
          </p>
          <p>
            <span className="font-medium">6. Miễn trừ trách nhiệm</span>: Trong
            mọi trường hợp, Topmass sẽ không chịu trách nhiệm về bất kỳ mất mát
            hoặc thiệt hại nào (bao gồm, nhưng không giới hạn ở thiệt hại trực
            tiếp, gián tiếp, kinh tế, do phạt, hoặc do sự cố) liên quan đến việc
            sử dụng dịch vụ, nội dung của Topmass hoặc nội dung người dùng.
            Topmass cũng không chịu trách nhiệm về các sự cố kỹ thuật hoặc bảo
            mật, bao gồm thiệt hại do vi-rút, lỗi hệ thống, sự cố mạng hoặc các
            vấn đề khác. Bất kỳ thiệt hại nào phát sinh dù Topmass đã được thông
            báo trước đều không thuộc trách nhiệm của Topmass, ngay cả khi có
            liên quan đến hợp đồng, sơ suất hay bất kỳ lý do nào khác.
          </p>
          <p>
            <span className="font-medium">7. Trách nhiệm của người dùng</span>
            :Bạn đồng ý rằng việc sử dụng dịch vụ của Topmass là hoàn toàn dựa
            trên rủi ro của bạn. Trong trường hợp có sự vi phạm nghiêm trọng,
            Topmass có quyền thực hiện các biện pháp pháp lý cần thiết để bảo vệ
            quyền lợi của mình và của người dùng khác.
          </p>
        </div>
        <div>
          <div className="font-bold mb-4">IX. Bảo mật thông tin</div>
          <ul className="list-decimal pl-10 space-y-2 mb-4">
            <li>
              <div className="font-medium mb-2">Cam kết bảo mật dữ liệu:</div>
              <div className="pl-4">
                Bạn đồng ý bảo mật tất cả thông tin liên quan đến việc sử dụng
                dịch vụ, bao gồm cả thông tin về các giao dịch và dữ liệu thu
                thập được trong quá trình sử dụng dịch vụ. Bạn có trách nhiệm
                hợp tác với Topmass để ngăn chặn và phòng ngừa các hành vi sao
                chép hoặc sử dụng trái phép nội dung tuyển dụng hoặc các thông
                tin khác trên Internet bởi bất kỳ bên thứ ba nào.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Giới hạn việc tiết lộ thông tin ứng viên:
              </div>
              <div className="pl-4">
                Bạn cam kết không tiết lộ, chia sẻ hoặc bán bất kỳ thông tin nào
                về ứng viên mà bạn thu thập được thông qua việc sử dụng dịch vụ
                của Topmass cho bất kỳ bên thứ ba nào, dưới bất kỳ hình thức
                nào, mà không có sự chấp thuận trước bằng văn bản của Topmass.
                Việc chia sẻ thông tin ứng viên chỉ được phép thực hiện trong
                khuôn khổ cho phép của thỏa thuận với Topmass và trong phạm vi
                mục đích tuyển dụng đã được xác định rõ ràng.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">Bảo mật tài khoản:</div>
              <div className="pl-4">
                Bạn có trách nhiệm bảo vệ an toàn thông tin tài khoản và mật
                khẩu của mình. Tài khoản chỉ được sử dụng cho mục đích tuyển
                dụng của bạn, và mọi hoạt động của bạn phải tuân thủ các điều
                khoản đã thỏa thuận trong đơn đặt hàng hoặc hợp đồng dịch vụ.
                Bạn phải đảm bảo rằng các thông tin đăng nhập không bị lạm dụng
                hoặc tiết lộ cho các bên không liên quan mà không có sự cho phép
                từ phía bạn hoặc Topmass.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">Chống lại rủi ro bảo mật:</div>
              <div className="pl-4">
                Trong trường hợp phát hiện có hành vi vi phạm bảo mật hoặc rủi
                ro liên quan đến việc sử dụng tài khoản, bạn có nghĩa vụ thông
                báo ngay lập tức cho Topmass để có biện pháp khắc phục kịp thời.
                Bạn cũng phải đảm bảo tuân thủ mọi quy định pháp lý về bảo mật
                thông tin và sử dụng dịch vụ một cách an toàn, nhằm ngăn ngừa
                các hành vi lạm dụng hoặc khai thác thông tin trái phép.
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4">X. Các điều khoản khác</div>
          <ul className="list-decimal pl-10 space-y-2 mb-4">
            <li>
              <div className="font-medium mb-2">Toàn bộ thỏa thuận:</div>
              <div className="pl-4">
                Thỏa thuận này bao gồm tất cả các điều khoản liên quan đến mối
                quan hệ giữa bạn và Topmass, thay thế mọi thỏa thuận trước đây
                về cùng nội dung. Topmass có quyền điều chỉnh hoặc cập nhật thỏa
                thuận này cùng với các chính sách liên quan bất cứ lúc nào.
                Những thay đổi sẽ có hiệu lực ngay lập tức khi được công bố công
                khai trên trang web của Topmass.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Trách nhiệm của người dùng:
              </div>
              <div className="pl-4">
                Bạn có trách nhiệm xem xét và cập nhật các thay đổi của thỏa
                thuận định kỳ để đảm bảo hiểu rõ những điều chỉnh mới. Nếu bạn
                không đồng ý với các thay đổi này, bạn cần ngừng truy cập và sử
                dụng dịch vụ của Topmass. Việc bạn tiếp tục sử dụng trang web
                sau khi có thông báo thay đổi sẽ được coi là sự đồng ý với những
                điều chỉnh.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Tính pháp lý và hiệu lực của điều khoản:
              </div>
              <div className="pl-4">
                Nếu bất kỳ điều khoản nào của thỏa thuận này bị coi là không hợp
                lệ hoặc không thể thực thi theo pháp luật, phần còn lại của thỏa
                thuận vẫn giữ nguyên hiệu lực. Các điều khoản không thực hiện
                được sẽ được điều chỉnh sao cho phù hợp với quy định pháp luật
                mà vẫn đảm bảo ý nghĩa ban đầu. Việc Topmass không yêu cầu thực
                hiện nghiêm ngặt bất kỳ điều khoản nào không được coi là sự từ
                bỏ quyền đó.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Quyền hạn và chuyển nhượng:
              </div>
              <div className="pl-4">
                Thỏa thuận này chỉ áp dụng cho cá nhân bạn và bạn không được
                phép chuyển nhượng các quyền hoặc nghĩa vụ của mình cho bên thứ
                ba mà không có sự đồng ý bằng văn bản từ Topmass. Tất cả các
                logo, tên thương mại, nhãn hiệu, và sản phẩm xuất hiện trên
                trang web đều thuộc quyền sở hữu của các chủ sở hữu tương ứng.
                Việc đề cập đến các thương hiệu không cấu thành sự chứng thực
                hoặc xác nhận của Topmass về các sản phẩm hoặc dịch vụ đó.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">Giải quyết tranh chấp:</div>
              <div className="pl-4">
                Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ của Topmass sẽ
                được giải quyết theo quy định của pháp luật Việt Nam. Bất kỳ
                khiếu nại nào phát sinh từ việc sử dụng dịch vụ cần được gửi đến
                Topmass ngay sau khi sự cố phát sinh.
              </div>
              <ul className="list-circle space-y-2 pl-10 mb-2">
                <li>
                  <span className="font-medium">Địa chỉ liên lạc</span>: Tòa nhà
                  Mộc Gia, 54/31 Phổ Quang, Phường 2, Quận Tân Bình, TP. Hồ Chí
                  Minh
                </li>
                <li>
                  <span className="font-medium">Điện thoại</span>: 1900 255 836
                </li>
                <li>
                  <span className="font-medium">Email</span>: support@topmass.vn
                </li>
              </ul>
            </li>
            <li>
              <div className="font-medium mb-2">
                Quy trình giải quyết khiếu nại:
              </div>
              <div className="pl-4">
                Khi thực hiện khiếu nại, bạn cần cung cấp đầy đủ thông tin, bằng
                chứng liên quan và chịu trách nhiệm về tính xác thực của những
                thông tin này. Topmass chỉ giải quyết khiếu nại khi thông tin
                đăng ký tài khoản của người dùng đầy đủ và chính xác.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Tranh chấp giữa người dùng:
              </div>
              <div className="pl-4">
                Trong trường hợp xảy ra tranh chấp giữa người dùng với nhau hoặc
                với bên thứ ba, Topmass có thể cung cấp thông tin liên hệ của
                các bên liên quan để họ tự giải quyết hoặc can thiệp khi cần
                thiết. Topmass sẽ luôn cố gắng bảo vệ quyền lợi chính đáng của
                người dùng hợp pháp
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">
                Bồi thường và trách nhiệm pháp lý:
              </div>
              <div className="pl-4">
                Người dùng đồng ý bảo vệ và bồi thường cho Topmass khỏi mọi
                khiếu nại, tổn thất, chi phí phát sinh từ việc vi phạm các quy
                định trong quá trình sử dụng dịch vụ, bao gồm nhưng không giới
                hạn chi phí pháp lý và án phí.
              </div>
            </li>
            <li>
              <div className="font-medium mb-2">Thủ tục pháp lý:</div>
              <div className="pl-4">
                Nếu tranh chấp không được giải quyết trong vòng 60 ngày kể từ
                khi một bên thông báo bằng văn bản về việc phát sinh tranh chấp,
                một trong hai bên có quyền đưa vụ việc ra tòa án có thẩm quyền
                tại TP. Hà Nội. Bên thua kiện sẽ phải chịu tất cả các chi phí
                liên quan đến quá trình tố tụng.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

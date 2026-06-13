export interface StoryFlowSection {
  label: string;
  heading: string[];
  description: string;
  secondDescription?: string;
  groups: { title: string; text: string }[][];
}

export const translations = {
  vi: {
    nav: {
      logoSubtitle: "Tài nguyên nội bộ",
      menu: {
        home: "Trang chủ",
        system: "Hệ thống",
        systemItems: {
          tokens: {
            title: "Design Tokens",
            description: "Foundation, scale, spacing và quy chuẩn giao diện.",
          },
          training: {
            title: "Đào tạo",
            description: "Flow đào tạo nội bộ cho member mới và intern.",
          },
          animation: {
            title: "Animation System",
            description: "Motion pattern cho landing và micro-interaction.",
          },
          roadmap: {
            title: "Lộ trình",
            description: "Mốc phát triển component store và package nội bộ.",
          },
        },
        components: "Components",
        roadmap: "Lộ trình",
      },
      mobileExtraLinks: {
        foundation: "Foundation",
        animation: "Animation",
        training: "Đào tạo",
        store: "Store",
      },
      auth: {
        login: "Đăng nhập",
        signup: "Đăng ký",
      },
      openSection: (title: string) => `Mở toàn bộ khu vực ${title.toLowerCase()}.`,
      viewAll: (title: string) => `Xem tất cả ${title}`,
      user: "Người dùng",
      profile: "Hồ sơ",
      logout: "Đăng xuất",
      openMenu: "Mở menu",
    },
    hero: {
      badge: "MeU UI Hub",
      title1: "Nâng tầm",
      title2: "Tài nguyên UI",
      description:
        "Xây dựng tài nguyên UI nội bộ chất lượng cao thông qua design system, component tái sử dụng và guideline sẵn sàng cho production.",
      welcomeBack: (name: string) => `Chào mừng trở lại, ${name}!`,
      welcomeBackDescription: "Tiếp tục hành trình của bạn với MeU UI Hub.",
      welcomeBackCta: "Xem hồ sơ",
      welcomeBackSecondaryCta: "Khám phá Components",
    },
    logos: {
      builtAround: "Được xây dựng cùng",
    },
    companyIntro: {
      eyebrow: "Giới thiệu công ty",
      headingPrefix: "MeU Solutions xây dựng sản phẩm phần mềm đáng tin cậy với",
      headingHighlight1: "phát triển",
      headingMid: "và",
      headingHighlight2: "kiểm thử chuyên sâu",
      headingSuffix: ".",
      companyName: "MeU Solutions",
      tagline: "Đối tác kỹ thuật phần mềm tại Việt Nam",
      title: "Đối tác kỹ thuật phần mềm tại Việt Nam",
      description:
        "MeU Solutions là công ty công nghệ tại Việt Nam, tập trung vào phát triển ứng dụng, kiểm thử phần mềm và các dịch vụ delivery đáng tin cậy. Đội ngũ hướng đến giải pháp đúng bối cảnh, code sạch, kiến trúc tốt và chất lượng sản phẩm ổn định.",
      facts: [
        { label: "Thành lập", value: "2016" },
        { label: "Quy mô đội ngũ", value: "51-200" },
        { label: "Địa điểm", value: "TP. Hồ Chí Minh" },
      ],
      services: [
        {
          title: "Software Development",
          text: "Web, mobile và hệ thống nghiệp vụ được thiết kế theo nhu cầu thực tế của từng khách hàng.",
        },
        {
          title: "Quality Assurance",
          text: "Manual testing, automation testing, security, performance và mobile testing cho sản phẩm ổn định.",
        },
        {
          title: "Business Solutions",
          text: "Tư duy giải pháp đúng ngữ cảnh, tập trung vào hiệu quả vận hành và khả năng mở rộng dài hạn.",
        },
      ],
      uiHubCallout:
        "UI Hub chuẩn hóa guideline, component và đào tạo để các team ship giao diện nhất quán hơn.",
      locationCallout: "Trụ sở và đội ngũ phát triển đặt tại TP. Hồ Chí Minh, Việt Nam.",
      bottomGrid: [
        {
          title: "Delivery đáng tin cậy",
          text: "Dịch vụ outsourcing và delivery sản phẩm tiết kiệm chi phí.",
        },
        {
          title: "Đúng người, đúng việc",
          text: "Đội ngũ được ghép đúng với bối cảnh giải pháp.",
        },
        {
          title: "Chất lượng dài hạn",
          text: "Development và QA phối hợp để giảm rủi ro sản phẩm.",
        },
      ],
    },
    skiper: {
      headingLines: ["Trải nghiệm", "tương tác", "sống động"],
      subtitle: "Cuộn xuống để khám phá hệ thống animation của MeU UI Hub",
    },
    trainingShowcase: {
      eyebrow: "Đồng hành cùng MeU trên hành trình thực chiến",
      headingLine1: "Khoá đào tạo",
      headingLine2: "thực tập sinh",
      description1:
        "MeU UI Hub đồng hành cùng thực tập sinh trong 12 tuần, từ onboarding design system đến thực chiến sprint cùng đội ngũ sản phẩm thật.",
      description2:
        "Mục tiêu là giúp mỗi intern làm chủ component, token và quy trình UI để tự tin ship sản phẩm ngay từ những dự án đầu tiên.",
      linkLabel: "Khám phá Component Store",
      stats: [
        {
          value: "12 tuần",
          text: "Hành trình đào tạo trải dài từ onboarding, UI Foundations đến demo sản phẩm cuối khoá.",
        },
        {
          value: "5 khoá học",
          text: "Từ Design System, UI Foundations, thực hành dự án Figma đến thực chiến sprint cùng đội ngũ.",
        },
        {
          value: "100% thực chiến",
          text: "Mỗi intern được tham gia sprint thật, review trực tiếp cùng mentor và team sản phẩm MeU.",
        },
      ],
    },
    trainingCta: {
      heading: "Sẵn sàng cho hành trình của bạn",
      description:
        "Ứng tuyển vào chương trình thực tập tại MeU để học design system, làm việc cùng đội ngũ sản phẩm thật và xây dựng portfolio UI của riêng bạn.",
      statValue: "200+",
      statLabel: "Học viên đã đồng hành cùng MeU",
      ctaLabel: "Ứng tuyển ngay",
    },
    trainingStack: {
      eyebrow: "quy trình của chúng tôi",
      headingPrefix: "Lên kế hoạch hành trình",
      headingHighlight: "MeU UI Hub",
      headingSuffix: "",
      description:
        "Hành trình bắt đầu với một cấu trúc nội bộ rõ ràng: landing page kể câu chuyện, workspace component tái sử dụng và tài liệu giúp các team ship sản phẩm nhất quán trên mọi dự án của công ty.",
      phases: [
        {
          id: "process-1",
          title: "Nghiên cứu và phân tích",
          description:
            "Bắt đầu bằng việc rà soát mục tiêu, luồng sử dụng và các chuẩn UI hiện có để xác định MeU UI Hub cần phục vụ team theo cách rõ ràng nhất.",
        },
        {
          id: "process-2",
          title: "Wireframe và Prototype",
          description:
            "Phác thảo landing page, workspace component, category và trạng thái tài nguyên trước khi cố định cấu trúc hiển thị cho toàn bộ hub.",
        },
        {
          id: "process-3",
          title: "Thiết kế giao diện",
          description:
            "Chuẩn hóa visual direction, token, spacing, typography và component states để team có cùng một ngôn ngữ giao diện khi triển khai sản phẩm.",
        },
        {
          id: "process-4",
          title: "Phát triển và Kiểm thử",
          description:
            "Xây dựng component store, preview, snippet và guideline, sau đó kiểm thử responsive để tài nguyên dùng được trong nhiều dự án nội bộ.",
        },
        {
          id: "process-5",
          title: "Ra mắt và Hỗ trợ",
          description:
            "Sau khi phát hành, hub tiếp tục được bổ sung ví dụ, tài liệu đào tạo và lộ trình package để giữ UI nhất quán khi team mở rộng.",
        },
      ],
    },
    stackingCards: {
      eyebrow: "Stacking Cards",
      heading: "Trải nghiệm MeU UI Hub qua từng lớp.",
      description:
        "Cuộn xuống để xem từng phần của UI Hub được xếp lớp như một roadmap sản phẩm: landing, component store, training và package path.",
      seeMore: "Xem thêm",
      defaultEyebrow: "UI Hub",
      projects: [
        {
          title: "Landing kể câu chuyện UI Hub",
          description:
            "Trang chủ giải thích mục tiêu, quy chuẩn và giá trị của MeU UI Hub trước khi đưa người dùng vào workspace tài nguyên.",
          eyebrow: "Landing Story",
        },
        {
          title: "Component store để tìm đúng tài nguyên",
          description:
            "Preview, category, trạng thái stable/planned và copy snippet giúp team dùng lại component nhanh hơn.",
          eyebrow: "Component Store",
        },
        {
          title: "Training docs cho intern và member mới",
          description:
            "Token, layout, responsive, accessibility và ví dụ code được gom thành tài liệu học chuẩn nội bộ.",
          eyebrow: "Training Docs",
        },
        {
          title: "Package path cho nhiều dự án công ty",
          description:
            "Khi component đủ ổn định, UI Hub có thể mở rộng thành package nội bộ để ship sản phẩm nhất quán hơn.",
          eyebrow: "Package Path",
        },
      ],
    },
    mentorsGallery: {
      eyebrow: "Mentor MeU",
      headingPrefix: "Mentor đồng hành cùng",
      headingHighlight: "bạn",
      description:
        "Mỗi intern được ghép cặp với mentor giàu kinh nghiệm, đồng hành xuyên suốt 12 tuần đào tạo và các sprint thực chiến.",
      ctaLabel: "Ứng tuyển làm mentor",
      mentors: [
        { name: "Minh Trần" },
        { name: "Hoài An" },
        { name: "Quốc Bảo" },
        { name: "Thảo Vy" },
        { name: "Đức Anh" },
      ],
    },
    testimonials: {
      badgeLabel: "Cảm nhận",
      heading: "Intern và đối tác nói gì về MeU",
      subtitle: "Những chia sẻ từ intern và thành viên đã đồng hành cùng MeU UI Hub.",
      items: [
        {
          text: "Design system của MeU giúp mình lên UI nhanh gấp đôi, token và component đều đã chuẩn hoá sẵn.",
          name: "Briana Patton",
          role: "Intern UI/UX",
        },
        {
          text: "Quy trình onboarding rõ ràng, mentor hỗ trợ sát sao nên mình bắt nhịp công việc rất nhanh.",
          name: "Bilal Ahmed",
          role: "Intern Frontend",
        },
        {
          text: "MeU UI Hub là nơi mình tra cứu component mỗi ngày, tiết kiệm rất nhiều thời gian thiết kế.",
          name: "Saman Malik",
          role: "Product Designer",
        },
        {
          text: "Tài liệu training đầy đủ, dễ theo dõi, giúp mình tự tin tham gia sprint thật ngay từ tuần thứ 5.",
          name: "Omar Raza",
          role: "Intern Frontend",
        },
        {
          text: "Thư viện component đa dạng và có sẵn hướng dẫn sử dụng, code review cũng nhanh hơn hẳn.",
          name: "Zainab Hussain",
          role: "Intern UI/UX",
        },
        {
          text: "Trải nghiệm thực chiến tại MeU giúp mình trưởng thành rõ rệt sau 3 tháng thực tập.",
          name: "Aliza Khan",
          role: "Junior Developer",
        },
        {
          text: "Animation system trực quan, mình áp dụng ngay vào landing page mà không cần viết lại từ đầu.",
          name: "Farhan Siddiqui",
          role: "Intern Frontend",
        },
        {
          text: "Đội ngũ luôn hỗ trợ tận tình, feedback nhanh và cụ thể giúp mình cải thiện từng task.",
          name: "Sana Sheikh",
          role: "Intern UI/UX",
        },
        {
          text: "Từ một sinh viên chưa biết gì, mình đã có thể ship tính năng thật nhờ chương trình đào tạo của MeU.",
          name: "Hassan Ali",
          role: "Junior Developer",
        },
      ],
    },
    footer: {
      roadmapEyebrow: "Lộ trình",
      roadmapHeading: "Lộ trình triển khai MeU UI Hub",
      roadmapItems: ["Foundation", "Trang chủ", "Component Store", "Đào tạo", "Package"],
      currentLabel: "Hiện tại",
      openStore: "Mở Store",
      trainingFlow: "Quy trình đào tạo",
      meuSolutionsLink: "MeU Solutions",
      copyright: "© 2026 MeU UI Hub. Tài nguyên thiết kế nội bộ.",
      builtWith: "Phát triển bởi",
      backToTopAria: "Lên đầu trang",
      marqueeItems: [
        "Foundation Tokens",
        "Trải nghiệm trang chủ",
        "Component Store",
        "Tài liệu đào tạo",
        "Package nội bộ",
      ],
    },
    faq: {
      badge: "Hỏi đáp",
      heading: "Câu hỏi thường gặp",
      description:
        "Một vài câu hỏi đội ngũ thường thắc mắc khi bắt đầu dùng MeU UI Hub. Nếu chưa thấy câu trả lời, đừng ngại liên hệ với chúng tôi.",
      items: [
        {
          question: "MeU UI Hub gồm những gì?",
          answer:
            "Bao gồm bộ design tokens nền tảng, thư viện component tái sử dụng, tài liệu đào tạo nội bộ và lộ trình triển khai cho các team trong công ty.",
        },
        {
          question: "Tôi có thể đóng góp component mới không?",
          answer:
            "Có. Mọi team đều có thể đề xuất component mới thông qua quy trình review nội bộ để đảm bảo nhất quán với design system trước khi đưa vào Component Store.",
        },
        {
          question: "Component có được cập nhật thường xuyên không?",
          answer:
            "Component và tokens được rà soát và cập nhật định kỳ theo lộ trình phát triển, đảm bảo đồng bộ giữa các sản phẩm web, mobile và nội bộ.",
        },
        {
          question: "Có cần cài đặt gì thêm để sử dụng không?",
          answer:
            "Không cần cài đặt phức tạp. Bạn chỉ cần truy cập Component Store, sao chép component và làm theo hướng dẫn tích hợp đi kèm.",
        },
        {
          question: "Tài liệu đào tạo dành cho ai?",
          answer:
            "Dành cho mọi thành viên mới gia nhập cũng như các bạn muốn nắm nhanh quy trình thiết kế và phát triển theo chuẩn của MeU UI Hub.",
        },
        {
          question: "Tôi nên liên hệ ai khi cần hỗ trợ?",
          answer:
            "Bạn có thể liên hệ đội ngũ MeU Solutions hoặc gửi câu hỏi qua các kênh nội bộ được liệt kê trong tài liệu đào tạo.",
        },
      ],
      ctaTitle: "Vẫn còn thắc mắc?",
      ctaDescription:
        "Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ. Liên hệ ngay để được giải đáp sớm nhất.",
      ctaContact: "Liên hệ hỗ trợ",
      ctaDocs: "Xem tài liệu",
    },
    componentsPage: {
      categoryNotFoundEyebrow: "Không tìm thấy danh mục",
      categoryNotFoundTitle: "Không tìm thấy danh mục này",
      backHome: "Về trang chủ",
      searchPlaceholder: (name?: string) =>
        name ? `Tìm kiếm ${name}` : "Tìm kiếm component",
      stable: "ổn định",
      planned: "đang lên kế hoạch",
      resources: "tài nguyên",
      totalInHub: "tổng trong hub",
      categoryDescription: (name: string) =>
        `Trang danh mục riêng cho nhóm ${name.toLowerCase()}, giúp team duyệt toàn bộ preview, lọc trạng thái và copy nhanh component cần dùng.`,
      browseCategory: "Duyệt danh mục",
      componentCount: (count: number) => `${count} component hiển thị`,
      statusLabel: "Trạng thái",
      statusFilters: {
        all: "Tất cả",
        stable: "Stable",
        planned: "Planned",
        favorites: "Yêu thích",
      },
      emptyState: "Không có component phù hợp với bộ lọc hiện tại.",
      clearFilters: "Xoá bộ lọc",
      sidebar: {
        primaryLinks: {
          home: "Trang chủ",
          components: "Components",
          animations: "Animation",
          training: "Đào tạo",
        },
        categories: "Danh mục",
        foundation: "Nền tảng",
        foundationLinks: {
          tokens: "Design Tokens",
          rules: "Quy chuẩn production",
          roadmap: "Lộ trình",
          samples: "Code mẫu",
        },
        phase: "Phase 1",
        mvp: "MVP",
        description:
          "Docs + copy code cho component nội bộ, sẵn sàng mở rộng thành @meu/ui.",
        progress: "Tiến độ",
        milestones: [
          ["Foundation", "Xong"],
          ["Docs flow", "Đang xây"],
          ["Package path", "Tiếp theo"],
        ],
      },
      resourceCard: {
        ready: "Ready",
        planned: "Planned",
        copied: "Đã copy",
        copy: "Copy",
        viewAria: (name: string) => `Xem ${name}`,
        favoriteAria: (name: string) => `Thêm ${name} vào yêu thích`,
        unfavoriteAria: (name: string) => `Bỏ ${name} khỏi yêu thích`,
      },
    },
    storyFlow: {
      sections: [
        {
          label: "01 — Chúng tôi là ai",
          heading: ["Thiết kế", "Không", "Giới hạn"],
          description:
            "MeU UI Hub là nơi quy tụ design system, component và tài liệu chuẩn hoá nội bộ — giúp đội ngũ thiết kế và phát triển làm việc nhất quán, nhanh hơn và chuyên nghiệp hơn trong mọi dự án.",
          groups: [],
        },
        {
          label: "02 — Trước và sau",
          heading: ["Một thay đổi", "Nhỏ,", "Khác biệt lớn"],
          description:
            "Chỉ một thay đổi nhỏ trong cách làm việc đã tạo ra khác biệt lớn cho cả đội ngũ thiết kế và phát triển tại MeU.",
          groups: [
            [
              { title: "Trước đây — Rời rạc", text: "Mỗi dự án có bảng màu, font chữ và component riêng, khó đồng bộ giữa các team." },
              { title: "Trước đây — Bàn giao chậm", text: "Designer và developer mất nhiều thời gian trao đổi qua lại để thống nhất chi tiết." },
              { title: "Trước đây — Khó mở rộng", text: "Mỗi dự án mới gần như phải bắt đầu lại từ con số 0." },
            ],
            [
              { title: "Bây giờ — Một nguồn chân lý", text: "Mọi sản phẩm của MeU dùng chung một nền tảng thiết kế duy nhất." },
              { title: "Bây giờ — Bàn giao tức thì", text: "Component đã sẵn sàng, designer và developer chỉ cần ráp nối theo đúng chuẩn." },
              { title: "Bây giờ — Sẵn sàng mở rộng", text: "Dự án mới khởi động nhanh hơn nhờ kế thừa toàn bộ nền tảng có sẵn." },
            ],
          ],
        },
        {
          label: "03 — Hành trình phát triển",
          heading: ["Từng bước", "Một,", "Lớn lên"],
          description:
            "MeU UI Hub không xuất hiện trong một ngày — đó là kết quả của quá trình quan sát, thử nghiệm và cải tiến liên tục.",
          groups: [
            [
              { title: "Khởi điểm", text: "Bắt đầu từ một vài component dùng chung giữa các dự án nội bộ." },
              { title: "Thử nghiệm", text: "Áp dụng vào dự án thật để tìm ra những gì thực sự cần thiết." },
              { title: "Định hình", text: "Bộ token và nguyên tắc thiết kế đầu tiên được thống nhất." },
            ],
            [
              { title: "Hoàn thiện", text: "Component, tài liệu và quy trình dần được chuẩn hoá đầy đủ hơn." },
              { title: "Lan toả", text: "Ngày càng nhiều team trong MeU áp dụng UI Hub vào công việc hàng ngày." },
              { title: "Tiếp tục", text: "Hệ thống vẫn đang được bổ sung và cải tiến mỗi ngày." },
            ],
          ],
        },
        {
          label: "04 — Tầm nhìn",
          heading: ["Tương lai", "Của", "UI MeU"],
          description:
            "Chúng tôi không chỉ xây dựng một thư viện component — chúng tôi đang xây dựng nền tảng cho mọi sản phẩm tương lai của MeU.",
          secondDescription:
            "Hệ thống thiết kế không phải là một dự án có điểm kết thúc — đó là một quá trình phát triển liên tục, nơi mọi đóng góp đều giúp toàn bộ MeU tiến lên phía trước.",
          groups: [
            [
              { title: "50+", text: "Component sẵn sàng sử dụng trên toàn hệ thống." },
              { title: "Đa nền tảng", text: "Web, mobile và các sản phẩm nội bộ dùng chung một hệ thống." },
              { title: "100%", text: "Đồng nhất thiết kế trên mọi sản phẩm MeU." },
            ],
            [
              { title: "Mở rộng", text: "Sẵn sàng mở rộng cho mọi team và mọi sản phẩm mới." },
              { title: "Cộng tác", text: "Mọi thành viên đều có thể đóng góp và cải tiến hệ thống." },
              { title: "Bền vững", text: "Được duy trì và cập nhật liên tục theo nhu cầu thực tế." },
            ],
          ],
        },
        {
          label: "05 — Tham gia",
          heading: ["Sẵn sàng", "Bắt đầu", "Cùng MeU?"],
          description:
            "Khám phá MeU UI Hub ngay hôm nay và trở thành một phần của hành trình xây dựng hệ thống thiết kế chung cho toàn công ty.",
          groups: [],
        },
      ] satisfies StoryFlowSection[],
    },
    auth: {
      login: {
        title: "Chào mừng trở lại",
        subtitle: "Đăng nhập để cá nhân hoá trải nghiệm MeU UI Hub của bạn.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Mật khẩu",
        submit: "Đăng nhập",
        google: "Tiếp tục với Google",
        noAccount: "Chưa có tài khoản?",
        registerLink: "Đăng ký ngay",
        joinPrefix: "Tham gia cùng",
        joinHighlight: "hàng trăm thành viên",
        joinSuffix: "đang sử dụng MeU UI Hub.",
        success: "Đăng nhập thành công!",
        errors: {
          required: "Vui lòng nhập email và mật khẩu.",
          invalidEmail: "Email không hợp lệ.",
          invalidCredentials: "Email hoặc mật khẩu không đúng.",
        },
      },
      register: {
        title: "Tạo tài khoản mới",
        subtitle: "Tạo tài khoản để lưu lại tuỳ chỉnh và theo dõi MeU UI Hub.",
        namePlaceholder: "Họ và tên",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Mật khẩu",
        confirmPasswordPlaceholder: "Nhập lại mật khẩu",
        submit: "Đăng ký",
        google: "Đăng ký với Google",
        haveAccount: "Đã có tài khoản?",
        loginLink: "Đăng nhập",
        success: "Tạo tài khoản thành công!",
        errors: {
          required: "Vui lòng điền đầy đủ thông tin.",
          invalidEmail: "Email không hợp lệ.",
          passwordTooShort: "Mật khẩu cần tối thiểu 6 ký tự.",
          passwordMismatch: "Mật khẩu nhập lại không khớp.",
          emailTaken: "Email này đã được đăng ký.",
        },
      },
      profile: {
        title: "Hồ sơ cá nhân",
        subtitle: "Điều chỉnh thông tin và tuỳ chọn cá nhân của bạn.",
        nameLabel: "Họ và tên",
        emailLabel: "Email",
        bioLabel: "Giới thiệu ngắn",
        bioPlaceholder: "Một vài dòng về bạn...",
        avatarLabel: "Ảnh đại diện",
        shuffleAvatar: "Đổi ảnh ngẫu nhiên",
        languageLabel: "Ngôn ngữ hiển thị",
        saveButton: "Lưu thay đổi",
        savedMessage: "Đã lưu thay đổi.",
        logoutButton: "Đăng xuất",
        notLoggedInTitle: "Bạn chưa đăng nhập",
        notLoggedInDescription: "Đăng nhập để xem và chỉnh sửa hồ sơ cá nhân.",
        goToLogin: "Đến trang đăng nhập",
      },
    },
  },
  en: {
    nav: {
      logoSubtitle: "Internal resources",
      menu: {
        home: "Home",
        system: "System",
        systemItems: {
          tokens: {
            title: "Design Tokens",
            description: "Foundation, scale, spacing, and UI standards.",
          },
          training: {
            title: "Training",
            description: "Internal onboarding flow for new members and interns.",
          },
          animation: {
            title: "Animation System",
            description: "Motion patterns for landing pages and micro-interactions.",
          },
          roadmap: {
            title: "Roadmap",
            description: "Milestones for the component store and internal package.",
          },
        },
        components: "Components",
        roadmap: "Roadmap",
      },
      mobileExtraLinks: {
        foundation: "Foundation",
        animation: "Animation",
        training: "Training",
        store: "Store",
      },
      auth: {
        login: "Sign in",
        signup: "Sign up",
      },
      openSection: (title: string) => `Open the entire ${title.toLowerCase()} section.`,
      viewAll: (title: string) => `View all ${title}`,
      user: "User",
      profile: "Profile",
      logout: "Log out",
      openMenu: "Open menu",
    },
    hero: {
      badge: "MeU UI Hub",
      title1: "Elevate Your",
      title2: "UI Resources",
      description:
        "Crafting exceptional internal UI resources through design systems, reusable components, and production-ready guidelines.",
      welcomeBack: (name: string) => `Welcome back, ${name}!`,
      welcomeBackDescription: "Continue your journey with MeU UI Hub.",
      welcomeBackCta: "View profile",
      welcomeBackSecondaryCta: "Explore Components",
    },
    logos: {
      builtAround: "Built around",
    },
    companyIntro: {
      eyebrow: "Company Introduction",
      headingPrefix: "MeU Solutions builds reliable software products with",
      headingHighlight1: "development",
      headingMid: "and",
      headingHighlight2: "testing expertise",
      headingSuffix: ".",
      companyName: "MeU Solutions",
      tagline: "Vietnam software engineering partner",
      title: "Vietnam software engineering partner",
      description:
        "MeU Solutions is a Vietnam-based technology company focused on application development, software testing, and reliable delivery services. The team aims for context-fit solutions, clean code, solid architecture, and consistent product quality.",
      facts: [
        { label: "Founded", value: "2016" },
        { label: "Team size", value: "51-200" },
        { label: "Location", value: "Ho Chi Minh City" },
      ],
      services: [
        {
          title: "Software Development",
          text: "Web, mobile, and business systems designed around each client's real needs.",
        },
        {
          title: "Quality Assurance",
          text: "Manual testing, automation testing, security, performance, and mobile testing for stable products.",
        },
        {
          title: "Business Solutions",
          text: "Context-fit solution thinking focused on operational efficiency and long-term scalability.",
        },
      ],
      uiHubCallout:
        "UI Hub standardizes guidelines, components, and training so teams ship consistent interfaces.",
      locationCallout: "Headquarters and development teams are based in Ho Chi Minh City, Vietnam.",
      bottomGrid: [
        {
          title: "Reliable delivery",
          text: "Cost-effective outsourcing and product delivery services.",
        },
        {
          title: "Right people",
          text: "Teams are matched to the right solution context.",
        },
        {
          title: "Long-term quality",
          text: "Development and QA work together to reduce product risk.",
        },
      ],
    },
    skiper: {
      headingLines: ["Interactive", "experiences", "come alive"],
      subtitle: "Scroll down to explore the MeU UI Hub animation system",
    },
    trainingShowcase: {
      eyebrow: "Walking the real-project journey together with MeU",
      headingLine1: "Intern Training",
      headingLine2: "Program",
      description1:
        "MeU UI Hub walks alongside interns for 12 weeks, from design-system onboarding to real sprints with the product team.",
      description2:
        "The goal is for every intern to master components, tokens, and UI workflows so they can ship confidently from their very first projects.",
      linkLabel: "Explore the Component Store",
      stats: [
        {
          value: "12 weeks",
          text: "A training journey spanning onboarding, UI Foundations, and a final product demo.",
        },
        {
          value: "5 courses",
          text: "From Design System and UI Foundations to Figma project practice and real sprints with the team.",
        },
        {
          value: "100% hands-on",
          text: "Every intern joins real sprints with direct reviews from mentors and the MeU product team.",
        },
      ],
    },
    trainingCta: {
      heading: "Ready for your journey",
      description:
        "Apply to MeU's internship program to learn our design system, work alongside a real product team, and build your own UI portfolio.",
      statValue: "200+",
      statLabel: "Alumni who walked this journey with MeU",
      ctaLabel: "Apply now",
    },
    trainingStack: {
      eyebrow: "our process",
      headingPrefix: "Planning your",
      headingHighlight: "MeU UI Hub",
      headingSuffix: "journey",
      description:
        "Our journey begins with a clear internal structure: a landing page for the story, a component workspace for reusable UI, and documentation that helps teams ship consistent products across company projects.",
      phases: [
        {
          id: "process-1",
          title: "Research and Analysis",
          description:
            "Start by reviewing goals, usage flows, and existing UI standards to define how MeU UI Hub should serve teams most clearly.",
        },
        {
          id: "process-2",
          title: "Wireframing and Prototyping",
          description:
            "Sketch the landing page, component workspace, categories, and resource states before locking the display structure for the whole hub.",
        },
        {
          id: "process-3",
          title: "Design Creation",
          description:
            "Standardize visual direction, tokens, spacing, typography, and component states so the team shares one UI language during implementation.",
        },
        {
          id: "process-4",
          title: "Development and Testing",
          description:
            "Build the component store, previews, snippets, and guidelines, then test responsiveness so resources work across internal projects.",
        },
        {
          id: "process-5",
          title: "Launch and Support",
          description:
            "After release, the hub keeps growing with examples, training docs, and a package roadmap to keep UI consistent as the team scales.",
        },
      ],
    },
    stackingCards: {
      eyebrow: "Stacking Cards",
      heading: "MeU UI Hub experience cards.",
      description:
        "Scroll down to see each part of the UI Hub stacked like a product roadmap: landing, component store, training, and package path.",
      seeMore: "See more",
      defaultEyebrow: "UI Hub",
      projects: [
        {
          title: "A landing page that tells the UI Hub story",
          description:
            "The homepage explains the goals, standards, and value of MeU UI Hub before guiding users into the resource workspace.",
          eyebrow: "Landing Story",
        },
        {
          title: "A component store to find the right resources",
          description:
            "Previews, categories, stable/planned status, and copy-paste snippets help teams reuse components faster.",
          eyebrow: "Component Store",
        },
        {
          title: "Training docs for interns and new members",
          description:
            "Tokens, layout, responsiveness, accessibility, and code examples gathered into a standard internal learning doc.",
          eyebrow: "Training Docs",
        },
        {
          title: "A package path for multiple company projects",
          description:
            "Once components are stable enough, UI Hub can grow into an internal package for more consistent product delivery.",
          eyebrow: "Package Path",
        },
      ],
    },
    mentorsGallery: {
      eyebrow: "MeU Mentors",
      headingPrefix: "Mentors who walk with",
      headingHighlight: "you",
      description:
        "Every intern is paired with an experienced mentor for the full 12-week program and every real-project sprint.",
      ctaLabel: "Become a mentor",
      mentors: [
        { name: "Minh Tran" },
        { name: "Hoai An" },
        { name: "Quoc Bao" },
        { name: "Thao Vy" },
        { name: "Duc Anh" },
      ],
    },
    testimonials: {
      badgeLabel: "Testimonials",
      heading: "What interns and partners say about MeU",
      subtitle: "Stories from interns and members who have walked the MeU UI Hub journey.",
      items: [
        {
          text: "MeU's design system lets me build UI twice as fast — tokens and components are already standardized.",
          name: "Briana Patton",
          role: "UI/UX Intern",
        },
        {
          text: "The onboarding process is clear and mentors are very supportive, so I got up to speed quickly.",
          name: "Bilal Ahmed",
          role: "Frontend Intern",
        },
        {
          text: "MeU UI Hub is where I look up components every day — it saves so much design time.",
          name: "Saman Malik",
          role: "Product Designer",
        },
        {
          text: "The training docs are thorough and easy to follow, so I felt confident joining real sprints by week 5.",
          name: "Omar Raza",
          role: "Frontend Intern",
        },
        {
          text: "The component library is diverse and well documented, which made code review much faster too.",
          name: "Zainab Hussain",
          role: "UI/UX Intern",
        },
        {
          text: "The hands-on experience at MeU helped me grow noticeably after just 3 months of internship.",
          name: "Aliza Khan",
          role: "Junior Developer",
        },
        {
          text: "The animation system is intuitive — I applied it directly to a landing page without rewriting from scratch.",
          name: "Farhan Siddiqui",
          role: "Frontend Intern",
        },
        {
          text: "The team is always supportive, with fast and specific feedback that helped me improve every task.",
          name: "Sana Sheikh",
          role: "UI/UX Intern",
        },
        {
          text: "From knowing nothing as a student, I was able to ship real features thanks to MeU's training program.",
          name: "Hassan Ali",
          role: "Junior Developer",
        },
      ],
    },
    footer: {
      roadmapEyebrow: "Roadmap",
      roadmapHeading: "MeU UI Hub rollout roadmap",
      roadmapItems: ["Foundation", "Homepage", "Component Store", "Training", "Package"],
      currentLabel: "Current",
      openStore: "Open Store",
      trainingFlow: "Training Flow",
      meuSolutionsLink: "MeU Solutions",
      copyright: "© 2026 MeU UI Hub. Internal design resources.",
      builtWith: "Built with",
      backToTopAria: "Back to top",
      marqueeItems: [
        "Foundation Tokens",
        "Homepage Experience",
        "Component Store",
        "Training Docs",
        "Internal Package",
      ],
    },
    faq: {
      badge: "FAQ",
      heading: "Frequently Asked Questions",
      description:
        "A few things teams often ask when getting started with MeU UI Hub. If you don't see your answer here, feel free to reach out.",
      items: [
        {
          question: "What's included in MeU UI Hub?",
          answer:
            "It includes the foundational design tokens, a reusable component library, internal training docs, and a rollout roadmap for teams across the company.",
        },
        {
          question: "Can I contribute new components?",
          answer:
            "Yes. Any team can propose new components through the internal review process to keep things consistent with the design system before they land in the Component Store.",
        },
        {
          question: "Are components updated regularly?",
          answer:
            "Components and tokens are reviewed and updated on a regular cadence following the rollout roadmap, keeping web, mobile, and internal products in sync.",
        },
        {
          question: "Do I need to install anything to use it?",
          answer:
            "No complex setup required. Just open the Component Store, copy the component, and follow the included integration guide.",
        },
        {
          question: "Who is the training documentation for?",
          answer:
            "It's for new team members as well as anyone who wants a quick refresher on MeU UI Hub's design and development standards.",
        },
        {
          question: "Who should I contact for support?",
          answer:
            "You can reach out to the MeU Solutions team or ask through the internal channels listed in the training docs.",
        },
      ],
      ctaTitle: "Still have questions?",
      ctaDescription:
        "Our team is here to help. Get in touch and we'll respond as soon as possible.",
      ctaContact: "Contact Support",
      ctaDocs: "View Documentation",
    },
    componentsPage: {
      categoryNotFoundEyebrow: "Category not found",
      categoryNotFoundTitle: "This category does not exist",
      backHome: "Back to home",
      searchPlaceholder: (name?: string) =>
        name ? `Search ${name}` : "Search components",
      stable: "stable",
      planned: "planned",
      resources: "resources",
      totalInHub: "total in hub",
      categoryDescription: (name: string) =>
        `A dedicated category page for ${name.toLowerCase()}, helping the team browse previews, filter status, and quickly copy the component they need.`,
      browseCategory: "Browse category",
      componentCount: (count: number) => `${count} component${count === 1 ? "" : "s"} shown`,
      statusLabel: "Status",
      statusFilters: {
        all: "All",
        stable: "Stable",
        planned: "Planned",
        favorites: "Favorites",
      },
      emptyState: "No components match the current filters.",
      clearFilters: "Clear filters",
      sidebar: {
        primaryLinks: {
          home: "Home",
          components: "Components",
          animations: "Animations",
          training: "Training",
        },
        categories: "Categories",
        foundation: "Foundation",
        foundationLinks: {
          tokens: "Design Tokens",
          rules: "Production Rules",
          roadmap: "Roadmap",
          samples: "Code Samples",
        },
        phase: "Phase 1",
        mvp: "MVP",
        description:
          "Docs + copy code for internal components, ready to grow into @meu/ui.",
        progress: "Progress",
        milestones: [
          ["Foundation", "Done"],
          ["Docs flow", "Build"],
          ["Package path", "Next"],
        ],
      },
      resourceCard: {
        ready: "Ready",
        planned: "Planned",
        copied: "Copied",
        copy: "Copy",
        viewAria: (name: string) => `View ${name}`,
        favoriteAria: (name: string) => `Add ${name} to favorites`,
        unfavoriteAria: (name: string) => `Remove ${name} from favorites`,
      },
    },
    storyFlow: {
      sections: [
        {
          label: "01 — Who we are",
          heading: ["Design", "Without", "Limits"],
          description:
            "MeU UI Hub brings together design systems, components, and standardized documentation — helping design and development teams work consistently, faster, and more professionally across every project.",
          groups: [],
        },
        {
          label: "02 — Before and After",
          heading: ["A Small", "Change,", "A Big Difference"],
          description:
            "A small change in the way teams work can make a big difference across every project.",
          groups: [
            [
              { title: "Before — Scattered", text: "Every project had its own colors, fonts, and components, making it hard to stay consistent across teams." },
              { title: "Before — Slow Handoffs", text: "Designers and developers spent a lot of time going back and forth to agree on details." },
              { title: "Before — Hard to Scale", text: "Almost every new project had to start from scratch." },
            ],
            [
              { title: "Now — One Source of Truth", text: "Every MeU product shares a single design foundation." },
              { title: "Now — Instant Handoff", text: "Components are ready to go — designers and developers just assemble them to spec." },
              { title: "Now — Ready to Scale", text: "New projects launch faster by building on the shared foundation." },
            ],
          ],
        },
        {
          label: "03 — Growth Journey",
          heading: ["Step By", "Step,", "Growing"],
          description:
            "MeU UI Hub didn't appear overnight — it grew step by step.",
          groups: [
            [
              { title: "Starting Point", text: "Began with a handful of components shared across internal projects." },
              { title: "Experimentation", text: "Applied to real projects to find out what was actually needed." },
              { title: "Shaping Up", text: "The first set of design tokens and principles came together." },
            ],
            [
              { title: "Refinement", text: "Components, docs, and workflows became more standardized over time." },
              { title: "Adoption", text: "More and more teams at MeU started using UI Hub in their daily work." },
              { title: "Ongoing", text: "The system keeps getting expanded and improved every day." },
            ],
          ],
        },
        {
          label: "04 — Our vision",
          heading: ["The Future", "Of", "MeU UI"],
          description:
            "We're not just building a component library — we're building the foundation for every future MeU product.",
          secondDescription:
            "A design system isn't a project with an end date — it's an ongoing process where every contribution moves all of MeU forward.",
          groups: [
            [
              { title: "50+", text: "Ready-to-use components across the system." },
              { title: "Multi-platform", text: "Web, mobile, and internal products all share one system." },
              { title: "100%", text: "Design consistency across every MeU product." },
            ],
            [
              { title: "Scalable", text: "Ready to expand for every team and every new product." },
              { title: "Collaborative", text: "Every member can contribute and improve the system." },
              { title: "Sustainable", text: "Continuously maintained and updated to match real needs." },
            ],
          ],
        },
        {
          label: "05 — Join us",
          heading: ["Ready", "To Start", "With MeU?"],
          description:
            "Explore MeU UI Hub today and become part of the journey to build a shared design system for the whole company.",
          groups: [],
        },
      ] satisfies StoryFlowSection[],
    },
    auth: {
      login: {
        title: "Welcome back",
        subtitle: "Sign in to personalize your MeU UI Hub experience.",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        submit: "Sign in",
        google: "Continue with Google",
        noAccount: "Don't have an account?",
        registerLink: "Sign up",
        joinPrefix: "Join",
        joinHighlight: "hundreds of members",
        joinSuffix: "already using MeU UI Hub.",
        success: "Signed in successfully!",
        errors: {
          required: "Please enter both email and password.",
          invalidEmail: "Please enter a valid email address.",
          invalidCredentials: "Incorrect email or password.",
        },
      },
      register: {
        title: "Create your account",
        subtitle: "Sign up to save your settings and follow MeU UI Hub.",
        namePlaceholder: "Full name",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        confirmPasswordPlaceholder: "Confirm password",
        submit: "Sign up",
        google: "Sign up with Google",
        haveAccount: "Already have an account?",
        loginLink: "Sign in",
        success: "Account created successfully!",
        errors: {
          required: "Please fill in all fields.",
          invalidEmail: "Please enter a valid email address.",
          passwordTooShort: "Password must be at least 6 characters.",
          passwordMismatch: "Passwords do not match.",
          emailTaken: "This email is already registered.",
        },
      },
      profile: {
        title: "Personal Profile",
        subtitle: "Adjust your personal information and preferences.",
        nameLabel: "Full name",
        emailLabel: "Email",
        bioLabel: "Short bio",
        bioPlaceholder: "A few words about you...",
        avatarLabel: "Avatar",
        shuffleAvatar: "Shuffle avatar",
        languageLabel: "Display language",
        saveButton: "Save changes",
        savedMessage: "Changes saved.",
        logoutButton: "Log out",
        notLoggedInTitle: "You're not signed in",
        notLoggedInDescription: "Sign in to view and edit your profile.",
        goToLogin: "Go to sign in",
      },
    },
  },
};

export type Translations = typeof translations.vi;

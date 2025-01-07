const arrItem = ['NamTren', 'NamDuoi', 'CatLenDuong', 'CatXuongDuong']
const arrKeyChiSoKyThuat = ['DuongTrungBinhSMA', 'DuongTrungBinhEMA', 'TinHieuMACD', 'ChiSoRSI', 'ChiSoRS', 'BollingerBands', 'ChiSoMFI', 'GiaTriMCDX']
export const _paramsMap = {
  Fa: {
    DinhGia: {
      name: 'Định giá',
      Permission: 'loccophieu_dinhgia',
      VonHoa: {
        name: 'Vốn hoá(tỷ)',
        description: 'Vốn hóa (Market Capitalization) là một chỉ số quan trọng trong thị trường tài chính, được sử dụng để đo lường giá trị thị trường của một công ty hoặc một tài sản tài chính cụ thể. Nó được tính bằng cách nhân số lượng cổ phiếu lưu hành của công ty (hoặc tài sản) với giá cả cổ phiếu hiện tại trên thị trường.',
        option: [
          {
            label: '100',
            value: 100
          },
          {
            label: '500',
            value: 500
          },
          {
            label: '1,000',
            value: 1000
          },
          {
            label: '5,000',
            value: 5000
          },
          {
            label: '10,000',
            value: 10000
          },
          {
            label: '100,000',
            value: 100000
          },
        ],
      },
      PE: {
        name: 'PE',
        description: 'P/E (Price-to-Earnings ratio) là một chỉ số quan trọng trong phân tích tài chính được sử dụng để đánh giá giá trị đầu tư của một công ty hoặc một cổ phiếu cụ thể. P/E ratio tính toán bằng cách chia giá cổ phiếu hiện tại trên thị trường cho lợi nhuận trên mỗi cổ phiếu (EPS).',
        option: [
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      PS: {
        name: 'PS',
        description: 'P/S (Price-to-Sales ratio) là một chỉ số đánh giá tài chính được sử dụng trong lĩnh vực chứng khoán để đo lường giá trị thị trường của một công ty so với doanh thu của nó. Công thức tính P/S ratio là giá cổ phiếu chia cho doanh thu của công ty trong một khoảng thời gian cụ thể.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      PB: {
        name: 'PB',
        description: 'P/B (Price-to-Book ratio) là một chỉ số tài chính trong lĩnh vực chứng khoán được sử dụng để đánh giá giá trị thị trường của một công ty so với giá trị sổ sách của nó. Chỉ số này tính toán tỷ lệ giữa giá cổ phiếu và giá trị sổ sách mỗi cổ phiếu.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      EPS: {
        name: 'EPS',
        description: 'EPS (Earnings per Share) là một chỉ số tài chính trong lĩnh vực chứng khoán, đo lường lợi nhuận trên mỗi cổ phiếu của một công ty. EPS thể hiện phần lợi nhuận sau thuế mà công ty đạt được cho mỗi cổ phiếu đang lưu hành.',
        option: [
          {
            label: '1,000',
            value: 1000
          },
          {
            label: '2,000',
            value: 2000
          },
          {
            label: '5,000',
            value: 5000
          },
          {
            label: '10,000',
            value: 10000
          },
        ]
      }
    },
    SucManhTaiChinh: {
      name: 'Sức mạnh tài chính',
      Permission: 'loccophieu_smtc',
      ThanhToanNhanh: {
        name: 'Thanh toán nhanh',
        description: 'Thanh toán nhanh (Quick ratio), còn được gọi là chỉ số Acid-test ratio, là một chỉ số tài chính trong lĩnh vực kế toán và tài chính. Chỉ số này đo lường khả năng thanh toán ngắn hạn của một công ty mà không dựa vào các khoản tồn kho.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      ThanhToanHienHanh: {
        name: 'Thanh toán hiện hành',
        description: 'Thanh toán hiện hành (Current ratio) là một chỉ số tài chính trong lĩnh vực kế toán và tài chính, đo lường khả năng thanh toán ngắn hạn của một công ty.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      NoVCSH: {
        name: 'Tổng nợ/Vốn CSH',
        description: 'Tổng nợ/Vốn CSH (Total Debt-to-Capitalization ratio) là một chỉ số tài chính dùng để đo lường tỷ lệ giữa tổng số nợ của một công ty và vốn chủ sở hữu của công ty. Chỉ số này thể hiện mức độ sử dụng nguồn vốn nợ trong cấu trúc tài chính của công ty.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      LDR: {
        name: 'LDR',
        description: 'LDR (Loan to Deposit) là tỷ lệ dư tín dụng trên số vốn huy động của ngân hàng.',
        option: [
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '500',
            value: 500
          }
        ]
      },
      LAR: {
        name: 'LAR',
        description: 'LAR (Loan to Asset Ratio) tỷ lệ cho vay trên tổng tài sản đo lường bằng tổng dư nợ cho vay trên tổng tài sản.',
        option: [
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '80',
            value: 80
          }
        ]
      },
      ELR: {
        name: 'ELR',
        description: 'ELR (Expected Loss Ratio) là một kĩ thuật được sử dụng để xác định số tiền bồi thường dự kiến, liên quan đến phí bảo hiểm thu được.',
        option: [
          {
            label: '2',
            value: 2
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          }
        ]
      },
    },
    KhaNangSinhLoi: {
      name: 'Khả năng sinh lời',
      Permission: 'loccophieu_knsl',
      TyLeLaiGop: {
        name: 'Tỷ lệ lãi gộp (%)',
        description: 'Tỷ lệ lãi gộp (Gross profit margin) là một chỉ số tài chính được sử dụng để đo lường hiệu suất hoạt động kinh doanh của một công ty. Chỉ số này thể hiện phần trăm lãi gộp so với doanh thu.',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          }
        ]
      },
      TyLeLaiTuHDKD: {
        name: 'Tỷ lệ lãi từ HĐKD(%)',
        description: 'Tỷ lệ lãi từ hoạt động kinh doanh (Profit margin) là một chỉ số tài chính được sử dụng để đo lường hiệu suất lợi nhuận của một công ty. Chỉ số này thể hiện phần trăm lợi nhuận ròng so với doanh thu.',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TyLeLaiRong: {
        name: 'Tỷ lệ lãi ròng (%)',
        description: 'Tỷ lệ lãi ròng (Net profit margin) là một chỉ số tài chính được sử dụng để đo lường hiệu suất lợi nhuận của một công ty sau khi đã trừ đi tất cả các chi phí, bao gồm cả thuế và chi phí tài chính. Chỉ số này thể hiện phần trăm lợi nhuận ròng so với doanh thu.',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      YOEA: {
        name: 'YOEA',
        description: 'YOEA (Yield on Earning Assets) Tài sản Có sinh lãi là nguồn tạo thu nhập chính của hầu hết các ngân hàng. Vì phụ thuộc nhất định vào mức lãi suất chung, YOEA có thể biến động mạnh qua từng giai đoạn.',
        option: [
          {
            label: '2',
            value: 2
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          }
        ]
      },
      NIM: {
        name: 'NIM',
        description: 'NIM (Net Interest Margin) là tỷ lệ thu nhập lãi thuần. NIM được hiểu đơn giản là tỷ lệ chênh lệch giữa thu nhập lãi ròng của tổ chức và ngân sách mà tổ chức tài chính đó phải trả.',
        option: [
          {
            label: '2',
            value: 2
          },
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          }
        ]
      },
      COF: {
        name: 'COF',
        description: 'COF (Cost of Fund) là số đo tiền lãi được trả trên các quỹ vay từ các người gửi tiền, hay từ các ngân hàng khác.',
        option: [
          {
            label: '2',
            value: 2
          },
          {
            label: '4',
            value: 4
          },
          {
            label: '6',
            value: 6
          },
          {
            label: '8',
            value: 8
          }
        ]
      },
    },
    ThanhKhoan: {
      name: 'Thanh Khoản',
      Permission: 'loccophieu_tk',
      description: 'Khối lượng trung bình (Average volume) là một thước đo trong giao dịch chứng khoán để xác định khối lượng trung bình của một công ty hoặc một tài sản được giao dịch trong một khoảng thời gian cụ thể. Nó thể hiện số lượng cổ phiếu hoặc tài sản đã được giao dịch trung bình trong mỗi phiên giao dịch trong khoảng thời gian đó.',
      ThanhKhoanNow: {
        name: 'Thanh khoản hiện tại',
        description: '',
        option: [
          {
            label: '10,000',
            value: 10000
          },
          {
            label: '50,000',
            value: 50000
          },
          {
            label: '100,000',
            value: 100000
          },
          {
            label: '200,000',
            value: 200000
          },
          {
            label: '500,000',
            value: 500000
          },
          {
            label: '1,000,000',
            value: 1000000
          },
        ]
      },
      ThanhKhoanTB20Ngay: {
        name: 'Thanh khoản trung bình 20 ngày',
        description: '',
        option: [
          {
            label: '10,000',
            value: 10000
          },
          {
            label: '50,000',
            value: 50000
          },
          {
            label: '100,000',
            value: 100000
          },
          {
            label: '200,000',
            value: 200000
          },
          {
            label: '500,000',
            value: 500000
          },
          {
            label: '1,000,000',
            value: 1000000
          },
        ]
      },
      Vol5DMap: {
        name: 'Thanh khoản so với KLTB 5 ngày(%)',
        description: '',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      Vol10DMap: {
        name: 'Thanh khoản so với KLTB 10 ngày(%)',
        description: '',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      Vol20DMap: {
        name: 'Thanh khoản so với KLTB 20 ngày(%)',
        description: '',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      Vol50DMap: {
        name: 'Thanh khoản so với KLTB 50 ngày(%)',
        description: '',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      TkCdk1: {
        name: 'Thanh khoản/CĐK 1 ngày(%)',
        description: 'Thanh khoản/CĐK (Shareholder liquidity) là một khái niệm được sử dụng để đo lường khả năng của cổ đông không nội bộ (bên ngoài) trong việc mua và bán cổ phiếu của một công ty.',
        option: [
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      TkCdk3: {
        name: 'Thanh khoản/CĐK 3 ngày(%)',
        description: '',
        option: [
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
      TkCdk5: {
        name: 'Thanh khoản/CĐK 5 ngày(%)',
        description: '',
        option: [
          {
            label: '5',
            value: 5
          },
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '70',
            value: 70
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '150',
            value: 150
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          }
        ]
      },
    },
    KhaNangHoatDong: {
      name: 'Khả năng hoạt động',
      Permission: 'loccophieu_knhd',
      VongQuayTongTS: {
        name: 'Vòng quay tổng tài sản',
        description: 'Vòng quay tổng tài sản (Total Asset Turnover) là một chỉ số tài chính được sử dụng để đánh giá hiệu quả sử dụng tài sản của một công ty. Chỉ số này đo lường số lần mà tổng tài sản của công ty được sử dụng để tạo ra doanh thu trong một khoảng thời gian cụ thể.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      VongQuayHangTonKho: {
        name: 'Vòng quay hàng tồn kho',
        description: 'Vòng quay hàng tồn kho (Inventory Turnover) là một chỉ số tài chính được sử dụng để đánh giá hiệu quả quản lý và sử dụng hàng tồn kho của một công ty. Chỉ số này đo lường số lần hàng tồn kho của công ty được bán hết và thay thế trong một khoảng thời gian cụ thể.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      VongQuayCacKhoanPhaiThu: {
        name: 'Vòng quay các khoản phải thu',
        description: 'Vòng quay các khoản phải thu (Accounts Receivable Turnover) là một chỉ số tài chính được sử dụng để đánh giá hiệu quả quản lý và thu hồi các khoản phải thu của một công ty. Chỉ số này đo lường số lần mà công ty thu hồi khoản phải thu trong một khoảng thời gian cụ thể.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      VongQuayTSNH: {
        name: 'Vòng quay ngắn hạn',
        description: 'Vòng quay ngắn hạn (Short-term Asset Turnover) là một chỉ số tài chính được sử dụng để đánh giá hiệu quả sử dụng các tài sản ngắn hạn của một công ty trong việc tạo ra doanh thu. Chỉ số này đo lường số lần tài sản ngắn hạn của công ty được sử dụng để tạo ra doanh thu trong một khoảng thời gian cụ thể.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      LLRL: {
        name: 'LLRL',
        description: 'LLRL',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      PCL: {
        name: 'PCL',
        description: 'PCL (Provision For Credit Losses) là một ước tính thiệt hại tiềm năng mà một công ty có thể gặp do rủi ro tín dụng. Dự phòng rủi ro tín dụng được coi là một khoản chi phí trên báo cáo tài chính của công ty.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
      TyLeNoXau: {
        name: 'Tỷ lệ nợ xấu',
        description: 'Tỷ lệ nợ xấu là tỷ lệ được các công ty sử dụng để đánh giá khả năng phòng thủ của mình trước những rủi ro liên quan đến vấn đề nợ xấu.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '3',
            value: 3
          },
          {
            label: '5',
            value: 5
          },
        ]
      },
    },
    HieuQuaQuanLy: {
      name: 'Hiệu quả quản lý',
      Permission: 'loccophieu_hqql',
      ROA: {
        name: 'ROA',
        description: 'ROA (Return on Assets) là một chỉ số tài chính được sử dụng để đánh giá hiệu suất của một công ty trong việc sử dụng tài sản để tạo ra lợi nhuận. Chỉ số này đo lường tỷ lệ lợi nhuận mà công ty đạt được so với tổng tài sản của nó.',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      ROE: {
        name: 'ROE',
        description: 'ROE (Return on Equity) là một chỉ số tài chính quan trọng được sử dụng để đánh giá hiệu suất của một công ty trong việc sinh lợi từ vốn chủ sở hữu. Chỉ số này đo lường tỷ lệ lợi nhuận mà công ty đạt được so với vốn chủ sở hữu của nó.',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      ROCE: {
        name: 'ROCE',
        description: 'ROCE (Return on Capital Employed) là một chỉ số tài chính quan trọng được sử dụng để đánh giá hiệu suất của một công ty trong việc sinh lợi từ vốn hoạt động. Chỉ số này đo lường tỷ lệ lợi nhuận mà công ty đạt được so với vốn hoạt động của nó.',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
        ]
      },
      CIR: {
        name: 'CIR',
        description: 'CIR',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '40',
            value: 40
          },
          {
            label: '50',
            value: 50
          },
        ]
      }
    },
    ThongTinCoDong: {
      name: 'Thông tin cổ đông',
      Permission: 'loccophieu_ttcd',
      WeightCirculation: {
        name: 'KLCPLH (triệu)',
        description: 'Khối lượng cổ phiếu lưu hành (Outstanding Shares) là tổng số cổ phiếu của một công ty đã được phát hành và đang được sở hữu bởi cổ đông. Đây là số lượng cổ phiếu mà công ty đã bán ra và đang tồn tại trên thị trường.',
        option: [
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          },
          {
            label: '200',
            value: 200
          },
          {
            label: '300',
            value: 300
          },
          {
            label: '500',
            value: 500
          },
          {
            label: '1,000',
            value: 1000
          },
          {
            label: '2,000',
            value: 2000
          },
        ]
      },
      CdkPc: {
        name: 'Cổ đông khác (%)',
        description: 'Cổ đông khác (%) là một chỉ số thể hiện tỷ lệ sở hữu cổ phiếu của các cổ đông khác, không bao gồm cổ đông nội bộ và cổ đông nước ngoài, trong một công ty so với tổng số cổ phiếu lưu hành của công ty. Chỉ số này cho biết phần trăm cổ phiếu mà các cổ đông không thuộc vào nhóm cổ đông nội bộ hoặc cổ đông nước ngoài đã sở hữu trong công ty.',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '80',
            value: 80
          }
        ]
      },
      ShnnPc: {
        name: 'Sở hữu NN (%)',
        description: 'Sở hữu nước ngoài (%) là một chỉ số thể hiện tỷ lệ sở hữu cổ phiếu của các nhà đầu tư nước ngoài trong một công ty so với tổng số cổ phiếu lưu hành của công ty. Chỉ số này cho biết phần trăm cổ phiếu mà các nhà đầu tư nước ngoài đã mua trong công ty.',
        option: [
          {
            label: '10',
            value: 10
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '80',
            value: 80
          }
        ]
      },
    },
    BienDongGia: {
      name: 'Biến động giá',
      Permission: 'loccophieu_bdg',
      description: 'Biến động giá (Price volatility) là một khái niệm trong lĩnh vực tài chính và chứng khoán, dùng để mô tả sự biến đổi và dao động của giá cả trong một thời gian nhất định. Nó thể hiện mức độ biến động và sự thay đổi của giá cả trong một thị trường hoặc một công cụ tài chính cụ thể.',
      ChangePercent: {
        name: 'Biến động giá 1 ngày(%)',
        description: '',
        option: [
          {
            label: '-10',
            value: -10
          },
          {
            label: '-8',
            value: -8
          },
          {
            label: '-6',
            value: -6
          },
          {
            label: '-4',
            value: -4
          },
          {
            label: '-2',
            value: -2
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '4',
            value: 4
          },
          {
            label: '6',
            value: 6
          },
          {
            label: '8',
            value: 8
          },
          {
            label: '10',
            value: 10
          },
        ]
      },
      BienDongGia1W: {
        name: 'Biến động giá 1 tuần(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia2W: {
        name: 'Biến động giá 2 tuần(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia1M: {
        name: 'Biến động giá 1 tháng(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia3M: {
        name: 'Biến động giá 3 tháng(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia6M: {
        name: 'Biến động giá 6 tháng(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia9M: {
        name: 'Biến động giá 9 tháng(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia1Y: {
        name: 'Biến động giá 1 năm(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia2Y: {
        name: 'Biến động giá 2 năm(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia3Y: {
        name: 'Biến động giá 3 năm(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      BienDongGia5Y: {
        name: 'Biến động giá 5 năm(%)',
        description: '',
        option: [
          {
            label: '-50',
            value: -50
          },
          {
            label: '-30',
            value: -30
          },
          {
            label: '-20',
            value: -20
          },
          {
            label: '0',
            value: 0
          },
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
        ]
      },
      Beta: {
        name: 'Chỉ số Beta',
        description: 'Chỉ số Beta là một đại lượng được sử dụng trong lĩnh vực tài chính để đo độ biến động của một cổ phiếu hoặc một quỹ đầu tư so với biến động chung của thị trường chứng khoán. Chỉ số Beta được sử dụng để đánh giá mức độ rủi ro và khả năng sinh lợi của một tài sản tài chính so với thị trường.',
        option: [
          {
            label: '1',
            value: 1
          },
          {
            label: '1.2',
            value: 1.2
          },
          {
            label: '1.5',
            value: 1.5
          },
          {
            label: '1.8',
            value: 1.8
          },
          {
            label: '2',
            value: 2
          },
          {
            label: '2.5',
            value: 2.5
          },
          {
            label: '3',
            value: 3
          },
        ]
      },
    },
    KetQuaKinhDoanh: {
      name: 'Kết quả kinh doanh',
      Permission: 'loccophieu_kqkd',
      description: 'Kết quả kinh doanh',
      Dt4Q: {
        name: 'Doanh thu 4 quý (tỷ)',
        description: '',
        option: [
          {
            label: '100',
            value: 100
          },
          {
            label: '500',
            value: 500
          },
          {
            label: '1,000',
            value: 1000
          },
          {
            label: '5,000',
            value: 5000
          },
          {
            label: '10,000',
            value: 10000
          }
        ]
      },
      TangTruongDtQuyGanNhat: {
        name: 'Tăng trưởng doanh thu quý gần nhất (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongDtQuyGanNhi: {
        name: 'Tăng trưởng doanh thu quý gần nhì (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongDtQuyCungKy: {
        name: 'Tăng trưởng doanh thu quý cùng kỳ (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongDt4Quy: {
        name: 'Tăng trưởng doanh thu 4 quý (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      Ln4Q: {
        name: 'Lợi nhuận 4 quý (tỷ)',
        description: '',
        option: [
          {
            label: '100',
            value: 100
          },
          {
            label: '500',
            value: 500
          },
          {
            label: '1,000',
            value: 1000
          },
          {
            label: '5,000',
            value: 5000
          },
          {
            label: '10,000',
            value: 10000
          }
        ]
      },
      TangTruongLnQuyGanNhat: {
        name: 'Tăng trưởng lợi nhuận quý gần nhất (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongLnQuyGanNhi: {
        name: 'Tăng trưởng lợi nhuận quý gần nhì (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongLnQuyCungKy: {
        name: 'Tăng trưởng lợi nhuận quý cùng kỳ (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
      TangTruongLn4Quy: {
        name: 'Tăng trưởng lợi nhuận 4 quý (%)',
        description: '',
        option: [
          {
            label: '20',
            value: 20
          },
          {
            label: '30',
            value: 30
          },
          {
            label: '50',
            value: 50
          },
          {
            label: '100',
            value: 100
          }
        ]
      },
    },
  },
  Ta: {
    TinHieuMACD: {
      name: 'Tín hiệu MACD',
      Permission: 'loccophieu_macd',
      description: 'MACD (Moving Average Convergence Divergence) là một chỉ báo kỹ thuật phổ biến được sử dụng trong phân tích kỹ thuật để đo lường sự hội tụ và rời rạc giữa hai đường trung bình di động (moving average) của giá cả.',
    },
    DuongTrungBinhSMA: {
      name: 'Đường trung bình SMA',
      Permission: 'loccophieu_sma',
      description: 'Đường SMA (Simple Moving Average) là một trong những công cụ phân tích kỹ thuật phổ biến trong lĩnh vực giao dịch chứng khoán và thị trường tài chính. Nó được sử dụng để theo dõi và đánh giá xu hướng giá cả của một tài sản tài chính trong một khoảng thời gian nhất định.',
    },
    DuongTrungBinhEMA: {
      name: 'Đường trung bình EMA',
      Permission: 'loccophieu_ema',
      description: 'EMA (Exponential Moving Average) là một loại đường trung bình di động được sử dụng trong phân tích kỹ thuật để làm mịn biểu đồ giá cả và xác định xu hướng giá cả trong thị trường tài chính.',
    },
    GiaTriMCDX: {
      name: 'Giá trị MCDX',
      Permission: 'loccophieu_mcdx',
      description: 'Giá trị MCDX.',
    },
    BollingerBands: {
      name: 'Bollinger Bands',
      Permission: 'loccophieu_bollinger',
      description: 'Bollinger Bands là một công cụ phân tích kỹ thuật được sử dụng để đo lường biến động giá cả và xác định các mức hỗ trợ và kháng cự trong thị trường tài chính. Chỉ báo này được tạo ra bởi John Bollinger và dựa trên ý tưởng rằng giá cả thường dao động trong khoảng giá nhất định xung quanh một đường trung bình di động.',
    },
    ChiSoRSI: {
      name: 'Chỉ số RSI',
      Permission: 'loccophieu_rsi',
      description: 'RSI (Relative Strength Index) là một chỉ báo kỹ thuật phổ biến được sử dụng để đo lường sự mạnh mẽ của một xu hướng giá cả và xác định mức độ quá mua hoặc quá bán của một tài sản tài chính.',
    },
    ChiSoRS: {
      name: 'Chỉ số RS',
      Permission: 'loccophieu_rs',
      description: 'Chỉ số RS',
    },
    ChiSoMFI: {
      name: 'Chỉ số MFI',
      Permission: 'loccophieu_mfi',
      description: 'MFI (Money Flow Index) là một chỉ báo kỹ thuật trong phân tích thị trường tài chính, được sử dụng để đo lường dòng tiền mua vào và bán ra của một tài sản và xác định mức độ quá mua hoặc quá bán của thị trường.',
    }
  }
} as {Fa: {[key: string]: any}, Ta: {[key: string]: any}}
export const _optionMapNameTa = {
  TinHieuMACD: [
    { label: "MACD cắt lên đường tín hiệu", value: 'MACDCatLenDuongTinHieu' },
    { label: "MACD đang ở trên đường tín hiệu", value: 'MACDDangOTrenDuongTinHieu' },
    { label: "MACD cắt xuống đường tín hiệu", value: 'MACDCatXuongDuongTinHieu' },
    { label: "MACD đang ở dưới đường tín hiệu", value: 'MACDDangCatDuoiDuongTinHieu' },
    { label: "MACD cắt lên trên đường 0", value: 'MACDCatLenTrenDuong0' },
    { label: "MACD đang ở trên đường 0", value: 'MACDDangOTrenDuong0' },
    { label: "MACD cắt xuống đường 0", value: 'MACDCatXuongDuong0' },
    { label: "MACD đang cắt dưới đường 0", value: 'MACDDangCatDuoiDuong0' }
  ],
  DuongTrungBinhSMA: [
    { label: "Giá hiện tại cắt lên đường SMA5", value: 'GiaHienTaiCatLenDuongSMA5' },
    { label: "Giá hiện tại cắt xuống đường SMA5", value: 'GiaHienTaiCatXuongDuongSMA5' },
    { label: "Giá hiện tại cắt lên đường SMA10", value: 'GiaHienTaiCatLenDuongSMA10' },
    { label: "Giá hiện tại cắt xuống đường SMA10", value: 'GiaHienTaiCatXuongDuongSMA10' },
    { label: "Giá hiện tại cắt lên đường SMA20", value: 'GiaHienTaiCatLenDuongSMA20' },
    { label: "Giá hiện tại cắt xuống đường SMA20", value: 'GiaHienTaiCatXuongDuongSMA20' },
    { label: "Giá hiện tại cắt lên đường SMA50", value: 'GiaHienTaiCatLenDuongSMA50' },
    { label: "Giá hiện tại cắt xuống đường SMA50", value: 'GiaHienTaiCatXuongDuongSMA50' },
    { label: "SMA20 nằm trên SMA50", value: 'SMA20NamTrenSMA50' },
    { label: "SMA20 nằm dưới SMA50", value: 'SMA20NamDuoiSMA50' },
    { label: "SMA50 nằm trên SMA200", value: 'SMA50NamTrenSMA200' },
    { label: "SMA50 nằm dưới SMA200", value: 'SMA50NamDuoiSMA200' },
    { label: "Giá hiện tại cắt lên SMA100", value: 'GiaHienTaiCatLenDuongSMA100' },
    { label: "Giá hiện tại cắt xuống SMA100", value: 'GiaHienTaiCatXuongSMA100' },
    { label: "Giá hiện tại cắt lên SMA200", value: 'GiaHienTaiCatLenDuongSMA200' },
    { label: "Giá hiện tại cắt xuống SMA200", value: 'GiaHienTaiCatXuongSMA200' },
    { label: "Giá hiện tại nằm trên SMA5", value: 'GiaHienTaiNamTrenSMA5' },
    { label: "Giá hiện tại nằm dưới SMA5", value: 'GiaHienTaiNamDuoiSMA5' },
    { label: "Giá hiện tại nằm trên SMA10", value: 'GiaHienTaiNamTrenSMA10' },
    { label: "Giá hiện tại nằm dưới SMA10", value: 'GiaHienTaiNamDuoiSMA10' },
    { label: "Giá hiện tại nằm trên SMA20", value: 'GiaHienTaiNamTrenSMA20' },
    { label: "Giá hiện tại nằm dưới SMA20", value: 'GiaHienTaiNamDuoiSMA20' },
    { label: "Giá hiện tại nằm trên SMA50", value: 'GiaHienTaiNamTrenSMA50' },
    { label: "Giá hiện tại nằm dưới SMA50", value: 'GiaHienTaiNamDuoiSMA50' },
    { label: "Giá hiện tại nằm trên SMA100", value: 'GiaHienTaiNamTrenSMA100' },
    { label: "Giá hiện tại nằm dưới SMA100", value: 'GiaHienTaiNamDuoiSMA100' },
    { label: "Giá hiện tại nằm trên SMA200", value: 'GiaHienTaiNamTrenSMA200' },
    { label: "Giá hiện tại nằm dưới SMA200", value: 'GiaHienTaiNamDuoiSMA200' },
    { label: "SMA20 cắt lên SMA50", value: 'SMA20CatLenSMA50' },
    { label: "SMA20 cắt xuống SMA50", value: 'SMA20CatXuongSMA50' },
    { label: "SMA50 cắt lên SMA200", value: 'SMA50CatLenSMA200' },
    { label: "SMA50 cắt xuống SMA200", value: 'SMA50CatXuongSMA200' },
  ],
  DuongTrungBinhEMA: [
    { label: "Giá hiện tại cắt lên đường EMA5", value: 'GiaHienTaiCatLenDuongEMA5' },
    { label: "Giá hiện tại cắt xuống đường EMA5", value: 'GiaHienTaiCatXuongDuongEMA5' },
    { label: "Giá hiện tại cắt lên đường EMA10", value: 'GiaHienTaiCatLenDuongEMA10' },
    { label: "Giá hiện tại cắt xuống đường EMA10", value: 'GiaHienTaiCatXuongDuongEMA10' },
    { label: "Giá hiện tại cắt lên đường EMA20", value: 'GiaHienTaiCatLenDuongEMA20' },
    { label: "Giá hiện tại cắt xuống đường EMA20", value: 'GiaHienTaiCatXuongDuongEMA20' },
    { label: "Giá hiện tại cắt lên đường EMA50", value: 'GiaHienTaiCatLenDuongEMA50' },
    { label: "Giá hiện tại cắt xuống đường EMA50", value: 'GiaHienTaiCatXuongDuongEMA50' },
    { label: "EMA20 nằm trên EMA50", value: 'EMA20NamTrenEMA50' },
    { label: "EMA20 nằm dưới EMA50", value: 'EMA20NamDuoiEMA50' },
    { label: "EMA50 nằm trên EMA200", value: 'EMA50NamTrenEMA200' },
    { label: "EMA50 nằm dưới EMA200", value: 'EMA50NamDuoiEMA200' },
    { label: "Giá hiện tại cắt lên EMA100", value: 'GiaHienTaiCatLenDuongEMA100' },
    { label: "Giá hiện tại cắt xuống EMA100", value: 'GiaHienTaiCatXuongEMA100' },
    { label: "Giá hiện tại cắt lên EMA200", value: 'GiaHienTaiCatLenDuongEMA200' },
    { label: "Giá hiện tại cắt xuống EMA200", value: 'GiaHienTaiCatXuongEMA200' },
    { label: "Giá hiện tại nằm trên EMA5", value: 'GiaHienTaiNamTrenEMA5' },
    { label: "Giá hiện tại nằm dưới EMA5", value: 'GiaHienTaiNamDuoiEMA5' },
    { label: "Giá hiện tại nằm trên EMA10", value: 'GiaHienTaiNamTrenEMA10' },
    { label: "Giá hiện tại nằm dưới EMA10", value: 'GiaHienTaiNamDuoiEMA10' },
    { label: "Giá hiện tại nằm trên EMA20", value: 'GiaHienTaiNamTrenEMA20' },
    { label: "Giá hiện tại nằm dưới EMA20", value: 'GiaHienTaiNamDuoiEMA20' },
    { label: "Giá hiện tại nằm trên EMA50", value: 'GiaHienTaiNamTrenEMA50' },
    { label: "Giá hiện tại nằm dưới EMA50", value: 'GiaHienTaiNamDuoiEMA50' },
    { label: "Giá hiện tại nằm trên EMA100", value: 'GiaHienTaiNamTrenEMA100' },
    { label: "Giá hiện tại nằm dưới EMA100", value: 'GiaHienTaiNamDuoiEMA100' },
    { label: "Giá hiện tại nằm trên EMA200", value: 'GiaHienTaiNamTrenEMA120' },
    { label: "Giá hiện tại nằm dưới EMA200", value: 'GiaHienTaiNamDuoiEMA120' },
    { label: "EMA20 cắt lên EMA50", value: 'EMA20CatLenEMA50' },
    { label: "EMA20 cắt xuống EMA50", value: 'EMA20CatXuongEMA50' },
    { label: "EMA50 cắt lên EMA200", value: 'EMA50CatLenEMA200' },
    { label: "EMA50 cắt xuống EMA200", value: 'EMA50CatXuongEMA200' },
  ],
  GiaTriMCDX: [
    { label: "Dòng tiền tạo lập MCDX tăng >= 25%", value: 'MCDX5' },
    { label: "Dòng tiền tạo lập MCDX tăng >= 50%", value: 'MCDX10' },
    { label: "Dòng tiền tạo lập MCDX tăng >= 75%", value: 'MCDX15' },
  ],
  BollingerBands: [
    { label: "Giá thoát ra ngoài biên trên Bollinger Band", value: 'GiaThoatRaNgoaiBienTrenBollingerBand' },
    { label: "Giá cắt xuống từ ngoài biên trên Bollinger Band", value: "GiaCatXuongTuNgoaiBienTrenBollingerBand" },
    { label: "Giá đang ở ngoài biên trên Bollinger Band", value: "GiaDangONgoaiBienTrenBollingerBand"},
    { label: "Giá thoát ra ngoài biên dưới Bollinger Band", value: "GiaThoatRaNgoaiBienDuoiBollingerBand"},
    { label: "Giá cắt xuống từ ngoài biên dưới Bollinger Band", value: "GiaCatXuongTuNgoaiBienDuoiBollingerBand"},
    { label: "Giá đang ở ngoài biên dưới Bollinger Band", value: "GiaDangONgoaiBienDuoiBollingerBand"},
  ],
  ChiSoRSI: [
    { label: "RSI đi vào vùng quá mua", value: "RSIDiVaoVungQuaMua" },
    { label: "RSI đi vào vùng quá bán", value: "RSIDiVaoVungQuaBan" },
    { label: "RSI thoát khỏi vùng quá mua", value: "RSIThoatKhoiVungQuaMua" },
    { label: "RSI thoát khỏi vùng quá bán", value: "RSIThoatKhoiVungQuaBan" },
    { label: "RSI đang ở vùng quá mua", value: "RSIDangOVungQuaMua" },
    { label: "RSI đang ở vùng quá bán", value: "RSIDangOVungQuaBan" },
    { label: "RSI lớn hơn hoặc bằng 50", value: "RSILonHonHoacBang50" },
  ],
  ChiSoRS: [
    { label: "RS >= 1", value: "RS>=1" },
    { label: "RS >= 2", value: "RS>=2" },
    { label: "RS >= 3", value: "RS>=3" },
    { label: "RS >= 4", value: "RS>=4" },
    { label: "RS >= 5", value: "RS>=5" },
  ],
  ChiSoMFI: [
    { label: "MFI đi vào vùng quá mua", value: "MFIDiVaoVungQuaMua" },
    { label: "MFI đi vào vùng quá bán", value: "MFIDiVaoVungQuaBan" },
    { label: "MFI thoát khỏi vùng quá mua", value: "MFIThoatKhoiVungQuaMua" },
    { label: "MFI thoát khỏi vùng quá bán", value: "MFIThoatKhoiVungQuaBan" },
    { label: "MFI đang ở vùng quá mua", value: "MFIDangOVungQuaMua" },
    { label: "MFI đang ở vùng quá bán", value: "MFIDangOVungQuaBan" },
  ],
} as {[key: string]: any}
export function _getRowDataLocCoPhieu (livedata: any) {
  if (!livedata || !livedata.Code) return
  const DanhSachLocTa = useConst().value.DanhSachLocTa || {};
  if (Object.keys(DanhSachLocTa).length == 0) return;
  const Ta = DanhSachLocTa[livedata.Code] || null;
  if (!Ta) return
  const newObj = Object.assign({}, Ta, livedata);
  const newRowData = _getDataForStock(newObj.Code, newObj) || null
  if (!newRowData) return
  return newRowData
}

export function _getDataForStock(key: string, newTa: any = null) {
  const { $getValDanhGia } = useNuxtApp()
  if (!key) return

  const { DanhSachLocFa = {}, DanhSachLocTa = {} } = useConst().value
  const liveBoard = useGlobal().value.LiveBoardSymbol[key]
  
  if (!liveBoard || !(newTa || DanhSachLocTa[key])) return

  const fa = DanhSachLocFa[key] || {}
  const ta = newTa || DanhSachLocTa[key]

  const { liveboard, SubSectorID, WeightCirculation } = liveBoard
  const { Close, Reference, Ceiling, Floor, Change, ChangePercent, TotalVolume, Exchange } = liveboard
  const numberClose = isnum(Close)
  const numberReference = isnum(Reference)

  const RsiMap = (hasData(ta.Rsi) && ta.Rsi.length) ? ta.Rsi[ta.Rsi.length - 1] : -999999999999
  const RsMap = RsiMap !== -999999999999 ? Math.min(100 / (100 - RsiMap) - 1, 100) : RsiMap
  
  const lengthFa = Object.keys(fa).length
  const result = getResult(fa, lengthFa)
  const resultArr = getResultArr(ta)
  const resultVal = getResultVal(ta)

  const getFinancialMetric = (value: number) => lengthFa ? isnum(value / 1e9, true) : -999999999999
  const Dt4Q = getFinancialMetric(fa.Dt4Q)
  const Ln4Q = getFinancialMetric(fa.Ln4Q)
  const PB = lengthFa ? isnum(numberReference * 1000 / fa.B, true) : -999999999999
  const PE = lengthFa ? isnum(numberReference * 1000 / fa.EPS, true) : -999999999999
  const PS = lengthFa ? isnum(numberReference * 1000 / fa.S, true) : -999999999999

  const getVol = (key: string) => {
    const vol = isnum(ta[key])
    return vol ? ((isnum(TotalVolume) - vol) / vol) * 100 : -999999999999
  }

  const getBienDongGia = (price: number) => {
    return hasData3(price) ? (numberClose - price) * 100 / price : -999999999999
  }

  const VonHoa = Reference * isnum(WeightCirculation) / 1e6
  const ThiGiaVon = VonHoa

  const objDanhGia = _getDanhGia(key)
  const BankerRsiMap = isnum(resultVal.BankerRsi) ? isnum(resultVal.BankerRsi) / 20 * 100 : -999999999999
  return {
    ...result,
    ...resultArr,
    ...resultVal,
    Dt4Q,
    Ln4Q,
    PE: isnum(PE),
    PB: isnum(PB),
    ThiGiaVon: isnum(ThiGiaVon),
    VonHoa: isnum(VonHoa),
    Code: key,
    Close: isnum(Close),
    Change: isnum(Change),
    ChangePercent: isnum(ChangePercent),
    TotalVolume: isnum(TotalVolume),
    ThanhKhoanNow: isnum(TotalVolume),
    ThanhKhoanTB20Ngay: isnum(ta.Vol20D),
    RsiMap: isnum(RsiMap),
    RsMap: isnum(RsMap),
    SubSectorID,
    Exchange,
    WeightCirculation: WeightCirculation / 1e6,
    Reference: isnum(Reference),
    Ceiling: isnum(Ceiling),
    Floor: isnum(Floor),
    PS,
    Vol5DMap: getVol("Vol5D"),
    Vol10DMap: getVol("Vol10D"),
    Vol20DMap: getVol("Vol20D"),
    Vol50DMap: getVol("Vol50D"),
    BienDongGia1W: getBienDongGia(isnum(ta.Price1W, true)),
    BienDongGia2W: getBienDongGia(isnum(ta.Price2W, true)),
    BienDongGia1M: getBienDongGia(isnum(ta.Price1M, true)),
    BienDongGia3M: getBienDongGia(isnum(ta.Price3M, true)),
    BienDongGia6M: getBienDongGia(isnum(ta.Price6M, true)),
    BienDongGia9M: getBienDongGia(isnum(ta.Price9M, true)),
    BienDongGia1Y: getBienDongGia(isnum(ta.Price1Y, true)),
    BienDongGia2Y: getBienDongGia(isnum(ta.Price2Y, true)),
    BienDongGia3Y: getBienDongGia(isnum(ta.Price3Y, true)),
    BienDongGia5Y: getBienDongGia(isnum(ta.Price5Y, true)),
    NganHan: $getValDanhGia('NganHan', objDanhGia),
    DaiHan: $getValDanhGia('DaiHan', objDanhGia),
    Beta: isnum(ta.Beta, true),
    CdkPc: isnum(ta.CdkPc, true),
    ShnnPc: isnum(ta.ShnnPc, true),
    TkCdk1: isnum(ta.TkCdk1, true),
    TkCdk3: isnum(ta.TkCdk3, true),
    TkCdk5: isnum(ta.TkCdk5, true),
    BankerRsiMap
  }
}
function getResult(fa: any, lengthFa: number = 0) {
  const keysToCheck = ['B', 'EPS', 'Ebit', 'NoVCSH', 'Quarter', 'ROA',
    'ROCE', 'ROE', 'ROIC', 'S', 'CIR', 'YOEA', 'NIM', 'COF', 'LDR', 'LAR',
    'ELR', 'LLRL', 'PCL', 'TyLeNoXau', 'TangTruongDtQuyGanNhat', 'TangTruongDtQuyGanNhi',
    'TangTruongDtQuyCungKy', 'TangTruongDt4Quy', 'TangTruongLnQuyGanNhat',
    'TangTruongLnQuyGanNhi', 'TangTruongLnQuyCungKy', 'TangTruongLn4Quy',
    'ThanhToanHienHanh', 'ThanhToanNhanh', 'TienTuongDuongTien', 'TyLeEbit',
    'TyLeLaiGop', 'TyLeLaiRong', 'TyLeLaiTuHDKD', 'VongQuayCacKhoanPhaiThu',
    'VongQuayHangTonKho', 'VongQuayTSNH', 'VongQuayTongTS', 'Year', 'DtQuyGanNhat',
    'DtQuyGanNhi', 'LnQuyGanNhat', 'LnQuyGanNhi'] as string[]
    const result = {} as any;
    for (const stringKey of keysToCheck) {
      result[stringKey] = lengthFa ? isnum(fa[stringKey], true) : -999999999999;
    }
  return result
}
function getResultArr(ta: any) {
  const keysToArr = ['Rsi', 'Mfi',
    'Sma5', 'Sma10', 'Sma20', 'Sma50', 'Sma100', 'Sma200',
    'Ema5', 'Ema10', 'Ema20', 'Ema50', 'Ema100', 'Ema200',
    'Macd', 'Signal']
  const resultArr = {} as any
  for (const key of keysToArr) {
    resultArr[key] = ta[key] && ta[key].length ? ta[key] : [];
  }
  return resultArr;
}
function getResultVal(ta: any) {
  const keysToVal = ['BbUp', 'BbDown', 'BankerRsi']
  const resultVal = {} as any
  for (const key of keysToVal) {
    resultVal[key] = ta[key] ? isnum(ta[key]) : 0;
  }
  return resultVal;
}
export function _checkKetQuaDoanhThu (key: string, e: any) {
  if (!key || !e) return false
  if (['Dt4Q', 'TangTruongDtQuyGanNhat', 'TangTruongDtQuyCungKy', 'TangTruongDt4Quy'].includes(key)) {
    if (isnum(e.DtQuyGanNhat) < 0) return false
  }
  if (['TangTruongDtQuyGanNhi'].includes(key)) {
    if (isnum(e.DtQuyGanNhi) < 0) return false
  }
  if (['Ln4Q', 'TangTruongLnQuyGanNhat', 'TangTruongLnQuyCungKy', 'TangTruongLn4Quy'].includes(key)) {
    if (isnum(e.LnQuyGanNhat) < 0) return false
  }
  if (['TangTruongLnQuyGanNhi'].includes(key)) {
    if (isnum(e.LnQuyGanNhi) < 0) return false
  }
  return true
}
export function _checkHandleLoc(e: any, dataFillter: any, selectedNganh: any, selectedSan: any) {
  let checkTa = true
  let checkFa = true
  if (selectedNganh && e.SubSectorID != selectedNganh) return false
  if (selectedSan && e.Exchange != selectedSan) return false
  if (dataFillter.noData) return true
  const TotalVolume = useGlobal().value.LiveBoardSymbol[e.Code]?.liveboard?.TotalVolume || 0
  if (!TotalVolume) return false
  const { Macd, Signal, Close, Reference, Sma5, Sma10, Sma20, Sma50, Sma100, Sma200, Ema5, Ema10, Ema20, Ema50, Ema100, Ema200, Rsi, BbUp, BbDown, Mfi, BankerRsi } = e;
  Object.keys(dataFillter).forEach(key => {
    if (arrKeyChiSoKyThuat.includes(key)) {
      if (!dataFillter[key].value || !dataFillter[key].value.length) return checkTa = true
      if (key == 'DuongTrungBinhSMA' || key == 'DuongTrungBinhEMA') {
        if (!dataFillter[key].value.length) return
        const objDataDuongTrungBinh = {
          SMA5: Sma5,
          SMA10: Sma10,
          SMA20: Sma20,
          SMA50: Sma50,
          SMA100: Sma100,
          SMA200: Sma200,
          EMA5: Ema5,
          EMA10: Ema10,
          EMA20: Ema20,
          EMA50: Ema50,
          EMA100: Ema100,
          EMA200: Ema200,
        }
        if (Close) {
          dataFillter[key].value.forEach((strKey: string) => {
            arrItem.forEach(itemKey => {
              if (strKey.includes(itemKey)) {
                if (!checkDuongTrungBinh(itemKey, strKey, Close, Reference, objDataDuongTrungBinh)) {
                  checkTa = false
                }
              }
            })
          });
        }
      }
      if (key == 'TinHieuMACD') {
        if (!dataFillter[key].value.length) return
        if (!Macd || !Signal || !Macd.length || !Signal.length) {
          checkTa = false
        }
        if (Macd && Signal && hasData(Macd[1]) && hasData(Signal[1])) {
          if (dataFillter[key].value.includes('MACDCatLenDuongTinHieu')) {
            if (!(Macd[0] < Signal[0] && Macd[1] > Signal[1])) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDCatLenTrenDuong0')) {
            if (!(Macd[0] < 0 && Macd[1] > 0)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDCatXuongDuongTinHieu')) {
            if (!(Macd[0] > Signal[0] && Macd[1] < Signal[1])) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDCatXuongDuong0')) {
            if (!(Macd[0] > 0 && Macd[1] < 0)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDDangOTrenDuongTinHieu')) {
            if (!(Macd[0] > Signal[0] && Macd[1] > Signal[1])) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDDangOTrenDuong0')) {
            if (!(Macd[0] > 0 && Macd[1] > 0)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDDangCatDuoiDuongTinHieu')) {
            if (!(Macd[0] < Signal[0] && Macd[1] < Signal[1])) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MACDDangCatDuoiDuong0')) {
            if (!(Macd[0] < 0 && Macd[1] < 0)) {
              checkTa = false
            }
          }
        }
      }
      if (key == 'ChiSoRSI') {
        if (!dataFillter[key].value.length) return
        if (!Rsi || !Rsi.length) {
          checkTa = false
        }
        if (Rsi && hasData(Rsi[1])) {
          if (dataFillter[key].value.includes('RSIDiVaoVungQuaMua')) {
            if (!(Rsi[0] < 70 && Rsi[1] > 70)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSIDiVaoVungQuaBan')) {
            if (!(Rsi[0] > 30 && Rsi[1] < 30)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSIThoatKhoiVungQuaMua')) {
            if (!(Rsi[0] > 70 && Rsi[1] < 70)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSIThoatKhoiVungQuaBan')) {
            if (!(Rsi[0] < 30 && Rsi[1] > 30)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSIDangOVungQuaMua')) {
            if (!(Rsi[0] > 70 && Rsi[1] > 70)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSIDangOVungQuaBan')) {
            if (!(Rsi[0] < 30 && Rsi[1] < 30)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RSILonHonHoacBang50')) {
            if (!(Rsi[0] >= 50)) {
              checkTa = false
            }
          }
        }
      }
      if (key == 'ChiSoRS') {
        if (!dataFillter[key].value.length) return
        if (!Rsi || !Rsi.length) {
          checkTa = false
        }
        if (hasData(Rsi[1])) {
          let Rs = isnum(100 / (100 - Rsi[1]) - 1)
          if (dataFillter[key].value.includes('RS>=1')) {
            if (Rs < 1) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RS>=2')) {
            if (Rs < 2) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RS>=3')) {
            
            if (Rs < 3) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RS>=4')) {
            if (Rs < 4) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('RS>=5')) {
            if (Rs < 5) {
              checkTa = false
            }
          }
        }
      }
      if (key == 'BollingerBands') {
        if (!dataFillter[key].value.length) return
        if (dataFillter[key].value.includes('GiaThoatRaNgoaiBienTrenBollingerBand')) {
          if (!(Close > BbUp && Reference < BbUp)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('GiaCatXuongTuNgoaiBienTrenBollingerBand')) {
          if (!(Close < BbUp && Reference > BbUp)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('GiaDangONgoaiBienTrenBollingerBand')) {
          if (!(Close > BbUp && Reference > BbUp)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('GiaThoatRaNgoaiBienDuoiBollingerBand')) {
          if (!(Close < BbDown && Reference > BbDown)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('GiaCatXuongTuNgoaiBienDuoiBollingerBand')) {
          if (!(Close > BbDown && Reference < BbDown)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('GiaDangONgoaiBienDuoiBollingerBand')) {
          if (!(Close < BbDown && Reference < BbDown)) {
            checkTa = false
          }
        }
      }
      if (key == 'ChiSoMFI') {
        if (!dataFillter[key].value.length) return
        if (!Mfi || !Mfi.length) {
          checkTa = false
        }
        if (Mfi && hasData(Mfi[1])) {
          if (dataFillter[key].value.includes('MFIDiVaoVungQuaMua')) {
            if (!(Mfi[0] < 80 && Mfi[1] > 80)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MFIDiVaoVungQuaBan')) {
            if (!(Mfi[0] > 20 && Mfi[1] < 20)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MFIThoatKhoiVungQuaMua')) {
            if (!(Mfi[0] > 80 && Mfi[1] < 80)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MFIThoatKhoiVungQuaBan')) {
            if (!(Mfi[0] < 20 && Mfi[1] > 20)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MFIDangOVungQuaMua')) {
            if (!(Mfi[0] > 80 && Mfi[1] > 80)) {
              checkTa = false
            }
          }
          if (dataFillter[key].value.includes('MFIDangOVungQuaBan')) {
            if (!(Mfi[0] < 20 && Mfi[1] > 20)) {
              checkTa = false
            }
          }
        }
      }
      if (key == 'GiaTriMCDX') {
        if (!dataFillter[key].value.length) return
        if (!BankerRsi) {
          checkTa = false
        }
        if (dataFillter[key].value.includes('MCDX5')) {
          if (!(BankerRsi >= 5)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('MCDX10')) {
          if (!(BankerRsi >= 10)) {
            checkTa = false
          }
        }
        if (dataFillter[key].value.includes('MCDX15')) {
          if (!(BankerRsi >= 15)) {
            checkTa = false
          }
        }
      }
    } else { // Lọc theo điều kiện lớn nhỏ
      if (dataFillter[key]) {
        let keyRepare = key
        if (['Dt4Q', 'TangTruongDtQuyGanNhat', 'TangTruongDtQuyCungKy', 'TangTruongDt4Quy', 'TangTruongDtQuyGanNhi', 'Ln4Q', 'TangTruongLnQuyGanNhat', 'TangTruongLnQuyCungKy', 'TangTruongLn4Quy', 'TangTruongLnQuyGanNhi'].includes(key)) {
          if (!_checkKetQuaDoanhThu(key, e)) {
            checkFa = false
          }
        }
        if (hasData(dataFillter[key].nho) && hasData(dataFillter[key].lon)) {
          if (!(numberFormatVolume2(isnum(e[keyRepare]), 2, true) >= dataFillter[key].nho &&
            numberFormatVolume2(isnum(e[keyRepare]), 2, true) <= dataFillter[key].lon)) {
            checkFa = false
          }
        } else if (hasData(dataFillter[key].nho)) {
          if (!(numberFormatVolume2(isnum(e[keyRepare]), 2, true) >= dataFillter[key].nho)) {
            checkFa = false
          }
        } else if (hasData(dataFillter[key].lon)) {
          if (!(numberFormatVolume2(isnum(e[keyRepare]), 2, true) <= dataFillter[key].lon)) {
            checkFa = false
          }
        }
      }
    }
  })
  if (checkTa && checkFa) {
    return e
  }
}
export function _getNameDieuKienLoc(paramsLoc: any) {
  let arrStr = [] as any
  if (!paramsLoc) return []
  if (paramsLoc.Fa) {
    const arr = Object.keys(paramsLoc.Fa) || []
    arr.forEach(e => {
      Object.keys(paramsLoc.Fa[e]).forEach(key => {
        if (paramsLoc.Fa[e][key] && _paramsMap.Fa[e][key]) {
          const obj = {
            key: key,
            name: _paramsMap.Fa[e][key].name,
            data: paramsLoc.Fa[e][key].nho && paramsLoc.Fa[e][key].lon ?
              paramsLoc.Fa[e][key].nho + '-' + paramsLoc.Fa[e][key].lon :
              paramsLoc.Fa[e][key].nho ? paramsLoc.Fa[e][key].nho :
              paramsLoc.Fa[e][key].lon ? paramsLoc.Fa[e][key].lon : ''
          }
          arrStr.push(obj)
        }
      })
    })
  }
  if (paramsLoc.Ta) {
    const arr = Object.keys(paramsLoc.Ta) || []
    arr.forEach(e => {
      if (paramsLoc.Ta[e]) {
        if (!paramsLoc.Ta[e].value.length) return
        const arrMapNameTa = paramsLoc.Ta[e].value.map((str: string) => {
          const label = _optionMapNameTa[e].find((elm: any) => elm.value == str)?.label || null
          return label
        })
        const obj = {
          key: e,
          name: _paramsMap.Ta[e].name,
          data: arrMapNameTa && arrMapNameTa.length ? arrMapNameTa.join(', ') : ''
        }
        arrStr.push(obj)
      }
    })
  }
  return arrStr
}
function hasData3 (data: any) {
  let check = false
  if (data && isnum(data) && data != -999999999999) {
    check = true
  }
  return check
}
function checkDuongTrungBinh (type: string, strKey: string, Close: number, Reference: number, objDataDuongTrungBinh: any) {
  if (!type || !strKey || !objDataDuongTrungBinh || !Object.keys(objDataDuongTrungBinh).length) return false
  let check = false
  const arrDataCatLen = strKey.split(type) || []
  if (arrDataCatLen && arrDataCatLen.length) {
    const str1 = arrDataCatLen[0]
    const str2 = arrDataCatLen[1]
    let data1 = []
    // map data1
    if (str1 == 'GiaHienTai') {
      data1 = [isnum(Reference), isnum(Close)]
    } else {
      data1 = objDataDuongTrungBinh[str1].length ? objDataDuongTrungBinh[str1] : []
    }
    // map data 2
    let data2 = objDataDuongTrungBinh[str2].length ? objDataDuongTrungBinh[str2] : []
    // check logic
    if (type == 'NamTren') {
      if (isnum(data1[0]) > isnum(data2[1]) &&
          isnum(data1[1]) > isnum(data2[1])) {
        check = true
      }
    }
    if (type == 'NamDuoi') {
      if (isnum(data1[0]) < isnum(data2[1]) &&
          isnum(data1[1]) < isnum(data2[1])) {
        check = true
      }
    }
    if (type == 'CatLenDuong') {
      if (isnum(data1[0]) < isnum(data2[1]) &&
          isnum(data1[1]) > isnum(data2[1])) {
        check = true
      }
    }
    if (type == 'CatXuongDuong') {
      if (isnum(data1[0]) > isnum(data2[1]) &&
        isnum(data1[1]) < isnum(data2[1])) {
        check = true
      }
    }
  }
  return check
}
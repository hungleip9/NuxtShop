import type { UserInfo,
  MarketInfo,
  TaiKhoanTheoDoi,
  NganhCap,
  LiveBoardDataSymbol,
  LiveboardFutureSymbol,
  LiveboardFuture,
  ChungQuyen,
  CompanyIntraday,
  DanhSachNhomNganh,
  ThiTruong,
  LichSuHangHoa,
  HangHoa,
  ObjCanhBao,
  ArrCanhBao,
  DataVuotDinhThungDay,
  DanhSachLocFa,
  DanhSachLocTa,
  MarketIntradayHistoryItem,
  MarketHistoryItem,
} from "~/models/Global"

export const useAuth = () => 
  useState(() => ({
    isAuthenticated: false as boolean,
    userInfo: {} as UserInfo | any,
    IsActive: true as boolean,
    referralRate: {}
  }))
export const useGlobal = () => 
  useState(() => ({
    TimeServer: '' as any,
    LiveBoardSymbol: {} as LiveBoardDataSymbol,
    liveboardFuture: [] as LiveboardFuture[],
    liveboardFutureSymbol: {} as LiveboardFutureSymbol,
    MarketInfo: {} as {[key: string]: MarketInfo} | any,
    VN30: [] as string[],
    ChungQuyen: [] as ChungQuyen[],
    MarketHistory: {
      VNINDEX: {},
      HNXINDEX: {},
      VN30: {},
      UPINDEX: {}
    } as {[key: string]: any},
    OrderMatchingIntraday: {
      HNXINDEX: [],
      VNINDEX: [],
      VN30: [],
      HNXUPCOMINDEX: []
    } as {[key: string]: any[]},
    MarketIntradayHistory: {
      HNXINDEX: [],
      VNINDEX: [],
      VN30: [],
      HNXUPCOMINDEX: []
    } as {[key: string]: MarketIntradayHistoryItem[]},
    CompanyIntraday: {} as {[key: string]: CompanyIntraday} | any,
    CompanyForeignTransaction: {} as {[key: string]: any},
    AuthToken: '' as string,
    DanhSachNhomNganh: [] as DanhSachNhomNganh[],
    TaiKhoanTheoDoi: [] as TaiKhoanTheoDoi[],
    ThiTruong: [] as ThiTruong[],
    ThiTruongLichSu1D: [],
    LichSuHangHoa: {} as LichSuHangHoa,
    HangHoa: {} as HangHoa,
    Permission: '',
    ObjCanhBao: {} as ObjCanhBao | any,
    ArrCanhBao: [] as ArrCanhBao[],
    FeatureToggle: [] as string[],
    StockChanged: '' as string,
    filterAlert: '' as string,
    CommodityRealTime: {} as any,
    LiveData: {
      livedata: null,
      Topic: ''
    } as {livedata: any, Topic: string}
  }))
export const useConst = () => 
  useState(() => ({
    theme: 'dark' as string,
    nganhCap1: [] as NganhCap[],
    nganhCap4: [] as NganhCap[],
    DanhSachLocFa: null as {[key: string]: DanhSachLocFa} | any,
    DanhSachLocTa: null as {[key: string]: DanhSachLocTa} | any,
    activeSidebar: '' as string,
    DanhSachBoLoc: [] as any,
    color: {
      textLight: '#474d57',
      textDark: '#abb1bb',
      fl: "#00cccc",
      down: "#f6465d",
      ref: "#ccaa00",
      up: "#0ECB81",
      ce: "#ff00ff"
    } as { textLight: string, textDark: string, fl: string, down: string, ref: string, up: string, ce: string },
    notification: [] as {
      Id: string,
      Content: string,
      Title: string,
      RouterLink: string,
      CreatedDate: Date,
      IsRead: boolean
    }[],
    CanhBaoSwitch: false as boolean,
    dataVuotDinh: {} as DataVuotDinhThungDay,
    dataThungDay: {} as DataVuotDinhThungDay,
    handlePause: false as boolean,
    linkShare: '' as string,
    TimeCheck: false as boolean,
    sysTemConFig: {
      FreePlanId: {
        discription: 'ID gói miễn phí',
        value: 7
      } as {discription: string, value: number},
      AllowRegister: {
        discription: 'Cho phép đăng ký',
        value: true
      } as {discription: string, value: boolean},
      CdnUrl: {
        discription: 'Cdn url',
        value: 'https://cdn.stockproxx.com'
      } as {discription: string, value: string},
      NewsMenu: {
        discription: 'Menu tin tức',
        value: 'Doanh nghiệp: 154; Chứng khoán: 153; Bất động sản: 155; Tài chính ngân hàng: 156; Kinh tế thế giới: 157; Kinh tế đầu tư: 158; Hàng Hóa: 159; Giải Trí: 160'
      } as {discription: string, value: string},
      MarketNewsMenu: {
        discription: 'Menu tin tức thị trường',
        value: 'Việt Nam: 153, 154; Châu Mỹ: 163; Châu Âu: 164; Châu Á: 165'
      } as {discription: string, value: string},
      IsEnableReferral: {
        discription: 'Sử dụng tiếp thị liên kết',
        value: true
      } as {discription: string, value: boolean},
      ReferralFirstApplyCoupon: {
        discription: 'Mã KM tiếp thị lần đầu',
        value: ''
      } as {discription: string, value: string},
      ReferralRate1: {
        discription: 'Tỉ lệ tiếp thị liên kết lần đầu',
        value: 0
      } as {discription: string, value: number},
      ReferralRate2: {
        discription: 'Tỉ lệ tiếp thị liên kết lần kế',
        value: 0
      } as {discription: string, value: number},
      ReferralRate3: {
        discription: 'Tỉ lệ tiếp thị liên kết cuối',
        value: 0
      } as {discription: string, value: number},
      NewsInterval: {
        discription: 'Tin tức (Số ngày)',
        value: 10
      } as {discription: string, value: number},
      AutoApproveNews: {
        discription: 'Tự động duyệt bài crawl',
        value: false
      } as {discription: string, value: boolean},
      AndroidVersion: {
        discription: 'Version (Android)',
        value: '1.2.6'
      } as {discription: string, value: string},
      AndroidForceUpdate: {
        discription: 'Bắt buộc cập nhật (Android)',
        value: true
      } as {discription: string, value: boolean},
      IosVersion: {
        discription: 'Version (IOS)',
        value: '1.2.6'
      } as {discription: string, value: string},
      IosForceUpdate: {
        discription: 'Bắt buộc cập nhật (IOS)',
        value: true
      } as {discription: string, value: boolean},
      CDKT: 'CoBan_CanDoiKeToan' as string,
      KQKD: 'CoBan_KetQuaKinhDoanh' as string
    },
    hasPopup: {} as {[key: string]: boolean},
    messagesActive: '' as string,
    objNotificationSubscribe: {} as {[key: string]: boolean},
    Promotion: ''
  }))
export const useLoading = () => 
useState(() => ({
  Fa: false as boolean,
  Ta: false as boolean
}))
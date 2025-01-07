export enum ChartInterval {
    '1D' = 1,
    '1M' = 20,
    '3M' = 60,
    '6M' = 120,
    '1Y' = 240,
    '5Y' = 1200,
}
export enum RealTimeInterval {
    '1M' = 30,
    '3M' = 90,
    '6M' = 180,
    '9M' = 270,
    '12M' = 365,
    '13M' = 395,
    '18M' = 548,
    '24M' = 730,
    '36M' = 1095,
}
export enum CommodityType {
    KIMLOAI,
    NANGLUONG,
    NONGNGHIEP,
    TIENTE
}
export enum NewsType {
    Default = 0,
    BusinessSituation = 1,
    Dividend = 2,
    HumanResources = 3,
    CapitalIncrease = 4,
    Transaction = 5
}
export enum ReportType {
    CDKT = 1,
    KQKD = 2,
    TMBC = 3,
    LCTTTT = 4,
    LCTTGT = 5
}
export enum CalculationUnit {
    Default = 0,
    Thousand = 1,
    Million = 2,
    Billion = 3,
    Trillion = 4
}
export enum LoadStatus {
    NoData = -1,
    Loading = 0,
    Loaded = 1
}
export enum IndicatorType {
    ChiSoDinhGia = 1,
    KhaNangSinhLoi = 2,
    SucManhTaiChinh = 3,
    KhaNangHoatDong = 4,
    HieuQuaQuanLy = 5,
}
export enum MALine {
    MA5 = 5,
    MA10 = 10,
    MA20 = 20,
    MA50 = 50,
}
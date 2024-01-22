export interface userInfoProps {
  totalUser: number;
  weekRate: string;
  dayRate: string;
  dayAddUser: number;
}

export interface visitInfoProps {
  totalVisit: number;
  data: number[];
  dayVisit: number;
}

export interface payInfoProps {
  totalPay: number;
  data: number[];
  conversionRate: string;
}

export interface saleInfoProps {
  totalSale: number;
  data: number;
  weekRate: string;
  dayRate: string;
}

interface lineSaleInfoItemProps {
  type: string;
  sales: number;
}

export interface lineSaleInfoProps {
  data: lineSaleInfoItemProps[];
}

interface storeInfoItemProps {
  name: string;
  count: string;
}

export interface storeInfoProps {
  data: storeInfoItemProps[];
}

interface onlineInfoItemProps {
  key: string;
  keyWord: string;
  userCount: number;
  marginOfIncrease: number;
}

export interface onlineInfoProps {
  searchUser: number;
  followUser: number;
  searchRate: string;
  followRate: string;
  searchData: number[];
  followData: number[];
  tableData: onlineInfoItemProps[];
}

interface saleTypeInfoItemProps {
  type: string;
  value: number;
}

export interface saleTypeInfoProps {
  data: saleTypeInfoItemProps[];
}

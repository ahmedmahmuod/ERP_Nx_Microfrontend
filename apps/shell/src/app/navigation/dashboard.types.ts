export interface DashboardColorConfig {
  name: string;
  light: { text: string; bg: string };
  dark: { text: string; bg: string };
}

export interface DashboardCardConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  type: 'APP' | 'qt';
  color?: DashboardColorConfig; // Optional, defaults to gray if missing
}

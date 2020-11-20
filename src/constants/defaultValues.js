/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" },
  { id: "sw", name: "Swahili", direction: "ltr" },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
  authDomain: "gogo-react-login.firebaseapp.com",
  databaseURL: "https://gogo-react-login.firebaseio.com",
  projectId: "gogo-react-login",
  storageBucket: "gogo-react-login.appspot.com",
  messagingSenderId: "216495999563"
};

export const searchPath = "/app/pages/search";
export const servicePath = "http://localhost:8385/api/";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = false;
export const defaultColor = "light.green";
export const defaultColorValue = "#576a3d";
export const defaultDirection = "ltr";
export const isDarkSwitchActive = true;
export const themeColorStorageKey="__theme_color";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;

/*
* Pagination Default Parameters
* */
export const dataGridDefaultPageSize = 10;
export const dataComboDefaultPageSize = 2;
export const dataGridPageSizeOptions = [10, 20, 30, 50, 100];
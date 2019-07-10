export default class DarkMode {
  constructor(){
    // get saved status
    const statusFromLS = localStorage.getItem('dark-mode');
    this._isDarkModeOn = statusFromLS === "on";
    // change attribute on body tag so CSS is aware
    document.getElementsByTagName("body")[0].setAttribute("dark-mode", statusFromLS || "off");
  }

  get isDarkModeOn(){
    return this._isDarkModeOn;
  }

  toggleDarkMode = () => {
    this._isDarkModeOn = !this._isDarkModeOn;
    const darkModeStatus = this._isDarkModeOn ? "on" : "off";
    document.getElementsByTagName("body")[0].setAttribute("dark-mode", darkModeStatus);
    localStorage.setItem('dark-mode', darkModeStatus);
  }
}

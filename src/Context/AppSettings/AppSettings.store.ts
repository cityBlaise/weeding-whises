import { ColorTheme, ScreenSize } from "./AppSettings";
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  startWith,
  tap,
} from "rxjs/operators";
import { create } from "zustand";

const getColorScheme = (): ColorTheme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ColorTheme.DARK
    : ColorTheme.LIGHT;
};

interface AppSettings {
  screenSize: ScreenSize;
  colorTheme: ColorTheme;
  setScreenSize: (screenSize: ScreenSize) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const getSize = (width: number): ScreenSize => {
  switch (true) {
    case  width <= 500:
      return ScreenSize.SMALL;
    case width > 500 && width <= 900:
      return ScreenSize.MEDIUM;
    case width > 900 && width <= 1300:
      return ScreenSize.LARGE;
    case width > 1300 && width <= 1800:
      return ScreenSize.XLARGE;
    case width > 1800:
      return ScreenSize.X2LARGE;

    default:
      return ScreenSize.XSMALL;
  }
};

export const useAppSettings = create<AppSettings>((set) => ({
  colorTheme: ColorTheme.LIGHT,
  screenSize: ScreenSize.MEDIUM,
  setColorTheme: (colorTheme: ColorTheme) => set(() => ({ colorTheme })),
  setScreenSize: (screenSize: ScreenSize) => set(() => ({ screenSize })),
}));

// Access the setScreenSize,setColorTheme method from the Zustand store
const { setScreenSize, setColorTheme } = useAppSettings.getState();

fromEvent(window, "resize")
  .pipe(
    tap(() =>
      console.log(
        window.innerWidth,
        window.innerHeight,
        window.outerWidth,
        window.outerHeight
      )
    ),
    // debounceTime(10),
    startWith(document.body.clientWidth),
    distinctUntilChanged(),
    map(() => getSize(document.body.clientWidth)),
    share()
  )
  .subscribe((screenSize) => {
    setScreenSize(screenSize); 
  });

// Observable for color scheme changes
fromEvent(window.matchMedia("(prefers-color-scheme: dark)"), "change")
  .pipe(
    debounceTime(300),
    map(() => getColorScheme()),
    startWith(getColorScheme()),
    distinctUntilChanged()
  )
  .subscribe((colorScheme) => {
    setColorTheme(colorScheme); 
  });
